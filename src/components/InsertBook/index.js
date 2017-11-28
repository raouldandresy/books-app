import React, { Component } from 'react';
import { connect } from 'react-redux'
import { tryInsertNewBook } from '../../actions'
import Paper from 'material-ui/Paper';
import './insertBook.css'
import PopupNeedLogin from '../PopupNeedLogin'

class InsertBook extends Component {
    
  constructor(props){
    super(props)    
  }
  
  render() {

    if(!this.props.logged)
        return <PopupNeedLogin />

    return (
        <Paper zDepth={1} id="insertBookWrapper">
            <header>
                this is header
            </header>

            <form onSubmit={this.handleSubmit.bind(this)} id="insertBook">
                <label>
                    Titolo del libro:
                    <input ref="inputTitle" type="text"/>
                </label>
                <label>
                    Autore del libro
                    <input ref="inputAuthor" type="text"/>
                </label>            
                <input type="submit" value="Cerca" />
            </form>
        </Paper>
    )
  }

  handleSubmit(e){
      e.preventDefault() // avoid refresh page
      this.props.tryInsertNewBook({ title: 'un titolo', author: 'un autore' })
  }
}

const mapStateToProps = (state) => {
    
        const { userInfo, logged } = state.userReducer
        return {
          userInfo,
          logged
        }
}

const mapDispatchToProps = (dispatch) => {
    
      return ({
        tryInsertNewBook: (book) => { dispatch(tryInsertNewBook(book)) }
      })
}

export default connect(mapStateToProps, mapDispatchToProps)(InsertBook)