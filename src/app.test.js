import React from 'react';
import { shallow } from 'enzyme';

import App from './app';
import SaveKey from './save-key';

describe('App', () => {
	it('renders SaveKey when apiKey prop is not supplied', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find(SaveKey)).toHaveLength(1);
	});

	it('renders Listing with expected props  when apiKey prop is supplied', () => {
		const apiKey = { key: "apiKeyhere"}
		const wrapper = shallow(<App apiKey={apiKey} />);
		expect(wrapper.find('Listing')).toHaveLength(1);
		expect(wrapper.find('Listing').props()).toEqual({
			apiKey: wrapper.props().apiKey,
			selectedRepo: null
		});
	});
});
