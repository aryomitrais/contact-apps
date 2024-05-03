import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/utils/test-utils';
import App from './App';
import { vi } from 'vitest';
import {
  mockCreateContactHook,
  mockDeleteContactHook,
  mockGetAllContactHookReturnData,
  mockUpdateContactHook,
} from './utils/test-mock-data';

vi.mock('./hooks/contactHooks.ts');

describe('App', () => {
  describe('Contact List requesting and display data', () => {
    it('Renders the component with contact list', () => {
      mockGetAllContactHookReturnData(false);
      mockUpdateContactHook(false);
      mockCreateContactHook(false);
      mockDeleteContactHook(false);
      renderWithProviders(<App />);
      expect(
        screen.getByText('First User first name First user last name')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Second User first name Second user last name')
      ).toBeInTheDocument();
      expect(
        screen.queryAllByTestId('contact-list-skeleton-loading')
      ).toHaveLength(0);
      expect(screen.queryAllByAltText('Add New Contact')).toHaveLength(0);
      expect(screen.queryAllByAltText('Edit Contact')).toHaveLength(0);
    });
    it('Renders the component with loading state', () => {
      mockGetAllContactHookReturnData(true);
      mockUpdateContactHook(false);
      mockCreateContactHook(false);
      mockDeleteContactHook(false);
      renderWithProviders(<App />);
      expect(
        screen.queryAllByAltText('First User first name First user last name')
      ).toHaveLength(0);
      expect(
        screen.queryAllByAltText('Second User first name Second user last name')
      ).toHaveLength(0);
      expect(
        screen.queryAllByTestId('contact-list-skeleton-loading')
      ).toHaveLength(1);
      expect(screen.queryAllByAltText('Add New Contact')).toHaveLength(0);
      expect(screen.queryAllByAltText('Edit Contact')).toHaveLength(0);
    });
  });
});
