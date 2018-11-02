
import React, { Component } from 'react';

const axios = require('axios');

const URL = "http://localhost:5000/api/todos";



export default class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      myData: [],
      newTitle: "",
      newThink: ""
    }
  }

  componentDidMount() {
    this.readData()
    console.log(this.state.myData)
  }

  buildEdit = (todo) => {
    console.log("hi")
    if (todo.myEdit === true) {
      return (
        <div className="todo-edit">
          <form onSubmit={this.handleSubmit}>
            <label>
              Todo:
              <input type="text" name="newTitle" value={this.state.newTitle} onChange={this.handleInputChange} />
            </label>
            <label>
              Think:
              <input type="text" name="newThink" value={this.state.newThink} onChange={this.handleInputChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })

    console.log(this.state.newTitle)
  }


  handleSubmit = (todo) => {
    const _id = todo._id;
    let idURL = URL + "/:" + _id

    let nyaTodo = this.state.newTitle
    let nyaThink = this.state.newThink

    let check = todo.myEdit ? false : true

    axios.put(idURL, {
      _id: _id,
      myEdit: check,
      myTodo: nyaTodo,
      myThink: nyaThink
    })
    .then(() => {
      this.readData()
    })
    .catch(error => {
      console.log(error + "(Failed to update Player)")
    })
  }

  updatePost = (todo) => {
    const _id = todo._id;
    let idURL = URL + "/:" + _id

    let check = todo.myEdit ? false : true

    axios.put(idURL, {
      _id: _id,
      myEdit: check
    })
    .then(() => {
      this.readData()
    })
    .catch(error => {
      console.log(error + "(Failed to update Player)")
    })
  }

  deletePost = (todo) => {
    let _id = todo._id;
    let idURL = URL + "/" + _id
    console.log(idURL)

    axios.delete(idURL, {
      _id: _id
    })
    .then(() => {
      this.readData()
    })
    .catch(error => {
      console.log(error + "(Failed to delete Player)")
    })
  }

  readData = () => {
    axios.get(URL)
    .then(res => {
      console.log(res)
      this.setState({
        myData: res.data
      })
    })
    .catch(error => {
      console.log(error + "(Failed to load API)")
    })
  }

  render() {

    let todoList = this.state.myData.map((todo) => {
      return (
        <div className="todo-con" key={todo._id}>
          <div className="todo-left">
            <h3>
              {todo.myTodo}
            </h3>
            {
              todo.myThink.map((row) => {
                return (
                  <li key={row}>
                    {row}
                  </li>
                );
              })
            }
          </div>
          <div className="todo-right">
            <li>
              Relevans: 1
            </li>
            <li>
              Due date: 18/10/01
            </li>
            <li>
              Created: 18/9/01
            </li>
            <li>
              Last edited: 18/9/01
            </li>
          </div>
          <div className="todo-bot">
            <button>
              Mark as done
            </button>
            <button onClick={() => this.updatePost(todo)}>
              Edit post
            </button>
            <button onClick={() => this.deletePost(todo)}>
              Delete post
            </button>
          </div>
          //{this.buildEdit(todo)}
        </div>
      );
    });

    return (
      <div id="todo-list">
        {todoList}
      </div>
    );
  }
}
*/
