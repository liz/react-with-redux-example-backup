import React from 'react';
import { mount } from 'enzyme';

import { Image } from './';
import theme from '../../theme';

describe('Image', () => {
    it('should match the snapshot', () => {
        const wrapper = mount(<Image />);

        expect(wrapper.html()).toMatchSnapshot();
    });

	it('renders Image with expected props', () => {
        const wrapper = mount(<Image />);

        expect(wrapper.props()).toEqual({
            alt: "Default image alt text",
            width: "100%",
            height: "auto",
            horizontalAlignment: "center",
            verticalAlignment: "center",
            maxHeight: "100%",
            maxWidth: "100%",
            type: "tag"
        });
    });

    it('renders wrapper css when type prop equals "css"', () => {
        const wrapper = mount(<Image type="css" />);
        expect(wrapper.find('Container').exists()).toBe(true);
    });

    it('does not render image tag when type prop equals "css"', () => {
        const wrapper = mount(<Image type="css" />);
        expect(wrapper.find('Img').exists()).toBe(false);
        expect(wrapper.find('Container').exists()).toBe(true);
    });

    it('renders image tag when type prop does not equal "css"', () => {
        const wrapper = mount(<Image />);
        expect(wrapper.find('Img').exists()).toBe(true);
        expect(wrapper.find('Container').exists()).toBe(false);
    });

    it('does not render image css when type prop does not equal "css"', () => {
        const wrapper = mount(<Image />);
        expect(wrapper.find('Container').exists()).toBe(false);
    });

    it('renders custom image when src prop exists', () => {
        const wrapper = mount(<Image src="http://path/to/image" />);

        expect(wrapper.find('Img').props().src).toContain('http://path/to/image');
    });

    it('renders alt tag inside Background when type prop equals "css" and there are no children supplied', () => {
        const wrapper = mount(<Image type="css" alt="Hello" />);

        expect(wrapper.find('Background').text()).toBe('Hello');
    });

    it('does not render alt tag inside Background when type prop equals "css" but there are children supplied', () => {
        const Child = () => false;
        const wrapper = mount(
            <Image type="css" alt="Hello">
                <Child />
            </Image>
        );

        expect(wrapper.find('Background').text()).not.toBe('Hello');
        expect(wrapper.find('Background').find('Child')).toHaveLength(1);
    });

    it('renders "text-hide" class when type is "css" and there are no children supplied', () => {
        const wrapper = mount(<Image type="css" alt="Hello" />);

        expect(wrapper.find('Background').hasClass('text-hide')).toBe(true);
    });

    it('does not render "text-hide" class when type is "css" and there are children supplied', () => {
        const Child = () => false;
        const wrapper = mount(
            <Image type="css" alt="Hello">
                <Child />
            </Image>
        );

        expect(wrapper.find('Background').hasClass('text-hide')).toBe(false);
    });
});