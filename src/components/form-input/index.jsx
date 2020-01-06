import React from 'react';
import styled from 'styled-components/macro';

import { FormInputError } from './error';

const FieldContainer = styled.div`
    margin-bottom: ${(props) => props.bottomSpacing};
`;
FieldContainer.displayName = 'FieldContainer';

export const FormInput = (props) => {
	const onChange = (event) => {
	    if (props.fieldChange) {
	        props.fieldChange(event);
	    }
	};

	let Field = 'input';

	if (props.fieldType === 'select') {
	    Field = 'select';
	}

	if (props.fieldType === 'textarea') {
	    Field = 'textarea';
	}

	return (
		<FieldContainer 
		className={props.className}
		bottomSpacing={props.bottomSpacing}
		>
			<label htmlFor={props.fieldId}>
				{props.fieldLabel}
			</label>
			<Field
				id={props.fieldId}
				type={props.fieldType}
				name={props.fieldId}
				value={props.value}	
				placeholder={props.placeHolder}
			    onChange={(event) => onChange(event)}
			    required={props.required}
			    disabled={props.disabled}
			    rows={props.rows}
			>
				{props.children}
			</Field>
			<FormInputError fieldError={props.fieldError} />
		</FieldContainer>
	);
}

FormInput.defaultProps = {
	fieldId: 'input',
	fieldType: 'text',
	disabled: false,
	required: false,
	rows: 2,
	bottomSpacing: '1rem'
}