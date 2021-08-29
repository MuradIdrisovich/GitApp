import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCurrentRepo, getContributors } from '../actions/repos';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { setIsFetching } from '../../reducers/reposReducer'
import './card.less'

function Card(props) {
    const {username, reponame} = useParams();                                   
    const [repo, setRepo] = useState({owner: {}});
    const [contributors, setContributors] = useState([])
    const isFetching = useSelector(state => state.repos.isFetching);

    // console.log(username,reponame);

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getCurrentRepo(username, reponame, setRepo));
        getContributors(username, reponame, setContributors);
    }, [])


    return (
        <div>
            {
                isFetching === false 
                ?
                <>
                <button style={{marginTop:'2px'}} onClick={() => props.history.goBack()} className="btn btn-dark">Back</button>
                <div className="card">
                    <div className="card-header">
                        <img src={repo.owner.avatar_url} alt=''/>
                        <div className='stars'> Stars: {repo.stargazers_count}</div>
                    </div>
                    <div className='card-description'>
                        <div className="name">{repo.name}</div>
                        <div className='description'>Description: {repo.description}</div>
                        <div className="name-contributors"> Contributors:</div>
                        {contributors.map((c, index) => 
                            <div className="name-contributor" key={c.login}>{index+1}. {c.login}</div>
                        )}
                    </div>
                </div>
                </>       

                :
                // <div className='fetching'></div> 
                <>
                    <button style={{marginTop:'2px'}} onClick={() => props.history.goBack()} className="btn btn-dark">Back</button>

                    <div className="card placeholder-glow">
                        <div className="card-header">
                            <img className='placeholder' alt=''/>
                            <div className='card-header-stars placeholder col-1'></div>
                        </div>

                        <div className='card-description'>
                            <span><div className="name placeholder col-2 placeholder-md"></div></span>
                            <span><div className=" placeholder col-4 placeholder-sm"></div></span>

                            <span><div className='description placeholder col-1 placeholder-sm'></div></span>                         
                            <span><div className='description placeholder col-2 placeholder-sm'></div></span>
                            <span><div className="name-contributors placeholder col-3 placeholder-sm"></div></span>
                            <span><div className="name-contributor placeholder col-2 placeholder-sm" ></div></span>
                            <span><div className="name-contributor placeholder col-2 placeholder-sm" ></div></span>  
                            <span><div className="name-contributor placeholder col-3 placeholder-sm" ></div></span>                       

                        </div>   
                                
                    </div>
                </>
            }

                {/* <>
                    <button style={{marginTop:'2px'}} onClick={() => props.history.goBack()} className="btn btn-dark">Back</button>

                    <div className="card placeholder-glow">
                        <div className="card-header">
                            <img className='placeholder' alt=''/>
                            <div className='card-header-stars placeholder col-1'></div>
                        </div>

                        <div className='card-description'>
                            <span><div className="name placeholder col-3 placeholder-md"></div></span>
                            <span><div className="name placeholder col-2 placeholder-md"></div></span>

                            <span><div className='description placeholder col-3 placeholder-sm'></div></span>                         
                            <span><div className='description placeholder col-2 placeholder-sm'></div></span>
                            <span><div className="name-contributors placeholder col-3 placeholder-sm"></div></span>
                            <span><div className="name-contributor placeholder col-3 placeholder-sm" ></div></span>
                            <span><div className="name-contributor placeholder col-3 placeholder-sm" ></div></span>                       

                        </div>   
                                
                    </div>
                </> */}
        </div>
    )
}

export default Card
