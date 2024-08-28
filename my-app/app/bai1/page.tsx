"use client"
import React, { useEffect } from 'react';

export default function Page() {
  const [data, setData] = React.useState([]);

  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>List of Posts</h1>
      {data.map((item: any) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}
