import React, {Component} from 'react';
import {isAuthenticated} from '../auth/auth';
import {read, update, updateUserHeaderName} from './apiUser';
import { Redirect } from 'react-router-dom';
import avatar from '../images/userdefaultavatar.png';

class EditProfile extends Component {

        constructor() {
            super();
            this.state={
                id: "",
                name: "",
                email: "",
                password: "",
                redirectProfile: false,
                error:"",
                loading: false,
                fileSize: 0,
                about: ""
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
                    this.setState({id: data._id, name: data.name, email: data.email, error:'', about:data.about});
                }
            });
        };
    
        componentDidMount() {
            this.userData = new FormData();
            const userId = this.props.match.params.userId;
            this.init(userId);
        }

        editValidation  = () => {
            const {name, email, password, fileSize} = this.state;
            if (fileSize > 100000) {
                this.setState({ error: "File size should be less than 100kb", loading: false});
                return false;
              }
            if (name.length === 0) {
                this.setState({ error: "Name is required", loading: false});
                return false;
              }
              if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                this.setState({error: "A valid email is required", loading: false});
                return false;
              }
              if (password.length >= 1 && password.length <= 5) {
                this.setState({
                  error: "Password must be at least 6 characters"
                });
                return false;
              }
              return true;
        };

        handleChange = name => event => {
            this.setState({error:""});
            const value = name === 'picture' ? event.target.files[0] : event.target.value;
            const fileSize = name === 'picture' ? event.target.files[0].size : 0; 
            this.userData.set(name, value);
            this.setState({[name]: value, fileSize});
        };
    
        handleSubmit = event => {
            event.preventDefault();
            this.setState({loading:true});
            if(this.editValidation()) {
                const userId = this.props.match.params.userId;
                const token = isAuthenticated().token;
                update(userId, token, this.userData)
                .then(data => {
                    if(data.error) {
                        this.setState({error: data.error});
                    } else if (isAuthenticated().user.role === "admin") {
                        this.setState({redirectProfile: true});
                    } else {updateUserHeaderName(data, ()=> {
                            this.setState({
                                redirectProfile: true
                            });
                        });
                    }
                });
            }
        };

    render() {
        const {id, name, email, password, redirectProfile, error, loading, about} = this.state;
        if(redirectProfile){
            return <Redirect to={`/user/${id}`} />;
        }
        const pictureUrl = id ? `https://tranquil-temple-06509.herokuapp.com/user/picture/${id}?${new Date}.getTime()` : avatar;
        
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
                <span className="alert alert-danger" style={{display:error ? "" : "none"}}>{error}</span>
                {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div>:""}
                <img className="STYLING PENDING" onError={img => (img.target.src = `${avatar}`)} src={pictureUrl} alt={name} />
                <form>
                <div className="form-group">
                        <label className="text-muted">Profile Picture</label>
                        <input onChange={this.handleChange("picture")} type="file" className="form-control" accept="image/*" />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} type="text" className="form-control"  value={name} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">About me</label>
                        <textarea onChange={this.handleChange("about")} type="text" className="form-control"  value={about} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
                    </div>
                    <button onClick={this.handleSubmit} className="btn btn-outline-success sign-in-btn">Update</button>
                </form>
            </div>
        );
    }
}

export default EditProfile;