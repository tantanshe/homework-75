import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {decodeMessage, encodeMessage} from './thunks';
import {RootState} from './store';

export interface CipherState {
  password: string;
  standardText: string;
  encodedText: string;
  loading: boolean;
  error: boolean;
}

const initialState: CipherState = {
  password: '',
  standardText: '',
  encodedText: '',
  loading: false,
  error: false,
};

const cipherSlice = createSlice({
  name: 'cipher',
  initialState,
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setStandardText: (state, action: PayloadAction<string>) => {
      state.standardText = action.payload;
    },
    setEncodedText: (state, action: PayloadAction<string>) => {
      state.encodedText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(encodeMessage.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(encodeMessage.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.encodedText = action.payload;
        state.standardText = '';
      })
      .addCase(encodeMessage.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(decodeMessage.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(decodeMessage.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.standardText = action.payload;
        state.encodedText = '';
      })
      .addCase(decodeMessage.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {
  setPassword,
  setStandardText,
  setEncodedText
} = cipherSlice.actions;

export const selectEncodedText = (state: RootState) => state.cipher.encodedText;
export const selectEncodedTextLoading = (state: RootState) => state.cipher.loading;
export const selectStandardText = (state: RootState) => state.cipher.standardText;
export const selectError = (state: RootState) => state.cipher.error;
export const selectPassword = (state: RootState) => state.cipher.password;

export const cipherReducer = cipherSlice.reducer;