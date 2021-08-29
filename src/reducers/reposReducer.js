const SET_REPOS = 'SET_REPOS';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_FETCH_ERROR = 'SET_FETCH_ERROR';
const SET_SORT_REPOS = 'SET_SORT_REPOS';
const SET_PER_PAGE = 'SET_PER_PAGE';

const defaultState = {
    items: [],
    isFetching: true,     
    currentPage: 1 ,
    perPage: 5,
    totalCount: 0,        
    isFetchError: false
}

export default function reposReducer(state = defaultState, action){   
    switch(action.type){                                                        
        case SET_REPOS:                                               
            return {
                ...state,
                items: action.payload.items,
                totalCount: action.payload.total_count,
                isFetching: false
            }
        case SET_IS_FETCHING: 
            return {
                ...state,
                isFetching: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_FETCH_ERROR:
            return {
                ...state,
                isFetchError: action.payload
            }
        case SET_SORT_REPOS:                                               
            return {
                ...state,
                items: action.payload === 'name' ?  [...state.items].sort((a,b) => a[action.payload].localeCompare(b[action.payload]))
                :
                [...state.items].sort((a,b) => b[action.payload] - a[action.payload])
            }
        case SET_PER_PAGE: 
            return {
                ...state,
                perPage: action.payload
            }
        default: 
            return state 
    }
}

export const setPerPage = (page) => ({type: SET_PER_PAGE, payload: page})
export const setSortRepos = (sort) => ({type: SET_SORT_REPOS, payload: sort});

export const setRepos = (repos) => ({type: SET_REPOS, payload: repos});
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool});
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, payload: page});
export const setFetchError = (bool) => ({type: SET_FETCH_ERROR, payload: bool});



