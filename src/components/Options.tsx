import React, { SFC } from 'react'
import styled from 'styled-components'
import { ThemeType } from '../types'
import { IconInfo, IconSort, IconDroplet, IconType } from './icons'

type OptionsStyleProps = { theme: ThemeType; sortAZ: boolean }
const OptionsStyles = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 300px;
  padding: 15px;
  background-color: ${({ theme }) => theme.options};
  box-shadow: rgba(0, 0, 0, 0.15) -1px -1px 3px;
  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.accent};
    svg {
      margin-bottom: 5px;
    }
  }
  .sort {
    color: ${({ theme, sortAZ }: OptionsStyleProps) =>
      sortAZ ? theme.active : theme.accent};
  }
`

type OptionsProps = {
  sortAZ: boolean
  sort: () => void
  openThemes: () => void
  openText: () => void
}
const Options: SFC<OptionsProps> = ({ sortAZ, sort, openThemes, openText }) => (
  <OptionsStyles sortAZ={sortAZ}>
    <button
      onClick={() => {
        alert(
          'Carte de cântări a Oastei Domnului\n\nDesigned and developed by Daniel Pintilei',
        )
      }}
    >
      {IconInfo}
      Info
    </button>
    <button className="sort" onClick={sort}>
      {IconSort}
      Sortare
    </button>
    <button onClick={openThemes}>
      {IconDroplet}
      Teme
    </button>
    <button onClick={openText}>
      {IconType}
      Text
    </button>
  </OptionsStyles>
)

export default Options
