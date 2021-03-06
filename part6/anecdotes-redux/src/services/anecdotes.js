import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)

const createNew = async (content) => {
  const object = asObject(content)
  const response = await axios.post(baseUrl, object)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const voteFor = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  console.log('response', response)
  const anecdote = response.data
  const upvoted = { ...anecdote, votes: anecdote.votes + 1 }
  return await axios.put(`${baseUrl}/${id}`, upvoted)
}

export default {
  createNew,
  getAll,
  voteFor,
}
