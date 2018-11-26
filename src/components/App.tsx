import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { get, set, keys } from 'idb-keyval'
import styled, { ThemeProvider } from 'styled-components'
import WakeLock from './WakeLock/'
// import WakeLock from 'react-wakelock'
// @ts-ignore
import Drawer from 'react-motion-drawer'
import RouteChangeWatcher from './RouteChangeWatcher'
import Navbar from './Navbar'
import DrawerLeft from './DrawerLeft'
import Options from './Options'
import FontSettings from './FontSettings'
import ThemePicker from './ThemePicker'
import DrawerRight from './DrawerRight'
import Main from './Main'
import themes from '../themes'
import songsVersion from '../songsVersion.json'
import { SongListType, SongFolderType, SongFoldersType } from '../types'

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`

type AppState = {
  songs: SongFoldersType
  songsSorted: SongFoldersType
  songsArray: SongListType
  leftDrawerOpen: boolean
  rightDrawerOpen: boolean
  currentBook: string
  themesPanelOpen: boolean
  fontPanelOpen: boolean
  currentTheme: number
  serifFont: boolean
  fontSizeAdd: number
  sortAZ: boolean
}
class App extends Component<{}, AppState> {
  state: AppState = {
    songs: [],
    songsSorted: [],
    songsArray: [],
    leftDrawerOpen: false,
    rightDrawerOpen: false,
    currentBook: null,
    themesPanelOpen: false,
    fontPanelOpen: false,
    currentTheme: +localStorage.getItem('theme') || 0,
    serifFont: !!localStorage.getItem('serifFont'),
    fontSizeAdd: +localStorage.getItem('fontSizeAdd') || 0,
    sortAZ: !!localStorage.getItem('sortAZ') || false,
  }
  toggleBodyOverflow (bool: boolean) {
    document.body.style.overflowY = bool ? 'hidden' : ''
  }
  toggleDrawerLeft = (open: boolean) => {
    this.setState({ leftDrawerOpen: open })
    this.toggleBodyOverflow(open)
  }
  toggleDrawerRight = (open: boolean) => {
    this.setState({ rightDrawerOpen: open })
    this.toggleBodyOverflow(open)
  }
  closeBackdrop = (ev: any) => {
    if (ev.target.hasAttribute('data-backdrop')) {
      this.toggleThemesPanel(false)
      this.toggleFontPanel(false)
    }
  }
  setCurrentBook = (book: string) => {
    this.setState({ currentBook: book })
  }
  toggleThemesPanel = (open: boolean) => {
    this.setState({ themesPanelOpen: open })
  }
  toggleFontPanel = (open: boolean) => {
    this.setState({ fontPanelOpen: open })
  }
  componentDidMount () {
    document
      .querySelector('meta[name=theme-color]')
      .setAttribute('content', themes[this.state.currentTheme].navbar)
    const KEY_SONGS = 'songs'
    const KEY_SONGS_SORTED = 'songsSorted'
    const KEY_SONGS_ARRAY = 'songsArray'
    const fetchJson = () =>
      fetch('/songs.json')
        .then(response => response.json())
        .then(songs => {
          const songsSorted = songs.map(({ title, songs }: SongFolderType) => ({
            title,
            songs: songs
              .slice()
              .sort((a, b) =>
                a.title
                  .toLowerCase()
                  .localeCompare(b.title.toLowerCase(), 'ro'),
              ),
          }))
          const songsArray = songs
            .map((item: SongFolderType) => item.songs)
            .reduce((a: SongListType, b: SongListType) => [...a, ...b], [])
          this.setState({ songs, songsSorted, songsArray })
          Promise.all([
            set(KEY_SONGS, songs),
            set(KEY_SONGS_SORTED, songsSorted),
            set(KEY_SONGS_ARRAY, songsArray),
          ]).then(() =>
            localStorage.setItem('songsVersion', songsVersion.toString()),
          )
        })
    const idbKeyvalGet = (data: string) =>
      // @ts-ignore
      get(data).then(songs => this.setState({ [data]: songs }))
    keys().then(keys => {
      if (
        +localStorage.getItem('songsVersion') !== songsVersion &&
        navigator.onLine
      ) {
        fetchJson()
      } else if (
        // @ts-ignore
        keys.includes(KEY_SONGS) &&
        // @ts-ignore
        keys.includes(KEY_SONGS_SORTED) &&
        // @ts-ignore
        keys.includes(KEY_SONGS_ARRAY)
      ) {
        idbKeyvalGet(KEY_SONGS)
        idbKeyvalGet(KEY_SONGS_SORTED)
        idbKeyvalGet(KEY_SONGS_ARRAY)
      } else fetchJson()
    })
  }
  render () {
    const {
      songs,
      songsSorted,
      songsArray,
      leftDrawerOpen,
      rightDrawerOpen,
      currentBook,
      themesPanelOpen,
      fontPanelOpen,
      currentTheme,
      serifFont,
      fontSizeAdd,
      sortAZ,
    } = this.state
    const currentThemeObj = themes[currentTheme]
    const overlayColor = `rgba(${currentThemeObj.backdrop}, 0.6)`
    const drawerStyle = {
      touchAction: 'pan-y',
      background: currentThemeObj.background,
      boxShadow:
        'rgba(0, 0, 0, 0.18) 0px 10px 20px, rgba(0, 0, 0, 0.2) 0px 6px 6px',
    }
    return (
      <Router>
        <RouteChangeWatcher>
          <ThemeProvider theme={currentThemeObj}>
            <div>
              <WakeLock />
              <Navbar
                onClickLeft={() =>
                  this.setState({
                    leftDrawerOpen: !leftDrawerOpen,
                    rightDrawerOpen: false,
                  })
                }
                onClickRight={() =>
                  this.setState({
                    rightDrawerOpen: !rightDrawerOpen,
                    leftDrawerOpen: false,
                  })
                }
              />
              <Drawer
                overlayColor={overlayColor}
                drawerStyle={{ ...drawerStyle, paddingBottom: '100px' }}
                width={300}
                panTolerance={30}
                handleWidth={rightDrawerOpen ? 0 : window.innerWidth / 5}
                zIndex={leftDrawerOpen ? 7 : 2}
                fadeOut
                open={leftDrawerOpen}
                onChange={this.toggleDrawerLeft}
              >
                {!themesPanelOpen && !fontPanelOpen && (
                  <DrawerLeft
                    songList={sortAZ ? songsSorted : songs}
                    closeDrawer={() => this.setState({ leftDrawerOpen: false })}
                    currentBook={currentBook}
                    setCurrentBook={this.setCurrentBook}
                  />
                )}
                <Options
                  sortAZ={sortAZ}
                  sort={() => {
                    this.setCurrentBook(null)
                    this.setState(({ sortAZ }: AppState) => {
                      const nextState = !sortAZ
                      if (nextState) localStorage.setItem('sortAZ', 'true')
                      else localStorage.removeItem('sortAZ')
                      return { sortAZ: nextState }
                    })
                  }}
                  openThemes={() => {
                    this.toggleDrawerLeft(false)
                    this.toggleThemesPanel(true)
                  }}
                  openText={() => {
                    this.toggleDrawerLeft(false)
                    this.toggleFontPanel(true)
                  }}
                />
              </Drawer>
              <Drawer
                right
                overlayColor={overlayColor}
                drawerStyle={drawerStyle}
                width={300}
                panTolerance={30}
                handleWidth={leftDrawerOpen ? 0 : window.innerWidth / 5}
                zIndex={rightDrawerOpen ? 7 : 2}
                fadeOut
                open={rightDrawerOpen}
                onChange={this.toggleDrawerRight}
              >
                {songsArray.length && (
                  <DrawerRight
                    songList={songsArray}
                    closeDrawer={() =>
                      this.setState({ rightDrawerOpen: false })
                    }
                    searchFocused={rightDrawerOpen}
                  />
                )}
              </Drawer>
              <Main
                songList={songsArray}
                serifFont={serifFont}
                fontSizeAdd={fontSizeAdd}
              />
              {themesPanelOpen && (
                <Backdrop data-backdrop onClick={this.closeBackdrop}>
                  <ThemePicker
                    currentTheme={currentTheme}
                    setCurrentTheme={index =>
                      this.setState({ currentTheme: index })
                    }
                  />
                </Backdrop>
              )}
              {fontPanelOpen && (
                <Backdrop data-backdrop onClick={this.closeBackdrop}>
                  <FontSettings
                    serifFont={serifFont}
                    currentThemeObj={currentThemeObj}
                    setZoomOut={() => {
                      this.setState(({ fontSizeAdd }: AppState) => {
                        const newSize = fontSizeAdd - 2
                        localStorage.setItem('fontSizeAdd', newSize.toString())
                        return { fontSizeAdd: newSize }
                      })
                    }}
                    setFontSans={() => {
                      this.setState({ serifFont: false })
                      localStorage.removeItem('serifFont')
                    }}
                    setFontSerif={() => {
                      this.setState({ serifFont: true })
                      localStorage.setItem('serifFont', 'true')
                    }}
                    setZoomIn={() => {
                      this.setState(({ fontSizeAdd }: AppState) => {
                        const newSize = fontSizeAdd + 2
                        localStorage.setItem('fontSizeAdd', newSize.toString())
                        return { fontSizeAdd: newSize }
                      })
                    }}
                  />
                </Backdrop>
              )}
            </div>
          </ThemeProvider>
        </RouteChangeWatcher>
      </Router>
    )
  }
}

export default App
