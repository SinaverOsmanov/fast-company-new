import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/qaulity.service";

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
};

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: initialState,
    reducers: {
        qualitiesRequested: (state, action) => {
            state.isLoading = true;
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } =
    actions;

function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutDated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualityService.fetchAll();

            dispatch(qualitiesReceived(content));
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message));
        }
    }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualityById = (qualitiesIds) => (state) => {
    if (state.qualities.entities) {
        const qualitiesArray = [];
        for (const qId of qualitiesIds) {
            for (const q of state.qualities.entities) {
                if (q._id === qId) {
                    qualitiesArray.push(q);
                    break;
                }
            }
        }
        return qualitiesArray;
    }
    return [];
};

export const getQualiltiesLoadingStatus = () => (state) => {
    return state.qualities.isLoading;
};

export default qualitiesReducer;
