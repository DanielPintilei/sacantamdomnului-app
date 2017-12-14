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
import { IconDroplet, IconType, IconCheck } from './icons'
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
    openType: false,
    currentTheme: themes[0],
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
  toggleThemes = open => {
    this.setState({ openThemes: open })
  }
  toggleType = open => {
    this.setState({ openType: open })
  }
  render () {
    const { openLeft, openRight, currentTheme } = this.state
    const drawerProps = {
      overlayColor: `rgba(${currentTheme.backdrop}, 0.6)`,
      drawerStyle: {
        paddingBottom: '100px',
        background: currentTheme.background,
        boxShadow:
          'rgba(0, 0, 0, 0.18) 0px 10px 20px, rgba(0, 0, 0, 0.2) 0px 6px 6px',
      },
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
    const ThemePicker = styled.div`
      position: fixed;
      bottom: 40px;
      left: 40px;
      right: 40px;
      display: flex;
      flex-wrap: wrap;
      padding: 5px;
      background-color: #fff;
      box-shadow: 4px 2px 6px 0px hsla(0, 0%, 0%, 0.1);
      border-radius: 4px;
    `
    return (
      <Router>
        <ScrollToTop>
          <ThemeProvider theme={currentTheme}>
            <div
              style={{
                width: '100%',
                height: '100vh',
              }}
            >
              <Navbar
                onClickLeft={() =>
                  this.setState({ openLeft: !openLeft, openRight: false })
                }
                onClickRight={() =>
                  this.setState({ openRight: !openRight, openLeft: false })
                }
              />
              <Drawer
                {...drawerProps}
                width={300}
                fadeOut
                open={openLeft}
                onChange={this.toggleDrawerLeft}
              >
                <DrawerLeft
                  songList={songList}
                  closeDrawer={() => this.setState({ openLeft: false })}
                  openThemes={() => {
                    this.toggleDrawerLeft(false)
                    this.toggleThemes(true)
                  }}
                  openType={() => {
                    this.toggleDrawerLeft(false)
                    this.toggleType(true)
                  }}
                />
                <Options>
                  <button
                    onClick={() => {
                      this.toggleDrawerLeft(false)
                      this.toggleThemes(true)
                    }}
                  >
                    <IconDroplet />
                  </button>
                  <button
                    onClick={() => {
                      this.toggleDrawerLeft(false)
                      this.toggleType(true)
                    }}
                  >
                    <IconType />
                  </button>
                </Options>
              </Drawer>
              <Drawer
                right
                width={300}
                {...drawerProps}
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
              <ThemePicker>
                <div
                  className='swatch'
                  onClick={() => this.setState({ currentTheme: themes[1] })}
                >
                  <IconCheck />
                </div>
              </ThemePicker>
            </div>
          </ThemeProvider>
        </ScrollToTop>
      </Router>
    )
  }
}

export default App
