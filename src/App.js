import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
// import styled from 'styled-components'
import Drawer from 'react-motion-drawer'
import Navbar from './Navbar'
import DrawerLeft from './DrawerLeft'
import DrawerRight from './DrawerRight'
import Main from './Main'
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
  render () {
    const getSongList = () => {
      const { saCantamDomnului, alteCantari, colinde } = songs
      const list = [
        {
          title: 'Să cântăm Domnului',
          songs: saCantamDomnului.filter(x => x),
        },
        {
          title: 'Alte Cântări',
          songs: alteCantari.filter(x => x),
        },
        {
          title: 'Colinde',
          songs: colinde.filter(x => x),
        },
      ]
      return list
    }
    const songList = getSongList()
    const drawerProps = {
      overlayColor: 'rgba(255,255,255,0.6)',
      drawerStyle: {
        background: '#fff',
        boxShadow:
          'rgba(0, 0, 0, 0.18) 0px 10px 20px, rgba(0, 0, 0, 0.2) 0px 6px 6px',
      },
    }
    const { openLeft, openRight } = this.state
    return (
      <Router>
        <ScrollToTop>
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
              />
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
          </div>
        </ScrollToTop>
      </Router>
    )
  }
}

export default App
