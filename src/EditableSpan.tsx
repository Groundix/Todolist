import React, { useState } from 'react';


type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void
};
export function EditableSpan(props: EditableSpanPropsType) {

  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.title)
  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title)
  }

  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
  ? <input value={title} onBlur={activateViewMode} autoFocus={true} onChange={onChangeHandler}/>
  :  <span onDoubleClick={activateEditMode}>
      {props.title}
    </span>
  
}
