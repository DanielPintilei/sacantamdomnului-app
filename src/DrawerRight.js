import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import styled from 'styled-components'
import ListLink from './ListLink'
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
    const Div = styled.div`
      height: 100%;
      .wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      label {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        padding-left: 15px;
        padding-right: 15px;
        color: ${({ theme }) => theme.textInput};
        box-shadow: rgba(0, 0, 0, 0.15) 1px 1px 3px;
      }
      svg {
        flex-shrink: 0;
        margin-right: 15px;
      }
      input {
        flex-grow: 1;
        height: 70px;
        font-size: 17px;
        border: none;
        outline: none;
        color: ${({ theme }) => theme.textInput};
        background-color: transparent;
        -webkit-appearance: textfield;
        &::-webkit-search-cancel-button,
        &::-webkit-search-decoration {
          -webkit-appearance: none;
        }
      }
      .list {
        touch-action: pan-y;
        flex-grow: 1;
        padding-top: 10px;
        padding-bottom: 20px;
        overflow-y: auto;
      }
    `
    return (
      <Div>
        <Downshift
          render={({ getInputProps, isOpen, inputValue }) => (
            <div className='wrapper'>
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
                />
              </label>
              {isOpen ? (
                <div className='list'>
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
                    .map(({ number, title, path }) => (
                      <ListLink key={path} to={path} onClick={closeDrawer}>
                        <span>{number}</span>
                        <span>{title}</span>
                      </ListLink>
                    ))}
                </div>
              ) : null}
            </div>
          )}
        />
      </Div>
    )
  }
}

export default DrawerRight
