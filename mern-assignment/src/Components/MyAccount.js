import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import LoginComponent from './layouts/LoginComponent';
import SignUpComponent from './layouts/SignUpComponent';
import ProfileComponent from './layouts/ProfileComponent';
import EditComponents from './layouts/EditComponent';

export default class MyAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            user: {},
            //this is for tracking our page state to switch to different components depending 
            //on user account state
            pageState: "login"
        }
    }
    //login will the id from local storage if user is logged in, and if so we will make our pagestate to profile
    //otherwise we will present login/signup page
    login = ()=> {
        var _id = localStorage.getItem('id');
        if(_id==null || _id=='null') {
            this.setState({
                id: 'null',
                user: {},
                pageState: "signup"
            })
            return;
        } else {
            this.setState({
                id: _id,
                pageState: "profile"
            })
            axios.get(`https://polar-garden-16426.herokuapp.com/users/${_id}`)
                .then(res => {
                    this.setState({
                        user: res.data
                    })
                })
        }
    }
    //login user by default
    componentDidMount() {
        this.login();
    }
    //log user out by clearing current user state and id value
    logout = () => {
        this.setState({
            id: 'null',
            user: {}
        })
        //reset localstorage data value as user is logged out
        localStorage.setItem("id", null);
    }

    loginState = () => {
        this.setState({
            pageState: 'login'});
    }

    profileState = () => {
        this.setState({
            pageState: 'profile'
        })
        this.login();
    }

    signupState = () => {
        this.setState({
            pageState: 'signup'
        })
    }

    editState = () => {
        this.setState({
            pageState: 'edit'
        })
    }

    render() {
        //show different components based on what the user is trying to accomplish using our pageState val,
        //login, signup, profile, edit 
        if(this.state.id=='null') {
            if(this.state.pageState=="login") {
                return (
                    <React.Fragment>
                        <LoginComponent loggedIn={this.profileState}
                        signup={this.signupState}/>
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <SignUpComponent signedUp={this.profileState}
                        login={this.loginState}/>
                    </React.Fragment>
                );
            }
        } else {
            if(this.state.pageState=='profile') {
                return (
                    <React.Fragment>
                        <ProfileComponent user={this.state.user}
                        loggedOut={this.logout}/>
    
                        <div className="button"
                        style={{
                            textAlign: 'center',
                            margin: 'auto'
                        }}>
                        <a className="waves-effect waves-light btn-large indigo lighten-1"
                        onClick={this.editState}>Edit</a>
                        <a className="waves-effect waves-light btn-large red"
                        onClick={this.logout}>Logout</a>
                        </div>
                    </React.Fragment>
                );
            } else {
                return (
                    <EditComponents profile={this.profileState} user={this.state.user}/>
                )
            }
        }
    }
}