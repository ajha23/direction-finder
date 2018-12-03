import React from 'react';
import renderer from 'react-test-renderer';

import UserInputForm from '../UserInputForm/UserInputForm';

describe('Userinput Form Test', () => {
    it('render correctly', () => {
        const tree = renderer.create(<UserInputForm />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});