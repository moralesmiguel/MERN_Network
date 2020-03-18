import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/base/Home';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import Menu from './components/base/Menu';
import Profile from './components/user/Profile';
import Users from './components/user/Users';
import EditProfile from './components/user/EditProfile';
import NewPost from './components/post/NewPost';
import PrivateRoute from './components/auth/PrivateRoute';
import SinglePost from './components/post/SinglePost';
import Admin from './components/admin/Admin';

const Router = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/post/create" component={NewPost} />
            <PrivateRoute exact path="/admin" component={Admin} />
            <Route exact path="/post/:postId" component={SinglePost} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
        </Switch>
    </div>
);

export default Router;