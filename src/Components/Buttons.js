import React, { Component } from 'react'


export default class Buttons extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            cost: 0,
        }
    }
    updaterAdd=()=>{this.props.myUpdater( 'add',this.state.name,this.state.cost )}
    updaterSub=()=>{this.props.myUpdater('sub',this.state.name,this.state.cost)
    
}

    render() {
        return (
            <div className="buttonsDiv">
                <div>
                    <h3>Add Transaction</h3>
                    <input onChange={(e) => { this.setState({ name: e.target.value }) }} type="text"/>
                    <input onChange={(e) => { this.setState({ cost: e.target.value }) }} type="text"/>
                </div>

                <div>
                    <button onClick={()=>this.updaterAdd()}>Income</button>
                    <button onClick={()=>{this.updaterSub()}}>Expenditure</button>
                </div>

            </div>
        )
    }
}