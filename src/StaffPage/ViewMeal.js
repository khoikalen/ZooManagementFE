import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CageTable = () => {
  const [cageData, setCageData] = useState([]);
  const [mealData, setMealData] = useState(null);
  const [selectedCage, setSelectedCage] = useState(null);

  const formatDate = (dateArray) => {
    const [year, month, day, hour, minute, second, millisecond] = dateArray;
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hour}:${minute}:${second}.${millisecond}`;
    return formattedDate;
  };

  useEffect(() => {
    const apiUrl = `https://zouzoumanagement.xyz/api/v3/cage/${localStorage.getItem("email")}`;

    axios.get(apiUrl)
      .then((response) => {
        const cageData = response.data;
        setCageData(cageData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu GET đến API", error);
      });
  }, []);

  const handleViewDetail = (cage) => {
    setSelectedCage(cage);
    setMealData(null);
  };

  const handleViewMeal = (cageId) => {
    const mealApiUrl = `https://zouzoumanagement.xyz/api/v1/food/daily-meal/${cageId}`;

    axios.get(mealApiUrl)
      .then((response) => {
        const mealData = response.data;

        if (mealData && mealData.haveFood) {
          setMealData({
            id: mealData.id,
            dateTime: formatDate(mealData.dateTime),
            cageName: mealData.cageName,
            expertEmail: mealData.expertEmail,
            foodItems: mealData.haveFood.map((food) => ({
              id: food.id,
              name: food.name,
              quantity: food.quantity,
              measure: food.measure,
              description: food.description,
              foodStorageId: food.foodStorageId,
            })),
          });
        } else {
          setMealData(null);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu GET đến API Meal", error);
      });
  };

  return (
    <div>
      <h1>Thông Tin Khu Chuồng</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cageData.map((cage) => (
            <tr key={cage.id}>
              <td>{cage.id}</td>
              <td>{cage.name}</td>
              <td>
                <button onClick={() => handleViewDetail(cage)} className="btn waves-effect" style={{ marginRight: '10px' }}>
                  <i className="material-icons left small">visibility</i>Xem chi tiết
                </button>
                <button onClick={() => handleViewMeal(cage.id)} className="btn waves-effect">
                  <i className="material-icons left small">restaurant_menu</i>View Meal
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCage && (
        <div>
          <h2>Chi tiết</h2>
          <p>ID: {selectedCage.id}</p>
          <p>Name: {selectedCage.name}</p>
          <p>Quantity: {selectedCage.quantity}</p>
          <p>Cage Status: {selectedCage.cageStatus}</p>
          <p>Cage Type: {selectedCage.cageType}</p>
          <p>Area Name: {selectedCage.areaName}</p>
          <p>Staff Email: {selectedCage.staffEmail}</p>
        </div>
      )}
      {mealData && (
        <div>
          <h2>Thông Tin Bữa Ăn</h2>
          <p>ID: {mealData.id}</p>
          <p>Date Time: {new Date(mealData.dateTime).toLocaleString()}</p>
          <p>Cage Name: {mealData.cageName}</p>
          <p>Expert Email: {mealData.expertEmail}</p>
          <h3>Food Items</h3>
          <ul>
            {mealData.foodItems.map((food) => (
              <li key={food.id}>
                <p>ID: {food.id}</p>
                <p>Name: {food.name}</p>
                <p>Quantity: {food.quantity} {food.measure}</p>
                <p>Description: {food.description}</p>
                <p>Food Storage ID: {food.foodStorageId}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CageTable;
