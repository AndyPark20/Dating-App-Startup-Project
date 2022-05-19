


//Function to fetch api for random user
export const fetchCandidateApi = async(perPageView,perPageCount)=>{
   const randomUserData = await fetch(`${`https://randomuser.me/api/?page=${perPageView}&results=${perPageCount}&seed=abc`}`);
    const dataJson = await randomUserData.json();
    return dataJson
}
