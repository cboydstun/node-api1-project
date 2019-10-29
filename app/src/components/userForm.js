import React, {useState} from 'react';
import {useInput} from '../hooks/useInput';
import styled from 'styled-components';
import axios from 'axios';

const Form = styled.form `
    display: flex;
    flex-direction: column;
    max-width: 250px;
`

const UserForm = () => {
    const [name, setName, handleName] = useInput('');
    const [bio, setBio, handleBio] = useInput('');
    const [id, setId, handleId] = useInput('');
    const [action, setAction] = useState('post');


    const handleSubmit = e => {
        e.preventDefault();

        if(action === 'post'){
            axios.post('http://localhost:5000/api/users', {name, bio})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }else{
            axios.put(`http://localhost:5000/api/users/${id}`, {name, bio})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }

        setName('');
        setBio('');
        setId('');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <select value={action} onChange={e => setAction(e.target.value)}>
                <option value='post'>POST</option>
                <option value='put'>PUT</option>
            </select>
            {action === 'put' && <input type='text' placeholder='Id' value={id} onChange={e => handleId(e.target.value)} required/>}
            <input type='text' placeholder='Name' value={name} onChange={e => handleName(e.target.value)} required/>
            <input type='textarea' placeholder='Bio' value={bio} onChange={e => handleBio(e.target.value)} required/>
            <button type='submit'>Submit</button>
        </Form>
    );
}

export default UserForm;