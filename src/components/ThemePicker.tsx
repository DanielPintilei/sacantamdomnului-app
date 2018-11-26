import React, { FC } from 'react'
import styled from 'styled-components'
import OptionsPanel from './OptionsPanel'
import { IconCheck } from './icons'
import themes from '../themes'

const ThemePickerStyles = styled(OptionsPanel)`
  width: 310px;
  padding: 5px;
  .swatch {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin: 5px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`

type ThemePickerProps = {
  currentTheme: number
  setCurrentTheme: (index: number) => void
}
const ThemePicker: FC<ThemePickerProps> = ({
  currentTheme,
  setCurrentTheme,
}) => (
  <ThemePickerStyles>
    {themes.map((theme, index) => (
      <button
        key={index}
        className="swatch"
        style={{
          color: theme.checkMark,
          backgroundColor: theme.background,
        }}
        onClick={() => {
          document
            .querySelector('meta[name=theme-color]')
            .setAttribute('content', theme.navbar)
          setCurrentTheme(index)
          localStorage.setItem('theme', index.toString())
        }}
      >
        {currentTheme === index && IconCheck}
      </button>
    ))}
  </ThemePickerStyles>
)

export default ThemePicker
