import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IClaim } from '@/types/IClaim';
import ClaimService from '@/services/ClaimService';

type initialStateType = {
  claims: IClaim[],
	isLoading: boolean;
	error: null | string,
};

const initialState: initialStateType = {
  claims: [],
	isLoading: false,
	error: null,
};


const claimsSlice = createSlice({
	name: 'claims',
	initialState,
	reducers: {
    setClaims (state, action: {payload: IClaim[], type: string}) {
      state.claims = action.payload;
    },
	},
	extraReducers: (builder) => {

    // Get claims
		builder.addCase(getClaims.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getClaims.fulfilled, (state, action) => {
      if(action.payload) {
        state.claims = action.payload;
      }
      state.isLoading = false;
		});
		builder.addCase(getClaims.rejected, (state, action) => {
			const error: any = action.payload;
      state.isLoading = false;
			state.error = error;
		});
	},
});

export const getClaims = createAsyncThunk(
  'claims/getClaims',
async () => {
   try {
      const claims = await ClaimService.getClaims();
      
			return claims.data;
    } catch (error) {
      console.log(error);
    }
});

export const { setClaims } = claimsSlice.actions;

export const claimsReducer = claimsSlice.reducer;