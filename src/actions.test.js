import * as actions from './actions'

describe('actions', () => {
	it('should create an action to save a key', () => {
		const key = '1234567900'
		const expectedAction = {
		  type: 'SAVE_KEY',
		  key
		}
		expect(actions.saveKey(key)).toEqual(expectedAction)
	});
});