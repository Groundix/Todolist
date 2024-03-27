type StateType = {
  age: number;
  name: string;
  childrenCout: number;
};

type ActionType = {
  type: string;
  [key: string]: any;
};

export const userReducer = (state: StateType, action: ActionType):StateType => {
  switch (action.type) {
    case "INCREMENT-AGE":
      state.age = state.age + 1;
      return state;

    case "INCREMENT-CHILDREN-COUNT":
      state.childrenCout = state.childrenCout + 1;
      return state;
    case "CHANGE-NAME":
      state.name = action.newName;
      return state;
    default:
      throw new Error("Unknown action type");
  }
};
