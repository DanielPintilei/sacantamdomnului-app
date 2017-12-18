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
            d='M32-0.2C32.1 0.1 31.9 0 31.6 0L31.3 0C31.2 0 31.1 0.1 31 0.1 30.7 0.2 30.5 0.4 30.2 0.6 29.8 1 29.3 1.4 28.9 1.9 28.3 2.6 27.7 3.4 27.1 4.4 26.8 4.8 26.5 5.2 26.4 5.7 26.2 6 25.9 6.5 25.7 6.9 25.4 7.7 25.1 7.7 24.9 8.5 24.3 9.6 24.3 9.8 24 11 23.9 11.7 23.7 12.4 23.6 13.1 23.5 14.1 23.3 15 23.3 15.9 23.3 16.1 23.5 16.3 23.5 16.5 23.6 17.4 24.2 17.8 24.5 18.5 24.7 18.8 25.3 19 25.5 19.1 25.7 19.2 25.9 19.2 26.1 19.2 26.9 19.2 28.1 19.5 28.9 18.8 29 18.6 30.6 17.2 30.7 17 31.4 16.4 31.6 15.9 32 15.2 32.1 15.1 32.2 15 32.2 14.9 32.3 14.7 32.4 14.6 32.4 14.6 32.5 14.6 32.6 14.5 32.6 14.4 32.6 14.1 33.1 13.4 33.2 13.2 33.3 14 33.8 14.7 34.6 15 34.8 15.1 34.9 15.1 35 15.2 35.4 15.4 35.8 15.4 36.2 15.3 36.4 15.2 36.7 15.2 36.8 15L36.9 15 37.2 14.8C37.4 14.6 37.6 14.5 37.8 14.4 38 14.6 38.2 14.8 38.5 14.9L38.7 15C39 15.2 39.3 15.3 39.7 15.4L40 15.4C40.2 15.3 40.5 15.3 40.7 15.2 40.9 15.1 41.2 15.1 41.4 15L42 14.7C42.2 14.5 42.4 14.4 42.6 14.1 42.6 14 42.7 14 42.8 14L43.1 13.7C43 14 43 14.3 42.9 14.6 42.9 14.8 42.8 15 42.8 15.2 42.7 15.5 43.1 16.1 43.3 16.3 43.5 16.5 44.4 17.1 44.4 17.3 44.6 17.7 45 17.8 45.4 17.6 45.6 17.6 45.8 17.5 45.9 17.5L46.2 17.5C46.4 17.5 46.5 17.4 46.5 17.3 46.9 17 47.1 16.7 47.3 16.3 47.4 16 47.6 15.8 47.7 15.6 47.8 15.4 47.9 15.3 47.9 15.1L47.9 14.9C48 14.6 48.1 14.4 48.3 14.1 48.5 13.9 48.7 13.6 48.8 13.3 48.9 13.2 48.9 13.1 49 13.1 49.3 12.6 49.5 12.2 49.7 11.7 49.9 11.2 49.9 11.2 50.2 10.9 50.5 11.4 50.6 11.5 50.9 12 51 12.1 51.4 12.5 51.5 12.5L51.9 12.8C52 12.8 52.7 13.4 53 13.2 53.1 13.2 53.5 13.1 53.8 13 53.7 13.2 53.7 13.9 53.7 14.2 53.7 14.4 53.7 14.5 53.8 14.7 53.8 15.1 54 15.5 54.1 15.9 54.4 16.2 54.7 16.4 54.9 16.5 55.3 16.7 55.7 17.1 56.1 16.9 57.4 17.4 59.4 15.7 59.7 15.3 60 15.1 60.2 14.9 60.4 14.7L60.4 15.7C60.4 16.1 60.5 16.8 60.6 17.1 60.7 17.4 60.9 17.6 61 17.9 61.3 18.5 62.2 19.4 62.8 19.5 63.1 19.6 63.6 19.6 63.9 19.5 64.1 19.5 65 19.2 65.2 19 65.5 18.8 66.2 18 66.6 17.8 66.8 17.7 68.1 15.9 68.2 15.7L69 14.2 69.6 12.8C69.7 12.7 70 11.8 69.9 11.7 69.9 11.5 70 11.5 70 11.4 70 11.3 69.8 11.4 69.7 11.4L69.1 12.6C68.8 13.1 68.7 13.7 68.4 14.2 68.1 14.8 67.1 15.9 66.7 16.3 66.5 16.5 65.6 17.1 65.5 17.3 65.2 17.5 64.7 17.5 64.4 17.5L64.3 17.5 64 17.2C63.8 16.8 63.7 16.3 63.7 15.9 63.6 14.8 64 12.6 64.3 11.9 64.5 11.7 64.4 11.4 64.5 11.2 64.7 11 64.8 10.7 64.9 10.4L65.2 9.5 65.4 9.2C65.8 8.2 66.2 7.3 66.6 6.3L66.7 6.2C66.8 6.1 66.8 6 66.9 6L67.6 5.9C67.7 5.9 67.9 5.9 68 5.8 68.2 5.7 68.4 5.7 68.6 5.7 68.9 5.7 69.3 5.6 69.6 5.5L70.2 5.2 70.4 5 70.5 4.8C70.3 4.8 70.1 4.7 69.9 4.7L68.4 4.7 67.3 4.8C67.2 4.8 67.1 4.8 67 4.7L67 4.5 67.2 3.8 67.3 3.3 67.3 2.9C67.3 2.7 67.2 2.6 67.2 2.4 67.2 2.1 67.1 1.8 67 1.5 66.9 1.2 66.7 1 66.3 1.1L66.2 1.1C66 1.1 65.8 1.2 65.6 1.1 65.4 1.1 65.3 1.1 65.2 1.2L64.9 1.5C64.5 1.8 64.2 2.3 63.9 2.7 63.6 3.2 63.4 3.8 63.1 4.4 63 4.7 62.9 4.9 62.8 5.1 62.7 5.3 62.6 5.3 62.5 5.3 62.2 5.3 61.9 5.4 61.7 5.4L60.5 5.7C60.5 5.7 60.4 5.7 60.4 5.8 60.4 6 60.5 6 60.6 6.1L61.1 6.4C61.3 6.6 61.4 6.5 61.7 6.6 62.4 6.8 61.6 7.8 61.5 8.5L61.2 9.4C61.1 9.6 61 9.8 61 10L60.8 10.6C60.5 11.6 60.3 12.2 60.1 12.7 58.7 14.2 59.6 14.5 57.2 15.4 57 15.4 56.9 15.5 56.7 15.4 56.5 15.3 56.4 15.2 56.3 15.2 56.2 15.1 56.1 15 56.1 14.8 56.1 14.5 56.2 13.1 56.2 12.8 56.2 12.3 56.2 12.4 56.5 11.8 56.5 11.7 56.6 11.7 56.6 11.6 56.6 11.5 56.6 11.6 56.5 11.6 56.6 11.5 56.7 11.3 56.7 11.2L56.9 10.8C57.1 10.3 57.4 10 57.5 9.6 57.6 9.3 57.6 9.1 57.4 9 57.3 8.9 57 8.7 56.9 8.6 56.6 8.4 55.9 8.9 55.6 9 55.5 9.1 55.4 9.1 55.4 9.2L55.2 9.2C55.1 9.4 55.1 9.5 55.1 9.6 55.2 9.8 55.1 9.9 55 10.1 55 10.1 54.9 10.2 54.9 10.3 54.7 10.7 54.2 11.4 54 11.9 53.7 12.5 54.3 11.9 54.3 11.9 54.2 12 54.2 12.1 54.1 12.2 53.9 12.4 53.7 12.6 53.5 12.6 53.2 12.7 53.1 12.8 52.8 12.9 52.2 13 51.9 12.2 51.6 12 51.3 11.2 51.1 11 51 9.9 51 9.8 50.9 9.8 50.9 9.7 50.9 9.6 50.8 9.6 50.8 9.5 50.7 9.5 50.6 9.4 50.5 9.4 50.3 9.4 50.4 9.4 50.3 9.3 50.2 9.2 49.7 9.1 49.6 9.1 49.3 9.2 49.4 9.2 49.4 9.7 49.4 9.8 49.6 10.5 49.6 10.6 49.4 11.3 49.3 10.8 49 11.5 48.9 11.7 48.8 12 48.7 12.1 48.6 12.4 48.4 12.7 48.2 13L47.8 13.6C47.4 14.2 47 14.7 46.6 15.2L46.4 15.3C46.4 15.1 46.2 15.1 46.3 14.9L46.3 14.8 46.2 14.6C46.2 14.4 46.2 14.3 46.1 14.1L46.1 14 46 14.1C45.9 14.3 45.9 14.5 45.9 14.7L45.9 14.8 45.7 14.8C45.6 14.7 45.6 14.6 45.6 14.5L45.6 14 45.6 13.1C45.6 13.1 45.6 13 45.7 13 45.7 12.9 45.8 13 45.8 13L45.9 13.1 46 13.5 46.1 13.5C46.2 13.3 46.2 13.3 46.2 13.1 46.2 12.9 46.1 12.7 46.2 12.4L46.2 11.5 46.2 11.3C46.2 11 46.2 10.6 46.1 10.2L46.1 9.8C46.1 9.5 46.1 9.1 45.9 8.8 45.8 8.6 45.9 8.5 45.9 8.3L46.2 8.3C46.2 8 46 7.9 45.9 7.6 45.7 7.4 45.5 7.3 45.3 7 45.3 7 45.2 6.9 45.1 6.9 44.9 6.9 44.9 6.9 44.8 6.7L44.6 6.5C44.5 6.4 44.4 6.4 44.3 6.4 44.2 6.5 44.2 6.5 44.2 6.6L44.2 7C44.1 7.3 44.1 7.6 44.1 7.8 44 8.3 43.9 8.7 43.8 9.1 43.6 9.8 43.5 10.5 43.3 11.3 42.9 11.7 42.5 12.5 42.2 12.8L41.7 13.2 41.1 13.6 40.5 13.9C40.3 14 40.1 14 39.9 14.1 39.8 14.1 39.7 14 39.6 13.9 39.5 13.7 39.4 13.4 39.3 13.2 39.3 13 39.3 12.8 39.4 12.6L39.8 11.8C39.8 11.7 39.9 11.7 39.9 11.6 39.9 11.3 39.8 11 39.6 10.8L39.4 10.7C39.2 10.5 39 10.5 38.8 10.5L38.2 11.5C38 11.7 37.9 11.9 37.7 12.1L37.5 12.4C37.4 12.6 37.2 12.7 37.1 12.9 36.8 13.2 36.4 13.5 36.1 13.7L36 13.8 36 13.7C36.1 13.4 36.2 13.1 36.3 12.7 36.3 12.6 36.4 12.6 36.4 12.5L36.7 12.1C36.9 11.8 37.1 11.5 37.4 11.2L37.7 10.8C38 10.4 38.3 10.1 38.7 9.8 38.9 9.6 39.2 9.5 39.4 9.3 39.7 9.1 39.7 9 39.7 8.7L39.6 8.5C39.5 8.3 39.3 8.2 39.1 8 39.1 8 39 7.9 38.9 7.9 38.7 7.9 38.6 7.7 38.5 7.7L38.4 7.7C38.3 7.6 38.2 7.6 38.1 7.5 38 7.5 38 7.5 37.9 7.4 37.7 7.3 37.4 7.3 37.3 7.2L37.2 7.2C37 7.2 36.8 7.2 36.6 7.3 36.5 7.3 36.4 7.3 36.3 7.4 35.9 7.7 35.5 8 35.2 8.3 34.8 8.8 34.3 9.4 33.9 10L33.8 10.1C33.5 10.4 33.3 10.8 33.1 11.2 33 11.3 33 11.4 32.9 11.6 32.5 12.2 32.3 12.8 31.8 13.4 31.4 14 31.2 14.4 30.8 14.8 30.4 15.2 30 15.6 29.6 15.9 29.4 16.1 27.9 17.1 27.6 17 27.4 16.9 27 16.8 27 16.7 26.8 16.3 26.7 16.2 26.7 15.8 26.7 15.7 26.6 14.6 26.5 14.4 26.5 13.8 26.5 13.4 26.6 12.8 26.9 11.3 26.8 11 27.7 9.4 27.6 9.5 27.6 9.6 27.5 9.7 27.1 10.1 27.1 9.4 27.2 9.2 27.5 8.2 27.4 8.7 27.7 7.7L28 6.8C28.3 6.2 28.6 5.6 28.8 5L29.2 4.1C29.3 3.7 29.5 3.4 29.7 3.1 29.9 2.9 30.1 2.6 30.3 2.4 30.6 2 30.9 1.7 31.3 1.6 31.4 1.5 31.5 1.5 31.6 1.4L31.7 1.4 31.7 1.5C31.6 1.9 31.5 2.4 31.4 2.8 31.1 3.4 30.8 4 30.5 4.7 29.7 6.3 29.5 6.6 28.6 8 28.4 8.3 28.2 8.6 28.1 8.9 28.5 8.2 28.9 7.5 29.4 6.9 29.7 6.4 30 5.8 30.4 5.3L31 4.2C31.3 3.7 31.6 3.3 31.8 2.8 32 2.5 32.1 2.3 32.1 2 32.2 1.7 32.2 1.3 32.3 1 32.4 0.4 32.3 0 32-0.2zM27.7 9.4C27.8 9.2 27.9 9.1 28.1 8.9 27.9 9.1 27.8 9.2 27.7 9.4 27.7 9.4 27.7 9.4 27.7 9.4zM20.8 0.8C19.6 0.8 18.3 1 17 1.4 16.7 1.6 16.3 1.6 16 1.8 14.8 2.4 13.7 3.1 12.9 4.2 12 5.3 11.4 6.8 12 8 12.3 8.7 12.8 9.3 13.5 9.8 14.1 10.3 14.6 10.7 15.3 11 16.4 11.6 17.4 12.2 18.3 13 18.9 13.4 19.1 14 19.3 14.7 19.4 14.9 19.3 15.1 19 15.3 18.7 15.6 18.2 15.9 17.9 16 17.4 16.3 16.8 16.5 16.3 16.7 15.8 16.9 15.2 17 14.7 17.2 14.4 17.3 14.1 17.2 13.9 17.1 13.7 17 13.6 16.9 13.6 16.7 13.6 16.4 13.6 16.2 13.7 15.9 13.8 15.5 14 15.1 14.3 14.7L14.8 14C14.9 13.9 14.9 13.8 14.9 13.7L14.9 13.3C14.8 13.3 14.8 13.3 14.6 13.2L15 13C14.8 12.9 14.7 13.2 14.5 13.2 14.1 13.1 13.9 13.2 13.7 13.7 13.6 13.8 13.6 13.9 13.5 14 13 14.4 12.7 14.9 12.3 15.3 11.9 15.8 11.7 16.3 11.5 16.8 11.2 17.6 11.3 18.2 11.8 18.7 12.3 19.2 13 19.5 13.8 19.6 14.3 19.7 14.9 19.7 15.5 19.5 15.8 19.4 16 19.3 16.2 19.2 16.5 19 16.7 19 17 19 17.3 19 17.7 19 18 18.8 18.7 18.5 19.3 18.2 19.8 17.7 20 17.6 20.1 17.4 20.2 17.3L20.8 16.4C21.3 15.5 21.4 14.7 21.2 13.9 20.9 12.8 20.4 11.9 19.6 11.2 19 10.7 18.5 10.3 17.9 9.9 17.8 9.9 17.7 9.8 17.6 9.7 17.2 9.4 16.7 9 16.2 8.7 15.1 7.9 13.9 6.4 16 5.9L17 5.7C17.3 5.6 17.6 5.6 17.9 5.5 18.9 5.5 19.9 5.6 20.8 5.7 21.3 5.8 21.7 5.9 22.2 6 22.3 6.1 22.5 6.1 22.7 6 23 5.9 23.3 5.8 23.6 5.6 23.8 5.5 23.9 5.3 24.1 5.1 24.2 4.9 24.4 4.7 24.5 4.5 24.7 4.3 24.8 4 24.8 3.8 24.8 3.3 25 2.8 25.2 2.3 25.3 2.1 25.3 2 25.3 1.9L25.3 1.7C25.4 1.5 25.3 1.4 25.1 1.2 24.8 1 24.3 0.9 23.8 0.9L22.1 0.9C21.7 0.9 21.3 0.8 20.9 0.8L20.8 0.8zM66.2 2L66.3 2 66.3 2.1C66.4 2.1 66.4 2.1 66.4 2.2 66.4 2.5 66.5 2.7 66.4 3L66.3 3.7 66.2 4.1 66 5C65.8 5.5 65 5.5 65.1 4.7 65.2 4.4 65.3 4.1 65.3 3.8L65.5 3.4 65.6 3.1C65.7 2.8 65.8 2.6 65.9 2.3 66 2.1 66.1 2.1 66.2 2zM37.2 4.9C37.1 4.9 37.1 5.1 37 5 36.8 5.1 37 5.5 37 5.6 37.1 5.9 37.2 6 37.3 6 37.3 6.2 37.5 6.3 37.7 6.4 37.7 6.4 37.8 6.6 37.9 6.6 38 6.7 38 6.8 38.1 6.8 38.3 6.9 38.3 6.9 38.5 6.9L38.7 7C38.8 7 38.9 7 38.9 7.1 39 7.1 39 7 39.1 7.1L39.3 7.1 39.4 7.1 39.5 7.1C39.6 7.1 39.6 7.1 39.7 7.1L39.8 7.1C39.9 7.1 40.1 7 40.1 7 40.2 6.9 40.3 6.9 40.3 6.8L40.3 6.9C40.4 6.8 40.5 6.8 40.5 6.7 40.5 6.6 40.6 6.6 40.6 6.5L40.6 6.6C40.6 6.5 40.7 6.5 40.7 6.4 40.7 6.3 40.7 6.3 40.8 6.3 40.9 6.3 40.9 6.2 40.9 6.2L41 6.2C41 6.1 41.1 6.1 41.1 6.1L41.1 6 41 6 41 5.9 40.9 5.9 40.9 5.8 40.8 5.8 40.7 5.8C40.7 5.9 40.6 5.9 40.6 5.9 40.5 5.7 40.4 5.9 40.4 5.9L40.3 6C40.2 6.1 40.1 6.1 40 6.1 39.8 6.2 39.7 6.2 39.6 6.2 39.5 6.2 39.2 6.1 39.1 6.1 38.7 6.2 38.4 5.8 38.2 5.8L37.7 5.5C37.6 5.3 37.3 5.2 37.3 5 37.3 4.9 37.2 4.9 37.2 4.9zM57.1 5.4C57 5.4 57 5.5 56.9 5.5L56.7 5.8C56.6 6 56.5 6.1 56.5 6.3 56.5 6.3 56.4 6.4 56.4 6.5 56.3 6.7 56.2 6.7 56.2 6.9 56.2 7 56.1 7.1 56.1 7.2L56 7.3 56.3 7.3C56.4 7.3 56.5 7.3 56.5 7.4 56.6 7.5 56.7 7.5 56.9 7.4 57 7.3 57.1 7.3 57.1 7.3 57.3 7.3 57.5 7.1 57.5 7.1L57.8 6.8C57.9 6.7 57.9 6.7 57.9 6.6 57.9 6.5 58 6.4 58.1 6.3 58.2 6.2 58.2 6.1 58.3 6.1 58.2 5.9 58 5.8 57.8 5.7 57.7 5.7 57.5 5.6 57.4 5.6L57.3 5.6 57.2 5.6 57.1 5.6 57.3 5.4 57.2 5.4 57.1 5.4zM65.3 6.6C65.6 6.6 65.5 7.1 65.3 7.6 65 8.1 64.9 8.4 64.7 9 64.3 10.1 63.4 11.9 64 9.5 64.3 8.6 64.4 7.9 64.7 7 65 6.8 65.2 6.7 65.3 6.7L65.3 6.6zM45.8 11.8C45.8 11.8 45.9 11.8 45.9 11.9L45.9 12.1 45.8 12 45.8 11.9 45.8 11.8zM46 15.1C46.1 15.1 46.1 15.2 46 15.2L46 15.1zM46 15.5L46 15.6 45.9 15.6 46 15.5zM48.6 27C48.3 27 47.8 27.2 47.6 27.4 47.4 27.6 47 28 46.8 28.1 46.6 28.2 46.4 28.3 46 29 45.8 29.2 45.8 29.4 45.6 29.7 44.5 31.8 43 35.2 42.9 35.7 42.9 35.8 42.8 35.9 42.8 36 42.4 36.9 42.4 37 42.2 37.6 42.1 37.9 42.1 38.1 42 38.4 42 38.5 41.9 38.6 41.9 38.6 41.8 38.8 41.8 38.9 41.8 39 41.7 39.1 41.7 39.2 41.7 39.4 41.6 39.6 41.6 39.7 41.6 39.8 41.4 40.4 41.3 41.1 41.1 41.7 41 42.1 40.9 42.6 41 43L41 43.1C40.9 43.5 41 44 41 44.4 41 44.8 41 45.1 41.1 45.4L41.2 45.7C41.2 46 41.4 46.3 41.5 46.5L41.8 46.8C42 46.9 42.2 47 42.3 46.9L42.5 46.8C42.6 46.8 42.6 46.7 42.6 46.7 42.7 46.7 42.8 46.6 42.9 46.7 43.1 46.7 43.2 46.6 43.3 46.4 43.5 46 43.7 45.7 43.8 45.3L43.9 45.1C44 45 44.1 44.9 44.1 44.7L44.1 44.5C44.3 44.2 44.4 43.9 44.5 43.5 44.5 43.3 44.6 43.1 44.7 42.9 44.8 42.8 44.8 42.6 44.8 42.5L44.8 42.4 44.9 42.4C44.9 42.2 45 42.1 45 42 45 41.8 45 41.7 45.1 41.6 45.1 41.4 45.2 41.2 45.2 41 45.2 40.9 45.2 40.7 45.3 40.6L45.3 39.7 45.3 39.4C45.3 38.9 45.3 38.3 45.2 37.7 45 36.6 47.3 38.4 49.8 37.5L50.3 37.2 50.5 37C50.5 37.3 50.5 37.6 50.4 37.8 50.4 37.9 50.4 38.1 50.5 38.2 50.5 38.5 50.6 38.9 50.8 39.2 51 39.5 51.3 39.7 51.5 39.8 51.9 40 52.2 40.3 52.6 40.2 53.7 40.6 55.5 39.1 55.7 38.8 56.1 38.5 56.4 38.1 56.7 37.6 56.7 37.7 56.8 37.9 56.8 38 56.9 38.2 57 38.4 57.2 38.5 57.6 38.9 57.8 39.3 58.7 39.7 59 39.8 60.6 40.1 60.9 40.1 61.2 40.1 61.5 40 61.8 39.9L62 39.8C62.3 39.7 62.6 39.6 62.8 39.5 63 39.4 63.1 39.3 63.2 39.2L63.5 39C63.6 38.9 63.7 38.8 63.9 38.7 64.2 38.5 64.4 38.3 64.6 38 64.7 37.8 64.9 37.7 65.1 37.6L65.4 37.3C65.3 37.3 65.3 37.2 65.3 37.2 65.3 37.1 65.5 37 65.5 36.9L65.3 37 65.4 36.8 65.7 36.5C65.8 36.3 65.9 36.1 66.1 36 66.2 35.9 66.2 35.9 66.2 35.8 66.3 35.6 66.4 35.4 66.4 35.2 66.2 35.3 66.2 35.4 66.1 35.5 65.9 35.8 65.6 36.1 65.3 36.4L64.8 36.9 64.7 37C64.3 37.4 63.9 37.7 63.4 38.1 62.8 38.5 62.2 38.9 61.6 39.1 61.5 39.1 60.7 39.3 60.6 39.2 60.2 39.2 59.8 38.7 59.4 38.4 59.3 38.3 59.1 37.7 59 37.6 58.9 37.5 58.9 37.3 58.9 37.2L58.9 36.7C58.9 36.7 58.8 36.7 58.8 36.6L58.9 36.1 59 36.1 59 36.3 59.1 36.3C59.1 36.1 59.1 36.1 59.2 36.1 59.3 36.1 59.3 36 59.3 35.9 59.3 35.8 59.4 35.8 59.4 35.8 59.5 35.8 59.5 35.7 59.5 35.7 59.5 35.5 59.6 35.4 59.6 35.3 59.7 35.2 59.8 35.2 59.8 35.3L60.1 35.9C60.1 36 60.2 36 60.1 36.1 60.1 36.1 60.1 36.2 60.2 36.2 60.4 36.3 60.5 36.5 60.7 36.5 60.8 36.6 60.8 36.6 60.9 36.6 61.1 36.6 61.2 36.6 61.4 36.5 61.6 36.4 61.8 36.3 61.8 36.1 61.9 35.9 62 35.8 62.1 35.6 62.2 35.4 62.3 35.2 62.4 35.1 62.6 34.8 62.7 34.5 62.8 34.1 62.9 33.8 62.9 33.5 62.8 33.2 62.8 33.1 62.7 33 62.7 33 62.5 32.8 62.4 32.6 62.3 32.4 62.2 32.3 62.2 32.2 62.1 32.1 61.9 31.9 60.9 31.7 60.6 31.6 60.5 31.5 60.5 31.4 60.4 31.4 60.3 31.3 60.2 31.4 60.2 31.3 60.1 31.2 60 31.2 59.9 31.2L59.6 31.3C59.2 31.6 58.8 31.9 58.4 32.3 58 32.7 57.7 33 57.4 33.5 57.1 33.9 56.9 34.3 56.7 34.8 56.6 35 56.5 35.1 56.5 35.4 56.6 35.2 56.7 35 56.8 34.7 56.9 34.5 56.9 34.5 57.1 34.4 57.1 34.6 57.1 34.6 57 34.8 56.7 35.4 56.6 35.9 56.5 36.5 56.5 36.6 56.4 36.6 56.4 36.6 55.2 37.9 55.9 38.2 53.8 39 53.6 39 53.5 39.1 53.4 39 53.2 38.9 53.1 38.8 53 38.8 52.9 38.7 52.8 38.6 52.8 38.4 52.8 38.2 52.9 36.9 52.9 36.6 52.9 36.2 52.9 36.2 53.1 35.7 53.1 35.6 53.2 35.6 53.2 35.5 53.3 35.2 52.8 36.2 52.9 35.9 53 35.7 53.1 35.4 53.2 35.1L53.3 34.7C53.5 34.3 53.7 34 53.8 33.6 53.9 33.3 53.9 33.2 53.7 33 53.6 32.9 53.3 32.8 53.3 32.7 53 32.5 52.4 33 52.1 33.1L51.9 33.3 51.7 33.3C51.6 33.5 51.6 33.6 51.6 33.7 51.7 33.9 51.6 34 51.5 34.1L51.4 34.2C51.2 34.6 50.8 35.1 50.6 35.6 50.5 35.7 50.5 35.7 50.5 35.8 50.2 36 49.7 37 49.4 37L49.1 37.2C49.1 37.2 49 37.2 48.8 37.3L48.4 37.4C48.1 37.5 47.7 37.3 47.3 37.3 47.1 37.4 46.2 36.9 45.9 37 45.5 36.9 45.7 36.4 45.8 36.1 46.1 35.2 45.9 35.6 46.3 34.8 46.5 34.5 46.6 34.1 46.8 33.7 47 33.2 47.3 32.6 47.5 32 47.6 31.7 47.7 31.5 47.7 31.3L48.3 29.8C48.4 29.5 48.6 29.2 48.7 28.9 49.1 28 49.4 29 49.3 29.5 49.2 30.2 49.1 30.7 48.9 31.3 48.7 31.7 48.5 32.2 48.3 32.6 48.2 32.8 48.1 33 48 33.3L48.6 33C48.8 32.9 48.9 32.8 48.9 32.7 49.5 31.9 49.9 31.1 50.2 30.3 50.4 29.9 50.4 29.6 50.3 29.1 50.4 28.7 50.1 28.3 50.1 28L49.9 27.8C49.6 27.6 49.4 27.3 49 27.3 48.9 27.3 48.8 27.3 48.7 27.2 48.6 27.2 48.5 27.1 48.4 27.2L48.6 27zM53.6 29.8C53.5 29.8 53.5 29.9 53.4 29.9L53.2 30.1C53.1 30.3 53 30.4 53 30.5L52.9 30.6C52.8 30.7 52.8 30.8 52.7 30.9 52.7 31 52.6 31.1 52.6 31.2L52.5 31.3 52.8 31.3C52.9 31.3 52.9 31.3 53 31.4 53.1 31.5 53.2 31.5 53.4 31.4 53.5 31.3 53.5 31.3 53.6 31.3 53.7 31.3 53.9 31.2 54 31.1L54.3 30.8 54.4 30.7C54.4 30.6 54.5 30.5 54.5 30.5L54.7 30.3C54.6 30.1 54.5 30 54.3 29.9 54.2 29.9 54.1 29.8 54 29.8L53.9 29.8 53.8 29.8 53.7 29.8 53.6 29.8zM31.2 30C31.1 30 31 30.1 30.9 30.2 30.8 30.3 31 30.5 31 30.6 31.1 30.7 31.1 30.8 31.2 30.9 31.2 30.9 31.3 31 31.4 31.1 31.4 31.2 31.5 31.2 31.7 31.4 31.7 31.4 31.7 31.5 31.8 31.5 31.9 31.6 32 31.6 32.1 31.7 32.3 31.8 32.4 31.8 32.6 31.9L32.7 31.9 32.8 31.9 33.1 31.9 33.2 31.9 33.3 31.9 33.4 31.9C33.4 31.9 33.4 31.8 33.5 31.9L33.6 31.9C33.6 31.9 33.7 31.9 33.7 31.8 33.8 31.8 33.9 31.7 34 31.7 34.1 31.6 34.2 31.6 34.2 31.5L34.2 31.6C34.3 31.5 34.3 31.5 34.3 31.4L34.4 31.3C34.4 31.3 34.5 31.3 34.5 31.2 34.5 31.1 34.5 31 34.6 31 34.7 31 34.7 31 34.7 31 34.8 30.9 34.7 30.8 34.7 30.8L34.7 30.7C34.6 30.6 34.5 30.6 34.5 30.6 34.4 30.6 34.4 30.6 34.4 30.7 34.4 30.8 34.3 30.8 34.3 30.8 34.2 30.8 34.1 30.8 34.1 30.8L34 30.9 34 30.9C33.9 31 33.9 31 33.8 31L33.6 31 33.5 31.1C33.4 31.2 33.2 31.1 33 31.1 32.6 31 32.5 31 32.3 30.9 32.1 30.8 31.9 30.6 31.6 30.4 31.5 30.2 31.3 30.3 31.3 30.1 31.3 30 31.2 30 31.2 30zM22 30.3L21.8 30.4C21.7 30.4 21.7 30.4 21.7 30.5L22 30.3zM21.7 30.5L21.5 30.6C21.5 30.6 21.5 30.6 21.6 30.6L21.7 30.5C21.7 30.5 21.7 30.5 21.7 30.5zM21.6 30.6L21.5 30.7C21.4 30.7 21.4 30.7 21.4 30.8 21.3 31 21.1 31.1 21 31.3L20.8 31.7C20.7 31.8 20.7 31.9 20.6 31.9L20.4 32.3C20.3 32.4 20.3 32.6 20.2 32.7 20.3 32.8 20.2 33 20.2 33.1 20.1 33.3 20 33.4 20.1 33.5 20 33.6 20.1 33.7 20 33.7 20 34.1 20.5 36 20.7 36.4 20.7 36.5 20.8 36.6 20.8 36.7 21.1 37.1 21.3 37.6 21.5 38.2 21.8 39 22 39.2 21 40.1 20.5 40.5 20.1 41.1 19.7 41.6 19.5 41.9 19.3 42.2 19.2 42.5 19.1 42.6 19.1 42.8 19.1 42.9 19.2 43.2 19.2 43.4 19.3 43.6 19.4 43.7 19.4 43.9 19.5 44 19.6 44.2 19.7 44.3 19.9 44.1L19.6 43.8C19.5 43.7 19.5 43.6 19.5 43.5 19.6 43.4 19.6 43.2 19.6 43.1L19.9 42.8 20.2 42.5C20.3 42.3 20.4 42.2 20.6 42.1 20.7 42.1 20.8 42 20.9 41.9 21.1 41.7 21.6 41.1 21.9 41 22 41 22 41.1 22 41.2L22 41.3C21.9 41.6 21.9 41.8 21.8 42 21.7 42.2 21.6 42.5 21.5 42.7 21.5 42.8 21.4 42.8 21.4 42.9 21.2 43.2 21.1 43.4 20.8 43.6L20.5 43.9 20.5 43.9C20.6 43.9 20.6 43.9 20.7 43.8 20.7 43.7 20.8 43.7 20.9 43.7 20.9 43.8 20.9 43.8 21 43.8L21 43.9C21.2 43.7 21.2 43.7 21.3 43.7 21.1 43.9 21 44.1 20.9 44.3L21 44.2C21.2 44.2 21.3 44.1 21.5 43.9L21.6 43.8C21.8 43.7 22 43.6 22.1 43.5L22.3 43.2C22.5 43 23.2 42.3 23.3 42 23.4 41.8 23.5 41.7 23.6 41.5L23.7 41.4C23.8 41.4 23.8 41.3 23.8 41.3 23.9 41.1 23.8 40.9 23.9 40.7L23.9 40.6 23.9 40.4C24.1 39.8 24.1 39.9 24 39.4 24 38.7 24.8 38.7 25.3 38.3L25.6 38.1C25.9 37.9 26.1 37.7 26.4 37.5L26.5 37.4 27 37 27.3 36.7C27.4 36.6 27.4 36.5 27.5 36.4 27.6 37.1 28 37.6 28.7 37.9 28.8 38 29 38 29.1 38.1 29.4 38.3 29.8 38.3 30.2 38.2 30.4 38.1 30.6 38.1 30.8 37.9L30.9 37.9 31.2 37.7C31.4 37.6 31.5 37.5 31.7 37.4 31.9 37.6 32.1 37.7 32.3 37.8L32.4 37.9C32.7 38.1 33 38.2 33.3 38.3L33.5 38.3C33.7 38.2 33.9 38.2 34.1 38.2 34.3 38.1 34.5 38.1 34.7 38.1 34.9 38 35 38 35.2 37.8 35.4 37.6 35.6 37.5 35.7 37.3 35.7 37.2 35.8 37.2 35.8 37.2L36.1 36.9C36.1 36.8 36.2 36.8 36.3 36.7L36.6 36.4C36.7 36.4 36.7 36.3 36.8 36.3 36.9 36.2 37.2 35.6 37.2 35.4 37.1 35.3 36.9 35.2 36.8 35.1L36.7 35.2C36.4 35.5 35.9 36.4 35.5 36.7L35.1 37.1 34.5 37.4C34.3 37.5 34.2 37.6 34 37.7 33.8 37.8 33.6 37.8 33.5 37.8 33.4 37.8 33.3 37.7 33.3 37.7 33.2 37.5 33.1 37.3 33.1 37.1 33.1 36.9 33.1 36.7 33.2 36.6L33.6 35.9C33.6 35.8 33.7 35.8 33.7 35.8 33.7 35.5 33.6 35.3 33.5 35.1L33.3 34.9C33.1 34.7 33 34.7 32.7 34.7L32.2 35.6C32.1 35.8 31.9 36 31.7 36.2L31.5 36.4C31.4 36.6 31.3 36.7 31.1 36.8 30.8 37 30.5 37.3 30.3 37.5L30.2 37.6 30.2 37.5C30.3 37.2 30.4 36.9 30.5 36.7 30.5 36.6 30.6 36.6 30.6 36.5L30.9 36.1C31.1 35.8 31.3 35.5 31.5 35.3L31.8 35C32 34.7 32.4 34.4 32.6 34.1 32.8 33.9 33 33.8 33.2 33.7 33.4 33.6 33.5 33.4 33.4 33.2L33.3 33C33.2 32.8 33 32.7 32.9 32.5L32.8 32.4C32.7 32.4 32.6 32.3 32.4 32.3L32.3 32.3C32.2 32.2 32.1 32.2 32 32.2 31.9 32.2 31.9 32.2 31.8 32.1 31.6 32 31.4 32 31.3 32L31.2 32C31 32 30.9 32 30.7 32.1 30.6 32.1 30.5 32.1 30.5 32.2 30.1 32.4 29.8 32.7 29.5 33 29.1 33.4 28.7 34 28.4 34.5L28.3 34.6C28.1 34.9 27.9 35.2 27.7 35.4L27.5 35.7C27.3 35.9 27.2 36.1 27 36.2 26.7 36.4 26.5 36.6 26.2 36.9L25 37.8C24.3 38 23.5 38.7 23.3 38.1 23.2 38 23.2 37.7 23.1 37.6 22.8 37.3 22.5 36.3 22.2 36.1L21.9 35.8C21.8 35.6 21.8 35.1 21.9 34.9L22.1 34.5 22.1 34.4C22.1 34.3 22.2 34.2 22.2 34.1 22.3 34 22.3 33.9 22.4 33.8 22.5 33.8 22.5 33.7 22.6 33.6 22.7 33.4 22.8 33.1 22.8 32.9 22.9 32.7 22.9 32.6 22.9 32.5 22.8 32.4 22.8 32.4 22.8 32.3 22.8 32 22.4 31 22.1 30.9L22 30.9C21.8 30.7 21.7 30.7 21.6 30.6zM20.5 43.9C20.4 43.9 20.4 44 20.3 44 20.2 44.1 20.2 44.1 20.1 44L20.2 43.9C20.1 43.9 20.1 44 20 44 20 44.1 20 44.1 19.9 44.1 19.9 44.1 19.9 44.1 19.9 44.1L19.9 44.2C20 44.3 20.1 44.3 20.2 44.2L20.5 43.9zM61.6 33.1L61.7 33.1C62 33.1 62.1 33.3 61.9 33.8 61.7 34.2 61.6 34.3 61.4 34.8 61.3 35 61.2 35.2 61 35.2 60.8 35.2 60.6 35.3 60.4 35.1 60.3 35 60.2 35 60.2 34.9 60.1 34.8 60 34.7 60.1 34.5L60.3 34.2C60.5 33.9 60.7 33.6 61 33.4 61.2 33.3 61.4 33.1 61.6 33.1zM51.3 35.6C51.3 35.6 51.3 35.7 51.2 35.7L51.1 35.7 51.3 35.6zM57.1 35.7L57.1 35.9 57.1 36C57 36.1 57 36.2 56.9 36.3L56.9 36.1C56.9 36 57 35.9 57.1 35.7zM57.1 36.9L57.2 36.9 57.1 37.5 57 37.4 57 37.2C57.1 37.1 57.1 37 57.1 36.9zM57 37.6C57.1 37.8 57.1 38.1 57.2 38.3L57.3 38.4C57.4 38.3 57.3 38.2 57.3 38.2L57.2 38 57.3 38C57.4 38.1 57.4 38.3 57.5 38.4 57.6 38.5 57.6 38.6 57.7 38.8L57.6 38.8C57.5 38.8 57.5 38.7 57.4 38.7 57.3 38.6 57.2 38.5 57.2 38.4 57.1 38.2 57 38 57 37.7 57 37.7 57 37.6 57 37.6zM44.4 38.8C44.5 38.8 44.5 39 44.5 39.6 44.4 40.4 44.4 40.3 44.3 41.1 44.2 41.8 44.1 42.4 44 43.1 44 43.3 43.9 43.6 43.9 43.8 43.8 44.1 43.7 44.5 43.6 44.8 43.4 45.2 43.5 45 43.4 45.4 43.3 45.5 43.2 46.2 42.9 45.7 42.9 45.6 42.8 45.6 42.8 45.5L42.8 44.8C42.8 44.6 42.9 44.4 42.9 44.2 43 44 43 43.9 43 43.8 43.1 43.5 43.1 43.4 43.1 43.1 43.1 43 43.2 42.9 43.2 42.8 43.2 42.6 43.3 42.6 43.3 42.4 43.4 42.2 43.4 42 43.5 41.8 43.5 41.6 43.6 41.3 43.7 41.1 43.7 40.9 43.7 40.8 43.8 40.6L44 39.9 44.1 39.7C44.2 39.5 44.3 39.1 44.3 39.1L44.4 38.8zM44.9 42.7L44.9 42.8 44.9 42.7zM76.9 48C76.8 48 76.7 48.1 76.6 48.1 76.3 48.2 76.1 48.4 75.8 48.6 75.4 49 74.9 49.4 74.5 49.8 73.9 50.5 73.3 51.3 72.7 52.3 72.4 52.7 72.2 53.1 72 53.5 71.8 53.8 71.5 54.2 71.3 54.6 71 55.3 70.8 55.4 70.5 56.1 70 57.2 69.9 57.3 69.6 58.6 69.5 59 69.4 59.4 69.4 59.9 69.2 60.1 69.1 60.4 69 60.6 68.5 61.5 67.3 62.6 66.6 62.9 65.6 63.2 64.6 63 64.7 62.6 64.7 62.5 64.8 62 65 61 65.2 60.8 65.1 60.5 65.3 60.2 65.4 60 65.5 59.7 65.5 59.5 65.7 59.2 65.6 59.4 65.7 59.2 66 58.6 66 58 66.2 57.5 66.1 57.4 66.2 57.3 66.1 57.2 65.8 57.1 66.2 57 65.8 57.1 65.7 57.1 65.7 57 65.4 57.1 65.2 57.3 65.1 57.5 65 57.8 64.8 58.1 64.5 58.5 64.3 58.8 64.2 59.1 64.1 59 64 59.4 63.9 59.5 63.9 59.7 63.7 59.9 63.5 60.2 63.3 60 63.1 60.3 62.7 60.7 61.8 60.8 61.1 61.1 60.9 61.2 60.9 60.7 60.8 60.5 60.7 60.4 60.8 60 60.9 59.7 61 59.4 61.1 59.2 61.2 58.9 61.3 58.7 61.3 57.9 61.5 57.7 61.7 57 62.3 55.7 62.5 55 62.5 54.9 62.5 54.8 62.4 54.7 62.3 54.6 62.3 54.4 62.2 54.4 62.1 54.2 61.9 54.1 61.6 54.1 61.3 54.1 61.6 54.3 61.2 54.5 61.1 54.6 60.9 54.6 60.7 54.7 60.6 54.8 60.4 54.8 60.3 55 60.1 55.3 59.9 55.7 59.8 56 59.5 56.6 58 59 57.9 59.6 57.8 59.8 57.7 60.1 57.7 60.3 57.4 60.5 56.9 60.9 56.8 61 56.4 61.5 55.2 62.5 54.7 62.8 54.5 62.9 54.4 62.9 54.3 63 54 63.1 53.1 63.3 53 62.7 52.9 62.2 53 60.9 53.2 60.3 53.3 59.8 53.4 59.5 53.5 58.9 53.6 58.5 53.6 58.2 53.5 57.7 53.5 57.5 53.5 57.4 53.4 57.3 53.3 57.1 53.1 56.9 52.9 56.9 52.6 56.8 52.2 56.9 51.8 56.8L51.5 56.8C51.2 56.9 51.1 57 50.9 57.2L50.4 57.8C49.8 58.5 49.4 58.7 48.8 59.5 48.3 60.1 48.2 60.2 47.6 60.7 47.2 60.9 47 60.5 47.3 59.9 47.6 59.5 47.5 59.5 47.7 59.1 48.2 58 48.5 57 48.6 55.9 48.6 55.6 48.6 55.3 48.5 55.1L48.1 54.5C48.1 54.4 48 54.4 48 54.4 47.7 54.3 47.4 54.1 47.2 53.9 47.1 53.8 47 53.8 46.9 53.9L46.9 54.1C46.8 54.4 46.7 54.6 46.6 54.9 46.5 55.2 46.3 55.6 46.1 55.9 45.8 56.4 45.4 57 45.1 57.6 44.8 58.3 44.4 59 44.1 59.7 43.9 60 43.8 60.4 43.7 60.7 43.6 60.9 43.4 61.1 43.2 61.3 42.9 61.7 41.4 62.7 41 62.6 40.9 62.5 40.8 62.5 40.8 62.3L40.8 61.4C40.9 61.1 40.9 60.7 40.9 60.4 41 60.3 40.9 60 41.1 60 41.2 59.8 41.2 59.6 41.2 59.4L41.2 58.7C41.1 58.6 41 58.4 40.9 58.4 40.7 58.3 40.6 58.1 40.5 58 40.4 57.9 40.2 57.9 40.1 58L39.9 58.2C39.4 58.5 38.9 58.9 38.4 59.3 37.9 59.8 37.4 60.3 36.8 60.6 36.8 60.6 36.7 60.7 36.6 60.7 36.7 60.4 36.8 60.1 36.8 59.9 37.1 59.3 37.2 58.7 37.4 58 37.5 57.7 37.5 57.4 37.4 57.1 37.4 56.9 37.3 56.7 37.3 56.5 37.2 56.3 37.1 56.1 37 56L36.3 55.3C36.2 55.2 36.2 55.2 36 55.2 35.8 55.2 35.5 55.2 35.3 55.3 35.2 55.3 35.1 55.4 35 55.5 34.4 56.2 33.8 56.8 33.3 57.6 33.1 57.9 33 58 32.8 58.3 32.3 58.9 31.8 59.4 31.3 60L30.4 61C30.4 61 30.3 61 30.3 61.1 30.4 60.9 30.5 60.6 30.5 60.4L30.6 60.3 30.6 60.2C30.9 59.6 31 59.1 31.2 58.5L31.3 58.1C31.4 57.9 31.5 57.6 31.6 57.4 31.7 57.1 31.8 56.8 31.7 56.4L31.6 55.6C31.5 55.1 31.2 54.7 31 54.3 31 54.2 30.9 54.2 30.9 54.2 30.6 54 30.2 53.8 29.9 53.6 29.8 53.5 29.6 53.5 29.5 53.5L29.2 54.1C28.9 54.7 28.5 55.3 28.4 56 28.4 56.1 28.3 56.1 28.3 56.2 27.9 57 27.6 57.8 27.2 58.6 27 59 26.9 59.4 26.7 59.9 26.7 60 26.6 60.1 26.6 60.3L26.5 60.3C25.1 60.5 24.6 60.3 23.2 60.4 23 60.4 22.8 60.2 22.9 60 23 59.7 22.9 59.4 22.9 59L22.9 58.6C22.8 58.4 22.8 58.2 22.8 57.9 22.7 57.6 22.7 57.3 22.6 57.1L22.3 56.5C22.2 56.1 22 55.9 21.7 55.7 21.5 55.6 21.3 55.4 21.2 55.3 21.1 55.2 20.4 54.6 20.2 54.6 19.9 54.5 19.5 54.6 19.3 54.7 19 54.9 18.7 55.1 18.5 55.3 18.4 55.3 18.3 55.4 18.3 55.4 18 55.8 17.9 56.3 18 56.8 18.1 57.5 18.2 58.1 18.5 58.6L18.5 58.7C18.5 58.8 18.5 58.8 18.4 58.9 18 59.4 17.6 60 17.3 60.6 17 61.1 16.9 61.6 16.8 62.2 16.7 62.7 16.8 63.3 16.8 63.8L17.1 64.6C17.4 65.1 17.7 65.4 18.2 65.5 18.6 65.6 19 65.6 19.4 65.5 19.5 65.4 19.6 65.4 19.7 65.4 20 65.3 20.3 65.1 20.5 64.9 20.5 64.8 20.6 64.8 20.7 64.7L20.9 64.6C21.1 64.5 21.2 64.3 21.3 64.1 21.5 63.8 21.7 63.6 21.8 63.3 22 62.8 22.2 62.3 22.3 61.9 22.3 61.8 22.4 61.8 22.4 61.8 22.4 61.7 22.5 61.7 22.6 61.7L22.7 61.7C23.5 61.7 25.2 61.7 26.4 61.3 26.3 61.8 26.2 62.3 26.2 62.8 26.1 62.9 26.1 63.1 26.1 63.2 26.2 63.8 26.3 64.3 26.8 64.6 27.1 64.7 27.4 64.8 27.7 64.8 28 64.8 28.4 64.6 28.7 64.5 28.8 64.4 29 64.3 29.1 64.2 29.2 64.2 29.2 64.1 29.2 64.1 29.3 63.9 29.4 63.8 29.5 63.7 29.7 63.5 29.9 63.4 30 63.1 30.1 62.9 30.3 62.8 30.4 62.6 30.4 62.5 30.5 62.5 30.5 62.5 30.5 62.3 30.7 62.2 30.8 62.1 30.9 62 31 61.8 31.1 61.7 31.4 61.8 31.5 61.6 31.6 61.3L31.6 61.2C31.6 61.1 31.7 61.1 31.7 61.1L31.8 61.2 32 60.9C32.1 60.8 32.2 60.6 32.3 60.4 32.4 60.2 32.6 59.9 32.7 59.7 32.9 59.4 33.1 59.2 33.4 58.9 33.6 58.6 33.8 58.4 33.9 58 34 57.7 34.2 57.6 34.3 57.4 34.6 57.2 34.9 56.9 35.1 56.6 35.2 56.5 35.3 56.5 35.4 56.4 35.5 56.3 35.6 56.3 35.7 56.4 35.8 56.6 35.7 56.7 35.6 56.8 35.4 57.2 35.2 57.5 34.9 57.9 34.1 59.1 33.4 60.4 32.9 61.8 32.8 62.1 32.7 62.4 32.7 62.7 32.7 63.1 32.8 63.4 33 63.5 33.2 63.7 33.4 63.8 33.6 63.9 34.1 64 34.6 63.8 35.1 63.5L35.4 63.2C35.7 62.9 36 62.7 36.2 62.4L36.3 62.3C36.6 62 37 61.8 37.2 61.5L37.4 61.3 38.1 60.7C38.2 60.6 38.4 60.5 38.5 60.6 38.6 60.5 38.7 60.3 38.8 60.2 39 59.9 39 59.9 39 59.7 39.1 59.6 39.3 59.6 39.4 59.5 39.5 59.5 39.7 59.3 39.8 59.2L39.8 59.4C39.8 59.5 39.8 59.6 39.7 59.7 39.4 60.4 39.3 61.1 39.1 61.8 39 62.2 39 62.6 39.1 63 39.3 63.4 39.7 63.7 40 64 40.1 64.1 40.8 64.2 41 64.2 41.3 64.2 42.5 63.4 42.6 63L42.7 63C42.5 63.7 42.3 64.5 42.1 65.2 42 65.8 42.2 66.3 42.7 66.4 42.9 66.4 43.1 66.4 43.3 66.5 43.6 66.5 43.9 66.5 44.3 66.6 44.4 66.6 44.6 66.6 44.7 66.5 44.9 66.4 45 66.4 45.1 66.4 45.2 66.4 45.3 66.4 45.5 66.2 45.7 65.9 46.2 64.1 46.5 63.8 46.5 63.7 46.6 63.6 46.7 63.5 46.8 63.4 47 63.2 47.1 62.9 47.2 62.6 47.4 62.5 47.6 62.2 47.9 61.9 48.2 61.5 48.5 61.2 48.8 60.8 49.3 60.3 49.7 59.9 49.9 59.7 50.1 59.5 50.2 59.3 50.8 58.6 50.7 60 50.6 60.6 50.6 61 50.6 61.3 50.5 61.7 50.5 63.3 51.1 64.3 52.4 64.7 52.9 64.9 54.4 64.8 54.8 64.6L55.1 64.5C55.2 64.4 55.4 64.4 55.5 64.2 55.8 64 56.9 62.7 57.1 62.5 57.2 62.4 57.3 62.2 57.5 61.9 57.6 62.4 57.7 62.6 58.3 63 58.5 63.1 59.1 63.3 59.4 63.3 59.7 63.2 60.4 63.2 60.8 63 61.3 62.7 62 62.3 62.4 61.9L62.4 62C62.1 63 62.3 63.5 62.4 64.3 62.6 65.3 64.9 65.1 65.4 64.8 65.5 64.7 65.5 64.7 65.8 64.7 65.9 64.6 65.9 64.6 66.1 64.5 66.4 64.4 66.4 64.3 66.6 64.1 66.9 64 66.9 63.9 67.1 63.8 67.7 63.4 68.4 62.6 68.8 62.1 68.7 62.7 68.7 63.2 68.6 63.8 68.6 64 68.7 64.2 68.8 64.4 68.9 65.3 69.5 65.7 69.8 66.3 70 66.6 70.5 66.8 70.8 66.9 70.9 67 71.2 67 71.4 67 72.2 67 73.3 67.3 74.2 66.6 74.3 66.5 75.8 65 76 64.9 76.7 64.3 76.9 63.9 77.3 63.2 77.4 63.1 77.4 63 77.5 62.9 77.6 62.8 77.6 62.6 77.7 62.6 77.8 62.6 77.8 62.5 77.9 62.5 77.9 62.2 78.4 61.5 78.5 61.3 78.9 60.6 79.1 60 78.7 60.1 78.2 60.8 78 61.4 77.5 62.1 77.1 62.6 76.9 63.1 76.5 63.5 76.1 63.9 75.7 64.3 75.3 64.6 75.1 64.7 73.6 65.8 73.4 65.6 73.3 65.5 72.9 65.5 72.8 65.3 72.6 64.9 72.5 64.8 72.5 64.4 72.5 64.3 72.4 63.2 72.4 63 72.4 62.4 72.4 62 72.5 61.5 72.8 60 72.7 59.7 73.6 58.2 74.1 57.4 74.7 56.6 75.3 55.7 75.6 55.2 75.9 54.7 76.3 54.2L76.9 53.1C77.2 52.7 77.4 52.2 77.6 51.7 77.7 51.4 77.9 51.2 77.9 50.9 78 50.6 78 50.2 78.1 49.9 78.2 49.4 78.1 48.9 77.8 48.7 77.6 48.5 77.3 48.4 77 48.4L76.9 48.3 76.9 48zM12.1 49C11.3 49 10.4 49.1 9.5 49.3 8.8 49.5 8.2 49.5 7.5 49.7L6.5 49.9C6.1 50 5.6 50.3 5.2 50.2 5.1 50.2 4.9 50.3 4.9 50.5 4.8 50.8 4.6 51 4.6 51.3 4.5 51.8 4.4 52.4 4.5 52.8L4.5 53.4C4.5 53.8 4.6 54.1 5 54.2 5.2 54.3 5.4 54.3 5.5 54.3 5.9 54.2 6.4 54.1 6.9 53.9 7 53.9 7.1 53.9 7.2 53.8L6.9 54.7C6.6 55.5 6.4 56.3 6.1 57.1 5.9 57.7 5.7 58.4 5.5 59L4.3 62.5 3.9 63.6C3.8 63.9 3.8 63.9 3.4 64 2.8 64.2 3.7 64 3.1 64.2 2.6 64.3 2.1 64.5 1.6 64.6 1.3 64.7 1 64.8 0.6 65 0.4 65 0.3 65.2 0.2 65.4 0.1 65.7-0.1 66.1-0.2 66.5 -0.2 66.6-0.3 66.7-0.1 66.7 0 66.9 0 67.1 0 67.4 0 67.6 0.1 67.7 0.2 67.8 0.5 67.9 0.8 68.1 1.3 68L1.5 68C1.9 67.9 2.3 67.9 2.8 67.8 3.6 67.7 2.9 67.7 3.8 67.5 4 67.5 4.2 67.4 4.4 67.5 4.6 67.6 4.7 67.5 4.8 67.4 5.1 66.9 5.2 67 5.6 66.9 5.9 67 6.4 66.8 6.7 66.5L6 66.7 6 66.6 6.8 66.2C8 65.6 9.3 64.8 10.5 64 11.2 63.4 11.9 62.8 12.6 62.1 13 61.7 13.4 61.3 13.8 60.8 14.3 60.2 14.8 59.6 15.2 59 15.4 58.7 15.6 58.4 15.8 58 16.2 57.2 16.5 56.4 16.9 55.7 17.2 55 17.4 54.3 17.5 53.6 17.6 52.7 17.7 51.9 17.3 51.2 17 50.6 16.5 50.2 15.9 49.9 15 49.5 14 49.4 13 49.3L12.2 49.3 12.1 49zM77.3 49.3C77.4 49.3 77.4 49.4 77.3 49.5 77.2 49.9 77.2 50.3 77 50.8L76.1 52.6C75.3 54.2 75.1 54.4 74.2 55.9 73.8 56.6 73.5 57 73.1 57.6 72.7 58 72.7 57.3 72.8 57.1 73.1 56.1 73 56.6 73.3 55.6L73.6 54.7C73.9 54.1 74.2 53.5 74.4 52.9L74.8 52C74.9 51.6 75.1 51.3 75.3 51 75.5 50.8 75.7 50.5 75.9 50.3 76.2 49.9 76.5 49.6 76.9 49.5 77 49.4 77.1 49.4 77.2 49.4L77.3 49.4 77.3 49.3zM11.7 53.3C12.4 53.3 13.1 53.3 13.8 53.5L15 53.8C15.1 53.8 15.2 54 15.1 54.2 15 55 14.6 55.9 14.1 56.8 13.5 57.8 12.7 58.7 11.8 59.6 11 60.4 10.1 61.1 9.2 61.8 6.7 63.9 5 64.1 6.6 60.8 6.8 60.3 6.8 59.8 6.9 59.4 7.2 58.7 7.4 57.9 7.6 57.2 7.9 56.4 8.2 55.6 8.4 54.8 8.5 54.6 8.6 54.3 8.8 54.1 8.8 54 8.9 53.9 8.9 53.9 9 53.8 9.2 53.8 9.3 53.8 10.1 53.6 10.8 53.5 11.6 53.5L11.7 53.3zM20.1 55.3C20.2 55.3 20.3 55.3 20.3 55.4 20.5 55.5 20.6 55.6 20.8 55.8 21 55.9 21.1 56 21.2 56.1 21.4 56.3 21.5 56.5 21.6 56.8 21.7 57.1 21.7 57.4 21.8 57.7 21.9 57.9 21.9 58.2 21.8 58.4 22.1 60.3 20.6 60.9 19.8 59.2 19.1 58.4 18.3 57 19.1 55.9 19.3 55.7 19.7 55.3 20.1 55.3zM20.6 61.4L20.7 61.4C20.8 61.4 21 61.5 21.1 61.5 21 61.7 21 62 20.8 62.2 20.5 62.9 20.2 63.5 19.7 64L19.6 64.1 19.5 64.1C19.4 64 19.2 63.9 19.2 63.8 19.2 63.7 19.1 63.7 19.2 63.7L19.2 63.2C19.4 62.7 19.4 62.4 19.7 62 20 61.6 20.2 61.4 20.6 61.4z'
          />
        </svg>
      </div>
    )
  }
}

export default withTheme(BackgroundImage)
