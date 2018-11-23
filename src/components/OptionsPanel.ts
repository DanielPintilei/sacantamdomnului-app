import styled from 'styled-components'

const OptionsPanel = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  max-width: calc(100vw - 30px);
  background-color: #fff;
  box-shadow: 4px 2px 6px 0px hsla(0, 0%, 0%, 0.1);
  border-radius: 4px;
`

export default OptionsPanel
