import axios from "axios";

export async function apiRegisterWebniar(postData) {
  try {
    const { firstName, lastName, phoneNumber, email, webinarId } = postData;

    console.log(postData);
    const webinarRegistration = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      mobile: phoneNumber,
      course_id: webinarId,
    };

    const response = await axios.post(
       "webinar/registration",
      webinarRegistration
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
