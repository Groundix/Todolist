import { useState } from "react";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export type addItemFormPropsType = {
  addItem: (title: string) => void;
};
export function AddItemForm(props: addItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (newTaskTitle.trim() !== "") {
      if (e.key === "Enter") {
        props.addItem(newTaskTitle.trim());
        setNewTaskTitle("");
      }
    }
  };

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Field is required");
    }
  };

  return (
    <div className="input">
      <Input
        className={error ? "error" : ""}
        placeholder="Что нужно сделать?"
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        style={{ width: "100%" }}
      />

      <Button
        onClick={onClickHandler}
        style={{ marginLeft: " 0", height: "100%" }}
      >
        <PlusOutlined />
      </Button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
