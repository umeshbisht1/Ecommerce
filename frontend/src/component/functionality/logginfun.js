import axios from "axios";
const login=async(formdata)=>{
    try {
      
        const response = await axios.post('/api/v1/login', formdata)
        console.log(response.data.message);
        const myObject = { 'token': response.data.message };
        localStorage.setItem('Token', JSON.stringify(myObject));
        return true;
      } 
     
    catch (error) {
      console.log("error occured in logging the user");
      return false;
    }
}
const userdetail= async()=>{
  try {
    const data=await axios.get("/api/v1/getprofile");
   const response= data.data.data;
   return response;
   } catch (error) {
    console.log("error occured in profile  || user is not loginned in");
   }
}

export {login,userdetail};