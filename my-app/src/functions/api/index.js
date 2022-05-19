


//Function to fetch api for random user
export const fetchCandidateApi = async(pageNumber)=>{
   const randomUserData = await fetch(`${`https://randomuser.me/api/?page=${pageNumber}&results=10&seed=abc`}`);
    const dataJson = await randomUserData.json();
    return dataJson
}
