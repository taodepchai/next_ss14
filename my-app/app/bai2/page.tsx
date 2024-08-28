"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';

export default function Page() {
  const [data, setData] = React.useState([]);

  const getData = () => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      {data.map((item: any) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>{item.price}</p>
          <img src={item.image} alt={item.title} width={200} height={200} />
        </div>
      ))}
    </div>
  );
}
