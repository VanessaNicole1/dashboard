import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  initialProcess: {
    activeStep: 0,
    generalInformation: {
      startDate: new Date(),
      endDate: new Date(),
      manager: '',
      degree: '',
    },
    csvStudents: [],
    students: [],
    csvTeachers: [],
    teachers: []
  },
};

const slice = createSlice({
  name: 'initial',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    resetState(state) {
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
      state.initialProcess = initialState.initialProcess;
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
    createStudents(state, action) {
      const { csv, entities } = action.payload;
      state.initialProcess.students = entities;
      state.initialProcess.csvStudents = csv;
    },
    createTeachers(state, action) {
      const { csv, entities } = action.payload;
      state.initialProcess.teachers = entities;
      state.initialProcess.csvTeachers = csv;
    }
  },
});

export default slice.reducer;

export const {
  gotoStep,
  backStep,
  nextStep,
  fillGeneralInformation,
  createStudents,
  createTeachers,
  resetState
} = slice.actions;
