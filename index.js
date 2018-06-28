import React,{Component} from 'react';
import App from './src/App';

import {AppRegistry} from 'react-native';

export default class EventViewer extends Component {

  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('AlisReader', () => EventViewer);
