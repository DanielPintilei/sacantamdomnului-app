import { Component } from 'react'
import { findDOMNode } from 'react-dom'

export default class ItemMeasurer extends Component {
  _node = null
  _resizeObserver = null

  componentDidMount () {
    const node = findDOMNode(this)
    this._node = node

    // Force sync measure for the initial mount.
    // This is necessary to support the DynamicSizeList layout logic.
    this._measureItem(true)

    if (typeof ResizeObserver !== 'undefined') {
      // Watch for resizes due to changed content,
      // Or changes in the size of the parent container.
      this._resizeObserver = new ResizeObserver(this._onResize)
      this._resizeObserver.observe(node)
    }
  }

  componentWillUnmount () {
    if (this._resizeObserver !== null) {
      this._resizeObserver.disconnect()
    }
  }

  render () {
    return this.props.item
  }

  _measureItem = isCommitPhase => {
    const {
      direction,
      handleNewMeasurements,
      index,
      size: oldSize,
    } = this.props

    const node = this._node

    if (
      node &&
      node.ownerDocument &&
      node.ownerDocument.defaultView &&
      node instanceof node.ownerDocument.defaultView.HTMLElement
    ) {
      const newSize =
        direction === 'horizontal'
          ? Math.ceil(node.offsetWidth)
          : Math.ceil(node.offsetHeight)

      if (oldSize !== newSize) {
        handleNewMeasurements(index, newSize, isCommitPhase)
      }
    }
  }

  _onResize = () => {
    this._measureItem(false)
  }
}
