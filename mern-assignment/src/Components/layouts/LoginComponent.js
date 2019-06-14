import React, {Component} from 'react';
import axios from 'axios';


export default class LoginComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        }
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }


    loggedIn = () => {
        this.props.loggedIn();
    }

    submitForm = () => {
        //create new object to user so we can try to log user in
        var logger = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('https://polar-garden-16426.herokuapp.com/users/login', logger)
            .then(res => {
                console.log(res.data);
                //localStorage.setItem("id", res.data._id);
                this.setState({
                    email: "",
                    password: ""
                });
                console.log(res.status);
                if(res.status==200) {
                    localStorage.setItem("id", res.data._id);
                    this.loggedIn();
                } else if (res.status==400) {
                    //display error/error handling
                    console.log('error here');
                }
            })

    }

    changeState = () => {
        this.props.signup();
    }

    render() {
        return (
                <div className="contain">
                    <h4 style={{textAlign:'center'}}>Login</h4>
                <form className="col s9" onSubmit={this.submitForm}>
                    <div className="input-field col s8">
                        <input placeholder="Email" type="text" onChange={this.onChangeEmail}/>
                    </div>
                    <div className="input-field col s8">
                        <input placeholder="Password" type="password" onChange={this.onChangePassword}/>
                    </div>
                    <a className="waves-effect waves-light btn-large red"
                    onClick={this.submitForm}>Submit</a>
                    <a className="waves-effect waves-light btn-large indigo lighten-1"
                    onClick={this.props.signup}>Signup</a>
                </form>
            </div>
        );
    }
}