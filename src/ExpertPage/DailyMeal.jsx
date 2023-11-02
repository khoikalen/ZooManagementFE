import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Email } from '@mui/icons-material';
import './AddFood.css'
import { Link } from 'react-router-dom';

function formatLocalDateTime(localDateTime) {
  const [year, month, day, hours, minutes, seconds, milliseconds] = localDateTime;

  const formattedDate = `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return `${formattedDate} ${formattedTime}`;
}

const DailyMeal = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mealData, setMealData] = useState(null);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null)
  const [newFood, setNewFood] = useState({
    name: "",
    weight: ""
  })

  useEffect(() => {

    const apiUrl = `https://zouzoumanagement.xyz/api/v2/cage/${localStorage.getItem("email")}`;


    axios.get(apiUrl)
      .then((response) => {
        const apiData = response.data;
        setData(apiData);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error);
      })
  }, []);

  const handleViewDetail = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  const handleViewMeal = (item) => {
    const viewDailyMealAPI = `https://zouzoumanagement.xyz/api/v1/food/daily-meal/${item.id}`
    axios.get(viewDailyMealAPI)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          if (Array.isArray(response.data) || typeof response.data === 'object') {
            const apiData = Array.isArray(response.data)
              ? response.data.map((item) => ({
                ...item,
                dateTime: item.dateTime ? formatLocalDateTime(item.dateTime) : null,
              }))
              : { ...response.data, dateTime: formatLocalDateTime(response.data.dateTime) };

          setMealData(apiData);
          alert("Scroll down to watch meal");
          setError("");
        } else {
          setError("Response data is not in an expected format.");
        }
        } else {
          alert("There is no meal for this cage");
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error);
      })
  }

  const handleCreateMeal = (item) => {
    const createDailyMealAPI = `https://zouzoumanagement.xyz/api/v1/meal/daily/${item.id}`
    axios.post(createDailyMealAPI)
      .then(() => {
        alert("Create successfully")
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error);
      })
  }

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

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleInputChange = (id, name, e) => {
    const newWeight = e.target.value;
    setNewFood({
      id: id,
      name: name,
      weight: newWeight,
    });
  };

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

  return (
    <div>
      <h1>Cage</h1>
      {error && <div className='error-message'>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Cage Status</th>
            <th>Cage Type</th>
            <th>Area Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.cageStatus}</td>
              <td>{item.cageType}</td>
              <td>{item.areaName}</td>

              <td>
              <button onClick={() => handleViewDetail(item)} className="btn waves-effect waves-light">
                  <i className="material-icons left">visibility</i>View Details
                </button><br />
                <button onClick={() => handleViewMeal(item)} className="btn waves-effect waves-light">
                  <i className="material-icons left">restaurant_menu</i>View Meal
                </button><br />
                <button onClick={() => handleCreateMeal(item)} className="btn waves-effect waves-light">
                  <i className="material-icons left">add</i>Create Meal
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
                         <button onClick={() => handleSaveClick(item.id)} className="btn waves-effect waves-light" style={{ marginRight: '10px' }}>
                          <i className="material-icons left">save</i>Save
                        </button> <br />
                        <button onClick={handleCancelClick} className="btn waves-effect waves-light">
                          <i className="material-icons left">cancel</i>Cancel
                        </button>
                      </>
                    ) : (
                      <>
                         <button onClick={() => handleEditClick(item.id)} className="btn waves-effect waves-light" style={{ marginRight: '10px' }}>
                          <i className="material-icons left">edit</i>Edit
                        </button> <br />
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

      {selectedItem && (
        <div>
          <h2>Chi tiết</h2>
          <p>ID: {selectedItem.id}</p>
          <p>Name: {selectedItem.name}</p>
          <p>Quantity: {selectedItem.quantity}</p>
          <p>Cage Status: {selectedItem.cageStatus}</p>
          <p>Cage Type: {selectedItem.cageType}</p>
          <p>Area Name: {selectedItem.areaName}</p>
          <p>Staff Email: {selectedItem.staffEmail}</p>
          <button onClick={handleCloseDetail} className="btn waves-effect waves-light">
            <i className="material-icons left">close</i>Đóng
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyMeal;
