import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import Drawer from 'react-motion-drawer'
import Navbar from './Navbar'
import DrawerLeft from './DrawerLeft'
import DrawerRight from './DrawerRight'
import Main from './Main'
import {
  IconDroplet,
  IconTypeSans,
  IconType,
  IconCheck,
  IconZoomOut,
  IconZoomIn,
  IconInfo,
} from './icons'
import themes from './themes'
import songs from './songs.json'

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
    leftDrawerOpen: false,
    rightDrawerOpen: false,
    themesPanelOpen: false,
    fontPanelOpen: false,
    currentTheme: +localStorage.getItem('theme') || 0,
    sansFont: !!localStorage.getItem('sansFont'),
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
  toggleThemesPanel = open => {
    this.setState({ themesPanelOpen: open })
  }
  toggleFontPanel = open => {
    this.setState({ fontPanelOpen: open })
  }
  render () {
    const {
      leftDrawerOpen,
      rightDrawerOpen,
      themesPanelOpen,
      fontPanelOpen,
      currentTheme,
      sansFont,
    } = this.state
    const currentThemeObj = themes[currentTheme]
    const overlayColor = `rgba(${currentThemeObj.backdrop}, 0.6)`
    const drawerStyle = {
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
    `
    const OptionsPanel = styled.div`
      position: fixed;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 15px;
      background-color: #fff;
      box-shadow: 4px 2px 6px 0px hsla(0, 0%, 0%, 0.1);
      border-radius: 4px;
    `
    const ThemePicker = OptionsPanel.extend`
      width: 340px;
      .swatch {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
      }
    `
    const FontSettings = OptionsPanel.extend`
      width: 300px;
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
                fadeOut
                open={leftDrawerOpen}
                onChange={this.toggleDrawerLeft}
              >
                <DrawerLeft
                  songList={songs}
                  closeDrawer={() => this.setState({ leftDrawerOpen: false })}
                />
                <Options>
                  <button
                    onClick={() => {
                      alert('Designed and developed by Daniel Pintilei')
                    }}
                  >
                    <IconInfo />
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
                width={300}
                overlayColor={overlayColor}
                drawerStyle={drawerStyle}
                open={rightDrawerOpen}
                onChange={this.toggleDrawerRight}
              >
                <DrawerRight
                  songList={songs
                    .map(item => item.songs)
                    .reduce((a, b) => [...a, ...b], [])}
                  closeDrawer={() => this.setState({ rightDrawerOpen: false })}
                  searchFocused={rightDrawerOpen}
                />
              </Drawer>
              <Main songList={songs} sansFont={sansFont} />
              {themesPanelOpen && (
                <Backdrop data-backdrop onClick={this.closeBackdrop}>
                  <ThemePicker>
                    {themes.map((theme, index) => (
                      <button
                        key={index}
                        className='swatch'
                        style={{ backgroundColor: theme.background }}
                        onClick={() => this.setState({ currentTheme: index })}
                      >
                        {currentTheme === index && (
                          <IconCheck stroke={theme.accent} />
                        )}
                      </button>
                    ))}
                  </ThemePicker>
                </Backdrop>
              )}
              {fontPanelOpen && (
                <Backdrop data-backdrop onClick={this.closeBackdrop}>
                  <FontSettings>
                    <button>
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
                    <button>
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
