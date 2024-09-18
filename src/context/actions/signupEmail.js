import axios from "axios"

export const signupEmail = async (email) => {
    try {
        const response = await axios.post("login/email",{
            "email": email,
        });
        console.log(response.data)
        return response.data
      } catch (error) {
        console.error(error);
      } 
}