import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const initialState = {
    entities: null,
    isLoading: true,
    error: null
};

const professionsSlice = createSlice({
    name: "professions",
    initialState: initialState,
    reducers: {
        professionsRequested: (state, action) => {
            state.isLoading = true;
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload;
            // state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceived, professionsRequestFailed } =
    actions;

export const loadProfessions = () => async (dispatch) => {
    dispatch(professionsRequested());
    try {
        const { content } = await professionService.get();

        dispatch(professionsReceived(content));
    } catch (error) {
        dispatch(professionsRequestFailed(error.message));
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoading = () => (state) =>
    state.professions.isLoading;

export const getProfessionById = (id) => (state) => {
    return state.professions.entities.find((p) => p._id === id);
};

export default professionsReducer;
