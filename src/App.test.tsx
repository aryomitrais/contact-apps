import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/utils/test-utils';
import App from './App';
import { Mock, vi } from 'vitest';
import { useGetAllContact } from './app/hooks';

vi.mock('./app/hooks/contactHooks.ts');

describe('App', () => {
  it('Renders the App component', () => {
    (useGetAllContact as Mock).mockReturnValue({
      data: [
        {
          id: 'id',
          firstName: 'firstNameTEST',
          lastName: 'lastNameTEST',
          photo: 'photo',
          age: 22,
        },
      ],
      isLoading: false,
      getContact: vi.fn().mockResolvedValue({}),
    });
    renderWithProviders(<App />);
    expect(screen.getByText('fetching: IDLE')).toBeInTheDocument();
  });
});
