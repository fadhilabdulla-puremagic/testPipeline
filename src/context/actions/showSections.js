import axios from 'axios';

export const showSections = async () => {
    try {const response = await axios.get("sections1")
        return response.data
    } catch (error) {
    // console.log(error.message)
    }
}
