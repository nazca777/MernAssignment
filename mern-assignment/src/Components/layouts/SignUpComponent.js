import React, {Component} from 'react';
import axios from 'axios';

export default class SignUpComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            email: "",
            password: "",
            name: "",
            image: "ihi",
            description: ""
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

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDesciption = (e) => {
        this.setState({
            description: e.target.value
        });
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    submitForm = (e) => {
        e.preventDefault();
        console.log(this.state.name);
        console.log(this.state.description);

        if(this.state.email!='' || this.state.name!='' || this.state.password!='') {
            const newUser = {
                email: this.state.email,
                name: this.state.name,
                description: this.state.description,
                image: 'test',
                password: this.state.password
            }
    
            axios.post('https://polar-garden-16426.herokuapp.com/users/add', newUser)
                .then(res => {
                    console.log(res.data);
                    localStorage.setItem("id", res.data._id);
                    this.setState({
                        email: "",
                        name: "",
                        description: "",
                        image: "",
                        password: ""
                    });
                    this.signedUpp();
                }).catch(err=>{
                    //error handling here
                    console.log(err);
                });
        } else {
            alert('Please fill out all information...');
        }

    }

    signedUpp = () => {
        this.props.signedUp();
    }

    pageChanged = () => {
        this.props.login();
    }


    render() {
        return (
                <div className="contain">
                    <h4 style={{textAlign:'center'}}>Sign Up</h4>
                <form className="col s9" onSubmit={this.submitForm}>
                    <div className="input-field col s8">
                        <input placeholder="Email" type="text" onChange={this.onChangeEmail}/>
                    </div>
                    <div className="input-field col s8">
                        <input placeholder="Password" type="password" onChange={this.onChangePassword}/>
                    </div>
                    <div className="input-field col s8">
                        <input placeholder="Your Name" type="text" onChange={this.onChangeName}/>
                    </div>
                    <div className="input-field col s8" onChange={this.onChangeDesciption}>
                        <input placeholder="Description" type="text"/>
                    </div>
                    <a className="waves-effect waves-light btn-large red"
                    onClick={this.submitForm}>Submit</a>
                    <a className="waves-effect waves-light btn-large indigo lighten-1"
                    onClick={this.pageChanged}>Login</a>
                </form>
                </div>
        );
    }
}




