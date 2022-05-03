// We will store the global state in a "store", to be used all across our webpage. This "store" will set state and get state, through a reducer.

function createStore(reducer) {
    // THe first time the reducer runs it will return the default state
    let currentState = reducer(undefined, {});
   
   return {
     getState: () => currentState,
     dispatch: action => {
        currentState = reducer(currentState, action);    
     } 
   }
}

const initialState = {
  favorites: []  
}

function favoritesReducer(state = initialState, action) {
   switch (action.type) {
      case "ADD_FAVORITE": {
        const addedFavorite = action.payload.favorite;
        const favorites = [...state.favorites, addedFavorite];
        return { favorites };
      }
      case "REMOVE_FAVORITE": {
        const removedFavorite = action.payload.favorite;
        const favorites = state.favorites.filter(favorite => favorite.id !== removedFavorite.id);
        return { favorites };
      }
      default:
        return state;
   } 
}

// const action = { type: "ADD_FAVORITE", payload: { favorite: { title: "story1", id: 1 } } };

const store = createStore(favoritesReducer);
// store.dispatch(action);
// console.log(store.getState());
export default store;