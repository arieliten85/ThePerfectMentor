import axios from "axios";
const url = "http://localhost:3030";

export default async function LoginRequest(userLogin) {
    try{
    const user = await axios.post(`${url}/api/user/login`,userLogin)
    return { error: false, data: user.data.user };
    }
    catch (error) {;
    return { error: true, data: error.response.data };
    }
}
