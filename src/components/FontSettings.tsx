import React, { FC } from 'react'
import styled from 'styled-components'
import { ThemeType } from '../types'
import OptionsPanel from './OptionsPanel'
import { IconTypeSans, IconType, IconZoomOut, IconZoomIn } from './icons'

const FontSettingsStyles = styled(OptionsPanel)`
  justify-content: space-between;
  width: 300px;
  padding: 15px;
`

type FontSettingsProps = {
  serifFont: boolean
  currentThemeObj: ThemeType
  setZoomOut: () => void
  setFontSans: () => void
  setFontSerif: () => void
  setZoomIn: () => void
}
const FontSettings: FC<FontSettingsProps> = ({
  serifFont,
  currentThemeObj,
  setZoomOut,
  setFontSans,
  setFontSerif,
  setZoomIn,
}) => (
  <FontSettingsStyles>
    <button onClick={setZoomOut}>{IconZoomOut}</button>
    <button
      style={{
        color: !serifFont ? currentThemeObj.accent : '',
      }}
      onClick={setFontSans}
    >
      {IconTypeSans}
    </button>
    <button
      style={{ color: serifFont ? currentThemeObj.accent : '' }}
      onClick={setFontSerif}
    >
      {IconType}
    </button>
    <button onClick={setZoomIn}>{IconZoomIn}</button>
  </FontSettingsStyles>
)

export default FontSettings
