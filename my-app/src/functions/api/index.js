


//Function to fetch api for random user
export const fetchCandidateApi = async(perPageCount)=>{
   const randomUserData = await fetch(`${`https://randomuser.me/api/?page=1&results=${perPageCount}&seed=abc`}`);
    const dataJson = await randomUserData.json();
    return dataJson
}
