import memoizeOne from 'memoize-one'
import { createElement, PureComponent } from 'react'

const IS_SCROLLING_DEBOUNCE_INTERVAL = 150

export const defaultItemKey = index => index

export default function createListComponent ({
  getItemOffset,
  getEstimatedTotalSize,
  getItemSize,
  getOffsetForIndexAndAlignment,
  getStartIndexForOffset,
  getStopIndexForStartIndex,
  initInstanceProps,
  shouldResetStyleCacheOnItemSizeChange,
  validateProps,
}) {
  return class extends PureComponent {
    _instanceProps = initInstanceProps(this.props, this)
    _outerRef
    _resetIsScrollingTimeoutId = null

    static defaultProps = {
      direction: 'vertical',
      innerTagName: 'div',
      itemData: undefined,
      outerTagName: 'div',
      overscanCount: 2,
      useIsScrolling: false,
    }

    state = {
      isScrolling: false,
      scrollDirection: 'forward',
      scrollOffset:
        typeof this.props.initialScrollOffset === 'number'
          ? this.props.initialScrollOffset
          : 0,
      scrollUpdateWasRequested: false,
    }

    // Always use explicit constructor for React components.
    // It produces less code after transpilation. (#26)
    // eslint-disable-next-line no-useless-constructor
    constructor (props) {
      super(props)
    }

    static getDerivedStateFromProps (props, state) {
      validateSharedProps(props)
      validateProps(props)
      return null
    }

    scrollTo (scrollOffset) {
      this.setState(
        prevState => ({
          scrollDirection:
            prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
          scrollOffset: scrollOffset,
          scrollUpdateWasRequested: true,
        }),
        this._resetIsScrollingDebounced,
      )
    }

    scrollToItem (index, align = 'auto') {
      const { scrollOffset } = this.state
      this.scrollTo(
        getOffsetForIndexAndAlignment(
          this.props,
          index,
          align,
          scrollOffset,
          this._instanceProps,
        ),
      )
    }

    componentDidMount () {
      const { initialScrollOffset, direction } = this.props

      if (typeof initialScrollOffset === 'number' && this._outerRef !== null) {
        if (direction === 'horizontal') {
          this._outerRef.scrollLeft = initialScrollOffset
        } else {
          this._outerRef.scrollTop = initialScrollOffset
        }
      }

      this._callPropsCallbacks()
      this._commitHook()
    }

    componentDidUpdate () {
      const { direction } = this.props
      const { scrollOffset, scrollUpdateWasRequested } = this.state

      if (scrollUpdateWasRequested && this._outerRef !== null) {
        if (direction === 'horizontal') {
          this._outerRef.scrollLeft = scrollOffset
        } else {
          this._outerRef.scrollTop = scrollOffset
        }
      }

      this._callPropsCallbacks()
      this._commitHook()
    }

    componentWillUnmount () {
      if (this._resetIsScrollingTimeoutId !== null) {
        clearTimeout(this._resetIsScrollingTimeoutId)
      }

      this._unmountHook()
    }

    render () {
      const {
        className,
        direction,
        height,
        innerRef,
        innerTagName,
        outerTagName,
        style,
        width,
      } = this.props
      const { isScrolling } = this.state

      const onScroll =
        direction === 'vertical'
          ? this._onScrollVertical
          : this._onScrollHorizontal

      const items = this._renderItems()

      // Read this value AFTER items have been created,
      // So their actual sizes (if variable) are taken into consideration.
      const estimatedTotalSize = getEstimatedTotalSize(
        this.props,
        this._instanceProps,
      )

      return createElement(
        outerTagName,
        {
          className,
          onScroll,
          ref: this._outerRefSetter,
          style: {
            position: 'relative',
            height,
            width,
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            willChange: 'transform',
            ...style,
          },
        },
        createElement(innerTagName, {
          children: items,
          ref: innerRef,
          style: {
            height: direction === 'horizontal' ? '100%' : estimatedTotalSize,
            pointerEvents: isScrolling ? 'none' : '',
            width: direction === 'horizontal' ? estimatedTotalSize : '100%',
          },
        }),
      )
    }

    _callOnItemsRendered = memoizeOne(
      (
        overscanStartIndex,
        overscanStopIndex,
        visibleStartIndex,
        visibleStopIndex,
      ) =>
        this.props.onItemsRendered({
          overscanStartIndex,
          overscanStopIndex,
          visibleStartIndex,
          visibleStopIndex,
        }),
    )

    _callOnScroll = memoizeOne(
      (scrollDirection, scrollOffset, scrollUpdateWasRequested) =>
        this.props.onScroll({
          scrollDirection,
          scrollOffset,
          scrollUpdateWasRequested,
        }),
    )

    _callPropsCallbacks () {
      if (typeof this.props.onItemsRendered === 'function') {
        const { itemCount } = this.props
        if (itemCount > 0) {
          const [
            overscanStartIndex,
            overscanStopIndex,
            visibleStartIndex,
            visibleStopIndex,
          ] = this._getRangeToRender()
          this._callOnItemsRendered(
            overscanStartIndex,
            overscanStopIndex,
            visibleStartIndex,
            visibleStopIndex,
          )
        }
      }

      if (typeof this.props.onScroll === 'function') {
        const {
          scrollDirection,
          scrollOffset,
          scrollUpdateWasRequested,
        } = this.state
        this._callOnScroll(
          scrollDirection,
          scrollOffset,
          scrollUpdateWasRequested,
        )
      }
    }

    // This method is called after mount and update.
    // List implementations can override this method to be notified.
    _commitHook () {}

    // This method is called before unmounting.
    // List implementations can override this method to be notified.
    _unmountHook () {}

    // Lazily create and cache item styles while scrolling,
    // So that pure component sCU will prevent re-renders.
    // We maintain this cache, and pass a style prop rather than index,
    // So that List can clear cached styles and force item re-render if necessary.
    _getItemStyle = index => {
      const { direction, itemSize } = this.props

      const itemStyleCache = this._getItemStyleCache(
        shouldResetStyleCacheOnItemSizeChange && itemSize,
      )

      let style
      if (itemStyleCache.hasOwnProperty(index)) {
        style = itemStyleCache[index]
      } else {
        itemStyleCache[index] = style = {
          position: 'absolute',
          left:
            direction === 'horizontal'
              ? getItemOffset(this.props, index, this._instanceProps)
              : 0,
          top:
            direction === 'vertical'
              ? getItemOffset(this.props, index, this._instanceProps)
              : 0,
          height:
            direction === 'vertical'
              ? getItemSize(this.props, index, this._instanceProps)
              : '100%',
          width:
            direction === 'horizontal'
              ? getItemSize(this.props, index, this._instanceProps)
              : '100%',
        }
      }

      return style
    }

    _itemStyleCache

    // TODO This memoized getter doesn't make much sense.
    // If all that's really needed is for the impl to be able to reset the cache,
    // Then we could expose a better API for that.
    _getItemStyleCache = memoizeOne(_ => {
      this._itemStyleCache = {}

      return this._itemStyleCache
    })

    _getRangeToRender () {
      const { itemCount, overscanCount } = this.props
      const { scrollDirection, scrollOffset } = this.state

      if (itemCount === 0) {
        return [0, 0, 0, 0]
      }

      const startIndex = getStartIndexForOffset(
        this.props,
        scrollOffset,
        this._instanceProps,
      )
      const stopIndex = getStopIndexForStartIndex(
        this.props,
        startIndex,
        scrollOffset,
        this._instanceProps,
      )

      // Overscan by one item in each direction so that tab/focus works.
      // If there isn't at least one extra item, tab loops back around.
      const overscanBackward =
        scrollDirection === 'backward' ? Math.max(1, overscanCount) : 1
      const overscanForward =
        scrollDirection === 'forward' ? Math.max(1, overscanCount) : 1

      return [
        Math.max(0, startIndex - overscanBackward),
        Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)),
        startIndex,
        stopIndex,
      ]
    }

    _renderItems () {
      const {
        children,
        itemCount,
        itemData,
        itemKey = defaultItemKey,
        useIsScrolling,
      } = this.props
      const { isScrolling } = this.state

      const [startIndex, stopIndex] = this._getRangeToRender()

      const items = []
      if (itemCount > 0) {
        for (let index = startIndex; index <= stopIndex; index++) {
          items.push(
            createElement(children, {
              data: itemData,
              key: itemKey(index),
              index,
              isScrolling: useIsScrolling ? isScrolling : undefined,
              style: this._getItemStyle(index),
            }),
          )
        }
      }
      return items
    }

    _onScrollHorizontal = event => {
      const { scrollLeft } = event.currentTarget
      this.setState(prevState => {
        if (prevState.scrollOffset === scrollLeft) {
          // Scroll position may have been updated by cDM/cDU,
          // In which case we don't need to trigger another render,
          // And we don't want to update state.isScrolling.
          return null
        }

        return {
          isScrolling: true,
          scrollDirection:
            prevState.scrollOffset < scrollLeft ? 'forward' : 'backward',
          scrollOffset: scrollLeft,
          scrollUpdateWasRequested: false,
        }
      }, this._resetIsScrollingDebounced)
    }

    _onScrollVertical = event => {
      const { scrollTop } = event.currentTarget
      this.setState(prevState => {
        if (prevState.scrollOffset === scrollTop) {
          // Scroll position may have been updated by cDM/cDU,
          // In which case we don't need to trigger another render,
          // And we don't want to update state.isScrolling.
          return null
        }

        return {
          isScrolling: true,
          scrollDirection:
            prevState.scrollOffset < scrollTop ? 'forward' : 'backward',
          scrollOffset: scrollTop,
          scrollUpdateWasRequested: false,
        }
      }, this._resetIsScrollingDebounced)
    }

    _outerRefSetter = ref => {
      const { outerRef } = this.props

      this._outerRef = ref

      if (typeof outerRef === 'function') {
        outerRef(ref)
      } else if (
        outerRef != null &&
        typeof outerRef === 'object' &&
        outerRef.hasOwnProperty('current')
      ) {
        outerRef.current = ref
      }
    }

    _resetIsScrollingDebounced = () => {
      if (this._resetIsScrollingTimeoutId !== null) {
        clearTimeout(this._resetIsScrollingTimeoutId)
      }

      this._resetIsScrollingTimeoutId = setTimeout(
        this._resetIsScrolling,
        IS_SCROLLING_DEBOUNCE_INTERVAL,
      )
    }

    _resetIsScrolling = () => {
      this._resetIsScrollingTimeoutId = null

      this.setState({ isScrolling: false }, () => {
        // Clear style cache after state update has been committed.
        // This way we don't break pure sCU for items that don't use isScrolling param.
        this._getItemStyleCache(-1)
      })
    }

    // Intentionally placed after all other instance properties have been initialized,
    // So that DynamicSizeList can override the render behavior.
    _instanceProps = initInstanceProps(this.props, this)
  }
}

// NOTE: I considered further wrapping individual items with a pure ListItem component.
// This would avoid ever calling the render function for the same index more than once,
// But it would also add the overhead of a lot of components/fibers.
// I assume people already do this (render function returning a class component),
// So my doing it would just unnecessarily double the wrappers.

const validateSharedProps = ({ children, direction, height, width }) => {
  if (process.env.NODE_ENV !== 'production') {
    if (direction !== 'horizontal' && direction !== 'vertical') {
      throw Error(
        'An invalid "direction" prop has been specified. ' +
          'Value should be either "horizontal" or "vertical". ' +
          `"${direction}" was specified.`,
      )
    }

    if (typeof children !== 'function') {
      throw Error(
        'An invalid "children" prop has been specified. ' +
          'Value should be a function that creates a React element. ' +
          `"${children === null ? 'null' : typeof children}" was specified.`,
      )
    }

    if (direction === 'horizontal' && typeof width !== 'number') {
      throw Error(
        'An invalid "width" prop has been specified. ' +
          'Horizontal lists must specify a number for width. ' +
          `"${width === null ? 'null' : typeof width}" was specified.`,
      )
    } else if (direction === 'vertical' && typeof height !== 'number') {
      throw Error(
        'An invalid "height" prop has been specified. ' +
          'Vertical lists must specify a number for height. ' +
          `"${height === null ? 'null' : typeof height}" was specified.`,
      )
    }
  }
}
