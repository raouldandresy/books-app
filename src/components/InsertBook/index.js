import React, { Component } from 'react';
import { connect } from 'react-redux'
import { tryInsertNewBook } from '../../actions/booksAction'
import Paper from 'material-ui/Paper';
import './insertBook.css'
import PopupNeedLogin from '../PopupNeedLogin'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import BooksSearch from '../../helpers/BooksSearch'
import Divider from 'material-ui/Divider';
import FoundedBooksList from './FoundedBooksList'

class InsertBook extends Component {

    state = {
        foundedBooks: [],
        loadingBooks: false
    }

    constructor(props){
        super(props)    
    }
  
    render() {

        if(!this.props.logged)
            return <PopupNeedLogin />

        return (

            <div id="insertBookWrapper">

                <div>
                    <form onSubmit={this.handleSubmit.bind(this)} id="insertBook">
                        <TextField ref="inputTitle"  hintText="Book title" defaultValue="Orgoglio e pregiudizio" />
                        <RaisedButton type="submit" label="Cerca" primary={true} />
                    </form>

                    <Divider />

                    {this.renderFoundedBooks()}

                </div>

            </div>
        )
    }

    handleSubmit(e){
        e.preventDefault() // avoid refresh page
        
        const title = this.refs.inputTitle.getValue()

        this.setState({ loadingBooks: true })
        BooksSearch.searchByTitle(title)
            .then(foundedBooks => {
                this.setState({ loadingBooks: false, foundedBooks });
            })
            .catch(err => { 
                // to do 
            })

    }

    renderFoundedBooks(){
        return <FoundedBooksList foundedBooks={this.state.foundedBooks} loadingBooks={this.state.loadingBooks}/>
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