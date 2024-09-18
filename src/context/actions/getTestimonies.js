import axios from "axios"


export const getTestimonies = async () => {
    try {
        
        const { data } = await axios.get(
          "testimonials"
        )
    
        return data;
    
          } catch (error) {
            console.log(error.message)
    
        }
}