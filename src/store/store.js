import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./formSlice";

const store = configureStore({
    reducer:{
        formData:formSlice,
    }
})


export default store;