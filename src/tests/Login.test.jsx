import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../components/auth/Login.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import axios from 'axios';

jest.mock('axios');
jest.mock('../../context/AuthContext.jsx');

describe('Login Component', () => {
  const mockLogin = jest.fn();
  
  beforeEach(() => {
    useAuth.mockReturnValue({
      state: { user: null },
      login: mockLogin
    });
    axios.post.mockResolvedValue({
      data: { email: 'test@gmail.com', id: '67068b61f4cf445174b35ec2' }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(<Login />);
    
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Aadhar No/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('submits login form successfully', async () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'preet@gmail.com' }
    });
    fireEvent.change(screen.getByLabelText(/Aadhar No/i), {
      target: { value: '9630000692235' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'Preet#1205' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'preet@gmail.com',
        id: '67068b61f4cf445174b35ec2'
      });
    });
  });

  test('shows error message on invalid Aadhar number', () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/Aadhar No/i), {
      target: { value: '123' }
    });

    expect(screen.getByText(/Aadhaar number must be 12 digits/i)).toBeInTheDocument();
  });

  // {
  //   "id": "67068b61f4cf445174b35ec2",
  //   "email": "preet@gmail.com"
  // }

  test('shows error message on invalid password', () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'short' }
    });

    expect(screen.getByText(/Password must be at least 6 characters long/i)).toBeInTheDocument();
  });

  test('handles login failure', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Login failed' } }
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Aadhar No/i), {
      target: { value: '123456789012' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Login failed');
    });
  });
});
