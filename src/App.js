import React, { Suspense, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Header } from './components/Header'
import { Route, Switch } from 'react-router'
import { Preloader } from './components/Preloader'
import { useDispatch } from 'react-redux'
import { getUsers } from './redux/users-reducer'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(16),
  },
}))

const UsersPage = React.lazy(() =>
  import('./pages/Users').then((module) => ({
    default: module.Users,
  }))
)
const PostsPage = React.lazy(() =>
  import('./pages/Posts').then((module) => ({
    default: module.Posts,
  }))
)
const PostPage = React.lazy(() =>
  import('./pages/Post').then((module) => ({
    default: module.Post,
  }))
)

export default function App() {
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
  }, [])
  return (
    <React.Fragment>
      <Header />

      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Suspense
            fallback={
              <div>
                <Preloader />
              </div>
            }
          >
            <Switch>
              <Route exact path="/" render={() => <UsersPage />} />
              <Route
                exact
                path="/posts/:userId?"
                render={(props) => <PostsPage {...props} />}
              />
              <Route
                path="/post/:userId?/:postId?"
                render={(props) => <PostPage {...props} />}
              />
            </Switch>
          </Suspense>
        </Container>
      </main>
    </React.Fragment>
  )
}
