import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import CreateStudent from './CreateStudent'; //importing js file from name List


describe('Student Create ', () => {
    beforeEach(()=>{
    
    });

    it('Should render without error', () => {
        const wrapper = shallow(<CreateStudent />);
        expect(wrapper).to.be.ok;
    });

});