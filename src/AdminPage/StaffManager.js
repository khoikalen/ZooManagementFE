import React, { useState, useEffect } from "react";
import axios from "axios";
import staffApi from "../api/staffApi";
import "./Admin.css";

const API_URL = "https://zouzoumanagement.xyz/api/v1/staff";

function formatDate(dateArray) {
  if (!Array.isArray(dateArray) || dateArray.length !== 3) {
    console.error("Invalid dateArray:", dateArray);
    return "Invalid Date";
  }

  const [year, month, day] = dateArray.map(Number);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    console.error("Invalid date values:", dateArray);
    return "Invalid Date";
  }

  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  return formattedDate;
}
//

const StaffManager = () => {
  const [staffData, setStaffData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [newStaff, setNewStaff] = useState({
    firstName: "",
    lastName: "",
    gender: "male", 
    startDay: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "STAFF",
  });

  const startEditing = (staffId) => {
    setEditingId(staffId);
  };

  const getAllStaff = async () => {
    try {
      const res = await staffApi.getAllStaff();
      setStaffData(res);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    getAllStaff();
  }, []);

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleDeleteClick = (id) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${deletingId}`);
      const updatedStaffData = staffData.filter((staff) => staff.id !== deletingId);
      setStaffData(updatedStaffData);
      setDeletingId(null);
    } catch (error) {
      handleApiError(error);
    }
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

  const addNewStaff = async (newStaff) => {
    try {
      const response = await staffApi.addStaff(newStaff);
      setStaffData([...staffData, response]);
      setAdding(false);
      setNewStaff({
        firstName: "",
        lastName: "",
        gender: "male",
        startDay: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "STAFF",
      });
      alert("Create new staff successfully");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 500) {
      console.error(error.response.data.message)
      alert(error.response.data.message);
      clearValidationErrors();
    } else if (error) {
      setValidationErrors(error.response.data);
    } else {
      setValidationErrors("An unexpected error occurred");
    }
    }
  };

  const handleAddStaff = () => {
    addNewStaff(newStaff);
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setNewStaff((prevStaff) => ({
      ...prevStaff,
      [name]: value,
    }));

    if (id) {
      const updatedStaffData = staffData.map((staff) => {
        if (staff.id === id) {
          return {
            ...staff,
            [name]: value,
          };
        }
        return staff;
      });
      setStaffData(updatedStaffData);
    }
  };

  const handleSaveClick = async (id) => {
    const staffToUpdate = staffData.find((staff) => staff.id === id);

    const updatedStaff = {
      firstName: staffToUpdate.firstName,
      lastName: staffToUpdate.lastName,
      gender: staffToUpdate.gender,
      startDay: staffToUpdate.startDay,
      phoneNumber: staffToUpdate.phoneNumber,
    };

    try {
      await axios.put(`${API_URL}/${id}`, updatedStaff);
      const updatedStaffData = staffData.map((staff) => {
        if (staff.id === id) {
          return {
            ...staff,
            ...updatedStaff,
          };
        }
        return staff;
      });

      setStaffData(updatedStaffData);
      setEditingId(null);
      clearValidationErrors();
      window.location.reload();
    } catch (error) {
      handleApiError(error);
    }
  };

  const clearValidationErrors = () => {
    setValidationErrors({});
  };

  const handleApiError = (error) => {
    if (error.response && error.response.status === 500) {
      console.log(error.response.data.message)
      alert(error.response.data.message);
      clearValidationErrors();
    } else if (error) {
      setValidationErrors(error.response.data);
    } else {
      setValidationErrors("An unexpected error occurred");
    }
  };

  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Start Day</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff) => (
            <tr key={staff.id}>
              <td>
                {editingId === staff.id ? (
                  <input
                    type="text"
                    name="firstName"
                    value={staff.firstName}
                    onChange={(e) => handleInputChange(e, staff.id)}
                  />
                ) : (
                  <div onClick={() => startEditing(staff.id)}>{staff.firstName}</div>
                )}
              </td>
              <td>
                {editingId === staff.id ? (
                  <input
                    type="text"
                    name="lastName"
                    value={staff.lastName}
                    onChange={(e) => handleInputChange(e, staff.id)}
                  />
                ) : (
                  <div onClick={() => startEditing(staff.id)}>{staff.lastName}</div>
                )}
              </td>

              <td>
                {editingId === staff.id ? (
                  <input
                    type="text"
                    name="gender"
                    value={staff.gender}
                    onChange={(e) => handleInputChange(e, staff.id)}
                  />
                ) : (
                  <div onClick={() => startEditing(staff.id)}>{staff.gender}</div>
                )}
              </td>

              <td>
                {editingId === staff.id ? (
                  <input
                    type="text"
                    name="startDay"
                    value={staff.startDay}
                    onChange={(e) => handleInputChange(e, staff.id)}
                  />
                ) : (
                  <div onClick={() => startEditing(staff.id)}> {formatDate(staff.startDay)}</div>
                )}
              </td>
              <td>
                {staff.email}
              </td>
              <td>
                {editingId === staff.id ? (
                  <input
                    type="text"
                    name="phoneNumber"
                    value={staff.phoneNumber}
                    onChange={(e) => handleInputChange(e, staff.id)}
                  />
                ) : (
                  <div onClick={() => startEditing(staff.id)}>{staff.phoneNumber}</div>
                )}
              </td>

              <td>
                {editingId === staff.id ? (
                  <>
                    <button onClick={() => handleSaveClick(staff.id)} className="waves-effect btn" style={{ marginRight: '10px' }}>
                      <i className="material-icons left small">save</i>
                    </button>
                    <button onClick={handleCancelClick} className="waves-effect btn">
                      <i className="material-icons left small">cancel</i>
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(staff.id)} className="waves-effect btn" style={{ marginRight: '10px' }}>
                      <i className="material-icons left small">edit</i>
                    </button>
                    <button onClick={() => handleDeleteClick(staff.id)} className="waves-effect btn">
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
      <h1>Staff Manager</h1>
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
          <button onClick={() => { setAdding(false); clearValidationErrors(); }} className="waves-effect btn" style={{ marginRight: '10px' }}>
            <i className="material-icons left">cancel</i>Cancel
          </button>
          <button onClick={handleAddStaff} className="waves-effect btn">
            <i className="material-icons left">add</i>Add
          </button>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={newStaff.firstName}
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={newStaff.lastName}
            onChange={(e) => handleInputChange(e)}
          />
          <h>Gender</h>
          <select
            name="gender"
            value={newStaff.gender}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <h>Start Date</h>
          <input
            id="StartDayOfStaff"
            type="date"
            placeholder="Start Day | Format: mm/dd/yyyy"
            name="startDay"
            value={newStaff.startDay}
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={newStaff.email}
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={newStaff.phoneNumber}
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={newStaff.password}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      ) : (
        <>
          <button className="waves-effect btn add-button" onClick={handleAddClick} style={{ marginRight: '10px' }}>
            <i className="material-icons left">add</i>Add
          </button>
          {renderTable()}
        </>
      )}
      {deletingId && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this staff?</p>
          <button onClick={confirmDelete} className="waves-effect btn" style={{ marginRight: '10px' }}>
            <i className="material-icons left small">check</i>Yes
          </button>
          <button onClick={cancelDelete} className="waves-effect btn">
            <i className="material-icons left small">cancel</i>No
          </button>
        </div>
      )}
    </div>
  );
};

export default StaffManager;
