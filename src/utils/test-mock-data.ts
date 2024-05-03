import {
  useGetAllContact,
  useUpdateContact,
  useCreateContact,
  useDeleteContact,
} from '@/hooks';
import { Mock, vi } from 'vitest';

export const dummyContactList = [
  {
    id: 'cd6736f6-5cc4-4c1a-a740-f7d9d4c3666f',
    firstName: 'First User first name',
    lastName: 'First user last name',
    photo:
      'https://res.cloudinary.com/dpnjbs730/image/upload/v1714596933/lnefvqtxuo5zpeskqzaq.png',
    age: 22,
  },
  {
    id: '74e0520e-8503-4897-8a91-995835f39fa1',
    firstName: 'Second User first name',
    lastName: 'Second user last name',
    photo:
      'https://res.cloudinary.com/dpnjbs730/image/upload/v1714596933/lnefvqtxuo5zpeskqzaq.png',
    age: 22,
  },
];

export const mockGetAllContactHookReturnData = (isLoading: boolean) => {
  (useGetAllContact as Mock).mockReturnValue({
    data: !isLoading ? dummyContactList : [],
    isLoading,
    getContact: vi.fn().mockResolvedValue({}),
  });
};

export const mockUpdateContactHook = (isLoading: boolean) => {
  (useUpdateContact as Mock).mockReturnValue({
    isLoading,
    updateContact: vi.fn().mockResolvedValue({}),
  });
};

export const mockCreateContactHook = (isLoading: boolean) => {
  (useCreateContact as Mock).mockReturnValue({
    isLoading,
    createContact: vi.fn().mockResolvedValue({}),
  });
};

export const mockDeleteContactHook = (isLoading: boolean) => {
  (useDeleteContact as Mock).mockReturnValue({
    isLoading,
    createContact: vi.fn().mockResolvedValue({}),
  });
};
