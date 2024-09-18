import axios from "axios";
import {toast } from "react-toastify";

export async function courseDetails(id) {
  const response = await axios.get(`course1/${id}`);
  if (response.status == 200) {
    return response.data;
  } else {
    toast.error("Sorry, Something Went Wrong", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  }
}
