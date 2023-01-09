import { useEffect } from "react";
import CreateToDo from "./CreateToDo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { addCategoryState, categoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import Category from "./Category";
import styled from "styled-components";
import AddCategory from "./AddCategory";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  hr {
    width: 90vw;
  }
`;

const Title = styled.h1`
  font-size: 48px;
`;

const ToDoHeader = styled.div`
  display: flex;
  margin: 20px 0;
  width: 50vw;
  justify-content: center;
`;

const ToDoBody = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid tomato;
  border-radius: 5px;
  padding: 20px;
  width: 40vw;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const setCategory = useSetRecoilState(categoryState);
  const addCategoryActive = useRecoilValue(addCategoryState);

  useEffect(() => {
    setCategory("TO_DO");
  }, []);

  return (
    <Wrapper>
      <Title>To Dos</Title>
      <hr />
      <ToDoHeader>
        <Category />
        <CreateToDo />
      </ToDoHeader>
      <ToDoBody>
        {toDos?.map((toDo) => {
          return <ToDo key={toDo.id} {...toDo} />;
        })}
      </ToDoBody>
      {addCategoryActive && <AddCategory />}
    </Wrapper>
  );
}

// function ToDoList() {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IForm>({
//     defaultValues: {
//       email: "@naver.com",
//     },
//   });
//   const onValid = (data: IForm) => {
//     if (data.password !== data.password1) {
//       return setError(
//         "password1",
//         { message: "Passwords are not matching." },
//         { shouldFocus: true }
//       );
//     }
//   };
//   console.log(errors);
//   return (
//     <div>
//       <form
//         style={{ display: "flex", flexDirection: "column" }}
//         onSubmit={handleSubmit(onValid)}
//       >
//         <input
//           {...register("firstName", {
//             required: "First Name is required",
//             validate: {
//               noNico: (value) =>
//                 value.includes("nico")
//                   ? "You can't have 'nico' in your first name"
//                   : true,
//               noNick: (value) =>
//                 value.includes("nick")
//                   ? "You can't have 'nick' in your first name"
//                   : true,
//             },
//             minLength: { value: 10, message: "Your First Name is too short" },
//           })}
//           placeholder="First Name"
//         />
//         <span>{errors?.firstName?.message}</span>
//         <input
//           {...register("lastName", {
//             required: "Last Name is required",
//             minLength: { value: 10, message: "Your Last Name is too short" },
//           })}
//           placeholder="Last Name"
//         />
//         <span>{errors?.lastName?.message}</span>
//         <input
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//               message: "Only Naver.com is allowed",
//             },
//           })}
//           placeholder="Email"
//         />
//         <span>{errors?.email?.message}</span>
//         <input
//           {...register("password", {
//             required: "Password is required",
//             minLength: {
//               value: 10,
//               message: "Password is too short",
//             },
//           })}
//           placeholder="Password"
//         />
//         <span>{errors?.password?.message}</span>
//         <input
//           {...register("password1", {
//             required: "Password confirmation is required",
//             minLength: {
//               value: 10,
//               message: "Password is too short",
//             },
//           })}
//           placeholder="Password Confirmation"
//         />
//         <span>{errors?.password1?.message}</span>

//         <button>Add</button>
//         <span>{errors?.extraError?.message}</span>
//       </form>
//     </div>
//   );
// }

export default ToDoList;
