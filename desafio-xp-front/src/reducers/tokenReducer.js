const INITIAL_STATE = {
  token: '',
};

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'NEW_TOKEN':
      return { token: action.token };
    default:
      return state;
  }
}

export default tokenReducer;