import React from 'react'
import { blue } from '@material-ui/core/colors'
import SvgIcon from '@material-ui/core/SvgIcon'

export const HomeIcon = (props) => {
  return (
    <SvgIcon fontSize="large" style={{ color: blue[500] }} color="primary">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  )
}
