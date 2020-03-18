import React, {Component} from 'react';
import {list} from './apiPost';
import defaultPostImage from '../images/postimg02.jpg';
import {Link} from 'react-router-dom';


class Posts extends Component {
    constructor() {
        super();
        this.state={
            posts: []
        };
    }

    componentDidMount(){
        list().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                this.setState({posts:data});
            }
        });
    }

    renderPosts = posts => {
        return (
            <div className="row">
            {posts.map((post, index) => {
                const posterId = post.author ? `/user/${post.author._id}` : "";
                const posterName = post.author ? post.author.name : "Unknown";
                return  (
                <div className="card col-md-4" key={index} >
                {/*<img className="card-img-top" src={`https://tranquil-temple-06509.herokuapp.com/user/picture/${user._id}`} onError={img => (img.target.src = `${avatar}`)} alt={user.name} style={{width:'100%', height:"15vw", objectFit:"cover"}} />*/}
                <div className="card-body">
                    <img className="img-thumbnail mb-3" src={`https://tranquil-temple-06509.herokuapp.com/post/picture/${post._id}`} 
                    alt={post.title} onError={img => (img.target.src = `${defaultPostImage}`)} 
                    style={{width:'100%', height:"200px"}} />


                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body.substring(0, 100)}</p>
                    <p className="font-italic mark">Posted by {" "}<Link to={`${posterId}`}>{posterName}{" "}</Link>
                    on {new Date(post.created).toDateString()}
                    </p>
                    <Link to={`/post/${post._id}`} className="btn btn-outline-info btn-sm">Read more</Link>
                </div>
                </div>
            );})}
        </div>
        );
    };

    render() {
        const {posts} = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">{!posts.length ? "No posts yet..." : "Recent Posts"}</h2>
                {this.renderPosts(posts)}
            </div>
        );
    }
}

export default Posts;