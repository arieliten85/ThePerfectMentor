import axios from "axios";
const url = "http://localhost:3030";

export default async function RegisterRequest(formData) {
    try{
    const user = await axios.post(`${url}/api/user/register`,formData)
    return { error: false, data: user.data.user };
    }
    catch (error) {;
    return { error: true, data: error.response.data };
    }
}
