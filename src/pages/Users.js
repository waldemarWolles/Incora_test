import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { getUsers } from '../redux/users-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { User } from '../components/User'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },

  cardContent: {
    flexGrow: 1,
  },
  usersTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(5),
  },
}))

export const Users = () => {
  const classes = useStyles()

  const { users } = useSelector((state) => state.users)

  return (
    <>
      <Typography
        className={classes.usersTitle}
        gutterBottom
        variant="h5"
        component="h2"
      >
        Users
      </Typography>
      <Grid container spacing={4}>
        {users.map((user) => (
          <User key={user} user={user} />
        ))}
      </Grid>
    </>
  )
}
