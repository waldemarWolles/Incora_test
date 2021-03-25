import { currentPostAPI } from '../api/currentPost-api'
import { deletePost, updatePost } from './posts-reducer'
const SET_COMMENTS = 'posts-reducer/setComments'
const SET_CURRENT_POST_DATA = 'posts-reducer/currentPostData'
const SET_LOADING = 'posts-reducer/setLoading'

let initialState = {
  comments: [],
  currentPostData: {},
  isLoading: false,
}

const currentPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS: {
      return {
        ...state,
        comments: [...action.comments],
      }
    }
    case SET_CURRENT_POST_DATA: {
      return {
        ...state,
        currentPostData: { ...action.data },
      }
    }

    case SET_LOADING: {
      return {
        ...state,
        isLoading: action.value,
      }
    }

    default:
      return state
  }
}

export default currentPostReducer

export const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments,
})

export const setCurrentPostData = (data) => ({
  type: SET_CURRENT_POST_DATA,
  data,
})

export const setLoading = (value) => ({
  type: SET_LOADING,
  value,
})

export const getComments = (postId) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    let response = await currentPostAPI.getCurrentComments(postId)
    dispatch(getPost(postId))
    dispatch(setComments(response))

    dispatch(setLoading(false))
  }
}

export const getPost = (postId) => {
  return async (dispatch, getState) => {
    let response = await currentPostAPI.getCurrentPost(postId)

    dispatch(setCurrentPostData(response))
  }
}

export const updateCurrentPost = (userId, id, title, body) => {
  return async (dispatch, getState) => {
    let response = await currentPostAPI.updateCurrentPost(
      userId,
      id,
      title,
      body
    )

    dispatch(setCurrentPostData(response))
    dispatch(updatePost(response))
  }
}
export const deleteCurrentPost = (postId) => {
  return async (dispatch, getState) => {
    let response = await currentPostAPI.deleteCurrentPost(postId)

    dispatch(setCurrentPostData(response))
    dispatch(deletePost(postId))
  }
}
