import axios from "axios";
import { toast } from "react-toastify";

export const sendInstructorDetails = async (formData) => {
  if (formData['courseCategory'] == "other"){formData['courseCategory'] = `other_${formData['newCourseCategory']}`}
  delete formData['newCourseCategory']
  if (validateFormData(formData)) {
    try {
      const response = await axios.post("save-instructor-detail", formData);
      toast.success(
        "Details saved successfully. We will be in touch with you shortly.!",
        { position: toast.POSITION.TOP_CENTER, autoClose: 3000 }
      );
      return { status: 200 };
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return { status: 500 };
    }
    return { status: 500 };
  }
};
const validateFormData = (data) => {
  for (const [key, value] of Object.entries(data)) {
    if (value === "" || value === null || value === undefined) {
      console.log(key)
      toast.error("Please fill all the fields", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return false;
    }
  }
  return true;
};
