import { useState } from "react";
import { TodoList, TaskType } from "./Todolist";
import "./App.css";
import { v1 } from "uuid";
import { Space, Button, Input, Grid, Flex, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { Content } from "antd/es/layout/layout";
import { AddItemForm } from "./AddItemForm";

export type FiltersValuesType = "all" | "active" | "complete";

export type TodolistType = {
  id: string;
  title: string;
  filter: FiltersValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};
function App() {
  let [filter, setFilter] = useState<FiltersValuesType>("all");

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }
  function changeFilter(value: FiltersValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolist([...todolists]);
    }
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }
  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === id);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolist] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "active" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);
  let removeTodolist = (todolistId: string) => {
    setTodolist(todolists.filter((tl) => tl.id !== todolistId));
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  };

  let changeTodolistTitle = (todolistId: string, newTitle: string) => {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
      setTodolist([...todolists]);
    }
  };

  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React Book", isDone: true },
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Shoes", isDone: false },
    ],
  });

  function addTodoList(title: string) {
    let newTodolist: TodolistType = {
      id: v1(),
      title: title,
      filter: "all",
    };
    setTodolist([...todolists, newTodolist]);
    setTasks({ ...tasksObj, [newTodolist.id]: [] });
  }

  return (
    <Layout>
      <div className="App">
        <Header
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            height: "75px",
            padding: "5px",
          }}
        >
          <Space align="baseline">
            <AddItemForm
              addItem={(title: string) => {
                addTodoList(title);
              }}
            />
          </Space>
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <Content
            style={{
              padding: "30px",
              margin: "10px",
              minHeight: 280,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Space size={[8, 16]} wrap>
              {todolists.map((tl) => {
                let tasksForTodoList = tasksObj[tl.id];
                if (tl.filter === "complete") {
                  tasksForTodoList = tasksForTodoList.filter(
                    (t) => t.isDone === true
                  );
                }
                if (tl.filter === "active") {
                  tasksForTodoList = tasksForTodoList.filter(
                    (t) => t.isDone === false
                  );
                }
                return (
                  <TodoList
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    id={tl.id}
                    key={tl.id}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                );
              })}
            </Space>
          </Content>
        </Content>
      </div>
    </Layout>
  );
}

export default App;
