import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import './helpers/chai-enzyme';
import { App } from '../src/components/app/app';

describe('<App />', () => {
    it('has all default props', () => {
        const myApp = shallow(
            <App />
        );

        expect(myApp.instance().props.username).to.equal('');
    });
    // it('has an input for username', () => {
    //     const myApp = shallow(
    //         <App />
    //     );
    //     expect(myApp.find('input[name="username"]')).to.have.length(1);
    // });
});
