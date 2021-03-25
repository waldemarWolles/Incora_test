import { postsAPI } from '../api/posts-api'
const SET_POSTS = 'posts-reducer/setPosts'
const SET_CURRENT_POSTS_USER = 'posts-reducer/setCurrentPostsUser'
const DELETE_POST = 'posts-reducer/deletePost'
const UPDATE_POST = 'posts-reducer/updatePost'

let initialState = {
  posts: [],
  currentPostsUser: {},
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return {
        ...state,
        posts: [...action.posts],
      }
    }
    case SET_CURRENT_POSTS_USER: {
      return {
        ...state,
        currentPostsUser: { ...action.user },
      }
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: [...state.posts.filter((post) => post.id !== action.postId)],
      }
    }

    case UPDATE_POST: {
      return {
        ...state,
        posts: [
          ...state.posts.map((post) => {
            if (post.id === action.updatedPost.id) {
              return { ...action.updatedPost }
            }
            return post
          }),
        ],
      }
    }

    default:
      return state
  }
}

export default postsReducer

export const setPosts = (posts) => ({
  type: SET_POSTS,
  posts,
})

export const setCurrentPostsUser = (user) => ({
  type: SET_CURRENT_POSTS_USER,
  user,
})
export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
})

export const updatePost = (updatedPost) => ({
  type: UPDATE_POST,
  updatedPost,
})

export const getPosts = (id) => {
  return async (dispatch, getState) => {
    let response = await postsAPI.get(id)

    dispatch(setCurrentPostsUser(getState().users.users[id - 1]))
    dispatch(setPosts(response))
  }
}
export const createPost = (userId, title, body) => {
  return async (dispatch, getState) => {
    let response = await postsAPI.create(userId, title, body)

    dispatch(setCurrentPostsUser(getState().users.users[userId - 1]))
    dispatch(setPosts([...response[1].data, response[0].data]))
  }
}
