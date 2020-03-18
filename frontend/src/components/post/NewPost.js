import React, {Component} from 'react';
import {isAuthenticated} from '../auth/auth';
import {create} from './apiPost';
import { Redirect } from 'react-router-dom';

class NewPost extends Component {

        constructor() {
            super();
            this.state={
                title:"",
                body:"",
                picture:"",
                error:"",
                user:{},
                fileSize:0,
                loading: false,
                redirectProfile: false
            };
        }
    
        componentDidMount() {
            this.postData = new FormData();
            this.setState({user: isAuthenticated().user});
        }

        editValidation  = () => {
            const {title, body, fileSize} = this.state;
            if (fileSize > 100000) {
                this.setState({ error: "File size should be less than 100kb", loading: false});
                return false;
              }
            if (title.length === 0 || body.length === 0) {
                this.setState({ error: "All fields are required", loading: false});
                return false;
              }
              return true;
        };

        handleChange = name => event => {
            this.setState({error:""});
            const value = name === 'picture' ? event.target.files[0] : event.target.value;
            const fileSize = name === 'picture' ? event.target.files[0].size : 0; 
            this.postData.set(name, value);
            this.setState({[name]: value, fileSize});
        };
    
        handleSubmit = event => {
            event.preventDefault();
            this.setState({loading:true});
            if(this.editValidation()) {
                const userId = isAuthenticated().user._id;
                const token = isAuthenticated().token;
                create(userId, token, this.postData)
                .then(data => {
                    if(data.error) this.setState({error: data.error});
                        else {
                            this.setState({loading:false, title:"", body:"", picture:"", redirectProfile: true});
                        }
                });
            }
        };

    render() {
        const {title, body, user, error, loading, redirectProfile} = this.state;
        if(redirectProfile){
            return <Redirect to={`/user/${user._id}`} />;
        }
        
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create a new post</h2>
                <span className="alert alert-danger" style={{display:error ? "" : "none"}}>{error}</span>
                {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div>:""}
                <form>
                <div className="form-group">
                        <label className="text-muted">Image</label>
                        <input onChange={this.handleChange("picture")} type="file" className="form-control" accept="image/*" />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Title</label>
                        <input onChange={this.handleChange("title")} type="text" className="form-control"  value={title} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Body</label>
                        <textarea onChange={this.handleChange("body")} type="text" className="form-control"  value={body} />
                    </div>
                    <button onClick={this.handleSubmit} className="btn btn-outline-success sign-in-btn">Create Post</button>
                </form>
            </div>
        );
    }
}

export default NewPost;