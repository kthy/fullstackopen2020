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

export const addAnecdote = (anecdote) => {
  return {
    type: 'ADD_ANECDOTE',
    data: { anecdote }
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const voteFor = (id) => {
  return {
    type: 'VOTE_FOR_ANECDOTE',
    data: { id }
  }
}

export default anecdoteReducer
