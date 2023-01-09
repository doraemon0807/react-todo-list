import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  addCategoryState,
  Categories,
  categoryState,
  newCategoryState,
} from "../atoms";

const AddCategoryBtn = styled.button`
  all: unset;
  display: flex;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
  fill: white;
  &:hover {
    fill: tomato;
  }
`;

const AddCategorySelect = styled.select`
  all: unset;
  display: flex;
  width: 60px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  padding-left: 5px;
`;

function Category() {
  const [category, setCategory] = useRecoilState(categoryState);
  const setAddCategoryActive = useSetRecoilState(addCategoryState);

  const newCategory = useRecoilValue(newCategoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };

  const CategoryAdd = () => {
    setAddCategoryActive(true);
  };

  return (
    <>
      <AddCategoryBtn onClick={CategoryAdd}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M352 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12 5.4 12 12zm96-160v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z" />
        </svg>
      </AddCategoryBtn>
      <AddCategorySelect value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {newCategory.length !== 0 &&
          newCategory.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
      </AddCategorySelect>
    </>
  );
}

export default Category;
