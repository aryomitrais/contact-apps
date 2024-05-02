import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import {
  Contact,
  createContactAsyncThunk,
  deleteContactAsyncThunk,
  fetchContact,
  updateContactAsyncThunk,
} from '@/redux/features/contact/contactSlice';

export type UseGetAllContactType = ReturnType<typeof useGetAllContact>;

export const useGetAllContact = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.contact.data);
  const isLoading = useSelector((state: RootState) => state.contact.isLoading);
  const getContact = async () => await dispatch(fetchContact());
  return { data, isLoading, getContact };
};

export const useCreateContact = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.contact.isLoading);
  const createContact = async (data: Contact) =>
    await dispatch(createContactAsyncThunk(data));
  return { createContact, isLoading };
};

export const useUpdateContact = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.contact.isLoading);
  const updateContact = async (data: Contact) =>
    await dispatch(updateContactAsyncThunk(data));
  return { updateContact, isLoading };
};

export const useDeleteContact = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.contact.isLoading);
  const deleteContact = async (data: Contact) =>
    await dispatch(deleteContactAsyncThunk(data));
  return { deleteContact, isLoading };
};
