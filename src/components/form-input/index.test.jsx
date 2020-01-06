import React from 'react';
import { mount } from 'enzyme';

import { FormInput } from './';
import theme from '../../theme';

describe('FormInput', () => {
	it('should match the snapshot', () => {
		const wrapper = mount(<FormInput />);
		
    	expect(wrapper.html()).toMatchSnapshot();
  	});

	it('renders FormInput with expected props', () => {
		const wrapper = mount(<FormInput />);

    	expect(wrapper.find('FormInput')).toHaveLength(1);
		expect(wrapper.find('FormInput').props()).toEqual({
			fieldId: 'input',
			fieldType: 'text',
			disabled: false,
	        required: false,
	        rows: 2,
	        bottomSpacing: '1rem'
		});
	  });

	describe('renders correct input element', () => {
        it('renders select element when fieldType is "select"', () => {
            const wrapper = mount(<FormInput fieldType="select" />);

            expect(wrapper.find('select')).toHaveLength(1);
            expect(wrapper.find('textarea')).toHaveLength(0);
            expect(wrapper.find('input')).toHaveLength(0);
        });

        it('renders textarea element when fieldType is "textarea"', () => {
            const wrapper = mount(<FormInput fieldType="textarea" />);

            expect(wrapper.find('textarea')).toHaveLength(1);
            expect(wrapper.find('select')).toHaveLength(0);
            expect(wrapper.find('input')).toHaveLength(0);
        });

        it('renders text input by default', () => {
            const wrapper = mount(<FormInput />);

            expect(wrapper.find('input')).toHaveLength(1);
            expect(wrapper.find('input').prop('type')).toEqual('text');
            expect(wrapper.find('textarea')).toHaveLength(0);
            expect(wrapper.find('select')).toHaveLength(0);
        });

        it('renders email input when fieldType is "email', () => {
            const wrapper = mount(<FormInput fieldType="email" />);

            expect(wrapper.find('input')).toHaveLength(1);
            expect(wrapper.find('input').prop('type')).toEqual('email');
            expect(wrapper.find('textarea')).toHaveLength(0);
            expect(wrapper.find('select')).toHaveLength(0);
        });
    });

    it('calls fieldChange prop on input change if fieldChange prop is supplied', () => {
        const wrapper = mount(
            <FormInput fieldChange={jest.fn()} />
        );
        const input = wrapper.find('input');

        input.simulate('change', { target: { value: 'text' } });

        expect(wrapper.props().fieldChange).toHaveBeenCalled();
        jest.resetAllMocks();
    });

    it('does not error on input change if fieldChange prop is not supplied', () => {
        const wrapper = mount(
            <FormInput />
        );
        const input = wrapper.find('input');

        input.simulate('change', { target: { value: 'text' } });

        expect(wrapper.props().fieldChange).toBeUndefined();
    });
});