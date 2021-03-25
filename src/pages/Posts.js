import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core'
import { PostModal } from '../components/PostModal'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from './../redux/posts-reducer'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
  },

  cardContent: {
    flexGrow: 1,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  postsTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(5),
  },
}))

export const Posts = (props) => {
  const classes = useStyles()

  const { posts, currentPostsUser } = useSelector((state) => state.posts)

  let id = +props.match.params.userId

  const dispatch = useDispatch()

  const refreshPosts = () => {
    dispatch(getPosts(id))
  }

  return (
    <>
      <Typography
        className={classes.postsTitle}
        gutterBottom
        variant="h5"
        component="h2"
      >
        Posts by: {currentPostsUser.username}
      </Typography>
      <Grid container spacing={4}>
        <div className={classes.buttons}>
          <Link to="/">Go Back</Link>
          <Button size="small" color="primary">
            <PostModal userId={id} currentAction="Create a new post" />
          </Button>
          <Button onClick={refreshPosts} size="small" color="primary">
            Refresh
          </Button>
        </div>
        {posts.map((post, index) => (
          <Grid item key={post + index} id={index} xs={12} sm={12} md={12}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {posts[index].title}
                </Typography>
                <Typography>{posts[index].body}</Typography>
              </CardContent>
              <CardActions>
                <Link
                  to={`/post/${id}/${posts[index].id}`}
                  size="small"
                  color="primary"
                >
                  Details
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
