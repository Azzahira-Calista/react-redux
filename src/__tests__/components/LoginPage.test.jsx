/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from '../../pages/LoginPage';

const mockStore = configureStore({
  reducer: {
    authUser: (state = null) => state,
  },
});

const renderWithProviders = (component) => {
  return render(
    <Provider store={mockStore}>
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        {component}
      </MemoryRouter>
    </Provider>
  );
};

test('renders login inputs', () => {
  renderWithProviders(<LoginPage />);

  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
});