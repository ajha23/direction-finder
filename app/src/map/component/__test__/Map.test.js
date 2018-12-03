import React from 'react';
import renderer from 'react-test-renderer';

import Map from '../Map/Map';

describe('Direction Map Test', () => {
    it('render correctly', () => {
        const tree = renderer.create(<Map />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});