import axios from "axios";
export default async function VerifyToken(token) {
    try{
      const userAuth = await axios.get("http://localhost:3030/api/user/auth", { headers: { "auth-token": token }})
      return { error: false, data: userAuth.data.data.user };
    }
    catch (error) {;
     return { error: true, data: error.response.data };
    }
}
