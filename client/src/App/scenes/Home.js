import React, { Component } from 'react';
import MyTodos from '../components/MyTodos';

const axios = require('axios');

const URL = "http://localhost:5000/api/todos";

//import TodoList from '../components/TodoList';



const ThemeContext = React.createContext({
  data: []
});


class Header extends Component {
  constructor() {
    super();
    this.state = {
      expandOpen: false
    }
  }

  componentDidMount() {
  }

  buildExpand = () => {
    if (this.state.expandOpen === true) {
      return (
        <div id="expand">
        </div>
      );
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
      {data => (
        <header>
          <div className="content">
            <h1>
              todo app
            </h1>
          </div>
          <div id="expand-con">
            <div id="circle-btn"
                 onClick={this.buildExpand}>
            </div>
          </div>
          </header>
        )}
      </ThemeContext.Consumer>
    );
    }
}



export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.readPosts()
  }

  readPosts = () => {
    axios.get(URL)
    .then(res => this.setState({data: res.data}))
    .catch(err => console.log("Failed to load API with errcode: " + err))
  }

  render() {
    const ThemeContext = React.createContext({
      data: this.state.data
    });

    console.log(this.state.data)

    return (
      <div id="home" className="wrapper">
        <ThemeContext.Provider>
          <Header />
          <MyTodos />
        </ThemeContext.Provider>
      </div>
    );
  }
}
