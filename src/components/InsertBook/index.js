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
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';

class InsertBook extends Component {

    state = {
        foundedBooks: [],
        loadingBooks: false,
        stepIndex: 0,
        selectedBookId: null
    }

    constructor(props){
        super(props)    
    }
  
    render() {

        if(!this.props.logged)
            return <PopupNeedLogin />
    
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        
        return (
            <div id="insertBookWrapper">
                <Stepper linear={false} activeStep={stepIndex}>
                <Step>
                    <StepButton onClick={() => this.setState({stepIndex: 0})}>
                        Informazioni sul prestito
                    </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={() => this.setState({stepIndex: 1})}>
                        Seleziona il libro che possiedi
                    </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={() => this.setState({stepIndex: 2})}>
                        Lascia un impressione su questo libro
                    </StepButton>
                </Step>
                </Stepper>
                <div style={contentStyle}>
                <p>{this.getStepContent(stepIndex)}</p>
                <div style={{marginTop: 12}}>
                    <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{marginRight: 12}}
                    />
                    <RaisedButton
                    label="Next"
                    disabled={stepIndex === 2}
                    primary={true}
                    onClick={this.handleNext}
                    />
                    <FlatButton
                    label="Insert"
                    primary={true}
                    onClick={this.handleInsert.bind(this)}
                    />
                </div>
            </div>
          </div> 
        )
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
          case 0:
            return 'Select campaign settings...';
          case 1:
            return this.renderFormSearch()
          case 2:
            return 'This is the bit I really care about!';
          default:
            return 'You\'re a long way from home sonny jim!';
        }
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        if (stepIndex < 2) {
          this.setState({stepIndex: stepIndex + 1});
        }
    }
    
    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
          this.setState({stepIndex: stepIndex - 1});
        }
    }

    handleInsert = () => {

        const book = this.state.foundedBooks.find(book => book.id === this.state.selectedBookId);
        const doc = {        
            book: {
                id: book.id,
                title: book.title,
                authors: book.authors,
                publisher: book.publisher,
                thumbnail: book.thumbnail
            },
            state: 'AVAILABLE',
            owner: this.props.userInfo.uid
        }

        fetch('http://localhost:3002/insertbook', {
            method: 'post',
            body: JSON.stringify(doc),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            alert('inser ok, remove this alert');
        });
    }

    renderStepActions(step) {
        return (
          <div style={{margin: '12px 0'}}>
            <RaisedButton
              label="Next"
              disableTouchRipple={true}
              disableFocusRipple={true}
              primary={true}
              onClick={this.handleNext}
              style={{marginRight: 12}}
            />
            {step > 0 && (
              <FlatButton
                label="Back"
                disableTouchRipple={true}
                disableFocusRipple={true}
                onClick={this.handlePrev}
              />
            )}
          </div>
        );
    }

    renderFormSearch(){
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)} id="insertBook">
                    <TextField ref="inputTitle"  hintText="Book title" defaultValue="Orgoglio e pregiudizio" />
                    <RaisedButton type="submit" label="Cerca" primary={true} />
                </form>
                <Divider />
                {this.renderFoundedBooks()}
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
        return <FoundedBooksList foundedBooks={this.state.foundedBooks} 
                                 loadingBooks={this.state.loadingBooks} 
                                 selectedBookId={this.state.selectedBookId}
                                 handleBookSelected={this.handleBookSelected.bind(this)}
                                 />
    }

    handleBookSelected(bookId){
        this.setState({ selectedBookId: bookId })
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