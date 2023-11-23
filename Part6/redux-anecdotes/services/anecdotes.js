import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async (anecdoteId, newAnecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdoteId}`, newAnecdote)
  return response.data
}

export default { getAll, create, update }
