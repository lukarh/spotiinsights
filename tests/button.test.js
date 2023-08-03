// const dateUtils = require('../client/src/utils/dateUtils')
import React from 'react';
import { render, screen, cleanup } from "@testing-library/react";
import renderer from 'react-test-renderer';
import LoginButton from '../client/src/components/FunctionalComponents/LoginButton'
import Test from '../client/src/components/FunctionalComponents/test';

test('Render Component', () => {
    render(<Test />)
    render(<LoginButton />)
    // const loginButtonElement = screen.getByTestId("login-1")
    // expect(loginButtonElement).toBeInTheDocument()
})