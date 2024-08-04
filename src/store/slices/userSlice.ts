import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/types';

const initialState: User = {
  _id: '',
  email: '', 
  name: '',
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
    },
    clearUser: (state) => {
      state._id = '';
      state.email = '';
      state.name = '';
      state.avatar = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;