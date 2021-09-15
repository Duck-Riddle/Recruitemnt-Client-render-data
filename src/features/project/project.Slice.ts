import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Init, ProjectProps, ApiResponse } from "./project.interfaces";
import { RootState } from "../../app/store";

export interface SliceState {
  state: "idle" | "loading" | "failed";
  init?: Init;
  currentPrject?: ProjectProps;
  errMessage: string;
}

const ReHelper = /#[1-9,A-F]{6}\b/;

function ValidateProject(project: ProjectProps) {
  if (typeof project.height !== "number" || project.height < 0) return false;
  if (typeof project.width !== "number" || project.width < 0) return false;
  for (const element of project.items) {
    if (typeof element.color !== "string" || !element.color.match(ReHelper)) return false;
    if (typeof element.height !== "number" || element.height < 0) return false;
    if (typeof element.width !== "number" || element.width < 0) return false;
    if (typeof element.rotation !== "number" || element.rotation < 0) return false;
    if (typeof element.x !== "number" || element.x < 0) return false;
    if (typeof element.y !== "number" || element.y < 0) return false;
  }
  return true;
}

const name = "project";
const initialState: SliceState = {
  state: "idle",
  errMessage: "",
};

const projectSlice = createSlice({
  name,
  initialState,
  reducers: {
    AsyncRequest: (slice, action: PayloadAction<string>) => {
      slice.state = "loading";
    },
    AsyncResponse: (slice, action: PayloadAction<ApiResponse>) => {
      if (action.payload.project) {
        const isValid = ValidateProject(action.payload.project);
        if (isValid) {
          slice.currentPrject = action.payload.project;
          slice.state = "idle";
        } else {
          action.payload.errMsg = "Project is not valid to be rendered!";
        }
      }
      if (action.payload.init) {
        console.log("init");
        slice.init = action.payload.init;
        slice.state = "idle";
      }
      if (action.payload.errMsg) {
        slice.state = "failed";
        slice.errMessage = action.payload.errMsg;
        slice.currentPrject = undefined;
      } else {
        slice.state = "idle";
        slice.errMessage = "";
      }
    },
  },
});

export const { AsyncRequest, AsyncResponse } = projectSlice.actions;
export const selectProject = (state: RootState) => state[name];
export default projectSlice.reducer;
