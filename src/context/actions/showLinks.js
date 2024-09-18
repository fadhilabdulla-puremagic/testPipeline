import axios from 'axios';

export const showLinks = async () => {

  try {
    // console.log(process.env.REACT_APP_API_URL);    env
    const { data } = await axios.get(
      "contact-details1"
    )
        //console.log(data)
        return data;

      } catch (error) {
        // console.log(error.message)
      }

  }
