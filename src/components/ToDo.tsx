import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, newCategoryState, toDoState } from "../atoms";

const ToDos = styled.li`
  display: grid;
  padding: 10px;
  border: 1px solid rgba(150, 150, 150, 1);
  border-radius: 5px;
  width: 100%;
  grid-template-columns: 9fr 1fr;
  margin-bottom: 10px;
  &:hover {
    background-color: rgba(150, 150, 150, 0.3);
  }
`;

const ToDoText = styled.span`
  margin-right: 20px;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const ToDoCategorySelect = styled.select`
  all: unset;
  display: flex;
  width: 60px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 5px;
  padding-left: 5px;
  background-color: ${(props) => props.theme.bgColor};
  &:hover {
    border: 1px solid tomato;
  }
`;

const ToDoButtons = styled.div`
  display: flex;
`;

const DeleteToDoButton = styled.button`
  all: unset;
  height: 30px;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid white;
  cursor: pointer;
  &:hover {
    border: 1px solid tomato;
  }
`;

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
        <ToDoCategorySelect onInput={onInput} defaultValue={category}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
          {newCategory.length !== 0 &&
            newCategory.map((newCat) => (
              <option key={newCat} value={newCat}>
                {newCat}
              </option>
            ))}
        </ToDoCategorySelect>
        <DeleteToDoButton onClick={handleDelete}>X</DeleteToDoButton>
      </ToDoButtons>
    </ToDos>
  );
}

export default ToDo;
