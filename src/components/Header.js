import { AppBar, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { HomeIcon } from './HomeIcon'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#2e333b',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}))

export const Header = () => {
  const classes = useStyles()

  return (
    <>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <NavLink to="/">
            <HomeIcon className={classes.icon} />
          </NavLink>
        </Toolbar>
      </AppBar>
    </>
  )
}
