import React, { Component } from 'react'
import styled from 'styled-components'
import { SongType, SongListType } from '../types'

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

type SongProps = {
  match: {
    params: {
      path: string
    }
  }
  songList: SongListType
  serifFont: boolean
  fontSizeAdd: number
}
type SongState = {
  currentSong: SongType | null
}
class Song extends Component<SongProps, SongState> {
  state: SongState = {
    currentSong: null,
  }
  static getDerivedStateFromProps (nextProps: SongProps, prevState: SongState) {
    const {
      songList,
      match: {
        params: { path },
      },
    } = nextProps
    if (!songList) return null
    const currentSong = songList.find(song => song.path === path)
    if (
      (currentSong && currentSong.path) !==
      (prevState.currentSong && prevState.currentSong.path)
    ) {
      return {
        currentSong,
      }
    }
    return null
  }
  componentDidMount () {
    const {
      match: {
        params: { path },
      },
    } = this.props
    const { currentSong } = this.state
    if (!currentSong) {
      fetch(`/json/${path}.json`)
        .then(response => response.json())
        .then(song => this.setState({ currentSong: song }))
    }
    if ('getWakeLock' in navigator) {
      // @ts-ignore
      navigator.getWakeLock('screen').then(wakeLock => {
        wakeLock.createRequest()
      })
    }
  }
  render () {
    const { serifFont, fontSizeAdd } = this.props
    const { currentSong } = this.state
    if (!currentSong) return null
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
        <div className="end" />
      </StyledSong>
    )
  }
}

export default Song
