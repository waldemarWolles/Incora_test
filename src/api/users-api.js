import axios from 'axios'
import { instance } from './api'
export const usersAPI = {
  get: async () => {
    const response = await axios.get(`${instance}/users`)

    return response.data
  },
}
