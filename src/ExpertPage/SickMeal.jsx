import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddFood from './AddFood';
import './AddFood.css';
import { Link, Routes } from 'react-router-dom'; 

const SickMeal = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mealData, setMealData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    
    const apiUrl = `https://zouzoumanagement.xyz/api/v3/animal/${localStorage.getItem("email")}`;

    
    axios.get(apiUrl)
      .then((response) => {
        
        const apiData = response.data;

        setData(apiData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu GET đến API", error);
      });
  }, []);

  const handleViewMeal = (item) => {
    const viewMealAPI = `https://zouzoumanagement.xyz/api/v1/food/sick-meal/${item.id}`
    
    axios.get(viewMealAPI)
    .then((response) => {
      setMealData(response.data);
      setError("");
    })
    .catch(error => {
      setError(error.response.data.message);
      console.log(error);
    })
  };
  
  const handleCreateMeal = (item) => {
    const createMealAPI = `https://zouzoumanagement.xyz/api/v1/meal/sick/${item.id}`;

    axios.post(createMealAPI)
    .then((response) => {
      alert("Create successfully")
      setError("");
    })
    .catch((error) => {
      setError(error.response.data.message);
      console.log(error);
    })
  }

  return (
    <div>
      <h1>Sick Animal</h1>
      {error && <div className='error-message'>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of birth</th>
            <th>Specie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.dob}</td>
              <td>{item.specie}</td>
              <td>
                <button onClick={() => handleViewMeal(item)}>View Meal</button> |
                <button onClick={() => handleCreateMeal(item)}>Create Meal</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mealData && (
        <div>
          <h2>{mealData.name}</h2>
          <table>
            <thead>
              <th>ID</th>
              <th>Name</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {mealData.haveFood.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to='/expert/addFood' state={{ mealData }}>Add Food</Link>
        </div>
      )}
    </div>
  );
};

export default SickMeal;
  