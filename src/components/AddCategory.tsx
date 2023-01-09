import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { addCategoryState, categoryState, newCategoryState } from "../atoms";

const WrapperAdd = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 300px;
  height: 250px;
  box-shadow: 1px 1px 5px rgba(120, 120, 120, 1);
  border-radius: 10px;
  background-color: rgba(230, 230, 230, 1);
  padding: 30px 10px;
  position: relative;
`;

const AddCategoryTitle = styled.h2`
  font-size: 24px;
  color: ${(props) => props.theme.bgColor};
`;

const AddCategoryForm = styled.form`
  all: unset;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddCategoryInput = styled.input`
  all: unset;
  border: 1px solid rgba(150, 150, 150, 0.7);
  background-color: white;
  border-radius: 5px;
  width: 90%;
  height: 30px;
  padding: 10px;
  &:focus {
    border: 1px solid tomato;
  }
`;

const AddCategoryButton = styled.button`
  all: unset;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 30px;
  font-weight: 600;
  color: rgba(1, 1, 1, 0.4);
  &:hover {
    color: red;
  }
`;

interface ICategory {
  category: string;
}

function AddCategory() {
  const [addCategoryActive, setAddCategoryActive] =
    useRecoilState(addCategoryState);

  const [categories, setCategories] = useRecoilState(categoryState);
  const [newCategory, setNewCategory] = useRecoilState(newCategoryState);
  const { register, handleSubmit } = useForm<ICategory>();

  const onValid = ({ category }: ICategory) => {
    console.log(category);
    setNewCategory((allCategories) => {
      return [...allCategories, category];
    });
    setAddCategoryActive(false);
  };

  const handleAddCategoryDelete = () => {
    setAddCategoryActive(false);
  };

  return (
    <WrapperAdd isActive={addCategoryActive}>
      <AddCategoryContainer>
        <AddCategoryTitle>Create New Category</AddCategoryTitle>
        <AddCategoryForm onSubmit={handleSubmit(onValid)}>
          <AddCategoryInput
            {...register("category", { required: true })}
            type="text"
            placeholder="Add a category name"
          />
        </AddCategoryForm>
        <AddCategoryButton onClick={handleAddCategoryDelete}>
          X
        </AddCategoryButton>
      </AddCategoryContainer>
    </WrapperAdd>
  );
}

export default AddCategory;
