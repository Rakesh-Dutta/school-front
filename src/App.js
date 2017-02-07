import React, { Component } from 'react';
import CreateStudent from './components/CreateStudent/CreateStudent';
import CreateKlass from './components/CreateKlass/CreateKlass';
import List from './components/List/List';

export default class App extends Component {
  constructor(props){
    super(props);
    this.studentsCreated = this.studentsCreated.bind(this);
    this.klassesCreated = this.klassesCreated.bind(this);
    this.displayKlassesForStudent = this.displayKlassesForStudent.bind(this);

    this.state ={
      "students" :[],
      "klasses"  : []
    }
  }
  studentsCreated(data){
    var studentsList = this.state.students;
    studentsList.push({"id":data.id, "text":data.email, "css":"selected"})
    this.setState({"students":studentsList});
  }

  klassesCreated(data){
    var klassesList = this.state.klasses;
    klassesList.push({"id":data.id, "text": data.name, "css":"selected"})
    this.setState({"klasses":klassesList});
  }

  displayKlassesForStudent(klasses){
    var klassListForStudent = this.state.klasses;
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <h1>School Registration</h1>
          <div className="col-xs-6">
            <CreateStudent created={this.studentsCreated} host="http://localhost:9000" />
            <List header="Students" items={this.state.students} click={this.displayKlassesForStudent}/>
          </div>
          <div className="col-xs-6">
            <CreateKlass created={this.klassesCreated} host="http://localhost:9000" />
            <List header="Klasses" items={this.state.klasses}/>
          </div>
        </div>
      </div>
    );
  }
}