import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
//use auth
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;