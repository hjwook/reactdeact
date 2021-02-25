import React, { useRef,useState, useMemo } from 'react';

import UserList from './1-16-UserList'; 
import CreateUser from './1-14-CreateUser'; 

function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user=>user.active).length;
}

function App() {

  const[inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const {username, email } = inputs;
  
  const onChange = e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active:false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active:false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers([...users,user]);
    setInputs({
      username:'',
      email:''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    setUsers(users.filter(user =>user.id!==id));
  };
  const onToggle = id => {
    setUsers(users.map(user=>
      user.id===id?{...user, active:!user.active}:user
      )
      );
  };// to hard 

  //const count = countActiveUsers(users);
  const count = useMemo(()=>countActiveUsers(users),[users]);
  return (
          <>
            <CreateUser 
              username={username}
              email={email}
              onChange={onChange}
              onCreate={onCreate}
            /> 
            <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
            <div>활성사용자 수 : {count} </div>
          </>
  );
}

export default App;