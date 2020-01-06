import React from 'react';
import { mount } from 'enzyme';

import { Container } from './';
import theme from '../../theme';

describe('Container', () => {
    it('should match the snapshot', () => {
        const wrapper = mount(<Container />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders Container with expected props', () => {
        const wrapper = mount(<Container />);

        expect(wrapper.find('Container')).toHaveLength(1);
        expect(wrapper.find('Container').props()).toEqual({
            maxWidth: theme.container,
            horizontalPadding: theme.gutter,
            verticalPadding: null
        });
    });
});