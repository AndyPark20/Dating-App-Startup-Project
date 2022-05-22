


//Function to fetch api for random user
export const fetchCandidateApi = async (perPageView, perPageCount) => {
    const randomUserData = await fetch(`${`https://randomuser.me/api/?page=${perPageView}&results=${perPageCount}&seed=abc`}`);
    const candidateData = await randomUserData.json();
    return candidateData;
};


//Function to fetch random business idea api
export const fetchBizIdea = async () => {
    const bizIdeaData = await fetch("/api/bizIdea");
    const bizDataResult = await bizIdeaData.json();
    return bizDataResult;
};

//Create a random number for random page views and cost
export const createRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    return randomNumber;
};

//Generate random number for completion (in Months)
export const createRandomMonth = () => {
    const randomMonth = Math.floor(Math.random() * 12);
    if(randomMonth ===0){
        return 'Completed';
    }
    return randomMonth;
};
