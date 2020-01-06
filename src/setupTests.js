// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import React from "react"; 
import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import nock from 'nock';
import 'jest-localstorage-mock';

configure({ adapter: new Adapter() });

jest.mock('./theme', () => {
  return {
    white: 'white',
    black: 'black',
    primaryColor: '#d62027',
    alto: '#d8d8d8',
    buttonMinWidth: '175px'
  };
});

React.useLayoutEffect = React.useEffect;

nock.disableNetConnect();