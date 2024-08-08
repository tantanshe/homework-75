import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';

interface MessagePayload {
  message: string;
  password: string;
}

export const encodeMessage = createAsyncThunk<string, MessagePayload>(
  'cipher/encodeMessage',
  async (payload) => {
    const response = await axiosApi.post('/encode', payload);
    return response.data.encoded;
  }
);

export const decodeMessage = createAsyncThunk<string, MessagePayload>(
  'cipher/decodeMessage',
  async (payload) => {
    const response = await axiosApi.post('/decode', payload);
    return response.data.decoded;
  }
);