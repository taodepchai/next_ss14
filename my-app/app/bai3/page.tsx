"use client"
import axios from 'axios';
import React, { useEffect } from 'react';

export default async function Page() {


  async function getData(){
    const res = await axios.get("https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2024-08-11&end_date=2024-08-25&hourly=temperature_2m");
     return res.data
  };
 const data = await getData();
 console.log(data);
 
  return (
    <div>
      <h1>Thoi tiet</h1>
     
          <p>Nhiệt đo: {data.hourly.temperature_2m}°C</p>


    </div>
  );
}
