import React, {Component} from 'react';
import {isAuthenticated} from '../auth/auth';
import { Redirect, Link } from 'react-router-dom';
import {read} from './apiUser';
import avatar from '../images/userdefaultavatar.png';
import DeleteUser from './DeleteUser';
import {listByUser} from "../post/apiPost";
import ProfileExtras from "../user/ProfileExtras";

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            user: "",
            redirectSignIn: false,
            posts: []
        };
    }
    //Get the user id along with the token
    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)
        .then(data => {
            if(data.error) {
                this.setState({redirectSignIn: true});
            } else {
                this.setState({user: data});
                this.loadPosts(data._id);
            }
        });
    };

    loadPosts = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then(data => {
            if(data.error)  {
                console.log(data.error);
            } else {
                this.setState({posts: data});
            }
        });
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }

    render() {
        const {redirectSignIn, user, posts} = this.state;
        if(redirectSignIn) return <Redirect to="/signin" />
        const pictureUrl = user._id ? `http://localhost:8080/user/picture/${user._id}?${new Date}.getTime()` : avatar;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-4">
                    <img className="card-img-top" src={pictureUrl} onError={img => (img.target.src = `${avatar}`)} alt={user.name} style={{width:'100%', height:"15vw", objectFit:"cover"}} />
                    </div>
                    <div className="col-md-8">
                    <div className="lead">
                            <p>Hello {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined since ${new Date(user.created).toDateString()}`}</p>
                        </div>
                    {isAuthenticated().user && isAuthenticated().user._id===user._id && (
                        <div className="d-inline-block mt-5">
                            <Link className="btn btn-raised btn-info mr-5" to={"/post/create"}>Create Post</Link>
                            <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}`}>Edit Profile</Link>
                        </div>
                    )}
                    {isAuthenticated().user &&
        isAuthenticated().user.role === "admin" && (
            <div class="card mt-5">
                <div className="card-body">
                    <h5 className="card-title">
                        Admin
                    </h5>
                    <p className="mb-2 text-danger">
                        Edit/Delete as an Admin
                    </p>
                    <Link
                        className="btn btn-raised btn-success mr-5"
                        to={`/user/edit/${user._id}`}
                    >
                        Edit Profile
                    </Link>
                    <DeleteUser userId={user._id} />
                </div>
            </div>
        )}
                    </div>
                </div>
                <div className="row">
                        <div className="col md-12">
                            <p className="lead">{user.about}</p>
                            <ProfileExtras posts={posts}/>
                        </div>
                </div>
            </div>
        );
    }
}

export default Profile;