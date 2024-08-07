import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  current: HTMLDivElement | null;
  isSidebarOpen: boolean
  isCommentOpen: string
}

const initialState: SidebarState = {
  current: null,
  isSidebarOpen: false,
  isCommentOpen: '',
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebarRef(state, action: PayloadAction<HTMLDivElement | null>) {
      state.current = action.payload as Draft<HTMLDivElement | null>;
    },
    setIsSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload
    },
    setIsCommentOpen(state, action: PayloadAction<string>) {
      state.isCommentOpen = action.payload
    }
  },
});

export const { setSidebarRef, setIsSidebarOpen, setIsCommentOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
