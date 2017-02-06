import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Sum from './Sum'; //importing js file from name Sum

describe('Sum component ', () => {
    it('Should render without error', () => {
        const wrapper = shallow(<Sum />);
        expect(wrapper).to.be.ok;
    });

    it('should find component using its class name', () => {
        const wrapper = shallow(<Sum />);
        expect(wrapper.find(".sum").length).to.equal(1);
    });

    it('should get the text from component', () => {
        const wrapper = shallow(<Sum />);
        expect(wrapper.text()).to.equal('Sum+0');
    });

    it('should get the html from component', () => {
        const wrapper = shallow(<Sum />);
        expect(wrapper.html()).to.equal('<div class="sum"><h1>Sum</h1><input type="number" class="a"/><button>+</button><input type="number" class="b"/><span>0</span></div>');
    });

    it('should call add function when + button is clicked', () => {
        const wrapper = shallow(<Sum />);
        const instance = wrapper.instance();
        const add = sinon.stub(instance, 'add');
        instance.forceUpdate();
        wrapper.update();
        wrapper.find('button').simulate('click');
        expect(add.callCount).to.equal(1);
    });

    it('should sum up 2 numbers and display result', () => {
        const wrapper = mount(<Sum />);
        
        wrapper.find('input.a').get(0).value = 3;
        wrapper.find('input.b').get(0).value = 5;

        wrapper.find('button').simulate('click');
        expect(wrapper.state('sum')).to.equal(8);
        expect(wrapper.text()).to.equal('Sum+8');
    });
});