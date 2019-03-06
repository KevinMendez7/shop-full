import { fromJS } from 'immutable'

const initialState = fromJS({
    items : {}
})

export const shopingCart = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        return state.push('items', action.item)
      case 'DELETE_ITEM':
        return state.push('items', action.item)
      case 'REGISTER_FAILURE':
        return {};
      default:
        return state
    }
  }