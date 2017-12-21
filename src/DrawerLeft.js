import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import List from 'react-virtualized/dist/commonjs/List'
import {
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized/dist/commonjs/CellMeasurer'
import ListLink from './ListLink'
import { IconBook } from './icons'

class ListWrapper extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    scrollToCurrentSong: PropTypes.func.isRequired,
  }
  componentDidMount () {
    this.props.scrollToCurrentSong()
  }
  render () {
    return this.props.children
  }
}

class SongSection extends Component {
  cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 30,
  })
  static propTypes = {
    title: PropTypes.string.isRequired,
    songs: PropTypes.array.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    currentBook: PropTypes.string,
    setCurrentBook: PropTypes.func.isRequired,
    currentSong: PropTypes.number,
    setCurrentSong: PropTypes.func.isRequired,
  }
  componentWillUpdate () {
    this.cache.clearAll()
  }
  render () {
    const {
      title,
      songs,
      closeDrawer,
      currentBook,
      setCurrentBook,
      currentSong,
      setCurrentSong,
    } = this.props
    const rowRenderer = ({
      key,
      index,
      parent,
      isScrolling,
      isVisible,
      style,
    }) => {
      const { number: songNumber, title: songTitle, path } = songs[index]
      return (
        <CellMeasurer
          key={key}
          cache={this.cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <ListLink
            to={path}
            style={style}
            onClick={() => {
              closeDrawer()
              setCurrentSong(index + 15)
            }}
          >
            <span>{songNumber}</span>
            <span>{songTitle}</span>
          </ListLink>
        </CellMeasurer>
      )
    }
    const H3 = styled.h3`
      display: flex;
      margin: 0;
      padding: 15px;
      font-size: 17px;
      font-weight: normal;
      cursor: pointer;
      color: ${({ theme }) => theme.text};
      & + div {
        padding-top: 10px;
        box-shadow: inset rgba(0, 0, 0, 0.15) 1px 1px 3px;
      }
      svg {
        margin-right: 10px;
      }
    `
    const currentBookIsThis = currentBook === title
    return (
      <div>
        <H3
          onClick={() => {
            if (currentBookIsThis) setCurrentBook(null)
            else {
              setCurrentSong(0)
              setCurrentBook(title)
              setTimeout(() => {
                this.cache.clearAll()
                this.forceUpdate()
              })
            }
          }}
        >
          <IconBook /> {title}
        </H3>
        {currentBookIsThis && (
          <ListWrapper
            scrollToCurrentSong={() => this.listRef.scrollToRow(currentSong)}
          >
            <List
              height={window.innerHeight / 1.5}
              rowCount={songs.length}
              rowHeight={this.cache.rowHeight}
              defferedMeasurementCache={this.cache}
              width={300}
              rowRenderer={rowRenderer}
              ref={list => {
                this.listRef = list
              }}
            />
          </ListWrapper>
        )}
      </div>
    )
  }
}

class DrawerLeft extends Component {
  state = {
    currentBook: null,
    currentSong: 0,
  }
  static propTypes = {
    songList: PropTypes.array.isRequired,
    closeDrawer: PropTypes.func.isRequired,
  }
  render () {
    const { songList, closeDrawer } = this.props
    const { currentBook, currentSong } = this.state
    return (
      <div>
        {songList.map(({ title, songs }) => (
          <SongSection
            title={title}
            songs={songs}
            closeDrawer={closeDrawer}
            currentBook={currentBook}
            setCurrentBook={currentBook =>
              this.setState({
                currentBook,
              })
            }
            currentSong={currentSong}
            setCurrentSong={currentSong =>
              this.setState({
                currentSong,
              })
            }
            key={title}
          />
        ))}
      </div>
    )
  }
}

export default DrawerLeft
