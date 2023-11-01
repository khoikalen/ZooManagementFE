import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import "./AddFood.css";
import { Link } from 'react-router-dom';

function AddFood() {
  const location = useLocation();
  const { state } = location;
  const [foodStorageData, setFoodStorageData] = useState(null);
  const [typeOfFood, setTypeOfFood] = useState("meat");
  const [food, setFood] = useState({
    name: "",
    weight: "",
  })
  const [error, setError] = useState("");
  const data = state.mealData;

  useEffect(() => {
    const apiGetFoodStorage = `https://zouzoumanagement.xyz/api/v1/food-storage/${typeOfFood}`;

    axios.get(apiGetFoodStorage)
      .then((response) => {
        setFoodStorageData(response.data);
        setError("");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          console.error("Error at get food storage", error);
        }
      });
  }, [typeOfFood]);

  const handleTypeOfFood = (e) => {
    setTypeOfFood(e.target.value);
  }

  const handleAddFood = (itemId, itemName) => {
    const quantityToAdd = document.querySelector(`#quantityToAdd_${itemId}`).value;
    setFood({
      name: itemName,
      weight: quantityToAdd
    });
    const addFoodAPI = `https://zouzoumanagement.xyz/api/v1/food/${data.id}`
    axios.post(addFoodAPI, food)
      .then((response) => {
        alert("Add Successfully");
        window.location.reload();
        setError("");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          console.log(error);
        }
      })
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <div className='container'>
        <Link to="/expert" className='go-back'>Go back to expert page</Link>
        <br/>
        <label htmlFor="typeOfFood">Type of Food</label>
        <select id="typeOfFood" onChange={handleTypeOfFood}>
          <option value="meat">Meat</option>
          <option value="plant">Plant</option>
          <option value="medicine">Medicine</option>
        </select>
        {error && <div className='error-message'>{error}</div>}
        {foodStorageData && (
          <table>
            <thead>
              <th>Id</th>
              <th>Name</th>
              <th>Type of Food</th>
              <th>Available Quantity</th>
              <th>Quantity to add</th>
              <th>Add</th>
            </thead>
            <tbody>
              {foodStorageData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.available}</td>
                  <td><input type='number' id={`quantityToAdd_${item.id}`} /></td>
                  <td><button onClick={() => handleAddFood(item.id, item.name)}>Add</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AddFood;
