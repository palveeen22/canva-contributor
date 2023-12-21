import { configureStore } from "@reduxjs/toolkit";

import textboxSlice from "./textboxStore";

const Store = configureStore({
  reducer: textboxSlice.reducer,
});

export default Store;
