import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import panoramas from './panoramas';


const rootReducer = combineReducers({
    panoramas: panoramas,
    routing: routerReducer
});

export default rootReducer;
