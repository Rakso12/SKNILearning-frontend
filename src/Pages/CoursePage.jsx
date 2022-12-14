import { useMatch } from "@tanstack/react-location";
import Course from "../Components/Couses/Course";
import Navbar from "../Components/Navbar/Navbar"

export const CoursePage = () => {
  const {
    params: { id},
  } = useMatch();

  console.log("Weszło do coursePage");

  return(
      <>
      <Navbar></Navbar>
      <Course course_id = {id}></Course>
      </>
  );
}
