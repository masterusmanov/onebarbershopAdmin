import axios from '../axios'


export const useAuth = (user) => axios.post("/api/v1/user/login", user)

