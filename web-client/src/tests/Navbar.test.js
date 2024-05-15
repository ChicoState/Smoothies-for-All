import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import NavBar from '../components/Navbar';

describe('NavBar', () => {
  it('renders the logo', () => {
    const { getByText } = render(
      <UserContext.Provider value={{ state: null, dispatch: jest.fn() }}>
        <Router>
          <NavBar />
        </Router>
      </UserContext.Provider>
    );

    expect(getByText('Smoothies For All')).toBeInTheDocument();
  });

  it('renders the Profile, CreatePost, Saved, and Logout links when user is authenticated', () => {
    const { getByText } = render(
      <UserContext.Provider value={{ state: { user: {} }, dispatch: jest.fn() }}>
        <Router>
          <NavBar />
        </Router>
      </UserContext.Provider>
    );

    expect(getByText('Profile')).toBeInTheDocument();
    expect(getByText('CreatePost')).toBeInTheDocument();
    expect(getByText('Saved')).toBeInTheDocument();
    expect(getByText('LOGOUT')).toBeInTheDocument();
  });

  it('Logs user out when Logout button is clicked', () => {
    const mockDispatch = jest.fn();
    const { getByText } = render(
      <UserContext.Provider value={{ state: { user: {} }, dispatch: mockDispatch }}>
        <Router>
          <NavBar />
        </Router>
      </UserContext.Provider>
    );

    fireEvent.click(getByText('Logout'));

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR' });
  });
});

