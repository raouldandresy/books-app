import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

export default class FoundedBooksList extends Component {

    
    render(){

        if(this.props.loadingBooks)
            return <CircularProgress size={60} thickness={7} />
        
        // else
        const booksChild = this.props.foundedBooks.map((book, index) => {
            return <li key={index}>{this.renderChild(book)}</li>
        })

        return (
            <div className="insertBookWrapper--foundedBooks">
                <ul class="insertBookWrapper--foundedList">
                    {booksChild}
                </ul>
            </div>
        )
    }

    renderChild(book){

        return (
            <Paper zDepth={1} className="container">
                 <img src={book.thumbnail} alt="" />
                 <div className="info">
                    <h2 className="title">{book.title}</h2>
                    <h2 className="publisher">{book.publisher}</h2>
                 </div>
                 <div class="hoverLayer">
                     <h1>SELECT THIS</h1>
                 </div>
            </Paper>
        )
    }
}