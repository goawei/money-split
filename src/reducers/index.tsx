import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers
// import { setClipboardText } from './clipboard';

const reducers = combineReducers({

});

const store = createStore(reducers, {}, applyMiddleware(thunk));

export default store;