import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'
import { DeletePostModal } from '../components/DeletePostModal'
import { PostModal } from '../components/PostModal'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getComments, setLoading } from '../redux/currentPost-reducer'
import { Preloader } from '../components/Preloader'

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: theme.spacing(8),
  },
  postContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  card: {
    height: '100%',
    display: 'flex',
  },

  cardContent: {
    flexGrow: 1,
  },
  buttonBack: {
    marginBottom: theme.spacing(5),
  },
  postTitle: {
    padding: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(2),
  },

  postText: {
    marginBottom: theme.spacing(2),
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  commentsTitle: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  commentsContainer: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: 'flex',
    justifyContent: 'flex-start',
    maxWidth: '700px',
  },

  commentsCard: {
    marginTop: theme.spacing(5),
  },
}))

export const Post = (props) => {
  const classes = useStyles()
  const { comments, currentPostData, isLoading } = useSelector(
    (state) => state.currentPost
  )

  let postId = +props.match.params.postId
  let userId = +props.match.params.userId

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId])

  if (isLoading) return <Preloader />

  if (!currentPostData.title)
    return (
      <>
        <NavLink className={classes.buttonBack} to={`/posts/${userId}`}>
          Go Back
        </NavLink>
        <h1>Your post was deleted</h1>
      </>
    )

  return (
    <>
      <Grid className={classes.postContainer} container>
        <NavLink className={classes.buttonBack} to={`/posts/${userId}`}>
          Go Back
        </NavLink>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.postTitle}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {currentPostData.title}
            </Typography>
            <Divider className={classes.divider} />
            <Typography className={classes.postText}>
              {currentPostData.body}
            </Typography>
            <CardActions className={classes.cardActions}>
              <PostModal
                userId={currentPostData.userId}
                id={currentPostData.id}
                title={currentPostData.title}
                body={currentPostData.body}
                currentAction="Edit"
              />
              <DeletePostModal postId={postId} />
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
      <Grid className={classes.commentsContainer} container>
        <Typography
          className={classes.commentsTitle}
          variant="h5"
          component="h2"
        >
          Comments
        </Typography>
        {comments.map((comment) => (
          <Card key={comment} className={classes.commentsCard}>
            <CardContent className={classes.commentsCardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {comment.name}
              </Typography>
              <Typography>{comment.email}</Typography>
              <Typography>{comment.body}</Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </>
  )
}
