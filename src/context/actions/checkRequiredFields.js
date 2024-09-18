import axios from "axios";

export const apiCheckRequiredFields = async (data) => {
  try {
    const response = await axios.post(
       "/additional-form-fields",
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
