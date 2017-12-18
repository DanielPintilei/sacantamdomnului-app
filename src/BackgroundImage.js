import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'

class BackgroundImage extends Component {
  state = {
    height: window.innerHeight - 70,
  }
  static propTypes = {
    theme: PropTypes.shape({
      accent: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    }),
  }
  render () {
    const { accent, logo } = this.props.theme
    return (
      <div style={{ height: this.state.height }} className='background-image'>
        <svg viewBox='0 0 79.4 67.9' width='300'>
          <defs>
            <linearGradient id='gradient'>
              <stop offset='0%' stopColor={accent} />
              <stop offset='100%' stopColor={logo} />
            </linearGradient>
          </defs>
          <path
            fill='url(#gradient)'
            d='M 32,-0.2 C 32.1,0.1 31.9,0 31.6,0 H 31.3 C 31.2,0 31.1,0.1 31,0.1 30.7,0.2 30.5,0.4 30.2,0.6 29.8,1 29.3,1.4 28.9,1.9 28.3,2.6 27.7,3.4 27.1,4.4 26.8,4.8 26.5,5.2 26.4,5.7 26.2,6 25.9,6.5 25.7,6.9 25.4,7.7 25.1,7.7 24.9,8.5 24.3,9.6 24.3,9.8 24,11 c -0.1,0.7 -0.3,1.4 -0.4,2.1 -0.1,1 -0.3,1.9 -0.3,2.8 0,0.2 0.2,0.4 0.2,0.6 0.1,0.9 0.7,1.3 1,2 0.2,0.3 0.8,0.5 1,0.6 0.2,0.1 0.4,0.1 0.6,0.1 0.8,0 2,0.3 2.8,-0.4 0.1,-0.2 1.7,-1.6 1.8,-1.8 0.7,-0.6 0.9,-1.1 1.3,-1.8 0.1,-0.1 0.2,-0.2 0.2,-0.3 0.1,-0.2 0.2,-0.3 0.2,-0.3 0.1,0 0.2,-0.1 0.2,-0.2 0,-0.3 0.5,-1 0.6,-1.2 0.1,0.8 0.6,1.5 1.4,1.8 0.2,0.1 0.3,0.1 0.4,0.2 0.4,0.2 0.8,0.2 1.2,0.1 0.2,-0.1 0.5,-0.1 0.6,-0.3 h 0.1 l 0.3,-0.2 c 0.2,-0.2 0.4,-0.3 0.6,-0.4 0.2,0.2 0.4,0.4 0.7,0.5 l 0.2,0.1 c 0.3,0.2 0.6,0.3 1,0.4 H 40 c 0.2,-0.1 0.5,-0.1 0.7,-0.2 0.2,-0.1 0.5,-0.1 0.7,-0.2 L 42,14.7 c 0.2,-0.2 0.4,-0.3 0.6,-0.6 0,-0.1 0.1,-0.1 0.2,-0.1 l 0.3,-0.3 C 43,14 43,14.3 42.9,14.6 c 0,0.2 -0.1,0.4 -0.1,0.6 -0.1,0.3 0.3,0.9 0.5,1.1 0.2,0.2 1.1,0.8 1.1,1 0.2,0.4 0.6,0.5 1,0.3 0.2,0 0.4,-0.1 0.5,-0.1 h 0.3 c 0.2,0 0.3,-0.1 0.3,-0.2 0.4,-0.3 0.6,-0.6 0.8,-1 0.1,-0.3 0.3,-0.5 0.4,-0.7 0.1,-0.2 0.2,-0.3 0.2,-0.5 v -0.2 c 0.1,-0.3 0.2,-0.5 0.4,-0.8 0.2,-0.2 0.4,-0.5 0.5,-0.8 0.1,-0.1 0.1,-0.2 0.2,-0.2 0.3,-0.5 0.5,-0.9 0.7,-1.4 0.2,-0.5 0.2,-0.5 0.5,-0.8 0.3,0.5 0.4,0.6 0.7,1.1 0.1,0.1 0.5,0.5 0.6,0.5 l 0.4,0.3 c 0.1,0 0.8,0.6 1.1,0.4 0.1,0 0.5,-0.1 0.8,-0.2 -0.1,0.2 -0.1,0.9 -0.1,1.2 0,0.2 0,0.3 0.1,0.5 0,0.4 0.2,0.8 0.3,1.2 0.3,0.3 0.6,0.5 0.8,0.6 0.4,0.2 0.8,0.6 1.2,0.4 1.3,0.5 3.3,-1.2 3.6,-1.6 0.3,-0.2 0.5,-0.4 0.7,-0.6 v 1 c 0,0.4 0.1,1.1 0.2,1.4 0.1,0.3 0.3,0.5 0.4,0.8 0.3,0.6 1.2,1.5 1.8,1.6 0.3,0.1 0.8,0.1 1.1,0 0.2,0 1.1,-0.3 1.3,-0.5 0.3,-0.2 1,-1 1.4,-1.2 0.2,-0.1 1.5,-1.9 1.6,-2.1 l 0.8,-1.5 0.6,-1.4 c 0.1,-0.1 0.4,-1 0.3,-1.1 0,-0.2 0.1,-0.2 0.1,-0.3 0,-0.1 -0.2,0 -0.3,0 l -0.6,1.2 c -0.3,0.5 -0.4,1.1 -0.7,1.6 -0.3,0.6 -1.3,1.7 -1.7,2.1 -0.2,0.2 -1.1,0.8 -1.2,1 -0.3,0.2 -0.8,0.2 -1.1,0.2 H 64.3 L 64,17.2 c -0.2,-0.4 -0.3,-0.9 -0.3,-1.3 -0.1,-1.1 0.3,-3.3 0.6,-4 0.2,-0.2 0.1,-0.5 0.2,-0.7 0.2,-0.2 0.3,-0.5 0.4,-0.8 l 0.3,-0.9 0.2,-0.3 c 0.4,-1 0.8,-1.9 1.2,-2.9 L 66.7,6.2 C 66.8,6.1 66.8,6 66.9,6 l 0.7,-0.1 c 0.1,0 0.3,0 0.4,-0.1 0.2,-0.1 0.4,-0.1 0.6,-0.1 0.3,0 0.7,-0.1 1,-0.2 L 70.2,5.2 70.4,5 70.5,4.8 c -0.2,0 -0.4,-0.1 -0.6,-0.1 h -1.5 l -1.1,0.1 c -0.1,0 -0.2,0 -0.3,-0.1 V 4.5 L 67.2,3.8 67.3,3.3 V 2.9 C 67.3,2.7 67.2,2.6 67.2,2.4 67.2,2.1 67.1,1.8 67,1.5 66.9,1.2 66.7,1 66.3,1.1 h -0.1 c -0.2,0 -0.4,0.1 -0.6,0 -0.2,0 -0.3,0 -0.4,0.1 l -0.3,0.3 c -0.4,0.3 -0.7,0.8 -1,1.2 -0.3,0.5 -0.5,1.1 -0.8,1.7 -0.1,0.3 -0.2,0.5 -0.3,0.7 -0.1,0.2 -0.2,0.2 -0.3,0.2 -0.3,0 -0.6,0.1 -0.8,0.1 l -1.2,0.3 c 0,0 -0.1,0 -0.1,0.1 0,0.2 0.1,0.2 0.2,0.3 l 0.5,0.3 c 0.2,0.2 0.3,0.1 0.6,0.2 0.7,0.2 -0.1,1.2 -0.2,1.9 L 61.2,9.4 C 61.1,9.6 61,9.8 61,10 l -0.2,0.6 c -0.3,1 -0.5,1.6 -0.7,2.1 -1.4,1.5 -0.5,1.8 -2.9,2.7 -0.2,0 -0.3,0.1 -0.5,0 -0.2,-0.1 -0.3,-0.2 -0.4,-0.2 -0.1,-0.1 -0.2,-0.2 -0.2,-0.4 0,-0.3 0.1,-1.7 0.1,-2 0,-0.5 0,-0.4 0.3,-1 0,-0.1 0.1,-0.1 0.1,-0.2 0,-0.1 0,0 -0.1,0 0.1,-0.1 0.2,-0.3 0.2,-0.4 l 0.2,-0.4 C 57.1,10.3 57.4,10 57.5,9.6 57.6,9.3 57.6,9.1 57.4,9 57.3,8.9 57,8.7 56.9,8.6 56.6,8.4 55.9,8.9 55.6,9 55.5,9.1 55.4,9.1 55.4,9.2 h -0.2 c -0.1,0.2 -0.1,0.3 -0.1,0.4 0.1,0.2 0,0.3 -0.1,0.5 0,0 -0.1,0.1 -0.1,0.2 -0.2,0.4 -0.7,1.1 -0.9,1.6 -0.3,0.6 0.3,0 0.3,0 -0.1,0.1 -0.1,0.2 -0.2,0.3 -0.2,0.2 -0.4,0.4 -0.6,0.4 -0.3,0.1 -0.4,0.2 -0.7,0.3 C 52.2,13 51.9,12.2 51.6,12 51.3,11.2 51.1,11 51,9.9 51,9.8 50.9,9.8 50.9,9.7 c 0,-0.1 -0.1,-0.1 -0.1,-0.2 -0.1,0 -0.2,-0.1 -0.3,-0.1 -0.2,0 -0.1,0 -0.2,-0.1 -0.1,-0.1 -0.6,-0.2 -0.7,-0.2 -0.3,0.1 -0.2,0.1 -0.2,0.6 0,0.1 0.2,0.8 0.2,0.9 -0.2,0.7 -0.3,0.2 -0.6,0.9 -0.1,0.2 -0.2,0.5 -0.3,0.6 -0.1,0.3 -0.3,0.6 -0.5,0.9 l -0.4,0.6 c -0.4,0.6 -0.8,1.1 -1.2,1.6 l -0.2,0.1 c 0,-0.2 -0.2,-0.2 -0.1,-0.4 v -0.1 l -0.1,-0.2 c 0,-0.2 0,-0.3 -0.1,-0.5 V 14 L 46,14.1 c -0.1,0.2 -0.1,0.4 -0.1,0.6 v 0.1 H 45.7 C 45.6,14.7 45.6,14.6 45.6,14.5 V 14 13.1 c 0,0 0,-0.1 0.1,-0.1 0,-0.1 0.1,0 0.1,0 l 0.1,0.1 0.1,0.4 h 0.1 c 0.1,-0.2 0.1,-0.2 0.1,-0.4 0,-0.2 -0.1,-0.4 0,-0.7 v -0.9 -0.2 c 0,-0.3 0,-0.7 -0.1,-1.1 V 9.8 c 0,-0.3 0,-0.7 -0.2,-1 -0.1,-0.2 0,-0.3 0,-0.5 h 0.3 C 46.2,8 46,7.9 45.9,7.6 45.7,7.4 45.5,7.3 45.3,7 c 0,0 -0.1,-0.1 -0.2,-0.1 -0.2,0 -0.2,0 -0.3,-0.2 L 44.6,6.5 C 44.5,6.4 44.4,6.4 44.3,6.4 44.2,6.5 44.2,6.5 44.2,6.6 V 7 c -0.1,0.3 -0.1,0.6 -0.1,0.8 -0.1,0.5 -0.2,0.9 -0.3,1.3 -0.2,0.7 -0.3,1.4 -0.5,2.2 -0.4,0.4 -0.8,1.2 -1.1,1.5 l -0.5,0.4 -0.6,0.4 -0.6,0.3 c -0.2,0.1 -0.4,0.1 -0.6,0.2 -0.1,0 -0.2,-0.1 -0.3,-0.2 -0.1,-0.2 -0.2,-0.5 -0.3,-0.7 0,-0.2 0,-0.4 0.1,-0.6 l 0.4,-0.8 c 0,-0.1 0.1,-0.1 0.1,-0.2 0,-0.3 -0.1,-0.6 -0.3,-0.8 L 39.4,10.7 C 39.2,10.5 39,10.5 38.8,10.5 l -0.6,1 c -0.2,0.2 -0.3,0.4 -0.5,0.6 l -0.2,0.3 c -0.1,0.2 -0.3,0.3 -0.4,0.5 -0.3,0.3 -0.7,0.6 -1,0.8 L 36,13.8 v -0.1 c 0.1,-0.3 0.2,-0.6 0.3,-1 0,-0.1 0.1,-0.1 0.1,-0.2 l 0.3,-0.4 c 0.2,-0.3 0.4,-0.6 0.7,-0.9 l 0.3,-0.4 c 0.3,-0.4 0.6,-0.7 1,-1 C 38.9,9.6 39.2,9.5 39.4,9.3 39.7,9.1 39.7,9 39.7,8.7 L 39.6,8.5 C 39.5,8.3 39.3,8.2 39.1,8 39.1,8 39,7.9 38.9,7.9 38.7,7.9 38.6,7.7 38.5,7.7 H 38.4 C 38.3,7.6 38.2,7.6 38.1,7.5 38,7.5 38,7.5 37.9,7.4 37.7,7.3 37.4,7.3 37.3,7.2 h -0.1 c -0.2,0 -0.4,0 -0.6,0.1 -0.1,0 -0.2,0 -0.3,0.1 C 35.9,7.7 35.5,8 35.2,8.3 34.8,8.8 34.3,9.4 33.9,10 l -0.1,0.1 c -0.3,0.3 -0.5,0.7 -0.7,1.1 -0.1,0.1 -0.1,0.2 -0.2,0.4 -0.4,0.6 -0.6,1.2 -1.1,1.8 -0.4,0.6 -0.6,1 -1,1.4 -0.4,0.4 -0.8,0.8 -1.2,1.1 -0.2,0.2 -1.7,1.2 -2,1.1 -0.2,-0.1 -0.6,-0.2 -0.6,-0.3 -0.2,-0.4 -0.3,-0.5 -0.3,-0.9 0,-0.1 -0.1,-1.2 -0.2,-1.4 0,-0.6 0,-1 0.1,-1.6 0.3,-1.5 0.2,-1.8 1.1,-3.4 -0.1,0.1 -0.1,0.2 -0.2,0.3 -0.4,0.4 -0.4,-0.3 -0.3,-0.5 0.3,-1 0.2,-0.5 0.5,-1.5 L 28,6.8 C 28.3,6.2 28.6,5.6 28.8,5 l 0.4,-0.9 c 0.1,-0.4 0.3,-0.7 0.5,-1 0.2,-0.2 0.4,-0.5 0.6,-0.7 0.3,-0.4 0.6,-0.7 1,-0.8 0.1,-0.1 0.2,-0.1 0.3,-0.2 h 0.1 V 1.5 C 31.6,1.9 31.5,2.4 31.4,2.8 31.1,3.4 30.8,4 30.5,4.7 29.7,6.3 29.5,6.6 28.6,8 28.4,8.3 28.2,8.6 28.1,8.9 28.5,8.2 28.9,7.5 29.4,6.9 29.7,6.4 30,5.8 30.4,5.3 L 31,4.2 C 31.3,3.7 31.6,3.3 31.8,2.8 32,2.5 32.1,2.3 32.1,2 32.2,1.7 32.2,1.3 32.3,1 32.4,0.4 32.3,0 32,-0.2 Z M 27.7,9.4 C 27.8,9.2 27.9,9.1 28.1,8.9 27.9,9.1 27.8,9.2 27.7,9.4 Z M 20.8,0.8 C 19.6,0.8 18.3,1 17,1.4 16.7,1.6 16.3,1.6 16,1.8 14.8,2.4 13.7,3.1 12.9,4.2 12,5.3 11.4,6.8 12,8 c 0.3,0.7 0.8,1.3 1.5,1.8 0.6,0.5 1.1,0.9 1.8,1.2 1.1,0.6 2.1,1.2 3,2 0.6,0.4 0.8,1 1,1.7 0.1,0.2 0,0.4 -0.3,0.6 -0.3,0.3 -0.8,0.6 -1.1,0.7 -0.5,0.3 -1.1,0.5 -1.6,0.7 -0.5,0.2 -1.1,0.3 -1.6,0.5 -0.3,0.1 -0.6,0 -0.8,-0.1 -0.2,-0.1 -0.3,-0.2 -0.3,-0.4 0,-0.3 0,-0.5 0.1,-0.8 0.1,-0.4 0.3,-0.8 0.6,-1.2 L 14.8,14 c 0.1,-0.1 0.1,-0.2 0.1,-0.3 v -0.4 c -0.1,0 -0.1,0 -0.3,-0.1 L 15,13 c -0.2,-0.1 -0.3,0.2 -0.5,0.2 -0.4,-0.1 -0.6,0 -0.8,0.5 -0.1,0.1 -0.1,0.2 -0.2,0.3 -0.5,0.4 -0.8,0.9 -1.2,1.3 -0.4,0.5 -0.6,1 -0.8,1.5 -0.3,0.8 -0.2,1.4 0.3,1.9 0.5,0.5 1.2,0.8 2,0.9 0.5,0.1 1.1,0.1 1.7,-0.1 0.3,-0.1 0.5,-0.2 0.7,-0.3 C 16.5,19 16.7,19 17,19 c 0.3,0 0.7,0 1,-0.2 0.7,-0.3 1.3,-0.6 1.8,-1.1 0.2,-0.1 0.3,-0.3 0.4,-0.4 l 0.6,-0.9 c 0.5,-0.9 0.6,-1.7 0.4,-2.5 -0.3,-1.1 -0.8,-2 -1.6,-2.7 C 19,10.7 18.5,10.3 17.9,9.9 17.8,9.9 17.7,9.8 17.6,9.7 17.2,9.4 16.7,9 16.2,8.7 15.1,7.9 13.9,6.4 16,5.9 l 1,-0.2 c 0.3,-0.1 0.6,-0.1 0.9,-0.2 1,0 2,0.1 2.9,0.2 0.5,0.1 0.9,0.2 1.4,0.3 0.1,0.1 0.3,0.1 0.5,0 C 23,5.9 23.3,5.8 23.6,5.6 23.8,5.5 23.9,5.3 24.1,5.1 24.2,4.9 24.4,4.7 24.5,4.5 24.7,4.3 24.8,4 24.8,3.8 24.8,3.3 25,2.8 25.2,2.3 25.3,2.1 25.3,2 25.3,1.9 V 1.7 C 25.4,1.5 25.3,1.4 25.1,1.2 24.8,1 24.3,0.9 23.8,0.9 h -1.7 c -0.4,0 -0.8,-0.1 -1.2,-0.1 z m 16.4,4.1 c -0.1,0 -0.1,0.2 -0.2,0.1 -0.2,0.1 0,0.5 0,0.6 0.1,0.3 0.2,0.4 0.3,0.4 0,0.2 0.2,0.3 0.4,0.4 0,0 0.1,0.2 0.2,0.2 0.1,0.1 0.1,0.2 0.2,0.2 0.2,0.1 0.2,0.1 0.4,0.1 L 38.7,7 c 0.1,0 0.2,0 0.2,0.1 0.1,0 0.1,-0.1 0.2,0 h 0.2 0.1 0.1 0.2 0.1 C 39.9,7.1 40.1,7 40.1,7 40.2,6.9 40.3,6.9 40.3,6.8 v 0.1 c 0.1,-0.1 0.2,-0.1 0.2,-0.2 0,-0.1 0.1,-0.1 0.1,-0.2 v 0.1 c 0,-0.1 0.1,-0.1 0.1,-0.2 0,-0.1 0,-0.1 0.1,-0.1 0.1,0 0.1,-0.1 0.1,-0.1 H 41 C 41,6.1 41.1,6.1 41.1,6.1 V 6 H 41 V 5.9 H 40.9 V 5.8 h -0.1 -0.1 c 0,0.1 -0.1,0.1 -0.1,0.1 -0.1,-0.2 -0.2,0 -0.2,0 L 40.3,6 C 40.2,6.1 40.1,6.1 40,6.1 39.8,6.2 39.7,6.2 39.6,6.2 39.5,6.2 39.2,6.1 39.1,6.1 38.7,6.2 38.4,5.8 38.2,5.8 L 37.7,5.5 C 37.6,5.3 37.3,5.2 37.3,5 37.3,4.9 37.2,4.9 37.2,4.9 Z M 57.1,5.4 C 57,5.4 57,5.5 56.9,5.5 l -0.2,0.3 c -0.1,0.2 -0.2,0.3 -0.2,0.5 0,0 -0.1,0.1 -0.1,0.2 -0.1,0.2 -0.2,0.2 -0.2,0.4 0,0.1 -0.1,0.2 -0.1,0.3 L 56,7.3 h 0.3 c 0.1,0 0.2,0 0.2,0.1 0.1,0.1 0.2,0.1 0.4,0 0.1,-0.1 0.2,-0.1 0.2,-0.1 0.2,0 0.4,-0.2 0.4,-0.2 L 57.8,6.8 C 57.9,6.7 57.9,6.7 57.9,6.6 57.9,6.5 58,6.4 58.1,6.3 58.2,6.2 58.2,6.1 58.3,6.1 58.2,5.9 58,5.8 57.8,5.7 57.7,5.7 57.5,5.6 57.4,5.6 h -0.1 -0.1 -0.1 l 0.2,-0.2 h -0.1 z m -11.3,6.4 c 0,0 0.1,0 0.1,0.1 v 0.2 L 45.8,12 v -0.1 z m 0.2,3.3 c 0.1,0 0.1,0.1 0,0.1 z m 0,0.4 v 0.1 H 45.9 Z M 48.6,27 c -0.3,0 -0.8,0.2 -1,0.4 -0.2,0.2 -0.6,0.6 -0.8,0.7 -0.2,0.1 -0.4,0.2 -0.8,0.9 -0.2,0.2 -0.2,0.4 -0.4,0.7 -1.1,2.1 -2.6,5.5 -2.7,6 0,0.1 -0.1,0.2 -0.1,0.3 -0.4,0.9 -0.4,1 -0.6,1.6 -0.1,0.3 -0.1,0.5 -0.2,0.8 0,0.1 -0.1,0.2 -0.1,0.2 -0.1,0.2 -0.1,0.3 -0.1,0.4 -0.1,0.1 -0.1,0.2 -0.1,0.4 -0.1,0.2 -0.1,0.3 -0.1,0.4 -0.2,0.6 -0.3,1.3 -0.5,1.9 C 41,42.1 40.9,42.6 41,43 v 0.1 c -0.1,0.4 0,0.9 0,1.3 0,0.4 0,0.7 0.1,1 l 0.1,0.3 c 0,0.3 0.2,0.6 0.3,0.8 l 0.3,0.3 c 0.2,0.1 0.4,0.2 0.5,0.1 l 0.2,-0.1 c 0.1,0 0.1,-0.1 0.1,-0.1 0.1,0 0.2,-0.1 0.3,0 0.2,0 0.3,-0.1 0.4,-0.3 0.2,-0.4 0.4,-0.7 0.5,-1.1 l 0.1,-0.2 C 44,45 44.1,44.9 44.1,44.7 v -0.2 c 0.2,-0.3 0.3,-0.6 0.4,-1 0,-0.2 0.1,-0.4 0.2,-0.6 0.1,-0.1 0.1,-0.3 0.1,-0.4 v -0.1 h 0.1 c 0,-0.2 0.1,-0.3 0.1,-0.4 0,-0.2 0,-0.3 0.1,-0.4 0,-0.2 0.1,-0.4 0.1,-0.6 0,-0.1 0,-0.3 0.1,-0.4 v -0.9 -0.3 c 0,-0.5 0,-1.1 -0.1,-1.7 -0.2,-1.1 2.1,0.7 4.6,-0.2 l 0.5,-0.3 0.2,-0.2 c 0,0.3 0,0.6 -0.1,0.8 0,0.1 0,0.3 0.1,0.4 0,0.3 0.1,0.7 0.3,1 0.2,0.3 0.5,0.5 0.7,0.6 0.4,0.2 0.7,0.5 1.1,0.4 1.1,0.4 2.9,-1.1 3.1,-1.4 0.4,-0.3 0.7,-0.7 1,-1.2 0,0.1 0.1,0.3 0.1,0.4 0.1,0.2 0.2,0.4 0.4,0.5 0.4,0.4 0.6,0.8 1.5,1.2 0.3,0.1 1.9,0.4 2.2,0.4 0.3,0 0.6,-0.1 0.9,-0.2 L 62,39.8 c 0.3,-0.1 0.6,-0.2 0.8,-0.3 0.2,-0.1 0.3,-0.2 0.4,-0.3 L 63.5,39 c 0.1,-0.1 0.2,-0.2 0.4,-0.3 0.3,-0.2 0.5,-0.4 0.7,-0.7 0.1,-0.2 0.3,-0.3 0.5,-0.4 l 0.3,-0.3 c -0.1,0 -0.1,-0.1 -0.1,-0.1 0,-0.1 0.2,-0.2 0.2,-0.3 l -0.2,0.1 0.1,-0.2 0.3,-0.3 c 0.1,-0.2 0.2,-0.4 0.4,-0.5 0.1,-0.1 0.1,-0.1 0.1,-0.2 0.1,-0.2 0.2,-0.4 0.2,-0.6 -0.2,0.1 -0.2,0.2 -0.3,0.3 -0.2,0.3 -0.5,0.6 -0.8,0.9 l -0.5,0.5 -0.1,0.1 c -0.4,0.4 -0.8,0.7 -1.3,1.1 -0.6,0.4 -1.2,0.8 -1.8,1 -0.1,0 -0.9,0.2 -1,0.1 -0.4,0 -0.8,-0.5 -1.2,-0.8 -0.1,-0.1 -0.3,-0.7 -0.4,-0.8 -0.1,-0.1 -0.1,-0.3 -0.1,-0.4 v -0.5 c 0,0 -0.1,0 -0.1,-0.1 l 0.1,-0.5 H 59 v 0.2 h 0.1 c 0,-0.2 0,-0.2 0.1,-0.2 0.1,0 0.1,-0.1 0.1,-0.2 0,-0.1 0.1,-0.1 0.1,-0.1 0.1,0 0.1,-0.1 0.1,-0.1 0,-0.2 0.1,-0.3 0.1,-0.4 0.1,-0.1 0.2,-0.1 0.2,0 l 0.3,0.6 c 0,0.1 0.1,0.1 0,0.2 0,0 0,0.1 0.1,0.1 0.2,0.1 0.3,0.3 0.5,0.3 0.1,0.1 0.1,0.1 0.2,0.1 0.2,0 0.3,0 0.5,-0.1 0.2,-0.1 0.4,-0.2 0.4,-0.4 0.1,-0.2 0.2,-0.3 0.3,-0.5 0.1,-0.2 0.2,-0.4 0.3,-0.5 0.2,-0.3 0.3,-0.6 0.4,-1 0.1,-0.3 0.1,-0.6 0,-0.9 0,-0.1 -0.1,-0.2 -0.1,-0.2 -0.2,-0.2 -0.3,-0.4 -0.4,-0.6 -0.1,-0.1 -0.1,-0.2 -0.2,-0.3 -0.2,-0.2 -1.2,-0.4 -1.5,-0.5 -0.1,-0.1 -0.1,-0.2 -0.2,-0.2 -0.1,-0.1 -0.2,0 -0.2,-0.1 -0.1,-0.1 -0.2,-0.1 -0.3,-0.1 l -0.3,0.1 c -0.4,0.3 -0.8,0.6 -1.2,1 -0.4,0.4 -0.7,0.7 -1,1.2 -0.3,0.4 -0.5,0.8 -0.7,1.3 -0.1,0.2 -0.2,0.3 -0.2,0.6 0.1,-0.2 0.2,-0.4 0.3,-0.7 0.1,-0.2 0.1,-0.2 0.3,-0.3 0,0.2 0,0.2 -0.1,0.4 -0.3,0.6 -0.4,1.1 -0.5,1.7 0,0.1 -0.1,0.1 -0.1,0.1 -1.2,1.3 -0.5,1.6 -2.6,2.4 -0.2,0 -0.3,0.1 -0.4,0 -0.2,-0.1 -0.3,-0.2 -0.4,-0.2 -0.1,-0.1 -0.2,-0.2 -0.2,-0.4 0,-0.2 0.1,-1.5 0.1,-1.8 0,-0.4 0,-0.4 0.2,-0.9 0,-0.1 0.1,-0.1 0.1,-0.2 0.1,-0.3 -0.4,0.7 -0.3,0.4 0.1,-0.2 0.2,-0.5 0.3,-0.8 l 0.1,-0.4 C 53.5,34.3 53.7,34 53.8,33.6 53.9,33.3 53.9,33.2 53.7,33 53.6,32.9 53.3,32.8 53.3,32.7 53,32.5 52.4,33 52.1,33.1 l -0.2,0.2 h -0.2 c -0.1,0.2 -0.1,0.3 -0.1,0.4 0.1,0.2 0,0.3 -0.1,0.4 l -0.1,0.1 c -0.2,0.4 -0.6,0.9 -0.8,1.4 -0.1,0.1 -0.1,0.1 -0.1,0.2 C 50.2,36 49.7,37 49.4,37 l -0.3,0.2 c 0,0 -0.1,0 -0.3,0.1 l -0.4,0.1 c -0.3,0.1 -0.7,-0.1 -1.1,-0.1 -0.2,0.1 -1.1,-0.4 -1.4,-0.3 -0.4,-0.1 -0.2,-0.6 -0.1,-0.9 0.3,-0.9 0.1,-0.5 0.5,-1.3 0.2,-0.3 0.3,-0.7 0.5,-1.1 0.2,-0.5 0.5,-1.1 0.7,-1.7 0.1,-0.3 0.2,-0.5 0.2,-0.7 l 0.6,-1.5 c 0.1,-0.3 0.3,-0.6 0.4,-0.9 0.4,-0.9 0.7,0.1 0.6,0.6 -0.1,0.7 -0.2,1.2 -0.4,1.8 -0.2,0.4 -0.4,0.9 -0.6,1.3 -0.1,0.2 -0.2,0.4 -0.3,0.7 L 48.6,33 c 0.2,-0.1 0.3,-0.2 0.3,-0.3 0.6,-0.8 1,-1.6 1.3,-2.4 0.2,-0.4 0.2,-0.7 0.1,-1.2 0.1,-0.4 -0.2,-0.8 -0.2,-1.1 l -0.2,-0.2 c -0.3,-0.2 -0.5,-0.5 -0.9,-0.5 -0.1,0 -0.2,0 -0.3,-0.1 -0.1,0 -0.2,-0.1 -0.3,0 z m 5,2.8 c -0.1,0 -0.1,0.1 -0.2,0.1 l -0.2,0.2 C 53.1,30.3 53,30.4 53,30.5 l -0.1,0.1 c -0.1,0.1 -0.1,0.2 -0.2,0.3 0,0.1 -0.1,0.2 -0.1,0.3 l -0.1,0.1 h 0.3 c 0.1,0 0.1,0 0.2,0.1 0.1,0.1 0.2,0.1 0.4,0 0.1,-0.1 0.1,-0.1 0.2,-0.1 0.1,0 0.3,-0.1 0.4,-0.2 l 0.3,-0.3 0.1,-0.1 c 0,-0.1 0.1,-0.2 0.1,-0.2 l 0.2,-0.2 C 54.6,30.1 54.5,30 54.3,29.9 54.2,29.9 54.1,29.8 54,29.8 H 53.9 53.8 53.7 Z M 31.2,30 c -0.1,0 -0.2,0.1 -0.3,0.2 -0.1,0.1 0.1,0.3 0.1,0.4 0.1,0.1 0.1,0.2 0.2,0.3 l 0.2,0.2 c 0,0.1 0.1,0.1 0.3,0.3 0,0 0,0.1 0.1,0.1 0.1,0.1 0.2,0.1 0.3,0.2 0.2,0.1 0.3,0.1 0.5,0.2 h 0.1 0.1 0.3 0.1 0.1 0.1 c 0,0 0,-0.1 0.1,0 h 0.1 c 0,0 0.1,0 0.1,-0.1 0.1,0 0.2,-0.1 0.3,-0.1 0.1,-0.1 0.2,-0.1 0.2,-0.2 v 0.1 c 0.1,-0.1 0.1,-0.1 0.1,-0.2 l 0.1,-0.1 c 0,0 0.1,0 0.1,-0.1 0,-0.1 0,-0.2 0.1,-0.2 h 0.1 c 0.1,-0.1 0,-0.2 0,-0.2 v -0.1 c -0.1,-0.1 -0.2,-0.1 -0.2,-0.1 -0.1,0 -0.1,0 -0.1,0.1 0,0.1 -0.1,0.1 -0.1,0.1 H 34.1 L 34,30.9 v 0 C 33.9,31 33.9,31 33.8,31 h -0.2 l -0.1,0.1 c -0.1,0.1 -0.3,0 -0.5,0 C 32.6,31 32.5,31 32.3,30.9 32.1,30.8 31.9,30.6 31.6,30.4 31.5,30.2 31.3,30.3 31.3,30.1 31.3,30 31.2,30 31.2,30 Z m -9.2,0.3 -0.2,0.1 c -0.1,0 -0.1,0 -0.1,0.1 z m -0.3,0.2 -0.2,0.1 h 0.1 z m -0.1,0.1 -0.1,0.1 c -0.1,0 -0.1,0 -0.1,0.1 -0.1,0.2 -0.3,0.3 -0.4,0.5 l -0.2,0.4 c -0.1,0.1 -0.1,0.2 -0.2,0.2 l -0.2,0.4 c -0.1,0.1 -0.1,0.3 -0.2,0.4 0.1,0.1 0,0.3 0,0.4 -0.1,0.2 -0.2,0.3 -0.1,0.4 -0.1,0.1 0,0.2 -0.1,0.2 0,0.4 0.5,2.3 0.7,2.7 0,0.1 0.1,0.2 0.1,0.3 0.3,0.4 0.5,0.9 0.7,1.5 0.3,0.8 0.5,1 -0.5,1.9 -0.5,0.4 -0.9,1 -1.3,1.5 -0.2,0.3 -0.4,0.6 -0.5,0.9 -0.1,0.1 -0.1,0.3 -0.1,0.4 0.1,0.3 0.1,0.5 0.2,0.7 0.1,0.1 0.1,0.3 0.2,0.4 0.1,0.2 0.2,0.3 0.4,0.1 l -0.3,-0.3 c -0.1,-0.1 -0.1,-0.2 -0.1,-0.3 0.1,-0.1 0.1,-0.3 0.1,-0.4 l 0.3,-0.3 0.3,-0.3 c 0.1,-0.2 0.2,-0.3 0.4,-0.4 0.1,0 0.2,-0.1 0.3,-0.2 0.2,-0.2 0.7,-0.8 1,-0.9 0.1,0 0.1,0.1 0.1,0.2 v 0.1 c -0.1,0.3 -0.1,0.5 -0.2,0.7 -0.1,0.2 -0.2,0.5 -0.3,0.7 0,0.1 -0.1,0.1 -0.1,0.2 -0.2,0.3 -0.3,0.5 -0.6,0.7 l -0.3,0.3 v 0 c 0.1,0 0.1,0 0.2,-0.1 0,-0.1 0.1,-0.1 0.2,-0.1 0,0.1 0,0.1 0.1,0.1 v 0.1 c 0.2,-0.2 0.2,-0.2 0.3,-0.2 -0.2,0.2 -0.3,0.4 -0.4,0.6 L 21,44.2 c 0.2,0 0.3,-0.1 0.5,-0.3 l 0.1,-0.1 c 0.2,-0.1 0.4,-0.2 0.5,-0.3 l 0.2,-0.3 c 0.2,-0.2 0.9,-0.9 1,-1.2 0.1,-0.2 0.2,-0.3 0.3,-0.5 l 0.1,-0.1 c 0.1,0 0.1,-0.1 0.1,-0.1 0.1,-0.2 0,-0.4 0.1,-0.6 v -0.1 -0.2 c 0.2,-0.6 0.2,-0.5 0.1,-1 0,-0.7 0.8,-0.7 1.3,-1.1 l 0.3,-0.2 c 0.3,-0.2 0.5,-0.4 0.8,-0.6 L 26.5,37.4 27,37 27.3,36.7 c 0.1,-0.1 0.1,-0.2 0.2,-0.3 0.1,0.7 0.5,1.2 1.2,1.5 0.1,0.1 0.3,0.1 0.4,0.2 0.3,0.2 0.7,0.2 1.1,0.1 0.2,-0.1 0.4,-0.1 0.6,-0.3 h 0.1 l 0.3,-0.2 c 0.2,-0.1 0.3,-0.2 0.5,-0.3 0.2,0.2 0.4,0.3 0.6,0.4 l 0.1,0.1 c 0.3,0.2 0.6,0.3 0.9,0.4 h 0.2 c 0.2,-0.1 0.4,-0.1 0.6,-0.1 0.2,-0.1 0.4,-0.1 0.6,-0.1 0.2,-0.1 0.3,-0.1 0.5,-0.3 0.2,-0.2 0.4,-0.3 0.5,-0.5 0,-0.1 0.1,-0.1 0.1,-0.1 l 0.3,-0.3 c 0,-0.1 0.1,-0.1 0.2,-0.2 l 0.3,-0.3 c 0.1,0 0.1,-0.1 0.2,-0.1 0.1,-0.1 0.4,-0.7 0.4,-0.9 -0.1,-0.1 -0.3,-0.2 -0.4,-0.3 l -0.1,0.1 c -0.3,0.3 -0.8,1.2 -1.2,1.5 l -0.4,0.4 -0.6,0.3 c -0.2,0.1 -0.3,0.2 -0.5,0.3 -0.2,0.1 -0.4,0.1 -0.5,0.1 -0.1,0 -0.2,-0.1 -0.2,-0.1 -0.1,-0.2 -0.2,-0.4 -0.2,-0.6 0,-0.2 0,-0.4 0.1,-0.5 l 0.4,-0.7 c 0,-0.1 0.1,-0.1 0.1,-0.1 0,-0.3 -0.1,-0.5 -0.2,-0.7 L 33.3,34.9 C 33.1,34.7 33,34.7 32.7,34.7 l -0.5,0.9 c -0.1,0.2 -0.3,0.4 -0.5,0.6 l -0.2,0.2 c -0.1,0.2 -0.2,0.3 -0.4,0.4 -0.3,0.2 -0.6,0.5 -0.8,0.7 l -0.1,0.1 v -0.1 c 0.1,-0.3 0.2,-0.6 0.3,-0.8 0,-0.1 0.1,-0.1 0.1,-0.2 l 0.3,-0.4 c 0.2,-0.3 0.4,-0.6 0.6,-0.8 L 31.8,35 c 0.2,-0.3 0.6,-0.6 0.8,-0.9 0.2,-0.2 0.4,-0.3 0.6,-0.4 0.2,-0.1 0.3,-0.3 0.2,-0.5 L 33.3,33 C 33.2,32.8 33,32.7 32.9,32.5 l -0.1,-0.1 c -0.1,0 -0.2,-0.1 -0.4,-0.1 h -0.1 c -0.1,-0.1 -0.2,-0.1 -0.3,-0.1 -0.1,0 -0.1,0 -0.2,-0.1 C 31.6,32 31.4,32 31.3,32 h -0.1 c -0.2,0 -0.3,0 -0.5,0.1 -0.1,0 -0.2,0 -0.2,0.1 -0.4,0.2 -0.7,0.5 -1,0.8 -0.4,0.4 -0.8,1 -1.1,1.5 l -0.1,0.1 c -0.2,0.3 -0.4,0.6 -0.6,0.8 l -0.2,0.3 c -0.2,0.2 -0.3,0.4 -0.5,0.5 -0.3,0.2 -0.5,0.4 -0.8,0.7 L 25,37.8 C 24.3,38 23.5,38.7 23.3,38.1 23.2,38 23.2,37.7 23.1,37.6 22.8,37.3 22.5,36.3 22.2,36.1 l -0.3,-0.3 c -0.1,-0.2 -0.1,-0.7 0,-0.9 l 0.2,-0.4 v -0.1 c 0,-0.1 0.1,-0.2 0.1,-0.3 0.1,-0.1 0.1,-0.2 0.2,-0.3 0.1,0 0.1,-0.1 0.2,-0.2 0.1,-0.2 0.2,-0.5 0.2,-0.7 0.1,-0.2 0.1,-0.3 0.1,-0.4 -0.1,-0.1 -0.1,-0.1 -0.1,-0.2 0,-0.3 -0.4,-1.3 -0.7,-1.4 H 22 c -0.2,-0.2 -0.3,-0.2 -0.4,-0.3 z m -1.1,13.3 c -0.1,0 -0.1,0.1 -0.2,0.1 -0.1,0.1 -0.1,0.1 -0.2,0 l 0.1,-0.1 c -0.1,0 -0.1,0.1 -0.2,0.1 0,0.1 0,0.1 -0.1,0.1 v 0 0.1 c 0.1,0.1 0.2,0.1 0.3,0 z M 61.6,33.1 h 0.1 c 0.3,0 0.4,0.2 0.2,0.7 -0.2,0.4 -0.3,0.5 -0.5,1 -0.1,0.2 -0.2,0.4 -0.4,0.4 -0.2,0 -0.4,0.1 -0.6,-0.1 C 60.3,35 60.2,35 60.2,34.9 60.1,34.8 60,34.7 60.1,34.5 l 0.2,-0.3 c 0.2,-0.3 0.4,-0.6 0.7,-0.8 0.2,-0.1 0.4,-0.3 0.6,-0.3 z m -10.3,2.5 c 0,0 0,0.1 -0.1,0.1 h -0.1 z m 5.8,0.1 V 35.9 36 C 57,36.1 57,36.2 56.9,36.3 v -0.2 c 0,-0.1 0.1,-0.2 0.2,-0.4 z m 0,1.2 h 0.1 L 57.1,37.5 57,37.4 v -0.2 c 0.1,-0.1 0.1,-0.2 0.1,-0.3 z M 57,37.6 c 0.1,0.2 0.1,0.5 0.2,0.7 l 0.1,0.1 c 0.1,-0.1 0,-0.2 0,-0.2 L 57.2,38 h 0.1 c 0.1,0.1 0.1,0.3 0.2,0.4 0.1,0.1 0.1,0.2 0.2,0.4 h -0.1 c -0.1,0 -0.1,-0.1 -0.2,-0.1 C 57.3,38.6 57.2,38.5 57.2,38.4 57.1,38.2 57,38 57,37.7 Z m -12.6,1.2 c 0.1,0 0.1,0.2 0.1,0.8 -0.1,0.8 -0.1,0.7 -0.2,1.5 -0.1,0.7 -0.2,1.3 -0.3,2 0,0.2 -0.1,0.5 -0.1,0.7 -0.1,0.3 -0.2,0.7 -0.3,1 -0.2,0.4 -0.1,0.2 -0.2,0.6 -0.1,0.1 -0.2,0.8 -0.5,0.3 0,-0.1 -0.1,-0.1 -0.1,-0.2 v -0.7 c 0,-0.2 0.1,-0.4 0.1,-0.6 C 43,44 43,43.9 43,43.8 c 0.1,-0.3 0.1,-0.4 0.1,-0.7 0,-0.1 0.1,-0.2 0.1,-0.3 0,-0.2 0.1,-0.2 0.1,-0.4 0.1,-0.2 0.1,-0.4 0.2,-0.6 0,-0.2 0.1,-0.5 0.2,-0.7 0,-0.2 0,-0.3 0.1,-0.5 l 0.2,-0.7 0.1,-0.2 c 0.1,-0.2 0.2,-0.6 0.2,-0.6 z m 0.5,3.9 v 0.1 z m 32,5.3 c -0.1,0 -0.2,0.1 -0.3,0.1 -0.3,0.1 -0.5,0.3 -0.8,0.5 -0.4,0.4 -0.9,0.8 -1.3,1.2 -0.6,0.7 -1.2,1.5 -1.8,2.5 -0.3,0.4 -0.5,0.8 -0.7,1.2 -0.2,0.3 -0.5,0.7 -0.7,1.1 -0.3,0.7 -0.5,0.8 -0.8,1.5 -0.5,1.1 -0.6,1.2 -0.9,2.5 -0.1,0.4 -0.2,0.8 -0.2,1.3 -0.2,0.2 -0.3,0.5 -0.4,0.7 -0.5,0.9 -1.7,2 -2.4,2.3 -1,0.3 -2,0.1 -1.9,-0.3 0,-0.1 0.1,-0.6 0.3,-1.6 0.2,-0.2 0.1,-0.5 0.3,-0.8 0.1,-0.2 0.2,-0.5 0.2,-0.7 0.2,-0.3 0.1,-0.1 0.2,-0.3 0.3,-0.6 0.3,-1.2 0.5,-1.7 -0.1,-0.1 0,-0.2 -0.1,-0.3 -0.3,-0.1 0.1,-0.2 -0.3,-0.1 -0.1,0 -0.1,-0.1 -0.4,0 -0.2,0.2 -0.3,0.4 -0.4,0.7 -0.2,0.3 -0.5,0.7 -0.7,1 -0.1,0.3 -0.2,0.2 -0.3,0.6 -0.1,0.1 -0.1,0.3 -0.3,0.5 -0.2,0.3 -0.4,0.1 -0.6,0.4 -0.4,0.4 -1.3,0.5 -2,0.8 -0.2,0.1 -0.2,-0.4 -0.3,-0.6 -0.1,-0.1 0,-0.5 0.1,-0.8 0.1,-0.3 0.2,-0.5 0.3,-0.8 0.1,-0.2 0.1,-1 0.3,-1.2 0.2,-0.7 0.8,-2 1,-2.7 0,-0.1 0,-0.2 -0.1,-0.3 -0.1,-0.1 -0.1,-0.3 -0.2,-0.3 -0.1,-0.2 -0.3,-0.3 -0.6,-0.3 -0.3,0 0,0.2 -0.4,0.4 -0.1,0.1 -0.3,0.1 -0.5,0.2 -0.1,0.1 -0.3,0.1 -0.4,0.3 -0.2,0.3 -0.4,0.7 -0.5,1 -0.3,0.6 -1.8,3 -1.9,3.6 -0.1,0.2 -0.2,0.5 -0.2,0.7 -0.3,0.2 -0.8,0.6 -0.9,0.7 -0.4,0.5 -1.6,1.5 -2.1,1.8 -0.2,0.1 -0.3,0.1 -0.4,0.2 -0.3,0.1 -1.2,0.3 -1.3,-0.3 -0.1,-0.5 0,-1.8 0.2,-2.4 0.1,-0.5 0.2,-0.8 0.3,-1.4 0.1,-0.4 0.1,-0.7 0,-1.2 0,-0.2 0,-0.3 -0.1,-0.4 -0.1,-0.2 -0.3,-0.4 -0.5,-0.4 -0.3,-0.1 -0.7,0 -1.1,-0.1 h -0.3 c -0.3,0.1 -0.4,0.2 -0.6,0.4 l -0.5,0.6 c -0.6,0.7 -1,0.9 -1.6,1.7 -0.5,0.6 -0.6,0.7 -1.2,1.2 -0.4,0.2 -0.6,-0.2 -0.3,-0.8 0.3,-0.4 0.2,-0.4 0.4,-0.8 0.5,-1.1 0.8,-2.1 0.9,-3.2 0,-0.3 0,-0.6 -0.1,-0.8 l -0.4,-0.6 c 0,-0.1 -0.1,-0.1 -0.1,-0.1 -0.3,-0.1 -0.6,-0.3 -0.8,-0.5 -0.1,-0.1 -0.2,-0.1 -0.3,0 v 0.2 c -0.1,0.3 -0.2,0.5 -0.3,0.8 -0.1,0.3 -0.3,0.7 -0.5,1 -0.3,0.5 -0.7,1.1 -1,1.7 -0.3,0.7 -0.7,1.4 -1,2.1 -0.2,0.3 -0.3,0.7 -0.4,1 -0.1,0.2 -0.3,0.4 -0.5,0.6 -0.3,0.4 -1.8,1.4 -2.2,1.3 -0.1,-0.1 -0.2,-0.1 -0.2,-0.3 v -0.9 c 0.1,-0.3 0.1,-0.7 0.1,-1 0.1,-0.1 0,-0.4 0.2,-0.4 0.1,-0.2 0.1,-0.4 0.1,-0.6 V 58.7 C 41.1,58.6 41,58.4 40.9,58.4 40.7,58.3 40.6,58.1 40.5,58 40.4,57.9 40.2,57.9 40.1,58 l -0.2,0.2 c -0.5,0.3 -1,0.7 -1.5,1.1 -0.5,0.5 -1,1 -1.6,1.3 0,0 -0.1,0.1 -0.2,0.1 0.1,-0.3 0.2,-0.6 0.2,-0.8 0.3,-0.6 0.4,-1.2 0.6,-1.9 0.1,-0.3 0.1,-0.6 0,-0.9 0,-0.2 -0.1,-0.4 -0.1,-0.6 C 37.2,56.3 37.1,56.1 37,56 l -0.7,-0.7 c -0.1,-0.1 -0.1,-0.1 -0.3,-0.1 -0.2,0 -0.5,0 -0.7,0.1 -0.1,0 -0.2,0.1 -0.3,0.2 -0.6,0.7 -1.2,1.3 -1.7,2.1 -0.2,0.3 -0.3,0.4 -0.5,0.7 -0.5,0.6 -1,1.1 -1.5,1.7 l -0.9,1 c 0,0 -0.1,0 -0.1,0.1 0.1,-0.2 0.2,-0.5 0.2,-0.7 l 0.1,-0.1 v -0.1 c 0.3,-0.6 0.4,-1.1 0.6,-1.7 l 0.1,-0.4 c 0.1,-0.2 0.2,-0.5 0.3,-0.7 0.1,-0.3 0.2,-0.6 0.1,-1 L 31.6,55.6 C 31.5,55.1 31.2,54.7 31,54.3 31,54.2 30.9,54.2 30.9,54.2 30.6,54 30.2,53.8 29.9,53.6 29.8,53.5 29.6,53.5 29.5,53.5 l -0.3,0.6 c -0.3,0.6 -0.7,1.2 -0.8,1.9 0,0.1 -0.1,0.1 -0.1,0.2 -0.4,0.8 -0.7,1.6 -1.1,2.4 -0.2,0.4 -0.3,0.8 -0.5,1.3 0,0.1 -0.1,0.2 -0.1,0.4 h -0.1 c -1.4,0.2 -1.9,0 -3.3,0.1 -0.2,0 -0.4,-0.2 -0.3,-0.4 0.1,-0.3 0,-0.6 0,-1 v -0.4 c -0.1,-0.2 -0.1,-0.4 -0.1,-0.7 -0.1,-0.3 -0.1,-0.6 -0.2,-0.8 l -0.3,-0.6 c -0.1,-0.4 -0.3,-0.6 -0.6,-0.8 -0.2,-0.1 -0.4,-0.3 -0.5,-0.4 -0.1,-0.1 -0.8,-0.7 -1,-0.7 -0.3,-0.1 -0.7,0 -0.9,0.1 -0.3,0.2 -0.6,0.4 -0.8,0.6 -0.1,0 -0.2,0.1 -0.2,0.1 -0.3,0.4 -0.4,0.9 -0.3,1.4 0.1,0.7 0.2,1.3 0.5,1.8 v 0.1 c 0,0.1 0,0.1 -0.1,0.2 -0.4,0.5 -0.8,1.1 -1.1,1.7 -0.3,0.5 -0.4,1 -0.5,1.6 -0.1,0.5 0,1.1 0,1.6 l 0.3,0.8 c 0.3,0.5 0.6,0.8 1.1,0.9 0.4,0.1 0.8,0.1 1.2,0 0.1,-0.1 0.2,-0.1 0.3,-0.1 0.3,-0.1 0.6,-0.3 0.8,-0.5 0,-0.1 0.1,-0.1 0.2,-0.2 l 0.2,-0.1 c 0.2,-0.1 0.3,-0.3 0.4,-0.5 0.2,-0.3 0.4,-0.5 0.5,-0.8 0.2,-0.5 0.4,-1 0.5,-1.4 0,-0.1 0.1,-0.1 0.1,-0.1 0,-0.1 0.1,-0.1 0.2,-0.1 h 0.1 c 0.8,0 2.5,0 3.7,-0.4 -0.1,0.5 -0.2,1 -0.2,1.5 -0.1,0.1 -0.1,0.3 -0.1,0.4 0.1,0.6 0.2,1.1 0.7,1.4 0.3,0.1 0.6,0.2 0.9,0.2 0.3,0 0.7,-0.2 1,-0.3 0.1,-0.1 0.3,-0.2 0.4,-0.3 0.1,0 0.1,-0.1 0.1,-0.1 0.1,-0.2 0.2,-0.3 0.3,-0.4 0.2,-0.2 0.4,-0.3 0.5,-0.6 0.1,-0.2 0.3,-0.3 0.4,-0.5 0,-0.1 0.1,-0.1 0.1,-0.1 0,-0.2 0.2,-0.3 0.3,-0.4 0.1,-0.1 0.2,-0.3 0.3,-0.4 0.3,0.1 0.4,-0.1 0.5,-0.4 v -0.1 c 0,-0.1 0.1,-0.1 0.1,-0.1 l 0.1,0.1 0.2,-0.3 c 0.1,-0.1 0.2,-0.3 0.3,-0.5 0.1,-0.2 0.3,-0.5 0.4,-0.7 0.2,-0.3 0.4,-0.5 0.7,-0.8 0.2,-0.3 0.4,-0.5 0.5,-0.9 0.1,-0.3 0.3,-0.4 0.4,-0.6 0.3,-0.2 0.6,-0.5 0.8,-0.8 0.1,-0.1 0.2,-0.1 0.3,-0.2 0.1,-0.1 0.2,-0.1 0.3,0 0.1,0.2 0,0.3 -0.1,0.4 -0.2,0.4 -0.4,0.7 -0.7,1.1 -0.8,1.2 -1.5,2.5 -2,3.9 -0.1,0.3 -0.2,0.6 -0.2,0.9 0,0.4 0.1,0.7 0.3,0.8 0.2,0.2 0.4,0.3 0.6,0.4 0.5,0.1 1,-0.1 1.5,-0.4 l 0.3,-0.3 c 0.3,-0.3 0.6,-0.5 0.8,-0.8 l 0.1,-0.1 C 36.6,62 37,61.8 37.2,61.5 l 0.2,-0.2 0.7,-0.6 c 0.1,-0.1 0.3,-0.2 0.4,-0.1 0.1,-0.1 0.2,-0.3 0.3,-0.4 0.2,-0.3 0.2,-0.3 0.2,-0.5 0.1,-0.1 0.3,-0.1 0.4,-0.2 0.1,0 0.3,-0.2 0.4,-0.3 v 0.2 c 0,0.1 0,0.2 -0.1,0.3 -0.3,0.7 -0.4,1.4 -0.6,2.1 -0.1,0.4 -0.1,0.8 0,1.2 0.2,0.4 0.6,0.7 0.9,1 0.1,0.1 0.8,0.2 1,0.2 0.3,0 1.5,-0.8 1.6,-1.2 h 0.1 c -0.2,0.7 -0.4,1.5 -0.6,2.2 -0.1,0.6 0.1,1.1 0.6,1.2 0.2,0 0.4,0 0.6,0.1 0.3,0 0.6,0 1,0.1 0.1,0 0.3,0 0.4,-0.1 0.2,-0.1 0.3,-0.1 0.4,-0.1 0.1,0 0.2,0 0.4,-0.2 0.2,-0.3 0.7,-2.1 1,-2.4 0,-0.1 0.1,-0.2 0.2,-0.3 0.1,-0.1 0.3,-0.3 0.4,-0.6 0.1,-0.3 0.3,-0.4 0.5,-0.7 0.3,-0.3 0.6,-0.7 0.9,-1 0.3,-0.4 0.8,-0.9 1.2,-1.3 0.2,-0.2 0.4,-0.4 0.5,-0.6 0.6,-0.7 0.5,0.7 0.4,1.3 0,0.4 0,0.7 -0.1,1.1 0,1.6 0.6,2.6 1.9,3 0.5,0.2 2,0.1 2.4,-0.1 l 0.3,-0.1 c 0.1,-0.1 0.3,-0.1 0.4,-0.3 0.3,-0.2 1.4,-1.5 1.6,-1.7 0.1,-0.1 0.2,-0.3 0.4,-0.6 0.1,0.5 0.2,0.7 0.8,1.1 0.2,0.1 0.8,0.3 1.1,0.3 0.3,-0.1 1,-0.1 1.4,-0.3 0.5,-0.3 1.2,-0.7 1.6,-1.1 V 62 c -0.3,1 -0.1,1.5 0,2.3 0.2,1 2.5,0.8 3,0.5 0.1,-0.1 0.1,-0.1 0.4,-0.1 0.1,-0.1 0.1,-0.1 0.3,-0.2 0.3,-0.1 0.3,-0.2 0.5,-0.4 0.3,-0.1 0.3,-0.2 0.5,-0.3 0.6,-0.4 1.3,-1.2 1.7,-1.7 -0.1,0.6 -0.1,1.1 -0.2,1.7 0,0.2 0.1,0.4 0.2,0.6 0.1,0.9 0.7,1.3 1,1.9 0.2,0.3 0.7,0.5 1,0.6 0.1,0.1 0.4,0.1 0.6,0.1 0.8,0 1.9,0.3 2.8,-0.4 0.1,-0.1 1.6,-1.6 1.8,-1.7 0.7,-0.6 0.9,-1 1.3,-1.7 0.1,-0.1 0.1,-0.2 0.2,-0.3 0.1,-0.1 0.1,-0.3 0.2,-0.3 0.1,0 0.1,-0.1 0.2,-0.1 0,-0.3 0.5,-1 0.6,-1.2 0.4,-0.7 0.6,-1.3 0.2,-1.2 -0.5,0.7 -0.7,1.3 -1.2,2 -0.4,0.5 -0.6,1 -1,1.4 -0.4,0.4 -0.8,0.8 -1.2,1.1 -0.2,0.1 -1.7,1.2 -1.9,1 -0.1,-0.1 -0.5,-0.1 -0.6,-0.3 -0.2,-0.4 -0.3,-0.5 -0.3,-0.9 0,-0.1 -0.1,-1.2 -0.1,-1.4 0,-0.6 0,-1 0.1,-1.5 0.3,-1.5 0.2,-1.8 1.1,-3.3 0.5,-0.8 1.1,-1.6 1.7,-2.5 0.3,-0.5 0.6,-1 1,-1.5 l 0.6,-1.1 c 0.3,-0.4 0.5,-0.9 0.7,-1.4 0.1,-0.3 0.3,-0.5 0.3,-0.8 0.1,-0.3 0.1,-0.7 0.2,-1 0.1,-0.5 0,-1 -0.3,-1.2 -0.2,-0.2 -0.5,-0.3 -0.8,-0.3 l -0.1,-0.1 z m -64.8,1 c -0.8,0 -1.7,0.1 -2.6,0.3 -0.7,0.2 -1.3,0.2 -2,0.4 l -1,0.2 C 6.1,50 5.6,50.3 5.2,50.2 5.1,50.2 4.9,50.3 4.9,50.5 4.8,50.8 4.6,51 4.6,51.3 4.5,51.8 4.4,52.4 4.5,52.8 v 0.6 c 0,0.4 0.1,0.7 0.5,0.8 0.2,0.1 0.4,0.1 0.5,0.1 0.4,-0.1 0.9,-0.2 1.4,-0.4 0.1,0 0.2,0 0.3,-0.1 L 6.9,54.7 C 6.6,55.5 6.4,56.3 6.1,57.1 5.9,57.7 5.7,58.4 5.5,59 l -1.2,3.5 -0.4,1.1 c -0.1,0.3 -0.1,0.3 -0.5,0.4 -0.6,0.2 0.3,0 -0.3,0.2 -0.5,0.1 -1,0.3 -1.5,0.4 -0.3,0.1 -0.6,0.2 -1,0.4 -0.2,0 -0.3,0.2 -0.4,0.4 -0.1,0.3 -0.3,0.7 -0.4,1.1 0,0.1 -0.1,0.2 0.1,0.2 0.1,0.2 0.1,0.4 0.1,0.7 0,0.2 0.1,0.3 0.2,0.4 0.3,0.1 0.6,0.3 1.1,0.2 h 0.2 c 0.4,-0.1 0.8,-0.1 1.3,-0.2 0.8,-0.1 0.1,-0.1 1,-0.3 0.2,0 0.4,-0.1 0.6,0 0.2,0.1 0.3,0 0.4,-0.1 C 5.1,66.9 5.2,67 5.6,66.9 5.9,67 6.4,66.8 6.7,66.5 L 6,66.7 V 66.6 L 6.8,66.2 C 8,65.6 9.3,64.8 10.5,64 c 0.7,-0.6 1.4,-1.2 2.1,-1.9 0.4,-0.4 0.8,-0.8 1.2,-1.3 0.5,-0.6 1,-1.2 1.4,-1.8 0.2,-0.3 0.4,-0.6 0.6,-1 0.4,-0.8 0.7,-1.6 1.1,-2.3 0.3,-0.7 0.5,-1.4 0.6,-2.1 0.1,-0.9 0.2,-1.7 -0.2,-2.4 C 17,50.6 16.5,50.2 15.9,49.9 15,49.5 14,49.4 13,49.3 h -0.8 z m 65.2,0.3 c 0.1,0 0.1,0.1 0,0.2 -0.1,0.4 -0.1,0.8 -0.3,1.3 l -0.9,1.8 c -0.8,1.6 -1,1.8 -1.9,3.3 -0.4,0.7 -0.7,1.1 -1.1,1.7 -0.4,0.4 -0.4,-0.3 -0.3,-0.5 0.3,-1 0.2,-0.5 0.5,-1.5 l 0.3,-0.9 c 0.3,-0.6 0.6,-1.2 0.8,-1.8 L 74.8,52 c 0.1,-0.4 0.3,-0.7 0.5,-1 0.2,-0.2 0.4,-0.5 0.6,-0.7 0.3,-0.4 0.6,-0.7 1,-0.8 0.1,-0.1 0.2,-0.1 0.3,-0.1 h 0.1 z m -65.6,4 c 0.7,0 1.4,0 2.1,0.2 l 1.2,0.3 c 0.1,0 0.2,0.2 0.1,0.4 -0.1,0.8 -0.5,1.7 -1,2.6 -0.6,1 -1.4,1.9 -2.3,2.8 -0.8,0.8 -1.7,1.5 -2.6,2.2 -2.5,2.1 -4.2,2.3 -2.6,-1 0.2,-0.5 0.2,-1 0.3,-1.4 0.3,-0.7 0.5,-1.5 0.7,-2.2 0.3,-0.8 0.6,-1.6 0.8,-2.4 0.1,-0.2 0.2,-0.5 0.4,-0.7 0,-0.1 0.1,-0.2 0.1,-0.2 0.1,-0.1 0.3,-0.1 0.4,-0.1 0.8,-0.2 1.5,-0.3 2.3,-0.3 z m 8.4,2 c 0.1,0 0.2,0 0.2,0.1 0.2,0.1 0.3,0.2 0.5,0.4 0.2,0.1 0.3,0.2 0.4,0.3 0.2,0.2 0.3,0.4 0.4,0.7 0.1,0.3 0.1,0.6 0.2,0.9 0.1,0.2 0.1,0.5 0,0.7 0.3,1.9 -1.2,2.5 -2,0.8 -0.7,-0.8 -1.5,-2.2 -0.7,-3.3 0.2,-0.2 0.6,-0.6 1,-0.6 z m 0.5,6.1 h 0.1 c 0.1,0 0.3,0.1 0.4,0.1 -0.1,0.2 -0.1,0.5 -0.3,0.7 -0.3,0.7 -0.6,1.3 -1.1,1.8 l -0.1,0.1 h -0.1 c -0.1,-0.1 -0.3,-0.2 -0.3,-0.3 0,-0.1 -0.1,-0.1 0,-0.1 v -0.5 c 0.2,-0.5 0.2,-0.8 0.5,-1.2 0.3,-0.4 0.5,-0.6 0.9,-0.6 z'
          />
        </svg>
      </div>
    )
  }
}

export default withTheme(BackgroundImage)
