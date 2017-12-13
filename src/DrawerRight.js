import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Downshift from 'downshift'
// import styled from 'styled-components'
import { generateUrl, replaceAccents } from './helpers'
import { IconSearch } from './icons'

class DrawerRight extends Component {
  state = {}
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
          render={({
            getInputProps,
            getItemProps,
            getLabelProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
          }) => (
            <div>
              <label {...getLabelProps()}>
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
                      return (
                        (inputValue &&
                          number.toString().startsWith(inputValue)) ||
                        ((formattedTitle
                          .replace(/[^\w\s]|_/g, '')
                          .replace(/\s+/g, ' ')
                          .includes(inputValue) ||
                          formattedTitle.includes(inputValue)) &&
                          inputValue.length > 1)
                      )
                    })
                    .sort((a, b) => a.number - b.number)
                    .map((item, index) => {
                      const { number, title } = item
                      return (
                        <div
                          {...getItemProps({
                            key: number + title,
                            index,
                            item: title,
                            style: {
                              backgroundColor:
                                highlightedIndex === index
                                  ? 'lightgray'
                                  : 'white',
                              fontWeight:
                                selectedItem === item ? 'bold' : 'normal',
                            },
                          })}
                        >
                          <Link
                            to={generateUrl(number, title)}
                            onClick={closeDrawer}
                          >
                            {number}. {title}
                          </Link>
                        </div>
                      )
                    })}
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
