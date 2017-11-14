import React, { Component } from 'react';
import UserBar from './components/UserBar/UserBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <UserBar/>
      </MuiThemeProvider>
    );
  }
}

export default App;
