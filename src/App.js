import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Joke from './Components/Joke'
import Picture from './Components/picture';
import imgVar from './Components/chuck norris.jpg'
import Header from './Header'
// import ThumbsUp from './Components/ThumbsUp';
// import Balance from './Components/Balance'
var addReduced;
var subReduced;


var baseURL = '/api/transactions'
class App extends Component {
  constructor() {
    super()
    this.state = {
      original: [],
      formatted: [],
      newName: 'null',
      newCost: 0,
      currentJoke: '',
      balance: 500,
      editAll: '',

    }

  }

  componentDidMount() {
    axios.get(baseURL).then(response => {
      this.setState({
        original: response.data,
        formatted: response.data.map((obj, ind) => {
          return <div key={obj.id + ind}><h3 className={obj.type}>{obj.name}: ${obj.amount}
          </h3>

            <button className="delete" onClick={() => this.handleDelete(obj.id)}>Delete</button>
            <input placeholder={`Edit ${obj.name}`} onChange = {(e) =>this.setState({editAll:e.target.value}) } /><button onClick={() => { this.editMe(obj.id) }}>Edit {obj.id}</button>

          </div>

        })
      });
    })
    this.workingBalance() // is run once, when the component mounts, and once per button click.

    axios.get('http://api.icndb.com/jokes/random').then((response) => {
      // console.log(response.data.value.joke)
      this.setState({ currentJoke: response.data.value.joke })
    })

  }
  editMe = (id) => {
    console.log(this.state.editAll)
    axios.put(baseURL + '/' + id, { name: this.state.editAll }).then((response) => {
      console.log(response.data)
      this.setState({
        original: response.data,
        formatted: response.data.map((obj, ind) => {
          return <div key={obj.id + ind}><h3 className={obj.type}>{obj.name}: ${obj.amount}
          </h3>

          <button className="delete" onClick={() => this.handleDelete(obj.id)}>Delete</button>
            <input placeholder={`Edit ${obj.name}`} onChange = {(e) =>this.setState({editAll:e.target.value}) } /><button onClick={() => { this.editMe(obj.id) }}>Edit {obj.id}</button>

          </div>

        })
      });
    }
  )
}
  workingBalance = () => { // this array takes the array from the server and converts it into numbers to add and subtract. and adds or subtracts to State.
    axios.get(baseURL).then(response => {
      this.setState({ array: response.data })
      // console.log('full Data=', response.data)
      var add = this.state.array.filter((obj) => { return obj.type === "add" })
      // console.log('filtered data=', add)
      var addition = []
      add.forEach(element => {
        return addition.push(+element.amount)
      })

      // console.log('just numbers=', addition)
      addReduced = addition.reduce((sum, num) => { return sum + num }, 0)
      // console.log('number to add=',addReduced)
      var sub = this.state.array.filter((obj) => { return obj.type === 'sub' })
      // console.log('filtered data =', sub)
      var subtraction = []
      sub.forEach((element) => { return subtraction.push(+element.amount) })
      // console.log('subtraction=', subtraction)
      subReduced = subtraction.reduce((sum, num) => { return sum + num }, 0)
      //  console.log (subReduced)
      // console.log(this.state.balance + addition[addition.length - 1] - subtraction[subtraction.length - 1])
      this.setState({
        balance: this.state.balance + (addReduced - subReduced)
      })
    }
    )
  }



  handleChangeName = (val) => { this.setState({ newName: val }) }
  handleChangeCost = (val) => { this.setState({ newCost: val }) }
  handleDelete = (val) => {
    console.log(val)

    axios.delete(baseURL + '/' + val).then(response => {
      console.log(response.data)


      this.setState({
        original: response.data,
        formatted: response.data.map((obj, ind) => {
          return( <div key={obj.id + ind}><h3 className={obj.type}>{obj.name}: ${obj.amount}
          </h3>

            <button className="delete" onClick={() => this.handleDelete(obj.id)}>Delete</button>
            <input placeholder={`Edit ${obj.name}`} onChange = {(e) =>this.setState({editAll:e.target.value}) } /><button onClick={() => { this.editMe(obj.id) }}>Edit {obj.id}</button>
          </div>
          )
        })
      })
    })




  }

  // with these next two i need to both do a this.state.formatted.push using setstate and do an axios.post
  handleIncome = () => {
    // console.log('income')
    axios.post(baseURL, { type: "add", amount: this.state.newCost, name: this.state.newName })
    axios.get(baseURL).then(response => {
      this.setState({
        original: response.data,
        formatted: response.data.map((obj, ind) => {
          return <div key={obj.id + ind}>

            <h3 className={obj.type}>
              {obj.name}: ${obj.amount}

            </h3>
            <button className="delete" onClick={() => this.handleDelete(obj.id)}>Delete</button>
            <input placeholder={`Edit ${obj.name}`} onChange = {(e) =>this.setState({editAll:e.target.value}) } /><button onClick={() => { this.editMe(obj.id) }}>Edit {obj.id}</button>


          </div>
        }),

        balance: this.state.balance + Number(this.state.newCost)

      })

    })
  }
  handleExpend = () => {
    // console.log('expend')
    axios.post(baseURL, { type: "sub", amount: this.state.newCost, name: this.state.newName })
    axios.get(baseURL).then(response => {
      // console.log(response.data)
      this.setState({
        original: response.data,
        formatted: response.data.map((obj, ind) => {
          return <div key={obj.id + ind} ><h3 className={obj.type}>{obj.name}: ${obj.amount}

          </h3>
          <button className="delete" onClick={() => this.handleDelete(obj.id)}>Delete</button>
            <input placeholder={`Edit ${obj.name}`} onChange = {(e) =>this.setState({editAll:e.target.value}) } /><button onClick={() => { this.editMe(obj.id) }}>Edit {obj.id}</button>


          </div>
        }),

        balance: this.state.balance - Number(this.state.newCost)

      })

    })
  }

  // componentDidUpdate(prevProps, prevState){
  //   <Header money={this.state.balance}/>



  render() {


    return (
      <div className="App">
        <div id="jokeDiv">
          <Joke joke={this.state.currentJoke} />
          <Picture img={imgVar} width='100%' height='100px' />
          <Picture img={imgVar} width='100%' height='100px' />
        </div>
        <div>
          <Header money={this.state.balance} />
        </div>
        <div>
          <input className="name" placeholder="Name of transaction:" onChange={(e) => { this.handleChangeName(e.target.value) }} /><input placeholder="$$$$" className="cost" onChange={(e) => { this.handleChangeCost(e.target.value) }} />
        </div>
        <div>
          <button onClick={() => { this.handleIncome() }}>Income</button><button onClick={() => { this.handleExpend() }}>Expend</button><button onClick={() => this.handleDelete()}>Delete All</button>
        </div>
        <div className="output">
          {this.state.formatted}
        </div>
      </div>
    );
  }
}

export default App;