import React, { Component } from 'react';

export class Header extends Component{
  render(){
    return(
      <div className="grid header">
        <div className="salutation -8of12">
          <div className="content">
            <div className="name">
              <center>
                <b> {this.props.name} </b>
                <hr />
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
