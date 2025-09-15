import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    mode: localStorage.getItem("darkMode") === "true" // true si "true", sinon false
}

const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.mode = !state.mode;
            localStorage.setItem("darkMode", state.mode.toString());

            // applique la classe dark sur <html> pour Tailwind
            if (state.mode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
