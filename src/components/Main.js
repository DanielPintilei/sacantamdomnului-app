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
    font-family: 'Open Sans';
    font-size: 22px;
    font-weight: 400;
    line-height: 1.2;
    position: relative;
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0.5em;
      bottom: 0;
      left: 5px;
      right: 5px;
      background-color: ${({ theme }) => theme.backgroundTitle};
    }
  }
  pre {
    margin: 0 0 40px;
    white-space: pre-wrap;
    font-family: 'Open Sans';
    font-size: 18px;
    line-height: 1.4;
    tab-size: 2;
    em {
      display: inline-block;
      width: 100%;
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
        border-top: 1px solid ${({ theme }) => theme.background};
      }
      &::after {
        bottom: -0.5em;
        border-bottom: 1px solid ${({ theme }) => theme.background};
      }
      &.sticky {
        position: sticky;
        top: 0.5em;
        margin-left: -4px;
        &::before,
        &::after {
          border-color: ${({ theme }) => theme.border};
        }
      }
    }
    small {
      opacity: 0.5;
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
  serifFont,
  fontSizeAdd,
}) => {
  const currentSong = songList.find(song => song.path === path)
  return (
    <StyledSong>
      <h1
        style={{
          fontFamily: serifFont ? 'Lora' : '',
          fontSize: 22 + fontSizeAdd,
        }}
      >
        {currentSong.number}. {currentSong.title}
      </h1>
      <pre
        style={{
          fontFamily: serifFont ? 'Lora' : '',
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
  serifFont: PropTypes.bool,
  fontSizeAdd: PropTypes.number,
}

const StyledMain = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  margin-top: -70px;
  padding-top: 70px;
  background-color: ${({ theme }) => theme.background};
  touch-action: pan-y;
  .background-image {
    display: flex;
    align-items: center;
  }
`
const Main = ({ songList, serifFont, fontSizeAdd }) => (
  <StyledMain>
    <Route exact path='/' component={BackgroundImage} />
    {songList.length ? (
      <Route
        path='/:path'
        render={props => (
          <Song
            songList={songList}
            serifFont={serifFont}
            fontSizeAdd={fontSizeAdd}
            {...props}
          />
        )}
      />
    ) : null}
  </StyledMain>
)
Main.propTypes = {
  songList: PropTypes.array.isRequired,
  serifFont: PropTypes.bool,
  fontSizeAdd: PropTypes.number,
}

export default Main
