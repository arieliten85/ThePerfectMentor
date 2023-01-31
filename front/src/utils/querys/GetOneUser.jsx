import axios from "axios";
const url = "http://localhost:3030";

export default async function GetOneUser(id) {
    try{
    const oneUser = await axios.get(`${url}/api/user/users/${id}`)
    return { error: false, data: oneUser.data };
    }
    catch (error) {;
    return { error: true, data: error.response.data };
    }
}

