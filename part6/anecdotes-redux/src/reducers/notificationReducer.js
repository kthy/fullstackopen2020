const initialState = ''

const notificationReducer = (state = initialState, action) => {
  let msg = state

  if (action.type === 'CLEAR') {
    msg = ''
  } else if (action.type === 'SET') {
    msg = action.data.msg
  }

  return msg
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

export const setNotification = (msg) => {
  return {
    type: 'SET',
    data: { msg }
  }
}

export default notificationReducer
