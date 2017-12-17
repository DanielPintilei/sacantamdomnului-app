import React from 'react'
import PropTypes from 'prop-types'
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
const Navbar = ({ onClickLeft, onClickRight }) => (
  <Headroom>
    <Nav>
      <button onClick={onClickLeft}>
        <IconMenu />
      </button>
      <Link to='/'>
        <Logo />
      </Link>
      <button onClick={onClickRight}>
        <IconSearch />
      </button>
    </Nav>
  </Headroom>
)
Navbar.propTypes = {
  onClickLeft: PropTypes.func.isRequired,
  onClickRight: PropTypes.func.isRequired,
}

export default Navbar
