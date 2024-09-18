import axios from "axios";

export const apiGetWebinar = async (postData) => {
  try {
    const { data } = await axios.post(
       `get-webinar-details`,
      postData
    );

    return data;
  } catch (error) {
    console.log(error.message);
  }
};
