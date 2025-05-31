import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://6839ff0d43bb370a86718711.mockapi.io/contacts";

export const fetchContacts = createAsyncThunk("contacts/fetch", async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
});

export const addContact = createAsyncThunk("contacts/add", async (contact) => {
  const { data } = await axios.post(BASE_URL, contact);
  return data;
});

export const deleteContact = createAsyncThunk("contacts/delete", async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

const contactsSlice = createSlice({
  name: "contacts",
  initialState: { items: [], isLoading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
