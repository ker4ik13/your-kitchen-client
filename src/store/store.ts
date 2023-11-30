import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user.slice';
import { claimsReducer } from './claims.slice';
import { kitchensReducer } from './kitchens.slice';
import { reviewReducer } from './reviews.slice';

const store = configureStore({
	reducer: {
		user: userReducer,
    claims: claimsReducer,
    kitchens: kitchensReducer,
    reviews: reviewReducer,
	},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.config', 'payload.request', 'payload.headers', 'error', 'meta.arg'],
      },
    })
});

export default store;