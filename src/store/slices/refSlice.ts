import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  current: HTMLDivElement | null;
  isSidebarOpen: boolean
  isCommentOpen: string
  isMediaOpen: string
}

const initialState: SidebarState = {
  current: null,
  isSidebarOpen: false,
  isCommentOpen: '',
  isMediaOpen: '',
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
    },
    setIsMediaOpen(state, action: PayloadAction<string>) {
      state.isMediaOpen = action.payload
    },
  },
});

export const { setSidebarRef, setIsSidebarOpen, setIsCommentOpen, setIsMediaOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
