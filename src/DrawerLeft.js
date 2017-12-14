import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import List from 'react-virtualized/dist/commonjs/List'
import {
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized/dist/commonjs/CellMeasurer'
import { Link } from 'react-router-dom'
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
      const { number: songNumber, title: songTitle, url } = songs[index]
      return (
        <CellMeasurer
          key={key}
          cache={this.cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <Link
            to={url}
            style={style}
            onClick={() => {
              closeDrawer()
              setCurrentSong(index + 15)
            }}
          >
            <span>{songNumber}.</span>
            <span> {songTitle}</span>
          </Link>
        </CellMeasurer>
      )
    }
    const Div = styled.div`
      overflow-x: hidden;
      h3 {
        display: flex;
        margin: 0;
        padding: 15px;
        font-size: 17px;
        font-weight: normal;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.15) 1px 1px 3px;
      }
      svg {
        margin-right: 10px;
      }
      a {
        display: flex;
        padding: 5px 15px;
        font-size: 15px;
        line-height: 1.2;
        color: gray;
        text-decoration: none;
        span {
          &:first-child {
            display: inline-block;
            margin-right: 5px;
            opacity: 0.7;
          }
        }
      }
    `
    return (
      <Div>
        <h3
          onClick={() => {
            if (currentBook === title) setCurrentBook(null)
            else {
              setCurrentSong(0)
              setCurrentBook(title)
            }
          }}
        >
          <IconBook /> {title}
        </h3>
        {currentBook === title && (
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
      </Div>
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
