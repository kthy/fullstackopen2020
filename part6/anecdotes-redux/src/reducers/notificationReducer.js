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

export const clearNotification = () => async dispatch => dispatch({ type: 'CLEAR_NOTIFICATION' })

export const setNotification = (msg, timeout) => {
  return async dispatch => {
    setTimeout(() => dispatch(clearNotification()), timeout * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { msg }
    })
  }
}

export default notificationReducer
