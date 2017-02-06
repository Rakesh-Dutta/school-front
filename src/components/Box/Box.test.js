import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Box from './Box'; //importing js file from name Box

describe('Box component ', () => {
    it('Should render without error', () => {
        const wrapper = shallow(<Box />);
        expect(wrapper).to.be.ok;
    });

    it('should find component using its class name', () => {
        const wrapper = shallow(<Box />);
        expect(wrapper.find(".box").length).to.equal(1);
    });

    it('should get the text from component', () => {
        const wrapper = shallow(<Box text="alice@gmail.com"/>);
        expect(wrapper.text()).to.equal('alice@gmail.com');
    });

    it('should get the css class from component', () => {
        const wrapper = shallow(<Box css="selected"/>);
        const html = wrapper.html();
        expect(html).to.equal('<div class="box"><div class="selected"></div></div>');
    });

    it('should get the primary key (id) class from component', () => {
        const wrapper = shallow(<Box id="3" css="selected"/>);
        const html = wrapper.html();
        expect(html).to.equal('<div class="box"><div data-id="3" class="selected"></div></div>');
    });

    it('should render out full component', () => {
        const wrapper = shallow(<Box text="test@gmail.com" id="5" css="selected"/>);
        const html = wrapper.html();
        expect(html).to.equal('<div class="box"><div data-id="5" class="selected">test@gmail.com</div></div>');
    });

    it('should call the parents function when clicked', () => {
        const stub = sinon.stub();
        const wrapper = mount(<Box click={stub}/>);
        wrapper.find('.box > div').simulate('click');
        expect(stub.callCount).to.equal(1);
    });
});