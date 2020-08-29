const initialState = 'Hello world!'

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  return state
}

export default notificationReducer
