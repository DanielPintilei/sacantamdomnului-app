import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import BackgroundImage from './BackgroundImage'
import { normalizeTitle } from './helpers'

const StyledSong = styled.article`
  position: relative;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
`
const Song = ({ match: { params: { number, title } }, songList }) => {
  let currentSong
  for (const section of songList) {
    for (const song of section.songs) {
      if (normalizeTitle(song.title) === title) {
        currentSong = song
        break
      }
    }
  }
  return (
    <StyledSong>
      <h1>
        {currentSong.number}. {currentSong.title}
      </h1>
      <pre>{currentSong.content}</pre>
    </StyledSong>
  )
}
Song.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      number: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  songList: PropTypes.array.isRequired,
}

const StyledMain = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.background};
  .background-image {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    color: #fadca8;
  }
`
const Main = ({ songList }) => (
  <StyledMain>
    <Route exact path='/' component={BackgroundImage} />
    <Route
      path='/:number-:title'
      render={props => <Song songList={songList} {...props} />}
    />
  </StyledMain>
)
Main.propTypes = {
  songList: PropTypes.array.isRequired,
}

export default Main
