import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  initialProcess: {
    activeStep: 0,
    generalInformation: {
      startDate: null,
      endDate: null,
      manager: '',
      degree: '',
    },
  },
};

const slice = createSlice({
  name: 'initial',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getManager(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },
    backStep(state) {
      state.initialProcess.activeStep -= 1;
    },
    nextStep(state) {
      state.initialProcess.activeStep += 1;
    },
    gotoStep(state, action) {
      const step = action.payload;
      state.initialProcess.activeStep = step;
    },
    fillGeneralInformation(state, action) {
      state.initialProcess.generalInformation = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  getCart,
  addToCart,
  resetCart,
  gotoStep,
  backStep,
  nextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  fillGeneralInformation,
} = slice.actions;
