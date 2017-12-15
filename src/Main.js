import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import BackgroundImage from './BackgroundImage'

const StyledSong = styled.article`
  position: relative;
  min-height: 100%;
  padding: 40px 15px;
  color: ${({ theme }) => theme.text};
  h1 {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 30px;
    max-width: 400px;
    font-family: 'Alegreya Sans', sans-serif;
    font-size: 30px;
    font-weight: normal;
    line-height: 1.2;
    position: relative;
    &:after {
      content: '';
      display: block;
      height: 15px;
      position: absolute;
      bottom: 0px;
      left: 5px;
      right: 5px;
      background-color: ${({ theme }) => theme.accent};
      opacity: 0.1;
    }
  }
  pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: 'Alegreya Sans', sans-serif;
    font-size: 18px;
    line-height: 1.4;
    em {
      font-style: italic;
    }
    small {
      opacity: 0.7;
    }
  }
`
const Song = ({ match: { params: { path } }, songList }) => {
  let currentSong
  for (const section of songList) {
    for (const song of section.songs) {
      if (song.path === path) {
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
      <pre dangerouslySetInnerHTML={{ __html: currentSong.content }} />
    </StyledSong>
  )
}
Song.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  songList: PropTypes.array.isRequired,
}

const StyledMain = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  margin-top: -70px;
  padding-top: 70px;
  background-color: ${({ theme }) => theme.background};
  .background-image {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    /* color: #fadca8; */
    color: ${({ theme }) => theme.accent};
  }
`
const Main = ({ songList }) => (
  <StyledMain>
    <Route exact path='/' component={BackgroundImage} />
    <Route
      path='/:path'
      render={props => <Song songList={songList} {...props} />}
    />
  </StyledMain>
)
Main.propTypes = {
  songList: PropTypes.array.isRequired,
}

export default Main
