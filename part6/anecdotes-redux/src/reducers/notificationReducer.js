const initialState = ''

const notificationReducer = (state = initialState, action) => {
  let msg = state

  if (action.type === 'CLEAR_NOTIFICATION') {
    msg = ''
  } else if (action.type === 'SET_NOTIFICATION') {
    msg = action.data.msg
  }

  return msg
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export const setNotification = (msg) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { msg }
  }
}

export default notificationReducer
