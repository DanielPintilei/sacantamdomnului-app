import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const ListLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 15px;
  font-size: 17px;
  line-height: 1.2;
  color: ${({ theme }) => theme.textList};
  text-decoration: none;
  &:hover,
  &.active {
    background-color: ${({ theme }) => theme.backgroundTitle};
  }
  span {
    &:first-child {
      flex-shrink: 0;
      display: inline-block;
      width: 40px;
      margin-right: 5px;
      opacity: 0.7;
    }
  }
`

export default ListLink
