import React, { Component } from 'react';
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import './getBooks.css'
import PopupNeedLogin from '../PopupNeedLogin'

class GetBooks extends Component {
    
  constructor(props){
    super(props)    
    this.state={books:[]}
  }

  componentDidMount(){
    fetch('http://localhost:5000/api/getBooks').then(function(response,error) {
        var contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .then(function(books) { this.setState({books:books}) }.bind(this))
      .catch(function(error) { console.log(error); });
  }
  
  render() {

    if(!this.props.logged)
        return <PopupNeedLogin />

   let listBooks = this.state.books.map((book) =>
    <li key={book.id}>
      {book.title} : {book.author}
    </li>
    )

    return (
        <Paper zDepth={1} id="getBookWrapper">
            <header>
                this is header
            </header>
            <ul id="getBooks">
               {listBooks}
            </ul>
        </Paper>
    )
  }

  
}

const mapStateToProps = (state) => {
    
        const { userInfo, logged } = state.userReducer
        return {
          userInfo,
          logged
        }
}

export default connect(mapStateToProps)(GetBooks)