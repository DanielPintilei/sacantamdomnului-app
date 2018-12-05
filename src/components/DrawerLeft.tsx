import React, { useState, useEffect, FC } from 'react'
import styled from 'styled-components'
import { SongListType, SongFoldersType } from '../types'
import { FixedSizeList as List } from 'react-window'
import ListLink from './ListLink'
import { IconBook } from './icons'

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
const SongSection: FC<SongSectionProps> = ({
  title,
  songs,
  closeDrawer,
  currentBook,
  setCurrentBook,
  currentSong,
  setCurrentSong,
}) => {
  const listRef: React.RefObject<List> = React.createRef()
  const currentBookIsThis = currentBook === title
  useEffect(
    () => {
      currentSong &&
        listRef &&
        listRef.current &&
        listRef.current.scrollToItem(currentSong, 'center')
    },
    [currentSong],
  )
  return (
    <div>
      <H3
        onClick={() => {
          if (currentBookIsThis) setCurrentBook(null)
          else {
            setCurrentSong(0)
            setCurrentBook(title)
          }
        }}
      >
        {IconBook} {title}
      </H3>
      {currentBookIsThis && (
        <List
          height={window.innerHeight / 1.5}
          itemCount={songs.length}
          itemSize={50}
          width={300}
          ref={listRef}
        >
          {({ index, style }: any) => {
            const { number: songNumber, title: songTitle, path } = songs[index]
            return (
              <ListLink
                to={`/${path}`}
                style={style}
                onClick={() => {
                  closeDrawer()
                  setCurrentSong(index)
                }}
              >
                <span>{songNumber}</span>
                <span>{songTitle}</span>
              </ListLink>
            )
          }}
        </List>
      )}
    </div>
  )
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
