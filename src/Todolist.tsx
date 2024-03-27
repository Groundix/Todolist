import { FiltersValuesType } from "./App";
import { Button, Card, List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FiltersValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
  filter: FiltersValuesType;
  id: string;
  key: string;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (todolistId: string, newTitle: string) => void;
};

export function TodoList(props: PropsType) {
  const onAllClickFilter = () => {
    props.changeFilter("all", props.id);
  };
  const onActiveClickFilter = () => {
    props.changeFilter("active", props.id);
  };
  const onCompletedClickFilter = () => {
    props.changeFilter("complete", props.id);
  };

  let removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  let changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <Card
      title={
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
      }
      style={{
        margin: "10px",
        boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.2)",
      }}
      extra={
        <Button
          size="small"
          type="text"
          danger
          shape="circle"
          className="remove-button"
          onClick={removeTodolist}
        >
          <DeleteOutlined />
        </Button>
      }
    >
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id, props.id);
          };
          const onChangeStatusHandler = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          };

          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <List>
              {" "}
              <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  onChange={onChangeStatusHandler}
                  checked={t.isDone}
                />
                <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                <Button
                  size="small"
                  danger
                  type="text"
                  shape="circle"
                  className="delete-button"
                  onClick={onRemoveHandler}
                >
                  <DeleteOutlined />
                </Button>
              </li>
            </List>
          );
        })}
      </ul>
      <div className="status-buttons">
        <Button
          className={props.filter === "all" ? "active-filter-all" : ""}
          onClick={onAllClickFilter}
        >
          All
        </Button>
        <Button
          className={props.filter === "active" ? "active-filter-active" : ""}
          onClick={onActiveClickFilter}
        >
          Active
        </Button>
        <Button
          className={
            props.filter === "complete" ? "active-filter-complete" : ""
          }
          onClick={onCompletedClickFilter}
        >
          Completed
        </Button>
      </div>
    </Card>
  );
}
