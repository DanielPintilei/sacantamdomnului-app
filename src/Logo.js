import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  width: 120px;
  height: 120px;
  stroke: ${({ theme }) => theme.accent};
  stroke-width: 0.26px;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform-origin: center;
  .gr2 {
    opacity: 0.7;
  }
  .gr2-1 {
    stroke-dasharray: 0.5, 0.2, 0.5;
    animation: gr2 7s infinite linear;
  }
  .gr2-2 {
    stroke-dasharray: 0.2, 0.6, 0.3;
    animation: gr2 7s infinite linear;
  }
  .gr2-3 {
    stroke-dasharray: 0.1, 0.4, 0.7;
    animation: gr2 7s infinite linear;
  }
  .gr2-4 {
    stroke-dasharray: 0.4, 0.2, 0.5;
    animation: gr2 7s infinite linear;
  }
  .gr2-5 {
    stroke-dasharray: 0.2, 0.2, 0.5;
    animation: gr2-m 7s infinite linear;
    stroke-dashoffset: 7;
  }
  .gr2-6 {
    stroke-dasharray: 0.4, 0.1, 0.7;
    animation: gr2-m 7s infinite linear;
    stroke-dashoffset: 7;
  }
  .gr2-7 {
    stroke-dasharray: 0.8, 0.2, 0.3;
    animation: gr2-m 7s infinite linear;
    stroke-dashoffset: 7;
  }
  .gr2-8 {
    stroke-dasharray: 0.2, 0.7, 0.4;
    animation: gr2-m 7s infinite linear;
    stroke-dashoffset: 7;
  }
  .gr3-1 {
    stroke-dasharray: 0.5, 0.2, 0.5;
    animation: gr2 7s infinite linear;
  }
  .gr3-2 {
    stroke-dasharray: 0.7, 0.4, 0.1;
    animation: gr2 7s infinite linear;
  }
  .gr3-3 {
    stroke-dasharray: 0.6, 0.2, 0.5;
    animation: gr2 7s infinite linear;
  }
  .gr3-4 {
    stroke-dasharray: 0.1, 0.3, 0.7;
    animation: gr2 7s infinite linear;
  }
  .gr3-5 {
    stroke-dasharray: 0.2, 0.5, 0.3;
    stroke-dashoffset: 7;
    animation: gr2-m 7s infinite linear;
  }
  .gr3-6 {
    stroke-dasharray: 0.8, 0.2, 0.4;
    stroke-dashoffset: 7;
    animation: gr2-m 7s infinite linear;
  }
  .gr3-7 {
    stroke-dasharray: 0.1, 0.6, 0.3;
    stroke-dashoffset: 7;
    animation: gr2-m 7s infinite linear;
  }
  .gr3-8 {
    stroke-dasharray: 0.3, 0.5, 0.1;
    stroke-dashoffset: 7;
    animation: gr2-m 7s infinite linear;
  }
  @keyframes gr2 {
    to {
      stroke-dashoffset: 7;
    }
  }
  @keyframes gr2-m {
    to {
      stroke-dashoffset: 0;
    }
  }
`

export default () => (
  <Div>
    <svg width='100%' height='100%' viewBox='0 0 24 24'>
      <g className='gr1'>
        <path d='M12,9.798l0,4.437' />
        <path d='M10.847,10.763l2.306,0' />
      </g>
      <g className='gr2'>
        <path className='gr2-1' d='M12,6.529l0,2.046' />
        <path className='gr2-2' d='M17.471,12l-2.046,0' />
        <path className='gr2-3' d='M8.131,8.131l1.447,1.447' />
        <path className='gr2-4' d='M8.131,15.869l1.447,-1.447' />
        <path className='gr2-5' d='M12,15.425l0,2.046' />
        <path className='gr2-6' d='M8.575,12l-2.046,0' />
        <path className='gr2-7' d='M14.422,14.422l1.447,1.447' />
        <path className='gr2-8' d='M14.422,9.578l1.447,-1.447' />
        <path className='gr3-1' d='M9.95,6.927l0.767,1.898' />
        <path className='gr3-2' d='M17.073,9.95l-1.898,0.767' />
        <path className='gr3-3' d='M6.963,9.863l1.884,0.799' />
        <path className='gr3-4' d='M9.863,17.037l0.799,-1.884' />
        <path className='gr3-5' d='M13.283,15.175l0.767,1.898' />
        <path className='gr3-6' d='M8.825,13.283l-1.898,0.767' />
        <path className='gr3-7' d='M15.153,13.338l1.884,0.799' />
        <path className='gr3-8' d='M13.338,8.847l0.799,-1.884' />
      </g>
    </svg>
  </Div>
)
