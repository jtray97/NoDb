import React, { Component } from 'react'
export default class Balance extends Component {    
    
    componentDidMount() {
       
    }
  
    
    render() {
        return (
            <div className="balanceDiv">
                <h1>Your Balance is:{this.props.Balance}</h1>
            </div>
        )
    }


}