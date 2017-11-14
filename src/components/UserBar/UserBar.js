import React, { Component } from 'react';
import './userbar.css'
import { connect } from 'react-redux'
import { checkLogin } from '../../actions'
import logo from '../../assets/svg/logo.svg'
import TextField from 'material-ui/TextField';

class UserBar extends Component {
    
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <div className="userbar">
        <img src={logo} className="userbar__logo"/>   
        <TextField className="userbar__search" hintText="A books' s title" />   

        <div className="userbar__action">
          <h2>Accedi</h2>
          <h2>Registrati</h2>
        </div>
      </div>
    );
  }

  loginFb(){
    this.props.checkLogin()
  }
}
 
const mapDispatchToProps = (dispatch) => {
  
    return ({
      checkLogin: () => { dispatch(checkLogin()) }
    })
  }
  
  
export default connect(undefined, mapDispatchToProps)(UserBar)