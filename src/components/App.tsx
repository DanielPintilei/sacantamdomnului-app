import React, { Suspense, Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { getMany, setMany, keys } from 'idb-keyval'
import styled, { ThemeProvider } from 'styled-components'
import RouteChangeWatcher from './RouteChangeWatcher'
import Navbar from './Navbar'
import Main from './Main'
import themes from '../themes'
import songsVersion from '../songsVersion.json'
import { SongListType, SongFolderType, SongFoldersType } from '../types'

const Drawer = React.lazy(() => import('react-motion-drawer'))
const DrawerLeft = React.lazy(() => import('./DrawerLeft'))
const DrawerRight = React.lazy(() => import('./DrawerRight'))
const Options = React.lazy(() => import('./Options'))
const FontSettings = React.lazy(() => import('./FontSettings'))
const ThemePicker = React.lazy(() => import('./ThemePicker'))

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
  backgroundImageHeight: number
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
    backgroundImageHeight: window.innerHeight - 70,
  }
  toggleBodyOverflow(bool: boolean) {
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
  componentDidMount() {
    document
      .querySelector('meta[name=theme-color]')
      .setAttribute('content', themes[this.state.currentTheme].navbar)
    const KEY_SONGS = 'songs'
    const KEY_SONGS_SORTED = 'songsSorted'
    const KEY_SONGS_ARRAY = 'songsArray'
    const fetchJson = () =>
      fetch('/songs.json')
        .then((response) => response.json())
        .then((songs) => {
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
          setMany([
            [KEY_SONGS, songs],
            [KEY_SONGS_SORTED, songsSorted],
            [KEY_SONGS_ARRAY, songsArray],
          ]).then(() =>
            localStorage.setItem('songsVersion', songsVersion.toString()),
          )
        })
    keys().then((keys) => {
      if (
        +localStorage.getItem('songsVersion') !== songsVersion &&
        navigator.onLine
      ) {
        fetchJson()
      } else if (
        keys.includes(KEY_SONGS) &&
        keys.includes(KEY_SONGS_SORTED) &&
        keys.includes(KEY_SONGS_ARRAY)
      ) {
        getMany([KEY_SONGS, KEY_SONGS_SORTED, KEY_SONGS_ARRAY]).then(
          ([songs, songsSorted, songsArray]) => {
            this.setState({ songs, songsSorted, songsArray })
          },
        )
      } else fetchJson()
    })
  }
  render() {
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
      backgroundImageHeight,
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
              <Suspense fallback="">
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
                      closeDrawer={() =>
                        this.setState({ leftDrawerOpen: false })
                      }
                      currentBook={currentBook}
                      setCurrentBook={this.setCurrentBook}
                    />
                  )}
                  <Options
                    sortAZ={sortAZ}
                    sort={() => {
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
                  {!!songsArray.length && (
                    <DrawerRight
                      songList={songsArray}
                      closeDrawer={() =>
                        this.setState({ rightDrawerOpen: false })
                      }
                      searchFocused={rightDrawerOpen}
                    />
                  )}
                </Drawer>
              </Suspense>
              <Main
                songList={songsArray}
                serifFont={serifFont}
                fontSizeAdd={fontSizeAdd}
                backgroundImageHeight={backgroundImageHeight}
              />
              <Suspense fallback="">
                {themesPanelOpen && (
                  <Backdrop data-backdrop onClick={this.closeBackdrop}>
                    <ThemePicker
                      currentTheme={currentTheme}
                      setCurrentTheme={(index) =>
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
                          localStorage.setItem(
                            'fontSizeAdd',
                            newSize.toString(),
                          )
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
                          localStorage.setItem(
                            'fontSizeAdd',
                            newSize.toString(),
                          )
                          return { fontSizeAdd: newSize }
                        })
                      }}
                    />
                  </Backdrop>
                )}
              </Suspense>
            </div>
          </ThemeProvider>
        </RouteChangeWatcher>
      </Router>
    )
  }
}

export default App
