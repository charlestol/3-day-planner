import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Header } from './Header';
import { Textbox } from './Textbox';
import { DisplayToday, DisplayTomorrow, DisplayDayAfterTomorrow } from './Display';

import '../../styles/css/Planner.css'
// importing CSS framework
// import 'hack';

// import SimpleStorage from 'react-simple-storage'

class Planner extends Component {
  constructor(props){
    super(props);
    this.state = {
      'Today': [],
      'Tomorrow': [],
      'Day_After_Tomorrow': [],
      'username': 'Hello'
    }
    this.updateEntry = this.updateEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  // term is new todo item
  // ... before this.state helps concatenates the array
  updateEntry(term, day){
    if(day === 'Today'){
      this.setState({
        'Today' : [...this.state.Today, term],
      });
    }else if(day === 'Tomorrow'){
      this.setState({
        'Tomorrow' : [...this.state.Tomorrow, term],
      });
    }else if(day === 'Day_After_Tomorrow'){
      this.setState({
        'Day_After_Tomorrow' : [...this.state.Day_After_Tomorrow, term],
      });
    }
  }

  // filter() iterates through each element of array
  // and returns the element if logic equals true
  deleteEntry(index, day){
    if(day === 'Today'){
      let filterList = this.state.Today.filter((elem, i) => {
        if(i === index){
          return false;
        }
        return true;
      });
      this.setState({
        'Today': filterList
      });
    }else if (day === 'Tomorrow') {
      let filterList = this.state.Tomorrow.filter((elem, i) => {
        if(i === index){
          return false;
        }
        return true;
      });
      this.setState({
        'Tomorrow': filterList
      });
    }else if (day === 'Day_After_Tomorrow') {
      let filterList = this.state.Day_After_Tomorrow.filter((elem, i) => {
        if(i === index){
          return false;
        }
        return true;
      });
      this.setState({
        'Day_After_Tomorrow': filterList
      });
    }else{
      console.log('something went wrong while removing item...');
    }
  }

  render(){
    return(
      <div className="main">
        <h1>
          <Header name={this.state.username} />
        </h1>
        <Textbox updateEntry={this.updateEntry} />
        <hr />
        <div className="grid">
          {/* <SimpleStorage parent={this} /> */}
          <DisplayToday items={this.state.Today} deleteItem={this.deleteEntry} />
          <DisplayTomorrow items={this.state.Tomorrow} deleteItem={this.deleteEntry} />
          <DisplayDayAfterTomorrow items={this.state.Day_After_Tomorrow} deleteItem={this.deleteEntry} />
        </div>
      </div>
    );
  }
}

export default Planner;
