import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://zouzoumanagement.xyz/api/v1/food-storage';

const FoodStorageManager = () => {
  const [foodData, setFoodData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [newFood, setNewFood] = useState({
    name: '',
    type: '',
    measure: '',
    available: '',
    price: '',
  });

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setFoodData(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          alert(error.response.data.message);
          clearValidationErrors();
        } else if (error) {
          setValidationErrors(error.response.data);
        } else {
          setValidationErrors('An unexpected error occurred');
        }
      });
  }, []);

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const startEditing = (foodId) => {
    setEditingId(foodId);
  };

  const handleDeleteClick = (id) => {
    setDeletingId(id);
  };

  const confirmDelete = () => {
    axios
      .delete(`${API_URL}/${deletingId}`)
      .then(() => {
        const updatedFoodData = foodData.filter((food) => food.id !== deletingId);
        setFoodData(updatedFoodData);
        setDeletingId(null);
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          alert(error.response.data.message);
          clearValidationErrors();
        } else if (error) {
          setValidationErrors(error.response.data);
        } else {
          setValidationErrors('An unexpected error occurred');
        }
      });
  };

  const cancelDelete = () => {
    setDeletingId(null);
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleAddClick = () => {
    setAdding(true);
  };

  const handleAddFood = () => {
    axios
      .post(API_URL, newFood)
      .then((response) => {
        setFoodData([...foodData, response.data]);
        setAdding(false);
        setNewFood({
          name: '',
          type: '',
          measure: '',
          available: '',
          price: '',
        });
        clearValidationErrors();
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          alert(error.response.data.message);
          clearValidationErrors();
        } else if (error) {
          setValidationErrors(error.response.data);
        } else {
          setValidationErrors('An unexpected error occurred');
        }
      });
  };

  const clearValidationErrors = () => {
    setValidationErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFood({
      ...newFood,
      [name]: value,
    });
  };

  const handleSaveClick = (id) => {
    const foodToUpdate = foodData.find((food) => food.id === id);
    const updatedName = foodToUpdate.name;
    const updatedType = foodToUpdate.type;
    const updatedMeasure = foodToUpdate.measure;
    const updatedAvailable = foodToUpdate.available;
    const updatedPrice = foodToUpdate.price;

    axios
      .put(`${API_URL}/${id}`, {
        name: updatedName,
        type: updatedType,
        measure: updatedMeasure,
        available: updatedAvailable,
        price: updatedPrice,
      })
      .then(() => {
        const updatedFoodData = foodData.map((food) => {
          if (food.id === id) {
            return {
              ...food,
              name: updatedName,
              type: updatedType,
              measure: updatedMeasure,
              available: updatedAvailable,
              price: updatedPrice,
            };
          }
          return food;
        });
        clearValidationErrors();
        setFoodData(updatedFoodData);
        setEditingId(null);

        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          alert(error.response.data.message);
          clearValidationErrors();
        } else if (error) {
          setValidationErrors(error.response.data);
        } else {
          setValidationErrors('An unexpected error occurred');
        }
      });
  };

  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Measure</th>
            <th>Available</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodData.map((food) => (
            <tr key={food.id}>
              <td>
                {editingId === food.id ? (
                  <input
                    type="text"
                    name="name"
                    value={food.name}
                    onChange={(e) => {
                      const newFoodData = [...foodData];
                      const index = newFoodData.findIndex((i) => i.id === food.id);
                      if (index !== -1) {
                        newFoodData[index].name = e.target.value;
                        setFoodData(newFoodData);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(food.id)}>
                    {food.name}
                  </div>
                )}
              </td>

              <td>
                {editingId === food.id ? (
                  <input
                    type="text"
                    name="type"
                    value={food.type}
                    onChange={(e) => {
                      const newFoodData = [...foodData];
                      const index = newFoodData.findIndex((i) => i.id === food.id);
                      if (index !== -1) {
                        newFoodData[index].type = e.target.value;
                        setFoodData(newFoodData);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(food.id)}>
                    {food.type}
                  </div>
                )}
              </td>

              <td>
                {editingId === food.id ? (
                  <input
                    type="text"
                    name="measure"
                    value={food.measure}
                    onChange={(e) => {
                      const newFoodData = [...foodData];
                      const index = newFoodData.findIndex((i) => i.id === food.id);
                      if (index !== -1) {
                        newFoodData[index].measure = e.target.value;
                        setFoodData(newFoodData);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(food.id)}>
                    {food.measure}
                  </div>
                )}
              </td>

              <td>
                {editingId === food.id ? (
                  <input
                    type="text"
                    name="available"
                    value={food.available}
                    onChange={(e) => {
                      const newFoodData = [...foodData];
                      const index = newFoodData.findIndex((i) => i.id === food.id);
                      if (index !== -1) {
                        newFoodData[index].available = e.target.value;
                        setFoodData(newFoodData);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(food.id)}>
                    {food.available}
                  </div>
                )}
              </td>

              <td>
                {editingId === food.id ? (
                  <input
                    type="text"
                    name="price"
                    value={food.price}
                    onChange={(e) => {
                      const newFoodData = [...foodData];
                      const index = newFoodData.findIndex((i) => i.id === food.id);
                      if (index !== -1) {
                        newFoodData[index].price = e.target.value;
                        setFoodData(newFoodData);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(food.id)}>
                    {food.price}
                  </div>
                )}
              </td>

              <td>
                {editingId === food.id ? (
                  <>
                    <button onClick={() => handleSaveClick(food.id)} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
                      <i className="material-icons left small">save</i>
                    </button>
                    <button onClick={handleCancelClick} className="waves-effect waves-light btn">
                      <i className="material-icons left small">cancel</i>
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(food.id)} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
                      <i className="material-icons left small">edit</i>
                    </button>
                    <button onClick={() => handleDeleteClick(food.id)} className="waves-effect waves-light btn">
                      <i className="material-icons left small">delete</i>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Food Storage Manager</h1>
      {Object.keys(validationErrors).length > 0 && (
        <div className="validation-errors">
          <ul>
            {Object.keys(validationErrors).map((field) => (
              <li key={field}>{validationErrors[field]}</li>
            ))}
          </ul>
        </div>
      )}

      {adding ? (
        <div>
          <button onClick={() => { setAdding(false); clearValidationErrors() }} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
            <i className="material-icons left">cancel</i>Cancel
          </button>
          <button onClick={handleAddFood} className="waves-effect waves-light btn">
            <i className="material-icons left">add</i>Add
          </button>
          <input type="text" placeholder="Name" name="name" value={newFood.name} onChange={handleInputChange} />
          <select
            name="type"
            value={newFood.type}
            onChange={handleInputChange}
          >
            <option value="">Select Type</option>
            <option value="meat">Meat</option>
            <option value="plant">Plant</option>
            <option value="drug">Drug</option>
          </select>
          <select
            name="measure"
            value={newFood.measure}
            onChange={handleInputChange}
          >
            <option value="">Select Measure</option>
            <option value="kilogram">Kilogram</option>
            <option value="pill">Pill</option>
          </select>
          <input type="text" placeholder="Available" name="available" value={newFood.available} onChange={handleInputChange} />
          <input type="text" placeholder="Price" name="price" value={newFood.price} onChange={handleInputChange} />
        </div>
      ) : (
        <>
          <button className="waves-effect waves-light btn add-button" onClick={handleAddClick} style={{ marginRight: '10px' }}>
            <i className="material-icons left">add</i>Add
          </button>
          {renderTable()}
        </>
      )}
      {deletingId && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this food item?</p>
          <button onClick={confirmDelete} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
            <i className="material-icons left small">check</i>Yes
          </button>
          <button onClick={cancelDelete} className="waves-effect waves-light btn">
            <i className="material-icons left small">cancel</i>No
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodStorageManager;
