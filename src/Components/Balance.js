import React,{Component} from 'react'

export default class Balance extends Component{
    constructor(){
        super()
        this.state={
            balance:500,
            array:'',
        }
    }
   componentDidMount(){
    // console.log(this.props.myVariable)
   }
  

    render(){
        return(
            <div className="balanceDiv">
            <h1>Your Balance is:{this.state.balance}</h1>
            {this.handleBalance}
            
            </div>
        )
    }


}