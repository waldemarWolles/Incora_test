import axios from 'axios'
import { instance } from './api'

export const currentPostAPI = {
  getCurrentComments: async (postId) => {
    const response = await axios.get(`${instance}/comments?postId=${postId}`)

    return response.data
  },

  getCurrentPost: async (postId) => {
    const response = await axios.get(`${instance}/posts/${postId}`)

    return response.data
  },

  updateCurrentPost: async (userId, id, title, body) => {
    const response = await axios.put(`${instance}/posts/${id}`, {
      userId,
      id,
      title,
      body,
    })

    return response.data
  },

  deleteCurrentPost: async (postId) => {
    const response = await axios.delete(`${instance}/posts/${postId}`)

    return response.data
  },
}
