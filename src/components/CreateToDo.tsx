import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const AddToDoInput = styled.input`
  all: unset;
  padding-left: 5px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid rgba(180, 180, 180, 0.4);
  margin-right: 10px;

  &:focus {
    border: 1px solid tomato;
  }
`;

const AddToDoButton = styled.button`
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

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <AddToDoInput
        {...register("toDo", { required: "Please write To-Do" })}
        placeholder="Write a To Do"
      />
      <AddToDoButton>Add</AddToDoButton>
    </form>
  );
}

export default CreateToDo;
