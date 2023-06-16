import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./formSlice";

//creating store to store userFormData

const store = configureStore({
    reducer:{
        formData:formSlice,
    }
})


export default store;