import React, { Component } from 'react';
import UserBar from './components/UserBar/UserBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500} from 'material-ui/styles/colors';
import './App.scss'
import fire from './firebase'
import { silentLogin, catchLogout } from './actions'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

// components
import HomeDescription from './components/HomeDescription'
import Profile from './components/Profile'
import InsertBook from './components/InsertBook'
import GetBooks from './components/GetBooks'

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
        <BrowserRouter>
          <div className="App">
            <UserBar />
            {/* <Route exact="/" component={HomeDescription}/>  SECTION MAIN */}
            <div id="main">
              <Route path="/home" component={HomeDescription}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/insertbook" component={InsertBook}/>
              <Route path="/getbook" component={GetBooks}/>
            </div>
            {/* <Footer /> */}
          </div>
        </BrowserRouter>
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