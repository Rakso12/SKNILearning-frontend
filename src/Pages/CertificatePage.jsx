import { useMatch } from "@tanstack/react-location";
import Certificate from "../Components/Certifications/Certificate"
import Navbar from "../Components/Navbar/Navbar"

export const CertificatePage = () => {
  const {
    params: { id },
  } = useMatch();

  console.log(id);

  return(
      <>
      <Navbar></Navbar>
      <Certificate cert_id = {id}></Certificate>
      </>
  );
}
