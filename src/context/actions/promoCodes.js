import axios from "axios";

export const applyPromoCode = async (data) => {
  try {
    const response = await axios.post(
       "apply-promocode",
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
