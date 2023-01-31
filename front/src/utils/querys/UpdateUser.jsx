import axios from "axios";
const url = "http://localhost:3030";

export default async function UpdateUser(id,body) {
    try{
    const user_edit = await axios.put(`${url}/api/user/edit/${id}`, body)
    return { error: false, data: user_edit.data };
    }
    catch (error) {;
    return { error: true, data: error.response.data };
    }
}




