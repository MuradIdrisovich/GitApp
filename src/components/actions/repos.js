import axios from "axios";
import { setRepos, setIsFetching, setFetchError } from "../../reducers/reposReducer";
//hello
export const getRepos = (searchQuery = 'user:MuradIdrisovich', currentPage, perPage) => {
    if(searchQuery == ''){
        searchQuery = 'user:MuradIdrisovich'
    }
    return async (dispatch) => {
        try {
            dispatch(setIsFetching(true))
            const response = await axios.get(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`)
            dispatch(setRepos(response.data))
        } catch (e) {
            dispatch(setFetchError(true))
            dispatch(setIsFetching(false));
        }
    }
}

export const getCurrentRepo = (username, repoName, setRepo) => { 
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`)
        setRepo(response.data)
        dispatch(setIsFetching(false))
    }
    
}

export const getContributors = async (username, repoName, setContributors) => {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contributors?page=1&per_page=5`)
        setContributors(response.data)
}