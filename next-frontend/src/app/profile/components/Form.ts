import { z } from "zod";

const Form = () => {
 const schema = z.object({
   role: z.object({
           value: z.string().min(1, "Role value is required"),
           label: z.string().min(1, "Role label is required"),
         }),     
    name: z.string().min(1, "Name is required"),         
   brand_name: z.string().min(1, "Brand name is required"),
   socialMediaHandles: z.object({
           platform: z.string().min(1, "Platform value is required"),
           handle: z.string().min(1, "Handle label is required"),
         }),
    niche:z.object({
            value: z.string().min(1, "Niche value is required"),
            label: z.string().min(1, "Niche label is required"),
          }),
   email: z.string().email("Invalid email address"),
   guidelines: z.string().min(1, "Niche value is required"), // Only for Clippers - Up to 4 guidlines
   followers: z.number().min(1), // Only for Clippers
   pricePerPost: z.number().min(1) // Only for Clippers
 });

 console.log(schema)
 
}

export default Form