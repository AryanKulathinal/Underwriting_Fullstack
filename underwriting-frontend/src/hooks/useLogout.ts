import { useNavigate } from "react-router-dom";


export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    localStorage.removeItem("access_token"); 
    sessionStorage.clear();
   
    navigate("/");

  };

  return handleLogout;
};


