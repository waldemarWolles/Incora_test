import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    position: 'absolute',
    top: '30%',
    right: '50%',
    zIndex: 9999,
  },
}))

export const Preloader = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress size={100} color="secondary" />
    </div>
  )
}
