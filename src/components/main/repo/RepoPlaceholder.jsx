import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


import './repo.less';

function RepoPlaceholder(props) {
    const repo = props.repo
    const isFetching = useSelector(state => state.repos.isFetching);
    
    return (

        <div>

            <div className="repo placeholder-wave">
                    <div className="repo-header placeholder-glow">
                        <div className="repo-header-name placeholder col-3 placeholder-sm bg-primary"></div>
                        <div className="repo-header-stars placeholder col-1 placeholder-sm"></div>
                    </div>
                    <span><div className="repo-last-commit placeholder col-4 placeholder-sm"></div></span>
                    <span><div className="repo-link  placeholder col-5 placeholder-lg bg-primary"></div></span>
            </div>
        
        </div>

    )
}

export default RepoPlaceholder
