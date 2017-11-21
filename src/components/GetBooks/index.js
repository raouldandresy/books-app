import React, { Component } from 'react';
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import './getBook.css'
import PopupNeedLogin from '../PopupNeedLogin'
import server from '../../server/server'

class GetBooks extends Component {
    
  constructor(props){
    super(props)    
    this.state={books:[]}
  }

  bookList={

  }
  
  render() {

    if(!this.props.logged)
        return <PopupNeedLogin />

    return (
        <Paper zDepth={1} id="getBookWrapper">
            <header>
                this is header
            </header>
            <ul id="getBooks">
                <li>
                    
                </li>
            </ul>
        </Paper>
    )
  }

  
}

const mapStateToProps = (state) => {
    
        const { userInfo, logged } = state.userWrapper
        return {
          userInfo,
          logged
        }
}

export default connect(mapStateToProps)(GetBooks)