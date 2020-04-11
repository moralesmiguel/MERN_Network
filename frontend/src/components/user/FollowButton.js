import React, {Component} from 'react';
import {follow, unfollow} from "./apiUser";

class FollowButton extends Component {
    followClick=()=>{
        this.props.onButtonClick(follow);
    };

    unfollowClick=()=>{
        this.props.onButtonClick(unfollow);
    };

    render(){
        return (
            <div className="d-inline-block">
                {
                    !this.props.following ? (
                        <button onClick={this.followClick} className="btn btn-outline-info btn-sm mr-3">Follow</button>
                    ) : (
                        <button onClick={this.unfollowClick} className="btn btn-outline-danger btn-sm">Unfollow</button>
                    )
                }
            </div>
        );
    }
}

export default FollowButton