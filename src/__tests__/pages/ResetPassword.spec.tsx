import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import ResetPassword from '../../pages/ResetPassword';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      search: '',
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('ResetPassword Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
  });

  // it('should be able to reset the password', async () => {
  //   const { getByPlaceholderText, getByText } = render(<ResetPassword />);

  //   const newPasswordField = getByPlaceholderText('Nova senha');
  //   const confirmationPasswordField = getByPlaceholderText(
  //     'Confirmação da senha',
  //   );
  //   const buttonElement = getByText('Alterar senha');

  //   fireEvent.change(newPasswordField, {
  //     target: { value: '123456' },
  //   });
  //   fireEvent.change(confirmationPasswordField, {
  //     target: { value: '123456' },
  //   });

  //   fireEvent.click(buttonElement);

  //   await wait(() => {
  //     expect(mockedHistoryPush).toHaveBeenCalledWith('/');
  //   });
  // });

  it('should not be able to reset the password with invalid confirmation password', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordField = getByPlaceholderText('Nova senha');
    const confirmationPasswordField = getByPlaceholderText(
      'Confirmação da senha',
    );
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(newPasswordField, {
      target: { value: '123654' },
    });
    fireEvent.change(confirmationPasswordField, {
      target: { value: 'invalid-password' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should not be able to reset the password without a token', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordField = getByPlaceholderText('Nova senha');
    const confirmationPasswordField = getByPlaceholderText(
      'Confirmação da senha',
    );
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(newPasswordField, {
      target: { value: '123456' },
    });
    fireEvent.change(confirmationPasswordField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
