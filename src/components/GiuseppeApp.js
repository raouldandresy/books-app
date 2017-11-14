import React, { Component } from 'react';
import '../App.css';

class GiuseppeApp extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date(),isActive:true};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  
  onclick(){
	  if(this.state.isActive){
		 this.setState({isActive:false});
	  }
	  else{
		this.setState({isActive:true});
	  }
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
		    <button onClick={this.onclick}>Click Me</button>
      </div>
    );
  }
}

export default GiuseppeApp;
