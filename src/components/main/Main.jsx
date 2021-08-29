import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setCurrentPage, setRepos, setSortRepos, setPerPage } from '../../reducers/reposReducer';
import { createPages } from '../../utils/pagesCreator';
import { getRepos } from '../actions/repos';
import './main.less';
import Repo from './repo/Repo';
import RepoPlaceholder from './repo/RepoPlaceholder';
import MySelect from '../select/MySelect';


function Main() {
    const dispatch = useDispatch();
    const repos = useSelector(state => state.repos.items);                        
    const isFetching = useSelector(state => state.repos.isFetching);
    const currentPage = useSelector(state => state.repos.currentPage);
    const totalCount = useSelector(state => state.repos.totalCount);
    const perPage = useSelector(state => state.repos.perPage);
    const isFetchError = useSelector(state => state.repos.isFetchError);
    const [searchValue, setSearchValue] = useState('');
    const pagesCount = Math.ceil(totalCount/perPage); 
    const pages = [];
    const options = [ 
        {value: 'name', name: 'по названию'}, 
        {value: 'stargazers_count', name: 'по звездам'}
    ]
    const [selectedSort, setSelectedSort] = useState('')
    const [selectedPages, setSelectedPages] = useState('')

    let perPage2 = perPage;
    const placeholderArr = [];
    let i = 0;
    while(perPage2 > 0){
        i++;
        placeholderArr.push(i);
        perPage2 = perPage2 - 1
    }

    createPages(pages, pagesCount, currentPage);

    useEffect(() => {
        dispatch(getRepos(searchValue, currentPage, perPage))
    }, [currentPage, perPage])

    function searchHandler(){
        dispatch(setCurrentPage(1))                                
        dispatch(getRepos(searchValue, currentPage, perPage))
    }
    function searchHandlerKey(event) {
        if(event.key === 'Enter'){
            dispatch(setCurrentPage(1))
            dispatch(getRepos(searchValue, currentPage, perPage))
        }
    }
    // if(isFetchError){
    //     return <Redirect to='/error'/>
    // }
    const sortPosts = (sort) => {
        console.log(sort)   
        setSelectedSort(sort)       
        dispatch(setSortRepos(sort))
    }
    const sortPages = (value) => { 
        setSelectedPages(value)       
        dispatch(setPerPage(value))
    }
    console.log(placeholderArr)

    return (
        <div>
            {
                isFetchError &&
                <div class="alert alert-danger" role="alert">
                    Произошла ошибка!
                </div>
            }

            <div className="search">
                <input 
                value={searchValue} 
                onChange={(e) => setSearchValue(e.target.value)} type="text" 
                onKeyPress={(event)=>searchHandlerKey(event)}
                placeholder="Input repository name here! (default query - user:MuradIdrisovich)" className="search-input"></input>
                <button className="btn btn-primary"onClick={() => searchHandler()} >Search</button>
            </div>

            <MySelect
                value={selectedSort}
                onChangeHello={sortPosts}
                defaultValue='Сортировать репозитории по:'
                options={options}
            />
        
            <MySelect
                value={selectedPages}
                onChangeHello={sortPages}
                defaultValue='Кол-во репозиториев на странице:'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 20, name: '20'},
                    {value: -1, name: 'показать все'}
                ]}
            />

            {
                isFetching === false
                ?
                repos.map(repo => <Repo key={repo.id} repo={repo} />)
                :
                placeholderArr.map(repo => <RepoPlaceholder key={repo}  />)                               
            }
            
            <ul className="pages pagination justify-content-center">
                <li className={currentPage == 1 ? 'page-item disabled' : 'page-item'}><a className="page-link" 
                onClick={() => dispatch(setCurrentPage(currentPage < 2 ? currentPage=1 : currentPage - 1)) }>Prev</a></li>

                {pages.map((page, index) => <li
                key={index} 
                className={currentPage == page ? 'current-page page-link':'page-link'}
                onClick={() => dispatch(setCurrentPage(page))}>{page}</li>)}

                <li className="page-item"><a className="page-link"
                onClick={() => dispatch(setCurrentPage(currentPage + 1)) }>Next</a></li>
            </ul>
            
        </div>
    )
}

export default Main
