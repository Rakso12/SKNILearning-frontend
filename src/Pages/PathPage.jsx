import { useMatch } from "@tanstack/react-location";
import Navbar from "../Components/Navbar/Navbar"
import Path from "../Components/Paths/Path";

export const PathPage = () => {
  const {
    params: { id },
  } = useMatch();

  return(
      <>
      <Navbar></Navbar>
      <Path path_id = {id}></Path>
      </>
  );
}
