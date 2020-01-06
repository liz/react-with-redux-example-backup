import React from 'react';

export const FormInputError = (props) => {
	if (props.fieldError) {
		return <p className="error">{props.fieldError}</p>;
	}

	return null;
}

FormInputError.defaultProps = {
	fieldError: null
}