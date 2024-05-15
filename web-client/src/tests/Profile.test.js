import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '../App';
import Profile from '../components/screens/Profile.js';

describe('Profile component', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        localStorage.setItem('jwt', 'fakeToken');
    });

    it('renders the profile component', async () => {
        global.fetch.mockResolvedValueOnce({ 
            ok: true, 
            json: () => ({ mypost: [] }) 
        });

        const { getByText } = render(
            <UserContext.Provider value={{ state: {}, dispatch: jest.fn() }}>
                <Router>
                    <Profile />
                </Router>
            </UserContext.Provider>
        );

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

        expect(global.fetch).toHaveBeenCalledWith('/mypost', {
            headers: {
                Authorization: "Bearer fakeToken",
            },
        });
    });
});