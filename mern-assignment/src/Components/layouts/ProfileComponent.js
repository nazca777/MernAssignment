import React, {Component} from 'react';
import axios from 'axios';

const ProfileComponent = ({user}) => {

    return(
        <div style={{
            textAlign: 'center',
            marginTop: '20px'
        }}>
            <h3 style={{fontWeight:'bold'}}>Your Profile</h3>
            
            <h3 style={{marginTop:'30px'}}>
                Hello, {user.name}
            </h3> 
            <h6>About You</h6>
            <div className="description">
            <h4 style={{
                backgroundColor: '#ecf0f1',
                marginRight: '30%',
                marginLeft: '30%',
                padding: '20px'
            }}>
                {user.description}
            </h4>
            </div>
            <br></br>
        </div>
    );

 }


export default ProfileComponent;