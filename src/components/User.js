import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getPosts } from '../redux/posts-reducer'

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

export const User = ({ user }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const onGetPosts = () => {
    dispatch(getPosts(user.id))
  }

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h6" component="h2">
              {user.username}
            </Typography>
            <Typography gutterBottom variant="h6">
              {user.name}
            </Typography>
            <Typography gutterBottom>{user.address.city}</Typography>
            <Typography gutterBottom>{user.phone}</Typography>
            <Typography gutterBottom>{user.website}</Typography>
            <Typography gutterBottom>{user.company.name}</Typography>
          </CardContent>
          <CardActions>
            <Link onClick={onGetPosts} to={`/posts/${user.id}`}>
              Posts
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}
