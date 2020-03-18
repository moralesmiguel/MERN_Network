import React, { Component } from "react";
import Posts from "../post/Posts";
import Users from "../user/Users";
import { isAuthenticated } from "../auth/auth";
import { Redirect } from "react-router-dom";
 
class Admin extends Component {
    state = {redirectToHome: false};
    //Even if non-admins know the url they won't be able to access the panel
    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }
    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <div className="jumbotron">
                    <h2>Admin Dashboard</h2>
                    <p className="lead">Welcome to the Admin Panel</p>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <hr />
                            <Posts />
                        </div>
                        <div className="col-md-6">
                            <hr />
                            <Users />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Admin;