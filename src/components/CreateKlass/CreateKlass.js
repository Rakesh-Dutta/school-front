import React from 'react';
import './CreateKlass.css';
import axios from 'axios';

export default class CreateKlass extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.create = this.create.bind(this);
  }

  create(e){
      e.preventDefault();
      this.setState({error: null});
      const name = this.name.value;
      const semester = this.semester.value;  
      const credits = this.credits.value;
      const department = this.department.value;
      const fee = this.fee.value;
      
      if(name.length < 3) {
        this.setState({error: 'Name should have atleast 3 characters'});
        return;
      }

    const url = this.props.host + '/klasses';
    const payload = {name, semester, credits, department, fee};   

    axios.post(url, payload) 
        .then(rsp  => {
            const klass = rsp.data;
            this.props.created(klass);
            this.name.value = '';
            this.semester.value = '';
            this.credits.value = '1';
            this.department.value = 'SCIENCE';
            this.fee.value = '';
        })
        .catch(e => {
            this.setState({error: e.message})
        });
  }

  render(){
    return (
      <div className="create-klass">
        <h3>Create Klass</h3>
        <div className={this.state.error ? "error" : ""}>{this.state.error}</div>
        <form>
          <div className="form-group">
            <label>Klass Name </label>
            <input id="name" placeholder="klassName" className="form-control" ref={n => this.name = n} type="text" />
            <br/>
            <label>Semester </label>
            <input id="semester" ref={n => this.semester = n} type="date" />
            <br/>
            <label>Credits </label>   
            <select id="credits" className="form-control" ref={n => this.credits = n}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <br/>
            <label>Department </label> 
            <select id="department" value={this.state.department} className="form-control" ref={n => this.department = n}>
              <option value="SCIENCE">SCIENCE</option>
              <option value="ENGINEERING">ENGINEERING</option>
              <option value="LITERATURE">LITERATURE</option>
              <option value="PHILOSOPHY">PHILOSOPHY</option>
            </select>
            <br/>
            <label>Fee </label>
             <input id="fee" placeholder="fee" className="form-control" ref={n => this.fee = n} type="number" />
          </div>
          <button className="btn btn-danger btn-small" onClick={this.create}>Create</button>
        </form>
      </div>
    );
  }
}
