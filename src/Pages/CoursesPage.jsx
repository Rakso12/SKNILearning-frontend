import { useMatch } from "@tanstack/react-location";
import Courses from "../Components/Couses/Courses";
import Navbar from "../Components/Navbar/Navbar"

export const CoursesPage = () => {
  const {
    params: { id, title},
  } = useMatch();

  return(
      <>
      <Navbar></Navbar>
      <Courses course_id = {id} title = {title} ></Courses>
      </>
  );
}
