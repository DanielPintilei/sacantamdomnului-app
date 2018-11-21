import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { get, set, keys } from 'idb-keyval'
import styled, { ThemeProvider } from 'styled-components'
import Drawer from 'react-motion-drawer'
// import WakeLock from 'react-wakelock'
import WakeLock from './WakeLock/'
import GlobalStyle from './GlobalStyle'
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

class ScrollToTopComponent extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) window.scrollTo(0, 0)
  }
  render() {
    return this.props.children
  }
}
const ScrollToTop = withRouter(ScrollToTopComponent)

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`
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
    color: ${({ theme, sortAZ }) => (sortAZ ? theme.active : theme.accent)};
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
const ThemePicker = OptionsPanel.extend`
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
const FontSettings = OptionsPanel.extend`
  justify-content: space-between;
  width: 300px;
  padding: 15px;
`

class App extends Component {
  state = {
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
  toggleBodyOverflow(bool) {
    document.body.style.overflowY = bool ? 'hidden' : ''
  }
  toggleDrawerLeft = open => {
    this.setState({ leftDrawerOpen: open })
    this.toggleBodyOverflow(open)
  }
  toggleDrawerRight = open => {
    this.setState({ rightDrawerOpen: open })
    this.toggleBodyOverflow(open)
  }
  closeBackdrop = ev => {
    if (ev.target.hasAttribute('data-backdrop')) {
      this.toggleThemesPanel(false)
      this.toggleFontPanel(false)
    }
  }
  setCurrentBook = book => {
    this.setState({ currentBook: book })
  }
  toggleThemesPanel = open => {
    this.setState({ themesPanelOpen: open })
  }
  toggleFontPanel = open => {
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
        .then(response => response.json())
        .then(songs => {
          const songsSorted = songs.map(({ title, songs }) => ({
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
            .map(item => item.songs)
            .reduce((a, b) => [...a, ...b], [])
          this.setState({ songs, songsSorted, songsArray })
          Promise.all([
            set(KEY_SONGS, songs),
            set(KEY_SONGS_SORTED, songsSorted),
            set(KEY_SONGS_ARRAY, songsArray),
          ]).then(() => localStorage.setItem('songsVersion', songsVersion))
        })
    const idbKeyvalGet = data =>
      get(data).then(songs => this.setState({ [data]: songs }))
    keys().then(keys => {
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
        idbKeyvalGet(KEY_SONGS)
        idbKeyvalGet(KEY_SONGS_SORTED)
        idbKeyvalGet(KEY_SONGS_ARRAY)
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
        <ScrollToTop>
          <ThemeProvider theme={currentThemeObj}>
            <div>
              <GlobalStyle />
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
                        if (nextState) localStorage.setItem('sortAZ', true)
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
                          localStorage.setItem('theme', index)
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
                          localStorage.setItem('fontSizeAdd', newSize)
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
                        localStorage.setItem('serifFont', true)
                      }}
                    >
                      <IconType />
                    </button>
                    <button
                      onClick={() => {
                        this.setState(({ fontSizeAdd }) => {
                          const newSize = fontSizeAdd + 2
                          localStorage.setItem('fontSizeAdd', newSize)
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
        </ScrollToTop>
      </Router>
    )
  }
}

export default App
