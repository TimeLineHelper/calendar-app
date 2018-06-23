import React, { Component } from 'react';
import uuidv4 from 'uuidv4';
// import User from '../../../../models/user.js';

export default class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      // begin: new Date(),
      // end: new Date(),
      user: this.props.user,
      isEditing: false,
      description: this.props.description
    };
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
    this.setState({
      [ev.target.description]: ev.target.value
    });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    console.log('created task');
    if (this.props.buttonText === 'create') {
      console.log('27 create task')
      let createdTask = {
        id: uuidv4(),
        name: ev.target.name.value,
        description: ev.target.description.value,
        elements: [],
        isEditing: false,
      }
      this.props.addTask(createdTask); //post request to db


    }
    else {
      let newValue = {};
      Object.assign(newValue, this.props.task);
      console.log('new val', newValue);
      console.log('42 this.props.user', this.props.user);
      console.log('43 this.props.user.task', this.props.user.task);
      newValue.name = ev.target.name.value;
      newValue.description = ev.target.name.description;
      this.props.toggleEdit();
      console.log('this.props', this.props);
      this.props.updateTask(newValue, this.props.task.id); //put request to db
      // fetch(`/api/user/${this.props.user.email}`, {
      //   body: JSON.stringify({
      //     id: this.props.task.id,
      //     tasks: this.props.task,
      //   }),
      //   method: 'GET'
      // })

      //   .then(data => {
      //     console.log(data, 'this is data 53 taskform');
      //   })
    }
  }



  render() {

    return <form id="task-form" onSubmit={this.handleSubmit}>
      <input
        id="form-name"
        onChange={this.handleChange}
        type='text'
        name='name'
        value={this.state.name}
        placeholder='Event Name'
      />
      <input 
        onChange={this.handleChange}
        name='description'
        type='text'
        value={this.state.description}
        placeholder='Event description'
      />
      <button type='submit'>{this.props.buttonText === 'create' ? 'Submit Task' : 'Update Task'} </button>

      <label for="date">Start Date:</label>

      <input
        // id="date"
        onChange={this.handleChange}
        type='date'
        name='begin'
        placeholder='start date'
      />
      <label for="date">End Date:</label>
      <input
        // id="date" dont need date see alicia
        onChange={this.handleChange}
        type='date'
        name='end'
        placeholder='end date'
      />
      <button id="event-button" type='submit'>{this.props.buttonText === 'create' ? 'Submit' : 'Create Event'} </button>
    </form>;

  }
}