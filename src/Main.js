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
    margin-bottom: 25px;
    max-width: 400px;
    font-family: 'Lora';
    font-size: 22px;
    font-weight: normal;
    line-height: 1.2;
    position: relative;
    &:after {
      content: '';
      display: block;
      height: 10px;
      position: absolute;
      bottom: 0px;
      left: 5px;
      right: 5px;
      background-color: ${({ theme }) => theme.accent};
      opacity: 0.15;
    }
  }
  pre {
    margin: 0 0 15px;
    white-space: pre-wrap;
    font-family: 'Lora';
    font-size: 18px;
    line-height: 1.4;
    tab-size: 2;
    em {
      display: inline-block;
      width: 100%;
      position: sticky;
      top: 0.5em;
      z-index: 1;
      font-style: italic;
      background-color: ${({ theme }) => theme.background};
      &::before,
      &::after {
        display: block;
        content: '';
        position: absolute;
        width: 100%;
        height: 0.5em;
        background-color: ${({ theme }) => theme.background};
      }
      &::before {
        top: -0.5em;
        border-top: 1px solid ${({ theme }) => theme.border};
      }
      &::after {
        bottom: -0.5em;
        border-bottom: 1px solid ${({ theme }) => theme.border};
      }
    }
    small {
      opacity: 0.7;
    }
  }
  .end {
    width: 15px;
    height: 15px;
    margin-left: auto;
    margin-right: auto;
    background-color: ${({ theme }) => theme.accent};
    transform: rotate(45deg);
    opacity: 0.2;
  }
`
const Song = ({
  match: { params: { path } },
  songList,
  sansFont,
  fontSizeAdd,
}) => {
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
      <h1
        style={{
          fontFamily: sansFont ? 'Open Sans' : '',
          fontSize: 22 + fontSizeAdd,
        }}
      >
        {currentSong.number}. {currentSong.title}
      </h1>
      <pre
        style={{
          fontFamily: sansFont ? 'Open Sans' : '',
          fontSize: 18 + fontSizeAdd,
        }}
        dangerouslySetInnerHTML={{ __html: currentSong.content }}
      />
      <div className='end' />
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
  sansFont: PropTypes.bool,
  fontSizeAdd: PropTypes.number,
}

const StyledMain = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  margin-top: -70px;
  padding-top: 70px;
  background-color: ${({ theme }) => theme.background};
  .background-image {
    min-height: calc(100vh - 70px);
    color: ${({ theme }) => theme.accent};
  }
`
const Main = ({ songList, sansFont, fontSizeAdd }) => (
  <StyledMain>
    <Route exact path='/' component={BackgroundImage} />
    <Route
      path='/:path'
      render={props => (
        <Song
          songList={songList}
          sansFont={sansFont}
          fontSizeAdd={fontSizeAdd}
          {...props}
        />
      )}
    />
  </StyledMain>
)
Main.propTypes = {
  songList: PropTypes.array.isRequired,
  sansFont: PropTypes.bool,
  fontSizeAdd: PropTypes.number,
}

export default Main
