import React, { Component } from 'react';
import './userbar.css'
import { connect } from 'react-redux'
import { checkLogin, silentLogin, checkLogout } from '../../actions'
import logo from '../../assets/svg/logo.svg'
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar'
import fire from '../../firebase'
import { Link } from 'react-router-dom'

class UserBar extends Component {
    
  constructor(props){
    super(props)
  }
  
  render() {
    
    const actionsComp = this.props.userInfo ? this.renderLoggedActions() : this.renderGuestActions()

    return (
      <div className="userbar">
        <img src={logo} className="userbar__logo"/>   
        <TextField className="userbar__search" hintText="A books' s title" />   
        {actionsComp}
      </div>
    );
  }

  renderLoggedActions(){
    return (
      <div className="userbar__action">
        <h2 onClick={this.handleLogoutClick.bind(this)}>Logout</h2>
        <h2><Link className="profile__link" to="/profile">Profilo</Link></h2>
        <Avatar src={this.props.userInfo.img} size={52} />
      </div>
    ) 
  }

  renderGuestActions(){
    return (
      <div className="userbar__action">
        <h2 onClick={this.handleLoginClick.bind(this)}>Accedi</h2>
        <h2>Registrati</h2>
      </div>
    )
  }

  handleLoginClick(){
    this.props.checkLogin()
  }

  handleLogoutClick(){
    this.props.checkLogout()
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
      checkLogin: () => { dispatch(checkLogin()) },
      silentLogin: () => { dispatch(silentLogin()) },
      checkLogout: () => { dispatch(checkLogout()) }
    })
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(UserBar)