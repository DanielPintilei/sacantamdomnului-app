import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import List from 'react-virtualized/dist/commonjs/List'
import {
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized/dist/commonjs/CellMeasurer'
import { Link } from 'react-router-dom'
import { generateUrl } from './helpers'

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
    defaultHeight: 20,
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
      const { number: songNumber, title: songTitle } = songs[index]
      return (
        <CellMeasurer
          key={key}
          cache={this.cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <div
            style={style}
            onClick={() => {
              closeDrawer()
              setCurrentSong(index + 15)
            }}
          >
            <Link to={generateUrl(songNumber, songTitle)}>
              {songNumber}. {songTitle}
            </Link>
          </div>
        </CellMeasurer>
      )
    }
    return (
      <div>
        <h3
          onClick={() => {
            if (currentBook === title) setCurrentBook(null)
            else {
              setCurrentSong(0)
              setCurrentBook(title)
            }
          }}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20' />
            <path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' />
          </svg>{' '}
          {title}
        </h3>
        {currentBook === title && (
          <ListWrapper
            scrollToCurrentSong={() => this.listRef.scrollToRow(currentSong)}
          >
            <List
              height={window.innerHeight / 2}
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
