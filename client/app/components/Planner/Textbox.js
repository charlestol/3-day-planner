import React, { Component } from 'react';
import '../../styles/css/Textbox.css';

// term stores user entry
export class Textbox extends Component{
  constructor(props){
    super(props);
    this.state = {
      'term': '',
      'day': 'Today'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    // updates value of term
    this.setState({
      'term': e.target.value
    });
  }

  handleSelect(e){
    // updates day's state
    this.setState({
      'day': e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.updateEntry(this.state.term, this.state.day);
    // set state to make text field blank after entered
    this.setState({
      'term': ''
    });
  }

  render(){
    return(
      <div className="container">
        <form onSubmit={this.handleSubmit} className="form">
          <fieldset className="form-group form-warning">
            <label htmlFor="day">FOR DAY : </label>
            <select value={this.state.day} id="day" onChange={this.handleSelect} className="form-control" >
              <option value="Today">Today</option>
              <option value="Tomorrow">Tomorrow</option>
              <option value="Day_After_Tomorrow">Day After Tomorrow</option>
            </select>
          </fieldset>
          <fieldset className="inputBox">
            <label> YOUR TASK : </label>
            <input
              type="text"
              id="aim"
              placeholder="TYPE HERE"
              value={this.state.term}
              onChange={this.handleChange}
              autocomplete="off"
            />
          </fieldset>
          <button className="btn btn-warning btn-ghost">I WILL DO THIS</button>
        </form>
      </div>
    );
  }
}
