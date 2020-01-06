import app from './reducers';

describe('app reducer', () => {
    it('should handle SAVE_KEY', () => {
        expect(
          app([], { type: 'SAVE_KEY', key: '1234567900' })
        ).toEqual({ key: '1234567900' });
    });
});