import React from 'react';
import { mount } from 'enzyme';

import { FormInputError } from './error';
import theme from '../../theme';

describe('FormInputError', () => {
    it('should match the snapshot', () => {
        const wrapper = mount(<FormInputError fieldError="example error message" />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders FormInputError with expected props when fieldError prop is supplied', () => {
        const wrapper = mount(<FormInputError  fieldError="example error message" />);

        expect(wrapper.find('FormInputError')).toHaveLength(1);
        expect(wrapper.find('FormInputError').props()).toEqual({
            "fieldError": "example error message"
        });
        expect(wrapper.find('FormInputError').text()).toEqual(wrapper.find('FormInputError').props().fieldError);
    });
});