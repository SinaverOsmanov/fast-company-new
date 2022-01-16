import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const initialState = {
    entities: null,
    isLoading: true,
    error: null
};

const commentsSlice = createSlice({
    name: "comments",
    initialState: initialState,
    reducers: {
        commentsRequested: (state, action) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentAdded: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
            state.isLoading = false;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentAdded,
    commentRemoved
} = actions;

export const loadComments = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);

        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment = (data) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.createComment(data);

        dispatch(commentAdded(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const removeComment = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.removeComment(userId);

        dispatch(commentRemoved(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoading = () => (state) => state.comments.isLoading;

export const getProfessionById = (id) => (state) => {
    return state.comments.entities.find((p) => p._id === id);
};

export default commentsReducer;
