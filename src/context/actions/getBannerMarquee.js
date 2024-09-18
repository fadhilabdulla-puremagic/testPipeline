import axios from "axios";

export async function getBannerMarquee() {
  try {
    const response = await axios.get(
       "banner-details1"
    );

    return response;
  } catch (error) {
    return error;
  }
}
