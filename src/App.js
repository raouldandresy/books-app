import React, { Component } from 'react';
import UserBar from './components/UserBar/UserBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500} from 'material-ui/styles/colors';
import './App.css'
import fire from './firebase'
import { silentLogin, catchLogout } from './actions'
import { connect } from 'react-redux'

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

  componentDidMount(){
    fire.auth().onAuthStateChanged((user) => {
      if (user)
        this.props.silentLogin()
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <UserBar/>
          <section id="main">
            <HomeDescription/>
          </section>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  
    return ({
      silentLogin: () => { dispatch(silentLogin()) },
      catchLogout: () => { dispatch(catchLogout()) }
    })
  }

export default connect(undefined, mapDispatchToProps)(App)