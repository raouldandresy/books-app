import React, { Component } from 'react';
import UserBar from './components/UserBar/UserBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500} from 'material-ui/styles/colors';
import './App.css'

// components
import HomeDescription from './components/HomeDescription'

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <UserBar/>
        <section id="main">
          <HomeDescription/>
        </section>
      </MuiThemeProvider>
    );
  }
}

export default App;
