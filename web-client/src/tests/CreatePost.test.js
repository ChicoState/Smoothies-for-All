import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '../App';
import CreatePost from '../components/screens/CreatePost';

describe('CreatePost component', () => {
  it('renders the create post form', () => {
    const mockDispatch = jest.fn();
    const { getByPlaceholderText } = render(
      <UserContext.Provider value={{ state: {}, dispatch: mockDispatch }}>
        <Router>
          <CreatePost />
        </Router>
      </UserContext.Provider>
    );
    const titleInput = getByPlaceholderText(/title/i);
    const bodyInput = getByPlaceholderText(/body/i);
    const ingredientInput = getByPlaceholderText(/ingredient/i);

    expect(titleInput).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
    expect(ingredientInput).toBeInTheDocument();
  });
});