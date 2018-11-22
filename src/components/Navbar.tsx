import React, { SFC } from 'react'
// @ts-ignore
import Headroom from 'react-headroom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { IconMenu, IconSearch } from './icons'

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${({ theme }) => theme.navbar};
  box-shadow: rgba(0, 0, 0, 0.25) 1px 1px 3px;
  overflow: hidden;
  button {
    color: ${({ theme }) => theme.iconsNavbar};
  }
`
type NavbarProps = {
  onClickLeft: () => void
  onClickRight: () => void
}
const Navbar: SFC<NavbarProps> = ({ onClickLeft, onClickRight }) => (
  <Headroom>
    <Nav>
      <button onClick={onClickLeft}>
        <IconMenu />
      </button>
      <Link to="/">
        <Logo />
      </Link>
      <button onClick={onClickRight}>
        <IconSearch />
      </button>
    </Nav>
  </Headroom>
)

export default Navbar
