import usersReducer from './users-reducer'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import postsReducer from './posts-reducer'
import currentPostReducer from './currentPost-reducer'

let rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  currentPost: currentPostReducer,
})
const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnchancers(applyMiddleware(thunkMiddleware))
)

export default store
