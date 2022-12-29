import { useMatch } from "@tanstack/react-location";
import Course from "../Components/Couses/Course";
import Navbar from "../Components/Navbar/Navbar"

export const CoursePage = () => {
  const {
    params: { id, title},
  } = useMatch();

  console.log(id);
  console.log(title);

  return(
      <>
      <Navbar></Navbar>
      <Course course_id = {id} title = {title} ></Course>
      </>
  );
}
