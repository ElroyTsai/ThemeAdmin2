import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISetting } from "~/interface/setting";
import { settingService } from "../api";

const initialState: ISetting = {
  localPath: {
    modifyPath: "",
    sourcePathDisk: "",
    themePath: "",
  },
};

export const getSetting = createAsyncThunk("setting/getSetting", async () => {
  const resp = await settingService.getSetting();
  return resp.result;
});

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSetting: (state, action: PayloadAction<ISetting>) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSetting.pending, (state) => {
      return state;
    });
    builder.addCase(
      getSetting.fulfilled,
      (state, action: PayloadAction<ISetting>) => {
        state = action.payload;
        return state;
      }
    );
    builder.addCase(getSetting.rejected, (state) => {
      return state;
    });
  },
});

export const { setSetting } = settingSlice.actions;
export default settingSlice.reducer;
