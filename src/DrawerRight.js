import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Downshift from 'downshift'
// import styled from 'styled-components'
import { replaceAccents } from './helpers'
import { IconSearch } from './icons'

class DrawerRight extends Component {
  static propTypes = {
    songList: PropTypes.array.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    searchFocused: PropTypes.bool.isRequired,
  }
  componentDidUpdate () {
    if (this.props.searchFocused) {
      setTimeout(() => this.searchInput.focus())
    }
  }
  render () {
    const { songList, closeDrawer } = this.props
    return (
      <div>
        <Downshift
          render={({ getInputProps, isOpen, inputValue }) => (
            <div>
              <label>
                <IconSearch />
                <input
                  {...getInputProps()}
                  ref={input => {
                    this.searchInput = input
                  }}
                  type='search'
                  autoComplete='off'
                  autoCorrect='off'
                  autoCapitalize='off'
                  spellCheck='false'
                  placeholder='Caută'
                />
              </label>
              {isOpen ? (
                <div>
                  {songList
                    .filter(({ number, title }) => {
                      const formattedTitle = replaceAccents(title).toLowerCase()
                      const searchText = new RegExp(`\\b${inputValue}`, 'ig')
                      return (
                        (inputValue &&
                          number.toString().startsWith(inputValue)) ||
                        ((formattedTitle
                          .replace(/[^\w\s]|_/g, '')
                          .replace(/\s+/g, ' ')
                          .match(searchText) ||
                          formattedTitle.match(searchText)) &&
                          inputValue.length > 1)
                      )
                    })
                    .sort((a, b) => a.number - b.number)
                    .map(({ number, title, url }) => (
                      <Link key={url} to={url} onClick={closeDrawer}>
                        {number}. {title}
                      </Link>
                    ))}
                </div>
              ) : null}
            </div>
          )}
        />
      </div>
    )
  }
}

export default DrawerRight
