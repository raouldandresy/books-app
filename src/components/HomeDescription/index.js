import React, { Component } from 'react';
import './homedescription.scss'
import {Card,CardText,CardTitle} from 'material-ui/Card';

export default class HomeDescription extends Component {
    
  constructor(props){
    super(props)
    this.state = {
      cookieSaved: false
    }
  }
  
  render() {

    if(!this.props.cookieSaved){
      const style = { display: 'flex' }
      return (
        <div style={style} className="home-description">
          <p className="title"><span className="title__app">Bookshare</span> ti permette di</p>
  
          <span className="circle" />
          <div className="contents">
            <Card className="content">
              <CardTitle title="Cerca un libro" />
              <CardText>
                Puoi cercare un libro di tuo interesse a partire da un titolo, autore o genere. Puoi anche
                cercare i libri o vedere quelli disponibile nei pressi della tua città
              </CardText>
            </Card>
            <Card className="content">
              <CardTitle title="Offrire un libro" />
              <CardText>
                Puoi condividere i tuoi libri gratuitamente su questa piattaforma. Quando qualcuno cercherà
                il libro da te inserito, verrai avvisato appena possibile
              </CardText>
            </Card>
          </div>
        </div>
      );
    }
  }
}