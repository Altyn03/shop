import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { userService } from "../services/Firebase.service";
import { generateAuthError } from "../utils/generateAuthError";

const userSlice = createSlice({
    name: "user",
    initialState: {
        entities: null,
        isLoggedIn: false,
        error: null
    },
    reducers: {
        authRequested: (state) => {
            state.error = null;
        },
        authRequestSuccess: () => {},
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreateRequest: () => {},
        userCreated: (state, action) => {
            state.entities = action.payload;
            state.isLoggedIn = true;
        },
        userCreateFailed: (state, action) => {
            state.error = action.payload;
        },
        userLogInRequested: () => {},
        userLogInRequestSuccess: (state, action) => {
            state.entities = action.payload;
            state.isLoggedIn = true;
        },
        userLogInRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userUpdateRequest: () => {},
        userUpdateRequestSuccess: (state, action) => {
            state.entities = action.payload;
        },
        userUpdateRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userLogOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
        }
    }
});

const { reducer: userReducer, actions } = userSlice;
const {
    authRequested,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userCreateRequest,
    userCreateFailed,
    userLogInRequested,
    userLogInRequestSuccess,
    userLogInRequestFailed,
    userUpdateRequest,
    userUpdateRequestSuccess,
    userUpdateRequestFailed,
    userLogOut
} = actions;

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(
                createUser({
                    id: data.localId,
                    email,
                    image: `https://i.pravatar.cc/150?img=${Math.round(
                        Math.random() * 12
                    )}`,
                    created_at: Date.now(),
                    ...rest
                })
            );
            dispatch(authRequestSuccess());
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

export const logIn =
    ({ email, password }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.logIn({ email, password });
            localStorageService.setTokens(data);
            dispatch(getUserData());
            dispatch(authRequestSuccess());
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

// export const logIn = createAsyncThunk('user/auth')

function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequest());
        try {
            const content = await userService.create(payload);
            dispatch(userCreated(content));
        } catch (error) {
            dispatch(userCreateFailed(error.message));
        }
    };
}

export function getUserData() {
    return async function (dispatch) {
        dispatch(userLogInRequested());
        try {
            const content = await userService.getCurrentUser();
            dispatch(userLogInRequestSuccess(content));
        } catch (error) {
            dispatch(userLogInRequestFailed(error.message));
        }
    };
}

export function updateUserData(id, content) {
    return async function (dispatch) {
        dispatch(userUpdateRequest());
        try {
            const data = await userService.updateCurrentUser(id, content);
            dispatch(userUpdateRequestSuccess(data));
        } catch (error) {
            dispatch(userUpdateRequestFailed(error.message));
        }
    };
}

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLogOut());
};

export const getCurrentUser = () => (state) => state.user.entities;
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getAuthErrors = () => (state) => state.user.error;

export default userReducer;
