import React, { Component } from 'react';
import '../../styles/css/Display.css';

export class DisplayToday extends Component{
  removeThis(e){
    this.props.deleteItem(e, 'Today');
  }

  render(){
    return(
      <div className="cell">
        <h2>Today</h2>
          {this.props.items.map((item, index) => {
            return(
              <div key={index} className="grid myitems">
                <div className="cell -9of12">
                  <div className="content-title">
                    <span key="{index}"> ~ &nbsp;{item}</span>
                  </div>
                </div>
                {/* <div className="cell -3of12">
                  <div className="content">
                    <button onClick={() => this.removeThis(index)} className="btn-default btn-ghost">X</button>
                  </div>
                </div> */}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export class DisplayTomorrow extends Component{
  removeThis(e){
    this.props.deleteItem(e, 'Tomorrow');
  }

  render(){
    return(
      <div className="cell">
        <h2>Tomorrow</h2>
          {this.props.items.map((item, index) => {
            return(
              <div key={index} className="grid myitems">
                <div className="cell -9of12">
                  <div className="content-title">
                    <span key="{index}"> ~ &nbsp;{item}</span>
                  </div>
                </div>
                {/* <div className="cell -3of12">
                  <div className="content">
                    <button onClick={() => this.removeThis(index)} className="btn-default btn-ghost">X</button>
                  </div>
                </div> */}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export class DisplayDayAfterTomorrow extends Component{
  removeThis(e){
    this.props.deleteItem(e, 'Day_After_Tomorrow');
  }

  render(){
    return(
      <div className="cell">
        <h2>Day After Tomorrow</h2>
          {this.props.items.map((item, index) => {
            return(
              <div key={index} className="grid myitems">
                <div className="cell -9of12">
                  <div className="content-title">
                    <span key="{index}">
                      &nbsp;{item}
                     </span>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
