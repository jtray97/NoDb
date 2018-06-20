import React, {Component} from 'react'

export default class Header extends Component{
    constructor(){
        super()
        this.state= {
            header:"Your Balance is:"
        }
    }
    render(){
        return(
            
            <h1>{this.state.header} {this.props.money}</h1>
        )
    }
}