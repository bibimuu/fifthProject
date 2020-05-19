import React from 'react';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navogation/PlacesNavigator';
import placesReducer from "./store/places-reducer";

const rootReducer = combineReducers({
  places: placesReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
  <Provider store={store}>
    <PlacesNavigator/>
  </Provider>
  );
}


