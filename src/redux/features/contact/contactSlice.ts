import { http } from '@/utils/http';
import { createAppSlice } from '@/redux/createAppSlice';
import { createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

export interface Contact {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
}

export interface ContactSliceState {
  data: Contact[];
  isLoading: boolean;
}

const initialState: ContactSliceState = {
  data: [],
  isLoading: false,
};

export const fetchContact = createAsyncThunk('contacts/fetchAll', async () => {
  return await http.get<Contact[]>('https://contact.herokuapp.com/contact');
});

export const createContactAsyncThunk = createAsyncThunk(
  'contacts/create',
  async (contact: Contact) =>
    await http.post(`https://contact.herokuapp.com/contact`, contact)
);

export const updateContactAsyncThunk = createAsyncThunk(
  'contacts/update',
  async (contact: Contact) => {
    const { id, ...updateContactPayload } = contact;
    return await http.put(
      `https://contact.herokuapp.com/contact/${id}`,
      updateContactPayload
    );
  }
);

export const deleteContactAsyncThunk = createAsyncThunk(
  'contacts/delete',
  async (contact: Contact) =>
    await http.delete(`https://contact.herokuapp.com/contact/${contact.id}`)
);

export const contactSlice = createAppSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          fetchContact.pending,
          createContactAsyncThunk.pending,
          updateContactAsyncThunk.pending,
          deleteContactAsyncThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          createContactAsyncThunk.fulfilled,
          updateContactAsyncThunk.fulfilled,
          deleteContactAsyncThunk.fulfilled,
          createContactAsyncThunk.rejected,
          updateContactAsyncThunk.rejected,
          deleteContactAsyncThunk.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(isAnyOf(fetchContact.fulfilled), (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.responseBody.data;
      });
  },
});
