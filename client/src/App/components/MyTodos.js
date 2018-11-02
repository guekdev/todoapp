import React, { Component } from 'react';

const axios = require('axios');

const URL = "http://localhost:5000/api/todos";

export default class MyTodos extends Component {
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

  updatePost = (todo) => {
    console.log("Hi from update! " + todo._id)
  }

  deletePost = (todo) => {
    let _id = todo._id;
    let idURL = URL + "/" + _id

    axios.delete(idURL, {
      _id: _id
    })
    .then(() => this.readPosts())
    .catch((err) => console.log("Failed to delete post: " + err))
  }



  render() {
    console.log(this.state.data)



    let todoCards = this.state.data.map((todo) => {
      let {title, checkList, prio, dueDate, createdAt, updatedAt } = todo;

      // Always exist
      let a = "Created: " + createdAt;
      let b = "Updated: " + updatedAt;

      // prio and dueDate might not exist ->
      // text before value is as string in database
      let times = [prio, dueDate, a, b];

      return (
        <div className="todo-card" key={createdAt}>
          <h3>
            {title}
          </h3>

          <div className="todo-content">
            <div className="todo-left">
              <div className="todo-checklist">
                {
                  checkList.map((value, index) => {
                    return <li key={createdAt+index}>{value}</li>;
                  })
                }
              </div>

              <div className="todo-buttons">
                <button className="edit-btn"
                        onClick={() => this.updatePost(todo)}>
                  Edit
                </button>
                <button className="delete-btn"
                        onClick={() => this.deletePost(todo)}>
                  Delete
                </button>
              </div>
            </div>

            <div className="todo-right">
              {
                times.map((value, index) => {
                  return <li key={createdAt+index}>{value}</li>;
                })
              }
            </div>
          </div>
        </div>
      );
    });


    return (
      <div id="my-todos">
        {todoCards}
      </div>
    );
  }
}
