import React, { Component } from 'react'
import Downshift from 'downshift'
import styled from 'styled-components'
import { SongListType } from '../types'
import ListLink from './ListLink'
import { replaceAccents } from '../helpers'
import { IconSearch } from './icons'

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
    &::-webkit-search-cancel-button {
      width: 18px;
      height: 18px;
      background-size: 18px;
      background-position: center;
      background-image: ${({ theme }) =>
        `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${
          theme.textInput
        }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>')`};
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

type DrawerRightProps = {
  songList: SongListType
  closeDrawer: () => void
  searchFocused: boolean
}
class DrawerRight extends Component<DrawerRightProps> {
  searchInput: any
  componentDidUpdate () {
    if (this.props.searchFocused) {
      setTimeout(() => this.searchInput.focus())
    }
  }
  render () {
    const { songList, closeDrawer } = this.props
    return (
      <Div>
        <Downshift>
          {({ getInputProps, isOpen, inputValue }) => (
            <div className="wrapper">
              <label>
                <IconSearch />
                <input
                  {...getInputProps()}
                  ref={input => {
                    this.searchInput = input
                  }}
                  type="search"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </label>
              {isOpen ? (
                <div className="list">
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
                          inputValue &&
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
        </Downshift>
      </Div>
    )
  }
}

export default DrawerRight
