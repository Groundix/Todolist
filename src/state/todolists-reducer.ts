import { v1 } from "uuid";
import { FiltersValuesType, TodolistType } from "../App";
import { title } from "process";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FiltersValuesType;
};

export type ActionTypes =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;
  
export const todolistsReducer = (
  state: Array<TodolistType>,
  action: ActionTypes
    
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.id);

    case "ADD-TODOLIST":
      return [...state, { id: v1(), title: action.title, filter: "all" }];

    case "CHANGE-TODOLIST-TITLE":
      let todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];

    case "CHANGE-TODOLIST-FILTER":
      const todolistFilter = state.find((tl) => tl.id === action.id);
      if (todolistFilter) {
        todolistFilter.filter = action.filter;
      }
      return [...state];
    default:
      throw new Error("Unknown action type");
  }
};

export const RemoveTodolistAC = (todolistid: string): RemoveTodolistActionType => ({
  type: "REMOVE-TODOLIST",
  id: todolistid,
});

export const AddTodolistAC = (title: string): AddTodolistActionType => ({
  type: "ADD-TODOLIST",
  title: title,
});

export const ChangeTodolistTitleAC = ( todolistid: string, title: string,): ChangeTodolistTitleActionType => ({
  type: "CHANGE-TODOLIST-TITLE",
  title: title,
  id: todolistid,
});

export const ChangeTodolistFilterAC = (todolistid: string, filter: FiltersValuesType, ): ChangeTodolistFilterActionType => ({
  type: "CHANGE-TODOLIST-FILTER",
  filter: filter,
  id: todolistid,
})
