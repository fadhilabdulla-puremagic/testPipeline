import axios from 'axios';

export const showBanner = async () => {
  
  try {
        
    const response = await axios.get(
      "banners1"
    )

        return response.data

      } catch (error) {
        // console.log(error.message)
      }

  }
