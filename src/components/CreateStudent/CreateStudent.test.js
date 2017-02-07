import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import CreateStudent from './CreateStudent';
axios.defaults.adapter = httpAdapter;

describe('CreateStudent', () => {
  beforeEach(() => {
      nock.disableNetConnect(); //prevents calls to network calls inadvertly
  });

  afterEach(() => {
      nock.cleanAll(); //cleans all mocks in system
      nock.enableNetConnect(); //re-enable network calls
  });

  it('should render without error', () => {
    const wrapper = shallow(<CreateStudent />);
    expect(wrapper).to.be.ok;
  });

  it('should find component using its class name', () => {
    const wrapper = shallow(<CreateStudent />);
    expect(wrapper.find('.create-student').length).to.equal(1);
  });

  it('should call preventDefault when the button is clicked', () => {
    const stub = sinon.stub();
    const wrapper = mount(<CreateStudent />);
    wrapper.find('button').simulate('click', {preventDefault: stub});
    expect(stub.callCount).to.equal(1);
  });

  it('should show error message when email is too short', () => {
    const wrapper = mount(<CreateStudent />);
    wrapper.find('input').get(0).value = 'bob';
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error')).to.equal('Email is too short');
  });

  it('should not show error message when email is good', () => {
    const wrapper = mount(<CreateStudent />);
    wrapper.find('input').get(0).value = 'bob@gmail.com';
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error')).is.null;
  });

  it.only('should create a student', () => {
    nock('http://fakehost.com')
    .post('/students', {email: 'bob@gmail.com'})
    .reply(200, {id: 99, email: 'bob@gmail.com'});

    const stub = sinon.stub();
    const wrapper = mount(<CreateStudent host="http://fakehost.com" created={stub}/>);

    wrapper.find('input').get(0).value = 'bob@gmail.com';
    wrapper.find('button').simulate('click');
    setTimeout(() => {
        try{
            expect(stub.callCount).to.equal(1);
            expect(stub.getCall(0).args[0]).to.deep.equal({id: 99, email: 'bob@gmail.com'});
            expect(wrapper.find('input').get(0).value).to.equal('')
        }catch(e){
            done.fail(e);
        }         
    }, 1000);
   
  });

});