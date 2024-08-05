import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

test('renders New Game button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/New Game/i);
  expect(buttonElement).toBeInTheDocument();
});

test('starts a new game when New Game button is clicked', () => {
  render(<App />);
  const buttonElement = screen.getByText(/New Game/i);
  fireEvent.click(buttonElement);
  expect(screen.getByText(/A new game has started!/i)).toBeInTheDocument();
});


