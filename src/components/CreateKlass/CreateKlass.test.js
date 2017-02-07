import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import CreateKlass from './CreateKlass';
axios.defaults.adapter = httpAdapter;

describe('CreateKlass', () => {
  beforeEach(() => {
      nock.disableNetConnect(); //prevents calls to network calls inadvertly
  });

  afterEach(() => {
      nock.cleanAll(); //cleans all mocks in system
      nock.enableNetConnect(); //re-enable network calls
  });

  it('should render without error', () => {
    const wrapper = shallow(<CreateKlass />);
    expect(wrapper).to.be.ok;
  });

  it('should find component using its class name', () => {
    const wrapper = shallow(<CreateKlass />);
    expect(wrapper.find('.create-klass').length).to.equal(1);
  });

  it('should call preventDefault when the button is clicked', () => {
    const stub = sinon.stub();
    const wrapper = mount(<CreateKlass />);
    wrapper.find('button').simulate('click', {preventDefault: stub});
    expect(stub.callCount).to.equal(1);
  });

  it('should show error message when name is too short', () => {
    const wrapper = mount(<CreateKlass />);
    wrapper.find('input').get(0).value = 'Ed';
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error')).to.equal('Name should have atleast 3 characters');
  });

  it('should not show error message when name is good', () => {
    const wrapper = mount(<CreateKlass />);
    wrapper.find('input').get(0).value = 'rakesh';
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error')).is.null;
  });

  it('should create a klass', (done) => {
    nock('http://fakehost.com')
    .post('/klasses', {name: 'bob', semester:'2017-02-22', credits: '2', department: 'SCIENCE', fee: '300'})
    .reply(200, {id: 99, name: 'bob', semester:'2017-02-22', credits: '2', department: 'SCIENCE', fee: '300'});

    const stub = sinon.stub();
    const wrapper = mount(<CreateKlass host="http://fakehost.com" created={stub}/>);

    wrapper.find('input #name').get(0).value = "bob";
    wrapper.find('input #semester').get(0).value = "2017-02-22";
    wrapper.find('#credits').get(0).value = "2";   
    wrapper.find('#department').get(0).value = "SCIENCE";
    wrapper.find('input #fee').get(0).value = 300.00;
    wrapper.find('button').simulate('click');
    setTimeout(() => {
        try{     
            expect(stub.callCount).to.equal(1);
            expect(stub.getCall(0).args[0]).to.deep.equal({id: 99, name: 'bob', semester:'2017-02-22', credits: '2', department: 'SCIENCE', fee: '300'});
            expect(wrapper.find('input').get(0).value).to.equal('');
            done();
        }catch(e){
            done.fail(e);
        }         
    }, 1000); 
  });
});