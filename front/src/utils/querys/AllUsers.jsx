import axios from "axios";
const url = "http://localhost:3030";

export default async function AllUsers() {
    try{
    const user = await axios.get(`${url}/api/user/stadistics`)
    return { error: false, data: user.data };
    }
    catch (error) {;
    return { error: true, data: error.response.data };
  }
}