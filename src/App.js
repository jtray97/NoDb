import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Balance from './Components/Balance'
// import Buttons from './Components/Buttons';

var baseURL = '/api/transactions'
class App extends Component {
  constructor() {
    super()
    this.state = {
      original: [],
      formatted:[],
      newName:'',
      newCost:0,
    }

  }
  componentDidMount() {
    axios.get(baseURL).then(response => {
      console.log(response.data)
      this.setState({
        original:response.data,
        formatted:response.data.map((obj,ind)=>{return <div key = {obj.id+ind}><h3 className={obj.type}>{obj.name}: ${obj.amount}</h3></div>})
      })
        })}
     
  handleChangeName = (val) =>{this.setState({newName:val})}
  handleChangeCost = (val) =>{this.setState({newCost:val})}      
  render() {
    return (
      <div className="App">
        <Balance />
        <div>
          <input onChange={(e) =>{this.handleChangeName(e.target.value)}}/><input onChange={(e) =>{this.handleChangeCost(e.target.value)}}/>
        </div>
        <div>
          <button>Income</button><button>Expend</button>
        </div>
        {this.state.formatted}
      </div>
    );
  }
}

export default App;
