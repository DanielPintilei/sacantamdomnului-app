import React, { PureComponent, useState, FC } from 'react'
import styled from 'styled-components'
import { SongListType, SongFoldersType } from '../types'
import { List } from 'react-virtualized/dist/commonjs/List'
import {
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized/dist/commonjs/CellMeasurer'
import ListLink from './ListLink'
import { IconBook } from './icons'

type ListWrapperProps = {
  scrollToCurrentSong: () => void
}
class ListWrapper extends PureComponent<ListWrapperProps> {
  componentDidMount () {
    this.props.scrollToCurrentSong()
  }
  render () {
    return this.props.children
  }
}

const H3 = styled.h3`
  display: flex;
  margin: 0;
  padding: 15px;
  font-size: 17px;
  font-weight: normal;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  & + div {
    touch-action: pan-y;
    padding-top: 10px;
    box-shadow: inset rgba(0, 0, 0, 0.15) 1px 1px 3px;
  }
  svg {
    margin-right: 10px;
  }
`

type SongSectionProps = {
  title: string
  songs: SongListType
  closeDrawer: () => void
  currentBook: string
  setCurrentBook: (title: string | null) => void
  currentSong: number
  setCurrentSong: (index: number) => void
}
class SongSection extends PureComponent<SongSectionProps> {
  cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 34,
  })
  listRef: any
  render () {
    const {
      title,
      songs,
      closeDrawer,
      currentBook,
      setCurrentBook,
      currentSong,
      setCurrentSong,
    } = this.props
    const rowRenderer = ({
      key,
      index,
      parent,
      // isScrolling,
      // isVisible,
      style,
    }: any) => {
      const { number: songNumber, title: songTitle, path } = songs[index]
      return (
        <CellMeasurer
          key={key}
          cache={this.cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <ListLink
            to={path}
            style={style}
            onClick={() => {
              closeDrawer()
              setCurrentSong(index + 15)
            }}
          >
            <span>{songNumber}</span>
            <span>{songTitle}</span>
          </ListLink>
        </CellMeasurer>
      )
    }
    const currentBookIsThis = currentBook === title
    return (
      <div>
        <H3
          onClick={() => {
            if (currentBookIsThis) setCurrentBook(null)
            else {
              setCurrentSong(0)
              setCurrentBook(title)
              setTimeout(() => {
                this.cache.clearAll()
                this.forceUpdate()
              })
            }
          }}
        >
          {IconBook} {title}
        </H3>
        {currentBookIsThis && (
          <ListWrapper
            scrollToCurrentSong={() => this.listRef.scrollToRow(currentSong)}
          >
            <List
              height={window.innerHeight / 1.5}
              rowCount={songs.length}
              rowHeight={this.cache.rowHeight}
              defferedMeasurementCache={this.cache}
              width={300}
              rowRenderer={rowRenderer}
              ref={list => {
                this.listRef = list
              }}
            />
          </ListWrapper>
        )}
      </div>
    )
  }
}

type DrawerLeftProps = {
  songList: SongFoldersType
  closeDrawer: () => void
  currentBook: string
  setCurrentBook: (book: string) => void
}
const DrawerLeft: FC<DrawerLeftProps> = ({
  songList,
  closeDrawer,
  currentBook,
  setCurrentBook,
}) => {
  const [currentSong, setCurrentSong] = useState(0)
  return (
    <div>
      {songList.map(({ title, songs }) => (
        <SongSection
          title={title}
          songs={songs}
          closeDrawer={closeDrawer}
          currentBook={currentBook}
          setCurrentBook={setCurrentBook}
          currentSong={currentSong}
          setCurrentSong={currentSong => setCurrentSong(currentSong)}
          key={title}
        />
      ))}
    </div>
  )
}

export default DrawerLeft
