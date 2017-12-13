import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import List from 'react-virtualized/dist/commonjs/List'
import { Link } from 'react-router-dom'
import { generateUrl } from './helpers'

class DrawerLeft extends Component {
  state = {
    currentBook: null,
  }
  static propTypes = {
    songList: PropTypes.array.isRequired,
  }
  render () {
    const SongSection = ({ title, songs }) => {
      const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
        const { number: songNumber, title: songTitle } = songs[index]
        return (
          <div key={key} style={style}>
            <Link to={generateUrl(songNumber, songTitle)}>
              {songNumber}. {songTitle}
            </Link>
          </div>
        )
      }
      const { currentBook } = this.state
      return (
        <div>
          <h3
            onClick={() =>
              this.setState({
                currentBook: currentBook === title ? null : title,
              })
            }
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
            <List
              height={500}
              rowCount={songs.length}
              rowHeight={30}
              width={300}
              rowRenderer={rowRenderer}
            />
          )}
        </div>
      )
    }
    const { songList } = this.props
    return (
      <div>
        {songList.map(({ title, songs }) => (
          <SongSection title={title} songs={songs} key={title} />
        ))}
      </div>
    )
  }
}

export default DrawerLeft
