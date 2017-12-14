import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ListLink = styled(Link)`
  display: flex;
  padding: 5px 10px 5px 15px;
  font-size: 15px;
  line-height: 1.2;
  color: ${props => props.theme.textList};
  text-decoration: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  span {
    &:first-child {
      display: inline-block;
      margin-right: 5px;
      opacity: 0.7;
    }
  }
`

export default ListLink