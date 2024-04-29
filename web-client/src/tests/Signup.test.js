// FILE: Signup.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from '../components/screens/Signup.js';


describe('Signup component', () => {
  it('renders the signup form', () => {
    const { getByPlaceholderText } = render(<Router><Signup /></Router>);
    const usernameInput = getByPlaceholderText(/username/i);
    const emailInput = getByPlaceholderText(/email/i);
    const passwordInput = getByPlaceholderText(/password/i);

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});