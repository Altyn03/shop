import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
        userLogOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state) => {
                state.isLoggedIn = false;
                state.error = null;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.entities = action.payload;
            })
            .addCase(logIn.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.error = action.payload;
            })
            .addCase(getUserData.pending, (state) => {
                state.isLoggedIn = false;
                state.error = null;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.entities = action.payload;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.error = action.payload;
                state.entities = null;
            })
            .addCase(updateUserData.pending, (state) => {
                state.error = null;
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.entities = action.payload;
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.entities = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

const { reducer: userReducer, actions } = userSlice;
const { userLogOut } = actions;

export const register = createAsyncThunk(
    "user/register",
    async ({ email, password, ...rest }) => {
        try {
            const data = await authService.register({
                email,
                password,
                ...rest
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const logIn = createAsyncThunk(
    "user/logIn",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await authService.logIn({ email, password });
            return data;
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                return rejectWithValue(errorMessage);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const getUserData = createAsyncThunk("user/getData", async () => {
    try {
        const content = await userService.getCurrentUser();
        return content;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const updateUserData = createAsyncThunk(
    "user/updateData",
    async ({ currentUser, imageUrl }, { rejectWithValue }) => {
        try {
            const data = await userService.updateCurrentUser(currentUser.id, {
                ...currentUser,
                image: imageUrl
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLogOut());
};

export const getCurrentUser = () => (state) => state.user.entities;
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getAuthErrors = () => (state) => state.user.error;

export default userReducer;
