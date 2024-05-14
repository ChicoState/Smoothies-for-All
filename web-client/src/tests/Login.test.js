import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '../App';
import Login from '../components/screens/Login.js';

describe('Login component', () => {
    it('renders the login form', () => {
        const mockDispatch = jest.fn();
        const { getByPlaceholderText } = render(
          <UserContext.Provider value={{ state: {}, dispatch: mockDispatch }}>
            <Router>
              <Login />
            </Router>
          </UserContext.Provider>
        );
        const usernameInput = getByPlaceholderText(/username/i);
        const passwordInput = getByPlaceholderText(/password/i);
    
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
      });
});