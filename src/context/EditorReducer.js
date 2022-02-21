import Elements from "../model/Elements" /* todo - here or context? */



const githubReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ELEMENTS':
      return {
        ...state,
        elements: action.payload,
      }
    // case 'GET_USER_AND_REPOS':
    //   return {
    //     ...state,
    //     user: action.payload.user,
    //     repos: action.payload.repos,
    //     loading: false,
    //   }
    // case 'SET_LOADING':
    //   return {
    //     ...state,
    //     loading: true,
    //   }
    // case 'CLEAR_USERS':
    //   return {
    //     ...state,
    //     users: [],
    //   }
    default:
      return state
  }
}

export default githubReducer
