import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

//USER COMPONENT
//creating a seperate stateless component to hold data, so this is reusable if we ever need to use it again, in
//that case I would extract it into a seperate file
const User = props => (
    <React.Fragment>
        <tbody>
          <tr>
            <td>{props.user.name}</td>
            <td>{props.user.description}</td>
          </tr>
        </tbody>
    </React.Fragment>
);

export default class UsersList extends Component {

    constructor(props) {
        super(props);
        //this state will hold all of the users we get from our Mongodb
        this.state = {users: []}
    }

    componentDidMount() {
        //get the users from our express server and populate our states user array
        axios.get('https://polar-garden-16426.herokuapp.com/users/')
            .then(response => {
                //set our todos array state with this data
                this.setState({users: response.data});
                
            }).catch(function(err) {
                console.log(err);
            });
    }

    //for every user item we will return the stateless function component to our ui
    usersList() {
        return this.state.users.map((user,i)=> {
            return <User user={user}  key={i}/>
        });
    }

    render() {
        return (
            <div className="container">
              <table>
              <thead>
          <tr>
              <th>Name</th>
              <th>Description</th>
          </tr>
        </thead>
                {this.usersList()}
              </table>
            </div>
        );
    }
}


