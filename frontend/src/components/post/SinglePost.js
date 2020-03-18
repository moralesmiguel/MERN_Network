import React, {Component} from 'react';
import {singlePost, remove} from './apiPost';
import defaultPostImage from '../images/postimg02.jpg';
import {Link, Redirect} from 'react-router-dom';
import {isAuthenticated} from '../auth/auth';

class SinglePost extends Component {
    state = {
        post: "",
        redirectHome: false
    }

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                this.setState({post:data});
            }
        });
    };

    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId, token).then(data=> {
            if(data.error) {
                console.log(data.error);
                alert("You're not authorized to delete someone else's post!");
            } else {
                this.setState({redirectHome: true});
            }
        });
    };

    confirmDelete = () => {
        let answer = window.confirm("Are you sure want to delete this post?");
        if(answer) {
            this.deletePost();
        }
    };

    renderPost = (post) => {
        const posterId = post.author ? `/user/${post.author._id}` : "";
        const posterName = post.author ? post.author.name : "Unknown";
        return (
            <div className="card-body"> 
                <img src={`https://tranquil-temple-06509.herokuapp.com/post/picture/${post._id}`} alt={post.title}
                    onError={i => (i.target.src = `${defaultPostImage}`)}
                    className="img-thumbnail mb-3"
                    style={{height:"200px"
                    }}/>
                <p className="card-text">{post.body}</p>
                <p className="font-italic mark">Posted by <Link to={`${posterId}`}>{posterName} </Link>
                    on {new Date(post.created).toDateString()}
                </p>
                <div className="d-inline-block">
                    <Link to={`/`} className="btn btn-raised btn-info btn-sm mr-5">
                        Back to posts
                    </Link>
                    {isAuthenticated().user && isAuthenticated().user._id && (
                    <>
                    <button onClick={this.confirmDelete} className="btn btn-raised btn-warning btn-sm mr-5">Delete Post</button>
                    </>
                    )}
                    {isAuthenticated().user && isAuthenticated().user.role === "admin" && (
                    <>
                    <button onClick={this.confirmDelete} className="btn btn-raised btn-danger btn-sm">
                    Admin Delete Post
                    </button>
                    </>)}
                </div>
            </div>
        );
    };

    render() {
        if (this.state.redirectHome) {return <Redirect to={`/`} />}

        const {post} = this.state;
        return (
            <div className="container">
                <h2>{post.title}</h2>
                {this.renderPost(post)}
            </div>
        );
    }
}

export default SinglePost;
