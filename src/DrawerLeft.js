import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { generateUrl } from './helpers'

class DrawerLeft extends Component {
  state = {}
  static propTypes = {
    songList: PropTypes.array.isRequired,
  }
  render () {
    const SongSection = ({ title, songs }) => (
      <div>
        <h3>{title}</h3>
        <div>
          {songs.map(({ number, title }) => (
            // TODO
            <Link
              to={generateUrl(number, title)}
              key={number}
              style={{ display: 'block' }}
            >
              {number}. {title}
            </Link>
          ))}
        </div>
      </div>
    )
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
