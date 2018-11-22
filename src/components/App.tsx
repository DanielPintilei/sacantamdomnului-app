import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { get, set, keys } from 'idb-keyval'
import styled, { ThemeProvider } from 'styled-components'
// @ts-ignore
import Drawer from 'react-motion-drawer'
// import WakeLock from 'react-wakelock'
import WakeLock from './WakeLock/'
import {
  ThemeType,
  SongListType,
  SongFolderType,
  SongFoldersType,
} from '../types'
import Navbar from './Navbar'
import DrawerLeft from './DrawerLeft'
import DrawerRight from './DrawerRight'
import Main from './Main'
import {
  IconInfo,
  IconSort,
  IconDroplet,
  IconTypeSans,
  IconType,
  IconCheck,
  IconZoomOut,
  IconZoomIn,
} from './icons'
import themes from '../themes'
import songsVersion from '../songsVersion.json'

type RouteChangeProps = RouteComponentProps & {
  callback: () => void
  location: {}
  children: {}
}
class RouteChange extends Component<RouteChangeProps> {
  componentDidUpdate (prevProps: RouteChangeProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
      if (this.props.history.action === 'POP') this.props.callback()
    }
  }
  render () {
    return this.props.children
  }
}
const RouteChangeWatcher = withRouter(RouteChange)

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`
type OptionProps = { theme: ThemeType; sortAZ: boolean }
const Options = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 300px;
  padding: 15px;
  background-color: ${({ theme }) => theme.options};
  box-shadow: rgba(0, 0, 0, 0.15) -1px -1px 3px;
  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.accent};
    svg {
      margin-bottom: 5px;
    }
  }
  .sort {
    color: ${({ theme, sortAZ }: OptionProps) =>
      sortAZ ? theme.active : theme.accent};
  }
`
const OptionsPanel = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  max-width: calc(100vw - 30px);
  background-color: #fff;
  box-shadow: 4px 2px 6px 0px hsla(0, 0%, 0%, 0.1);
  border-radius: 4px;
`
const ThemePicker = styled(OptionsPanel)`
  width: 310px;
  padding: 5px;
  .swatch {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin: 5px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`
const FontSettings = styled(OptionsPanel)`
  justify-content: space-between;
  width: 300px;
  padding: 15px;
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
class App extends Component<RouteComponentProps, AppState> {
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
  pushToHistory = (open: boolean) => {
    const { history, location } = this.props
    if (open) history.push(location.pathname)
  }
  popHistory = () => {
    const { history } = this.props
    history.goBack()
  }
  toggleBodyOverflow (bool: boolean) {
    document.body.style.overflowY = bool ? 'hidden' : ''
  }
  toggleDrawerLeft = (open: boolean) => {
    this.setState({ leftDrawerOpen: open })
    this.toggleBodyOverflow(open)
    this.pushToHistory(open)
  }
  toggleDrawerRight = (open: boolean) => {
    this.setState({ rightDrawerOpen: open })
    this.toggleBodyOverflow(open)
    this.pushToHistory(open)
  }
  closeBackdrop = (ev: any) => {
    if (ev.target.hasAttribute('data-backdrop')) {
      this.toggleThemesPanel(false)
      this.toggleFontPanel(false)
      this.popHistory()
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
      <RouteChangeWatcher
        callback={() => {
          this.toggleDrawerLeft(false)
          this.toggleDrawerRight(false)
          this.toggleThemesPanel(false)
          this.toggleFontPanel(false)
        }}
      >
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
              <Options sortAZ={sortAZ}>
                <button
                  onClick={() => {
                    alert(
                      'Carte de cântări a Oastei Domnului\n\nDesigned and developed by Daniel Pintilei',
                    )
                  }}
                >
                  <IconInfo />
                  Info
                </button>
                <button
                  className="sort"
                  onClick={() => {
                    this.setCurrentBook(null)
                    this.setState(({ sortAZ }) => {
                      const nextState = !sortAZ
                      if (nextState) localStorage.setItem('sortAZ', 'true')
                      else localStorage.removeItem('sortAZ')
                      return { sortAZ: nextState }
                    })
                  }}
                >
                  <IconSort />
                  Sortare
                </button>
                <button
                  onClick={() => {
                    this.toggleDrawerLeft(false)
                    this.toggleThemesPanel(true)
                  }}
                >
                  <IconDroplet />
                  Teme
                </button>
                <button
                  onClick={() => {
                    this.toggleDrawerLeft(false)
                    this.toggleFontPanel(true)
                  }}
                >
                  <IconType />
                  Text
                </button>
              </Options>
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
                  closeDrawer={() => this.setState({ rightDrawerOpen: false })}
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
                <ThemePicker>
                  {themes.map((theme, index) => (
                    <button
                      key={index}
                      className="swatch"
                      style={{
                        color: theme.checkMark,
                        backgroundColor: theme.background,
                      }}
                      onClick={() => {
                        document
                          .querySelector('meta[name=theme-color]')
                          .setAttribute('content', theme.navbar)
                        this.setState({ currentTheme: index })
                        localStorage.setItem('theme', index.toString())
                      }}
                    >
                      {currentTheme === index && <IconCheck />}
                    </button>
                  ))}
                </ThemePicker>
              </Backdrop>
            )}
            {fontPanelOpen && (
              <Backdrop data-backdrop onClick={this.closeBackdrop}>
                <FontSettings>
                  <button
                    onClick={() => {
                      this.setState(({ fontSizeAdd }) => {
                        const newSize = fontSizeAdd - 2
                        localStorage.setItem('fontSizeAdd', newSize.toString())
                        return { fontSizeAdd: newSize }
                      })
                    }}
                  >
                    <IconZoomOut />
                  </button>
                  <button
                    style={{
                      color: !serifFont ? currentThemeObj.accent : '',
                    }}
                    onClick={() => {
                      this.setState({ serifFont: false })
                      localStorage.removeItem('serifFont')
                    }}
                  >
                    <IconTypeSans />
                  </button>
                  <button
                    style={{ color: serifFont ? currentThemeObj.accent : '' }}
                    onClick={() => {
                      this.setState({ serifFont: true })
                      localStorage.setItem('serifFont', 'true')
                    }}
                  >
                    <IconType />
                  </button>
                  <button
                    onClick={() => {
                      this.setState(({ fontSizeAdd }) => {
                        const newSize = fontSizeAdd + 2
                        localStorage.setItem('fontSizeAdd', newSize.toString())
                        return { fontSizeAdd: newSize }
                      })
                    }}
                  >
                    <IconZoomIn />
                  </button>
                </FontSettings>
              </Backdrop>
            )}
          </div>
        </ThemeProvider>
      </RouteChangeWatcher>
    )
  }
}

export default withRouter(App)
