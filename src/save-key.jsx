import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { connect } from 'react-redux'

import { saveKey } from './actions';

import theme from './theme';
import mediaQueries from './media-queries';

import { Container } from './components/container';
import { Row } from './components/row';
import { FormInput } from './components/form-input';
import { Button } from './components/button';

import './save-key.scss';

const Col = styled.div`
    width: 100%;
    padding-left: ${theme.gutter};
    padding-right: ${theme.gutter};
    text-align: center;
`;
Col.displayName = 'Col';


const OuterCol = styled(Col)`
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        width: 100%;
        display: block;
        max-width: ${mediaQueries.min.iphone6};
    }
`;
OuterCol.displayName = 'OuterCol';

export const SaveKey = (props) => {
    const [fieldValue, setFieldValue] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [fieldError, setFieldError] = useState(...props.fieldError);

    useEffect(() => {
        setFieldError(props.fieldError);

        if (fieldValue) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [props.fieldError, fieldValue, fieldError]);

    const onSubmit = (event) => {
        event.preventDefault();
        if (fieldValue) {
            props.dispatch(saveKey(fieldValue))
            setButtonDisabled(true)
        } else {
            setFieldError("Please enter an API Key")
        }
    }; 

    const onFieldChange = (event) => {
        setFieldValue(event.target.value);
    }; 

    return (
        <Container>
            <Row height="100%">
                <OuterCol>
                    <h1>Github Repo Issues</h1>
                    <form
                        onSubmit={(event) => onSubmit(event)}
                    >
                        <fieldset>
                            <Row>
                                <Col>
                                    <FormInput
                                        value={fieldValue}
                                        fieldChange={event => onFieldChange(event)} 
                                        placeHolder="Github API Key"
                                        fieldError={fieldError}
                                        fieldId="save-key"
                                        fieldLabel="Please submit your Github API Key to see issues for your repos"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button 
                                        type="submit"
                                        buttonText="Submit"
                                        disabled={buttonDisabled}
                                    />
                                </Col>
                            </Row>
                        </fieldset>
                    </form>
                </OuterCol>
            </Row>
        </Container>
    );
}

SaveKey.defaultProps = {
    fieldError: '',
};

export default connect()(SaveKey)