


//Function to fetch api for random user
export const fetchCandidateApi = async()=>{
   const randomUserData = await fetch("https://randomuser.me/api/?page=1&results=10&seed=abc");
    const dataJson = await randomUserData.json();
    return dataJson
}
