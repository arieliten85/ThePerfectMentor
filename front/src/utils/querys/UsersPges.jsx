import axios from "axios";
const url = "http://localhost:3030";

export default async function UsersPages(page,rol) {
    try{
      const user = await axios.get(`${url}/api/user/users?page=${page}&&rol=${rol}`)
      return { error: false, data: user.data };
    }
    catch (error) {;
      return { error: true, data: error };
    }
}


