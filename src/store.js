import { createStore } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootReducer from './reducers/index';
import panoramas from './data/panoramas';


const defaultState = {
  panoramas
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(hashHistory, store);

export default store;
