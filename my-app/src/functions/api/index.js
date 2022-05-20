


//Function to fetch api for random user
export const fetchCandidateApi = async(perPageView,perPageCount)=>{
   const randomUserData = await fetch(`${`https://randomuser.me/api/?page=${perPageView}&results=${perPageCount}&seed=abc`}`);
    const candidateData = await randomUserData.json();
    return candidateData;
}


//Function to fetch random business idea api
export const fetchBizIdea = async ()=>{
    const bizIdeaData = await fetch("http://localhost:4000/api/bizIdea");
    const bizDataResult = await bizIdeaData.json();
    console.log(bizDataResult.this)
    return "hello";
}
