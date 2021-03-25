import axios from 'axios'
import { instance } from './api'
export const postsAPI = {
  get: async (id) => {
    const response = await axios.get(`${instance}/posts?userId=${id}`)

    return response.data
  },

  create: async (userId, title, body) => {
    const response = await axios.all([
      axios.post(`${instance}/posts`, {
        userId,
        title,
        body,
      }),
      axios.get(`${instance}/posts?userId=${userId}`),
    ])

    return response
  },
}
