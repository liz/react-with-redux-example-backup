import React from 'react';
import { mount } from 'enzyme';

import { LoadingSpinner } from './';
import loading from '../../images/loading.gif';
import theme from '../../theme';

describe('Container', () => {
    it('should match the snapshot', () => {
        const wrapper = mount(<LoadingSpinner />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders LoadingSpinner with expected props', () => {
        const wrapper = mount(<LoadingSpinner />);

        expect(wrapper.find('LoadingSpinner')).toHaveLength(1);
        expect(wrapper.find('Image').props()).toEqual({
            src: loading,
            alt: "Loading...",
            width: "25px",
            height: "auto",
            horizontalAlignment: "center",
            verticalAlignment: "center",
            maxHeight: "100%",
            maxWidth: "100%",
            type: "tag"
        });
        expect(wrapper.find('LoadingSpinner').props()).toEqual({
            width: "25px"
        });
    });
});