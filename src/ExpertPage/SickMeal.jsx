import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddFood from './AddFood';
import './AddFood.css';
import { Link, Routes } from 'react-router-dom';

function formatLocalDateTime(localDateTime) {
  const [year, month, day, hours, minutes, seconds, milliseconds] = localDateTime;

  const formattedDate = `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return `${formattedDate} ${formattedTime}`;
}

const SickMeal = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mealData, setMealData] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [newFood, setNewFood] = useState({
    name: "",
    weight: ""
  });
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
        if (response.data) {
          if (Array.isArray(response.data) || typeof response.data === 'object') {
            const apiData = Array.isArray(response.data)
              ? response.data.map((item) => ({
                ...item,
                dateTime: item.dateTime ? formatLocalDateTime(item.dateTime) : null,
              }))
              : { ...response.data, dateTime: formatLocalDateTime(response.data.dateTime) };

            setMealData(apiData);
            setError("");
          } else {
            setError("Response data is not in an expected format.");
          }
        } else {
          alert("There is no meal for this cage");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred while fetching data.");
        }
        console.error(error);
      });

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

  const handleDeleteClick = (id) => {
    const deleteFoodAPI = `https://zouzoumanagement.xyz/api/v1/meal/food/${id}`
    axios.delete(deleteFoodAPI)
      .then(() => {
        const updatedMealData = mealData.haveFood.filter((food) => food.id !== id);
        setMealData({
          ...mealData,
          haveFood: updatedMealData,
        });
        alert("Delete successfully");
      })
      .catch((error) => {
        console.error('Error delete:', error);
      });
  };

  const handleSaveClick = (id) => {
    const updatedName = newFood.name;
    const updatedWeight = newFood.weight;
    const updateFoodAPI = `https://zouzoumanagement.xyz/api/v1/meal/${id}`;

    axios.put(updateFoodAPI, {
      name: updatedName,
      weight: updatedWeight
    })
      .then(() => {
        const updatedFoodData = mealData.haveFood.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              name: updatedName,
              weight: updatedWeight
            };
          }
          return item;
        });
        alert("Update successfully");
        setMealData({
          ...mealData,
          haveFood: updatedFoodData
        });
        setEditingId(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleConfirmCreate = (mealData) => {
    const confirmAPI = `https://zouzoumanagement.xyz/api/v1/meal/${mealData.id}`
    axios.post(confirmAPI)
      .then(() => {
        alert("Create Successfully");

        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error);
      })
  }

  const handleInputChange = (id, name, e) => {
    const newWeight = e.target.value;
    setNewFood({
      id: id,
      name: name,
      weight: newWeight,
    });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleEditClick = (id) => {
    setEditingId(id);
  };

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
              <button onClick={() => handleCreateMeal(item)} className="btn waves-effect waves-light">
                  <i className="material-icons left">add</i>Create Meal
                </button> <br />
                <button onClick={() => handleViewMeal(item)} className="btn waves-effect waves-light">
                  <i className="material-icons left">restaurant_menu</i>View Meal
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mealData && (
        <div>
          <h2>{mealData.name}</h2>
          <h2>Last Created: {mealData.dateTime}</h2>
          <table>
            <thead>
              <th>ID</th>
              <th>Name</th>
              <th>Weight</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {mealData.haveFood.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    {editingId === item.id ? (
                      <input type='text' name='foodWeight' defaultValue={item.weight} onChange={(e) => handleInputChange(item.id, item.name, e)} />
                    ) : item.weight}
                  </td>
                  <td>
                    {editingId === item.id ? (
                      <>
                        <button onClick={() => handleSaveClick(item.id)} className="btn waves-effect waves-light">
                          <i className="material-icons left">save</i>Save
                        </button> |
                        <button onClick={handleCancelClick} className="btn waves-effect waves-light">
                          <i className="material-icons left">cancel</i>Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(item.id)} className="btn waves-effect waves-light">
                          <i className="material-icons left">edit</i>Edit
                        </button> |
                        <button onClick={() => handleDeleteClick(item.id)} className="btn waves-effect waves-light">
                          <i className="material-icons left">delete</i>Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to='/expert/addFood' state={{ mealData }}>
            <button className="btn waves-effect waves-light">
              <i className="material-icons left">add</i>Add Food
            </button>
          </Link><br />
          <button onClick={() => handleConfirmCreate(mealData)} className="btn waves-effect waves-light">
            <i className="material-icons left">check_circle</i>Confirm create meal
          </button>
        </div>
      )}
    </div>
  );
};

export default SickMeal;
