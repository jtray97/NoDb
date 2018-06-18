import React, { Component } from 'react'
import axios from 'axios'

var baseURL = '/api/transactions'
var addReduced;
var subReduced;
export default class Balance extends Component {
    constructor() {
        super()
        this.state = {
            balance: 500,
            array: [],
        }
    }
    workingBalance =() =>{
        axios.get(baseURL).then(response => {
            this.setState({ array: response.data })
            // console.log(`response.data=${response.data}`)
            var add = this.state.array.filter((obj) => { return obj.type === "add" })
            // console.log(`just add numbers = ${add}`)
            var addition = []
            add.forEach(element => {
                return addition.push(element.amount)
            })
            addReduced = addition.reduce((sum, num) => { return sum + num }, 0)
            console.log(addReduced)
            this.setState({ balance: this.state.balance + addReduced })
        
        
           var sub = this.state.array.filter((obj)=>{return obj.type === 'sub'})
        //    console.log(sub)
           var subtraction =[]
           sub.forEach((element)=>{return subtraction.push(element.amount)})
        //    console.log(subtraction)
           subReduced = subtraction.reduce((sum, num) => { return sum+num}, 0)
           console.log (subReduced)
           this.setState({balance: this.state.balance - subReduced})
        
        })

    }
    componentDidMount() {
       this.workingBalance()

    }





    handleBalance() {

    };

    render() {
        return (
            <div className="balanceDiv">
                <h1>Your Balance is:{this.state.balance}</h1>
            </div>
        )
    }


}