import { SAVE_KEY } from './actions';

function app(state = [], action) {
	switch (action.type) {
		case SAVE_KEY:
			return { key: action.key }
	default:
		return state
	}
}

export default app