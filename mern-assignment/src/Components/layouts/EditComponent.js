import React, {Component} from 'react';
import axios from 'axios';


export default class EditComponent extends Component{ 

    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            description: ""
        }
    }

    returnToProfile = () => {
        this.props.profile();
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    submitForm = (e) => {
        //grab our updated user and run request to update our mongodb
        var updatedUser = {
            name: this.state.name,
            description: this.state.description
        }

        axios.post(`https://polar-garden-16426.herokuapp.com/users/update/${this.props.user._id}`, updatedUser)
            .then(res => {
                console.log(res.data);
                this.returnToProfile();
            }).catch(err=>{
                console.log(err);
                //error here
            });
    }

    render() {
        return (
            <div>
                <a className="waves-effect waves-teal btn-flat"
                onClick={this.returnToProfile}>Return</a>

                <div className="edit">
                <div className="contain">
                    <h4 style={{textAlign:'center'}}>Edit Your Inforomation</h4>
                    <h5 style={{textAlign:'center'}}>This information will be updated for {this.props.user.email}</h5>
                <form>
                    <div className="input-field col s8">
                        <input placeholder="New name" type="text" onChange={this.onChangeName}/>
                    </div>
                    <div className="input-field col s8">
                        <input placeholder="New description" type="text" onChange={this.onChangeDescription}/>
                    </div>
                    <a className="waves-effect waves-light btn-large red"
                    onClick={this.submitForm}>Save</a>
                    </form>
                </div>
                </div>
            </div>
        );
    }

}