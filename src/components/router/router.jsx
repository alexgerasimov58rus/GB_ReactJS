
import { Switch, Route } from 'react-router-dom'
import React from 'react';
import {Layout} from "@components/layout";
import {Profile} from "@components/profile";

export class Router extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/chat' component={ Layout } />
                <Route exact path='/profile' component={ Profile } />
                <Route
                    exact
                    path='/chat/:chatId/'
                    render={ obj => <Layout
                        chatId={ Number(obj.match.params.chatId) }
                    />
                    }
                />
                <Route
                    exact
                    path = "*"
                    component={()=>(
                        <h1>404</h1>
                    )}>
                </Route>
            </Switch>
        )
    };
}