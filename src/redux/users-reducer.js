import { usersAPI } from '../api/users-api'
const SET_USERS = 'users-reducer/setUsers'

let initialState = {
  users: [],
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: [...action.users],
      }
    }

    default:
      return state
  }
}

export default usersReducer

export const setUsers = (users) => ({
  type: SET_USERS,
  users,
})

export const getUsers = () => {
  return async (dispatch, getState) => {
    let response = await usersAPI.get()

    dispatch(setUsers(response))
  }
}
