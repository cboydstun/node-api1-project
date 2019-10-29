import React, {useState} from 'react';
import axios from 'axios';
import UserForm from './components/userForm';
import UserCard from './components/userCard';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const updateUsers = () => {
    axios.get(`http://localhost:5000/api/users`)
    .then(res => {
      setUsers(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="App">
      <UserForm/>
      <button onClick={updateUsers}>Get Users</button>
      {users && users.map(user => <UserCard key={user.id} name={user.name} bio={user.bio} id={user.id}/>)}
    </div>
  );
}

export default App;