import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../components/screens/Home.js';
import { act } from 'react-dom/test-utils';
import { UserContext } from '../App'; 

describe('Home component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.setItem('jwt', 'fakeToken');
  });

  it('renders the home component', async () => {
    global.fetch.mockResolvedValueOnce({ 
      ok: true, 
      json: () => ({ posts: [] }) 
    });

    const { getByText } = render(
      <UserContext.Provider value={{ state: {}, dispatch: jest.fn() }}>
        <Router>
          <Home />
        </Router>
      </UserContext.Provider>
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(global.fetch).toHaveBeenCalledWith('/allposts', {
      headers: {
        Authorization: "Bearer fakeToken",
      },
    });
  });
});