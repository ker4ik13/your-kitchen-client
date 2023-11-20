import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IUser } from '@/types/IUser';
import AuthService from '@/services/AuthService';
import axios from 'axios';
import type { AuthResponse } from '@/types/response/AuthResponse';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface ILogin {
  email: string;
  password: string;
}

interface TInitialState {
  user: IUser,
  isAuth: boolean,
  isLoading: boolean,
	error: null | string,
};

const initialState: TInitialState = {
	user: {
    email: '',
    id: '',
    isActivated: false,
  },
  isAuth: false,
  isLoading: false,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
    setAuth (state, action: {payload: boolean, type: string}) {
      state.isAuth = action.payload;
    },
    setUser (state, action: {payload: IUser, type: string}) {
      state.user = action.payload;
    },
    setLoading (state, action: {payload: boolean, type: string}) {
      state.isLoading = action.payload;
    },
	},
	extraReducers: (builder) => {

    // Login
		builder.addCase(login.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
      if(action.payload) {
        state.user = action.payload;
        state.isAuth = true;
      }
      state.isLoading = false;
		});
		builder.addCase(login.rejected, (state, action) => {
			const error: any = action.payload;
      state.isLoading = false;
			state.error = error;
		});

    // Registration
		builder.addCase(registration.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(registration.fulfilled, (state, action) => {
      if(action.payload) {
        state.user = action.payload;
        state.isAuth = true;
      }
      state.isLoading = false;
		});
		builder.addCase(registration.rejected, (state, action) => {
			const error: any = action.payload;
      state.isLoading = false;
			state.error = error;
		});

    // Check auth
		builder.addCase(checkAuth.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(checkAuth.fulfilled, (state, action) => {
      if(action.payload) {
        state.user = action.payload;
        state.isAuth = true;
      }
      state.isLoading = false;
		});
		builder.addCase(checkAuth.rejected, (state, action) => {
			const error: any = action.payload;
			state.error = error;
			state.isLoading = false;
		});

    // Check auth
		builder.addCase(logout.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.isLoading = false;
		});
		builder.addCase(logout.rejected, (state, action) => {
			const error: any = action.payload;
			state.error = error;
			state.isLoading = false;
		});
	},
});

export const login = createAsyncThunk(
  'user/login',
async ({email, password}: ILogin) => {
   try {
      const response = await AuthService.login(email, password);

      localStorage.setItem('token', response.data.accessToken);

      return response.data.user;
    } catch (error) {
      console.log(error);
    }
});

export const registration = createAsyncThunk(
  'user/registration',
async ({email, password}: ILogin) => {
   try {
      const response = await AuthService.registration(email, password);

      localStorage.setItem('token', response.data.accessToken);

      return response.data.user;
    } catch (error) {
      console.log(error);
    }
});

export const logout = createAsyncThunk('user/logout', async () => {
   try {
      const response = await AuthService.logout();

      localStorage.removeItem('token');

      return response;
    } catch (error) {
      console.log(error);
    }
});

export const checkAuth = createAsyncThunk('user/checkAuth', async () => {
  setLoading(true);
  try {
    const response = await axios.get<AuthResponse>(`${NEXT_PUBLIC_API_URL}/api/refresh`, {
      withCredentials: true,
    });


    localStorage.setItem('token', response.data.accessToken);

    return response.data.user;
  } catch (error) {
    console.log(error);
  }
});

export const { setAuth, setUser, setLoading } = userSlice.actions;

export const userReducer = userSlice.reducer;