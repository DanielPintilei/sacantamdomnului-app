import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import idbKeyval from 'idb-keyval'
import styled, { ThemeProvider } from 'styled-components'
// import Drawer from 'react-motion-drawer'
import Drawer from './Drawer'
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
import themes from './themes'
import songsVersion from './songsVersion.json'

class ScrollToTopComponent extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
  }
  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) window.scrollTo(0, 0)
  }
  render () {
    return this.props.children
  }
}
const ScrollToTop = withRouter(ScrollToTopComponent)

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
    sansFont: !!localStorage.getItem('sansFont'),
    fontSizeAdd: +localStorage.getItem('fontSizeAdd') || 0,
    sortAZ: !!localStorage.getItem('sortAZ') || false,
  }
  toggleBodyOverflow (bool) {
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
  componentDidMount () {
    document
      .querySelector('meta[name=theme-color]')
      .setAttribute('content', themes[this.state.currentTheme].navbar)
    const idbKeyvalGet = data =>
      idbKeyval
        .get(data)
        .then(songs => this.setState({ [data]: songs }))
    idbKeyval.keys().then(keys => {
      if (
        +localStorage.getItem('songsVersion') === songsVersion &&
        keys.includes('songs')
      ) {
        idbKeyvalGet('songs')
        idbKeyvalGet('songsSorted')
        idbKeyvalGet('songsArray')
      } else {
        import('./songs.json').then(songs => {
          const songsSorted = songs.map(({ title, songs }) => ({
            title,
            songs: songs
              .slice()
              .sort((a, b) =>
                a.title.toLowerCase().localeCompare(b.title.toLowerCase(), 'ro')
              ),
          }))
          const songsArray = songs
            .map(item => item.songs)
            .reduce((a, b) => [...a, ...b], [])
          this.setState({ songs, songsSorted, songsArray })
          Promise.all([
            idbKeyval.set('songs', songs),
            idbKeyval.set('songsSorted', songsSorted),
            idbKeyval.set('songsArray', songsArray),
          ])
            .then(() => localStorage.setItem('songsVersion', songsVersion))
        })
      }
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
      sansFont,
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
      align-items: center;
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
        color: ${({ theme }) => theme.accent};
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
    return (
      <Router>
        <ScrollToTop>
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
                {!themesPanelOpen &&
                  !fontPanelOpen && (
                    <DrawerLeft
                      songList={sortAZ ? songsSorted : songs}
                      closeDrawer={() =>
                        this.setState({ leftDrawerOpen: false })
                      }
                      currentBook={currentBook}
                      setCurrentBook={this.setCurrentBook}
                    />
                  )}
                <Options sortAZ={sortAZ}>
                  <button
                    onClick={() => {
                      alert(
                        'Carte de cântări a Oastei Domnului \n\n Designed and developed by Daniel Pintilei'
                      )
                    }}
                  >
                    <IconInfo />
                  </button>
                  <button
                    className='sort'
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
                  </button>
                  <button
                    onClick={() => {
                      this.toggleDrawerLeft(false)
                      this.toggleThemesPanel(true)
                    }}
                  >
                    <IconDroplet />
                  </button>
                  <button
                    onClick={() => {
                      this.toggleDrawerLeft(false)
                      this.toggleFontPanel(true)
                    }}
                  >
                    <IconType />
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
                songList={songs}
                sansFont={sansFont}
                fontSizeAdd={fontSizeAdd}
              />
              {themesPanelOpen && (
                <Backdrop data-backdrop onClick={this.closeBackdrop}>
                  <ThemePicker>
                    {themes.map((theme, index) => (
                      <button
                        key={index}
                        className='swatch'
                        style={{ backgroundColor: theme.background }}
                        onClick={() => {
                          document
                            .querySelector('meta[name=theme-color]')
                            .setAttribute('content', theme.navbar)
                          this.setState({ currentTheme: index })
                          localStorage.setItem('theme', index)
                        }}
                      >
                        {currentTheme === index && (
                          <IconCheck stroke={theme.checkMark} />
                        )}
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
                      onClick={() => {
                        this.setState({ sansFont: true })
                        localStorage.setItem('sansFont', true)
                      }}
                    >
                      <IconTypeSans />
                    </button>
                    <button
                      onClick={() => {
                        this.setState({ sansFont: false })
                        localStorage.removeItem('sansFont')
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
