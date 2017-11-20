import React, { Component } from 'react';
import { connect } from 'react-redux'
import { checkLogin } from '../../actions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class PopupNeedLogin extends Component {
    
  constructor(props){
    super(props)
  }
  
  render() {
    const actions = [
        <FlatButton
          label="Proceed with login"
          primary={true}
          keyboardFocused={true}
          onClick={() => this.props.checkLogin()}
        />,
      ];
    return (
        <Dialog
            title="Login"
            actions={actions}
            modal={false}
            open={true}>
            You have to be logged to insert a book
        </Dialog>
    )
  }
}
     
const mapDispatchToProps = (dispatch) => {
     
    return ({
        checkLogin: () => { dispatch(checkLogin()) }
    })
}

export default connect(undefined, mapDispatchToProps)(PopupNeedLogin)