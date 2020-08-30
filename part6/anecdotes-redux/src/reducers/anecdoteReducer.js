import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ANECDOTE':
      return [ ...state, action.data.anecdote ]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE_FOR_ANECDOTE':
      const newState = []
      state.forEach(anecdote => {
        if (anecdote.id === action.data.id) {
          anecdote.votes = anecdote.votes + 1
        }
        newState.push(anecdote)
      })
      return newState
    default:
      return state
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: { anecdote }
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteFor = (id) => {
  return async dispatch => {
    const _ = await anecdoteService.voteFor(id)
    dispatch({
      type: 'VOTE_FOR_ANECDOTE',
      data: { id }
    })
  }
}

export default anecdoteReducer
