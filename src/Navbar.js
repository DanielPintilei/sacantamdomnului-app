import React from 'react'
import PropTypes from 'prop-types'
import Headroom from 'react-headroom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.25) 1px 1px 1px;
`
const IconLeft = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='12' cy='12' r='2' />
    <circle cx='12' cy='4' r='2' />
    <circle cx='12' cy='20' r='2' />
  </svg>
)
const Logo = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
  </svg>
)
const IconRight = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='10.5' cy='10.5' r='7.5' />
    <line x1='21' y1='21' x2='15.8' y2='15.8' />
  </svg>
)

const Navbar = ({ onClickLeft, onClickRight }) => (
  <Headroom>
    <Nav>
      <button onClick={onClickLeft}>
        <IconLeft />
      </button>
      <Link to='/'>
        <Logo />
      </Link>
      <button onClick={onClickRight}>
        <IconRight />
      </button>
    </Nav>
  </Headroom>
)

Navbar.propTypes = {
  onClickLeft: PropTypes.func.isRequired,
  onClickRight: PropTypes.func.isRequired,
}

export default Navbar
