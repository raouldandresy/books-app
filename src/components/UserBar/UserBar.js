import React, { Component } from 'react';
import './userbar.css'
import { connect } from 'react-redux'
import { checkLogin } from '../../actions'

class UserBar extends Component {
    
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <div className="userbar">
        userbar
        <button onClick={this.loginFb.bind(this)}>login_FB</button>
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