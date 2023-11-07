import axios from '../axios'


export const useRegistration = {
    create: (user) => axios.post("/api/v1/user", user, {
    })
}