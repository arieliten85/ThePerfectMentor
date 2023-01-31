import axios from "axios";
const url = "http://localhost:3030";

export default async function UserDelete(id) {
 await axios.delete(`${url}/api/user/delete/${id}`) 
}
