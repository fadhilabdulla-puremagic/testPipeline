import axios from "axios";

export const updateProfile = async (data,token,file) => {

  
  try {
    const response = await axios.post(
      "update/profile",
      { picture: file, user:data, token:token },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data
  } catch (error) {
    console.error(error);
  }
}