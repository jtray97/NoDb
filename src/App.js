import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Balance from './Components/Balance'
// import { stringify } from 'querystring';
// import Buttons from './Components/Buttons';

var baseURL = '/api/transactions'
class App extends Component {
  constructor() {
    super()
    this.state = {
      original: [],
      formatted: [],
      newName: 'null',
      newCost: 0,
      currentJoke: ''
    }

  }
  componentDidMount() {
    axios.get(baseURL).then(response => {
      this.setState({
        original: response.data,
        formatted: response.data.map((obj, ind) => { return <div key={obj.id + ind}><h3 className={obj.type}>{obj.name}: ${obj.amount}</h3></div> })

        

      })
    },
      axios.get(`https://api.chucknorris.io/jokes/random`).then(response => {
        this.setState({ currentJoke: response.data.value })
      }
      )
    )
    
  }

  handleChangeName = (val) => { this.setState({ newName: val }) }
  handleChangeCost = (val) => { this.setState({ newCost: val }) }

  // with these next two i need to both do a this.state.formatted.push using setstate and do an axios.post
  handleIncome = () => {
    console.log('income')
    axios.post(baseURL, { type: "add", amount: this.state.newCost, name: this.state.newName })
    axios.get(baseURL).then(response => {
      this.setState({
        original: response.data,
        formatted: response.data.map((obj, ind) => { return <div key={obj.id + ind}><h3 className={obj.type}>{obj.name}: ${obj.amount}</h3></div> })


      })
      // console.log(this.state.formatted)
    })
  }
  handleExpend = () => {
    console.log('expend')
    axios.post(baseURL, { type: "sub", amount: this.state.newCost, name: this.state.newName })
    axios.get(baseURL).then(response => {
      
      this.setState({
        original: response.data,
        formatted: response.data.map((obj, ind) => { return <div key={obj.id + ind}><h3 className={obj.type}>{obj.name}: ${obj.amount}</h3></div> })
        

      })
    })
  }



  render() {
   
    
    return (
      <div className="App">
      <div id ="jokeDiv">
        <h1 className="joke">{this.state.currentJoke}</h1>
      </div>
        <Balance />
        <div>
          <input onChange={(e) => { this.handleChangeName(e.target.value) }} /><input onChange={(e) => { this.handleChangeCost(e.target.value) }} />
        </div>
        <div>
          <button onClick={() => { this.handleIncome() }}>Income</button><button onClick={() => { this.handleExpend() }}>Expend</button>
        </div>
        {this.state.formatted}
      </div>
    );
  }
}

export default App;