import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Div = styled.div `
    border: 1px solid black;
    padding: 2rem;
    margin: 0.5rem;
`

const UserCard = ({id, name, bio}) => {
    const deleteUser = () => {
        axios.delete(`http://localhost:5000/api/users/${id}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return  (
        <Div>
            <p>Id: {id}</p>
            <p>Name: {name}</p>
            <p>Bio: {bio}</p>
            <button onClick={deleteUser}>Delete User</button>
        </Div>
    );
}

export default UserCard;