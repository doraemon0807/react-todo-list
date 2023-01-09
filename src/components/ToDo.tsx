import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, newCategoryState, toDoState } from "../atoms";

const ToDos = styled.li`
  display: flex;
  padding: 10px;
  border: 1px solid rgba(150, 150, 150, 1);
  border-radius: 5px;
  width: 100%;
  justify-content: space-between;
`;

const ToDoText = styled.span`
  margin-right: 20px;
`;

const ToDoButtons = styled.div``;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const newCategory = useRecoilValue(newCategoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDos((oldToDos) => {
      //Method 1:
      //   const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      //   const newToDo = { text, id, category: name as categories };
      //   const newToDos = [
      //     ...oldToDos.slice(0, targetIndex),
      //     newToDo,
      //     ...oldToDos.slice(targetIndex + 1),
      //   ];
      //   return newToDos;

      // Method 2:
      const newToDos = oldToDos.map((toDo) => {
        return toDo.id === id ? { ...toDo, category: value } : toDo;
      });
      return newToDos;
    });
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter((toDo) => toDo.id !== id);
      return newToDos;
    });
  };

  return (
    <ToDos>
      <ToDoText>{text}</ToDoText>
      <ToDoButtons>
        <select onInput={onInput} defaultValue={category}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
          {newCategory.length !== 0 &&
            newCategory.map((newCat) => (
              <option key={newCat} value={newCat}>
                {newCat}
              </option>
            ))}
        </select>
        <button onClick={handleDelete}>X</button>
      </ToDoButtons>
    </ToDos>
  );
}

export default ToDo;
