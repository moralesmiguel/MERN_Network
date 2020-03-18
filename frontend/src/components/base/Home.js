import React from 'react';
import Posts from '../post/Posts';

const Home = () => (
    <div>
        <div className="jumbotron jumbotron-fluid">
        <div className="container">
        <h2 className="home-heading">Welcome to Corp's Board</h2>
            <p className="home-heading">Feel free to read, sign in and post an announcement, event, or anything you want to share with your colleagues.</p>
        </div>
        </div>
        <div className="container">
            <Posts />
        </div>
    </div>
);

export default Home;