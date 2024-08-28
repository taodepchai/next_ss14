"use client"
import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersResponse, todosResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/todos')
        ]);

        const usersData = await usersResponse.json();
        const todosData = await todosResponse.json();

        setUsers(usersData);
        setTodos(todosData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
      <div>
      <ul>
        {users.map(user => (
            <div>
                <h1>Users</h1>
                  <h2 key={user.id}>{user.name}</h2>
          <h1>Todos</h1>
          {todos.map(todo => (
              <li key={todo.id}>
                {todo.title}
              </li>
            ))}
            </div>
        
        ))}
      </ul>
    </div>
  );
}
