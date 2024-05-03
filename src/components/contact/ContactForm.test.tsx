import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContactForm from './ContactForm';
import {
  dummyContactList,
  mockCreateContactHook,
  mockDeleteContactHook,
  mockUpdateContactHook,
} from '@/utils/test-mock-data';
import { vi } from 'vitest';

vi.mock('@/hooks/contactHooks.ts');

describe('Contact Form', () => {
  describe('Render with the correct state', () => {
    beforeEach(() => {
      mockCreateContactHook(false);
      mockUpdateContactHook(false);
      mockDeleteContactHook(false);
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it.each([
      ['add new contact', 'Add New Contact', 0, undefined],
      ['edit contact', 'Edit Contact', 1, dummyContactList[0]],
    ])(
      'Should render on add %s state',
      (_testType, formTypeTitle, isDeleteButtonVisisble, contact) => {
        render(<ContactForm isOpen contact={contact} />);
        expect(screen.getByText(formTypeTitle)).toBeInTheDocument();
        expect(screen.queryAllByText(isDeleteButtonVisisble)).toHaveLength(0);
      }
    );
  });
  describe('Form Validation', () => {
    beforeEach(() => {
      mockCreateContactHook(false);
      mockUpdateContactHook(false);
      mockDeleteContactHook(false);
    });

    afterEach(() => {
      vi.clearAllMocks();
    });
    it('Should disable save button on empty form input', () => {
      render(<ContactForm isOpen />);
      expect(screen.getByText('Save')).toHaveAttribute('disabled');
    });

    it('Should validate form input value on invalid value', async () => {
      render(<ContactForm isOpen />);
      fireEvent.change(screen.getByPlaceholderText('Enter photo URL'), {
        target: { value: 's' },
      });
      fireEvent.change(screen.getByPlaceholderText('Enter First Name'), {
        target: { value: 's' },
      });
      fireEvent.change(screen.getByPlaceholderText('Enter Last name'), {
        target: { value: 's' },
      });
      fireEvent.change(screen.getByPlaceholderText('Enter Age'), {
        target: { value: 0 },
      });
      fireEvent.click(screen.getByText('Save'));
      await waitFor(() => {
        expect(screen.queryAllByText('Minimum 2 character')).toHaveLength(2);
        expect(screen.queryAllByText('Must be greater than 0')).toHaveLength(1);
      });
    });
  });
});
