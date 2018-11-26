import React, { FC } from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { SongListType } from '../types'
import BackgroundImage from './BackgroundImage'
import Song from './Song'

const StyledMain = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  margin-top: -70px;
  padding-top: 70px;
  background-color: ${({ theme }) => theme.background};
  touch-action: pan-y;
  .background-image {
    display: flex;
    align-items: center;
  }
`

type MainProps = {
  songList: SongListType
  serifFont: boolean
  fontSizeAdd: number
}
const Main: FC<MainProps> = ({ songList, serifFont, fontSizeAdd }) => (
  <StyledMain>
    <Route exact path="/" component={() => <BackgroundImage />} />
    <Route
      path="/:path"
      render={props => (
        <Song
          songList={songList}
          serifFont={serifFont}
          fontSizeAdd={fontSizeAdd}
          {...props}
        />
      )}
    />
  </StyledMain>
)

export default Main
