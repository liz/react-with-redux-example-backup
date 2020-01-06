import React from 'react';
import { mount } from 'enzyme';

import { Button } from './';
import theme from '../../theme';

describe('Button', () => {
    it('should match the snapshot', () => {
        const wrapper = mount(<Button buttonText="Hello" />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders Button with expected props', () => {
        const wrapper = mount(<Button buttonText="Hello" />);

        expect(wrapper.find('Button')).toHaveLength(1);
        expect(wrapper.find('Button').props()).toEqual({
            color: theme.primaryColor,
            colorAlt: null,
            buttonText: 'Hello',
            iconOnRight: false,
            type: 'button',
            className: 'btn',
            disabled: false,
            hidden: false,
            minWidth: theme.buttonMinWidth
        });
    });

    describe('renders icon', () => {
        it('does not render an icon when the icon prop is absent', () => {
            const wrapper = mount(<Button buttonText="Hello" />);
            expect(wrapper.find('Icon').exists()).toBe(false);
        });

        it('renders an icon when the icon prop is present', () => {
            const wrapper = mount(
                <Button buttonText="Hello" icon={<i className="fa fa-heart" />} />
            );
            expect(wrapper.find('Icon').exists()).toBe(true);
        });
    });

    describe('renders button text', () => {
        it('does not render buttonText when the buttonText prop is absent', () => {
            const wrapper = mount(<Button />);
            expect(wrapper.find('Text').exists()).toBe(false);
        });

        it('renders button text when the buttonText prop is present', () => {
            const wrapper = mount(<Button buttonText="Hello" />);
            expect(wrapper.render().text()).toEqual(wrapper.props().buttonText);
        });
    });

    describe('renders button title prop', () => {
        it('uses buttonText prop as title prop when the buttonText prop is present but title prop is absent', () => {
            const wrapper = mount(<Button buttonText="Hello" />);
            expect(wrapper.find('button').prop('title')).toEqual(wrapper.props().buttonText);
        });

        it('uses title prop as title prop when the buttonText prop and title prop are both supplied', () => {
            const wrapper = mount(<Button title="Hello" buttonText="Text" />);
            expect(wrapper.find('button').prop('title')).toEqual(wrapper.props().title);
        });

        it('uses title prop as title prop when the buttonText prop is not supplied', () => {
            const wrapper = mount(<Button title="Hello" />);
            expect(wrapper.find('button').prop('title')).toEqual(wrapper.props().title);
        });

        it('title prop is undefined if both buttonText and title props are not supplied', () => {
            const wrapper = mount(<Button />);
            expect(wrapper.find('button').prop('title')).toBeNull();
        });
    });

    describe('renders button aria-label prop', () => {
        it('uses buttonText prop as aria-label prop when the buttonText prop is present but title prop is absent', () => {
            const wrapper = mount(<Button buttonText="Hello" />);
            expect(wrapper.find('button').prop('aria-label')).toEqual(wrapper.props().buttonText);
        });

        it('uses title prop as aria-label prop when the buttonText prop and title prop are both supplied', () => {
            const wrapper = mount(<Button title="Hello" buttonText="Text" />);
            expect(wrapper.find('button').prop('aria-label')).toEqual(wrapper.props().title);
        });

        it('uses title prop as aria-label prop when the buttonText prop is not supplied', () => {
            const wrapper = mount(<Button title="Hello" />);
            expect(wrapper.find('button').prop('aria-label')).toEqual(wrapper.props().title);
        });

        it('aria-label prop is undefined if both buttonText and title props are not supplied', () => {
            const wrapper = mount(<Button />);
            expect(wrapper.find('button').prop('aria-label')).toBeNull();
        });
    });

    describe('renders optional props', () => {
        it('sets disabled prop to false by default', () => {
            const wrapper = mount(<Button buttonText="Hello" />);
            expect(wrapper.prop('disabled')).toBe(false);
        });

        it('renders disabled prop when present', () => {
            const wrapper = mount(<Button buttonText="Hello" disabled />);
            expect(wrapper.prop('disabled')).toBe(true);
        });

        it('sets hidden prop to false by default', () => {
            const wrapper = mount(<Button buttonText="Hello" />);
            expect(wrapper.prop('hidden')).toBe(false);
        });

        it('renders hidden prop when present', () => {
            const wrapper = mount(<Button buttonText="Hello" hidden />);
            expect(wrapper.prop('hidden')).toBe(true);
        });
    });

    describe('renders className prop', () => {
        it('defaults button css class to btn', () => {
            const wrapper = mount(<Button />);
            expect(wrapper.prop('className')).toEqual('btn');
        });

        it('renders button css className prop if present', () => {
            const wrapper = mount(<Button className="btn btn--border" />);
            expect(wrapper.prop('className')).toEqual('btn btn--border');
        });
    });

    describe('handles button click', () => {
        it('runs handleClick prop on button click if handleClick prop is supplied', () => {
            const handleClick = jest.fn();
            const wrapper = mount(<Button buttonText="Hello" handleClick={handleClick} />);
            wrapper.simulate('click');

            expect(handleClick).toHaveBeenCalled();
            jest.resetAllMocks();
        });
    });
});