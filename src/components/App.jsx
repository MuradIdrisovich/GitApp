import React from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Route } from 'react-router'
import Main from './main/Main';
import Card from './card/card';
import Error from './main/Error'
import './app.less';

function App() {
    const dispatch = useDispatch();
    
    return (
        <BrowserRouter>                               
            <div className="container">
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route path='/card/:username/:reponame' component={Card}/>    
                    <Route path='/error' component={Error}/>                      
                    <Redirect to='/'/> 
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App
