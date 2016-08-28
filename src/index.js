import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import routes from './routes';
import AppShell from './components/app-shell';
import * as actionCreators from './actions/action-creators';
import './core.css';


function mapStateToProps(state) {
  return {
    panoramas: state.panoramas
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const Root = connect(mapStateToProps, mapDispachToProps)(AppShell);

ReactDOM.render(routes(Root), document.getElementById('application'));

// TODO: i18n
// TODO: https://developer.foursquare.com/docs/users/checkins
