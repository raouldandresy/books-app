import React, { Component } from 'react';
import './userbar.css'
import { connect } from 'react-redux'
import { checkLogin } from '../../actions'
import logo from '../../assets/svg/logo.svg'
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar'

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
          <h2 onClick={this.handleLoginClick.bind(this)}>Accedi</h2>
          <h2>Registrati</h2>
          {this.renderProfileImage()}
        </div>
      </div>
    );
  }

  renderProfileImage(){
    if(this.props.logged && this.props.userInfo){
      return (
        <Avatar
            src={this.props.userInfo.img}
            size={64}
        />
      )
    }
  }

  handleLoginClick(){
    this.props.checkLogin()
  }
}

const mapStateToProps = (state) => {

    const { userInfo, logged } = state.userWrapper
    return {
      userInfo,
      logged
    }
  }
 
const mapDispatchToProps = (dispatch) => {
  
    return ({
      checkLogin: () => { dispatch(checkLogin()) }
    })
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(UserBar)