import React from 'react';
import { mount } from 'enzyme';

import SmallArrow from './';
import theme from '../../theme';

describe('SmallArrow', () => {
    it('should match the snapshot', () => {
        const wrapper = mount(<SmallArrow />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders SmallArrow with expected props', () => {
        const wrapper = mount(<SmallArrow />);

        expect(wrapper.find('SmallArrow')).toHaveLength(1);
        expect(wrapper.find('SmallArrow').props()).toEqual({
            color: theme.primaryColor,
            width: '5px',
        });
    });
});