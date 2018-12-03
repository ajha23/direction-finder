import React from 'react';
import renderer from 'react-test-renderer';

import RouteInfo from '../RouteInfo/RouteInfo';

describe('RouteInfo Form Test', () => {
    it('render correctly', () => {
        const tree = renderer.create(<RouteInfo />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
