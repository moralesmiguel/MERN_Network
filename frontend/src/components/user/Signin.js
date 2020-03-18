import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {signin, authenticate} from '../auth/auth';
import SocialLogin from "./SocialLogin";

class Signin extends Component {
    constructor(){
        super();
        this.state={
            email:"",
            password:"",
            error:"",
            redirect: false,
            loading: false
        };
    }
//This syntax allows to handle all three changes in one function
    handleChange = name => event => {
        this.setState({error:""});
        this.setState({[name]: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({loading:true})
        const {email, password} = this.state
        const user = {
            email,
            password
        };
        signin(user)
        .then(data => {
            if(data.error) {this.setState({error: data.error, loading: false});
            } else {
                authenticate(data, () => {
                    this.setState({redirect: true});
                });
                window.location.reload();
            }
        });
    };

    render() {
        const {email, password, error, redirect, loading} = this.state;

        if(redirect){
            return <Redirect to="/" />
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Sign in</h2>

                <div className="alert alert-danger" style={{display:error ? "" : "none"}}>{error}</div>
                {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div>:""}
                <SocialLogin />
                <form>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
                    </div>
                    <button onClick={this.handleSubmit} className="btn btn-outline-success sign-in-btn">Submit</button>
                </form>
            </div>
        );
    }
}

export default Signin;