import React,{Component} from 'react'

export default class Balance extends Component{
    constructor(){
        super()
        this.state={
            balance:500,
            // array:this.props.array
        }
    }
   
  

    render(){
        
        
        // this.state.array.filter((el)=>{return el.type==="add"})
        return(
            <div className="balanceDiv">
            <h1>Your Balance is:{this.state.balance}</h1>
            {this.handleBalance}
            </div>
        )
    }


}