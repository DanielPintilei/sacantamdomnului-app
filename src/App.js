import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import Drawer from 'react-motion-drawer'
import Navbar from './Navbar'
import DrawerLeft from './DrawerLeft'
import DrawerRight from './DrawerRight'
import Main from './Main'
import { generateUrl } from './helpers'
import {
  IconDroplet,
  IconType,
  IconCheck,
  IconZoomOut,
  IconZoomIn,
} from './icons'
import themes from './themes'
import songs from './cantari.json'

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
    openLeft: false,
    openRight: false,
    openThemes: false,
    openFont: false,
    currentTheme: themes[0],
    serif: localStorage.getItem('serif'),
  }
  toggleBodyOverflow (bool) {
    document.body.style.overflowY = bool ? 'hidden' : ''
  }
  toggleDrawerLeft = open => {
    this.setState({ openLeft: open })
    this.toggleBodyOverflow(open)
  }
  toggleDrawerRight = open => {
    this.setState({ openRight: open })
    this.toggleBodyOverflow(open)
  }
  closeBackdrop = ev => {
    if (ev.target.hasAttribute('data-backdrop')) {
      this.toggleThemesPanel(false)
      this.toggleFontPanel(false)
    }
  }
  toggleThemesPanel = open => {
    this.setState({ openThemes: open })
  }
  toggleFontPanel = open => {
    this.setState({ openFont: open })
  }
  render () {
    const {
      openLeft,
      openRight,
      openThemes,
      openFont,
      currentTheme,
    } = this.state
    const overlayColor = `rgba(${currentTheme.backdrop}, 0.6)`
    const drawerStyle = {
      background: currentTheme.background,
      boxShadow:
        'rgba(0, 0, 0, 0.18) 0px 10px 20px, rgba(0, 0, 0, 0.2) 0px 6px 6px',
    }
    const getSongList = () => {
      const { saCantamDomnului, alteCantari, colinde } = songs
      const formatSection = section =>
        section.filter(x => x).map(item => ({
          ...item,
          url: generateUrl(item.number, item.title),
        }))
      const list = [
        {
          title: 'Să cântăm Domnului',
          songs: formatSection(saCantamDomnului),
        },
        {
          title: 'Alte Cântări',
          songs: formatSection(alteCantari),
        },
        {
          title: 'Colinde',
          songs: formatSection(colinde),
        },
      ]
      return list
    }
    const songList = getSongList()
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
      background-color: ${props => props.theme.options};
      box-shadow: rgba(0, 0, 0, 0.15) -1px -1px 3px;
      button {
        color: ${props => props.theme.accent};
      }
    `
    const OptionsPanel = styled.div`
      position: fixed;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-wrap: wrap;
      padding: 15px;
      background-color: #fff;
      box-shadow: 4px 2px 6px 0px hsla(0, 0%, 0%, 0.1);
      border-radius: 4px;
    `
    const ThemePicker = OptionsPanel.extend`
      width: 400px;
    `
    const FontSettings = OptionsPanel.extend`
      width: 300px;
      justify-content: space-between;
    `
    return (
      <Router>
        <ScrollToTop>
          <ThemeProvider theme={currentTheme}>
            <div>
              <Navbar
                onClickLeft={() =>
                  this.setState({ openLeft: !openLeft, openRight: false })
                }
                onClickRight={() =>
                  this.setState({ openRight: !openRight, openLeft: false })
                }
              />
              <Drawer
                overlayColor={overlayColor}
                drawerStyle={{ ...drawerStyle, paddingBottom: '100px' }}
                width={300}
                fadeOut
                open={openLeft}
                onChange={this.toggleDrawerLeft}
              >
                <DrawerLeft
                  songList={songList}
                  closeDrawer={() => this.setState({ openLeft: false })}
                />
                <Options>
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
                open={openRight}
                onChange={this.toggleDrawerRight}
              >
                <DrawerRight
                  songList={songList
                    .map(item => item.songs)
                    .reduce((a, b) => [...a, ...b], [])}
                  closeDrawer={() => this.setState({ openRight: false })}
                  searchFocused={openRight}
                />
              </Drawer>
              <Main songList={songList} />
              {openThemes && (
                <Backdrop data-backdrop onClick={this.closeBackdrop}>
                  <ThemePicker>
                    <div
                      className='swatch'
                      onClick={() => this.setState({ currentTheme: themes[1] })}
                    >
                      <IconCheck />
                    </div>
                  </ThemePicker>
                </Backdrop>
              )}
              {openFont && (
                <Backdrop data-backdrop onClick={this.closeBackdrop}>
                  <FontSettings>
                    <button>
                      <IconZoomOut />
                    </button>
                    <button>
                      <IconType />
                    </button>
                    <button
                      onClick={ev => {
                        ev.preventDefault()
                        ev.stopPropagation()
                        ev.nativeEvent.stopImmediatePropagation()
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
