import React from 'react';
import { mount } from 'enzyme';

import { Row } from './';
import mediaQueries from '../../media-queries';

describe('Row', () => {
    it('should match the snapshot', () => {
        const wrapper = mount(<Row />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders Container with expected props', () => {
        const wrapper = mount(<Row />);

        expect(wrapper.find('Row')).toHaveLength(1);
        expect(wrapper.find('Row').props()).toEqual({
            breakPoint: mediaQueries.min.medium,
            height: null,
        });
    });
});