import React, { useState, useEffect } from "react";
import axios from "axios";
import staffApi from "../api/staffApi";
import "./Admin.css";
const API_URL = "https://zouzoumanagement.xyz/api/v1/staff";

const StaffManager = () => {
  const [staffData, setStaffData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [newStaff, setNewStaff] = useState({
    firstName: "",
    lastName: "",
    gender: "", 
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
      console.error("Axios Error:", error);
      if (error.response) {
        console.error("Server Response Data:", error.response.data);
        setValidationErrors(error.response.data);
      }
    }
  };

  useEffect(() => {
    getAllStaff();
  }, []);

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleDeleteClick = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        const updatedStaffData = staffData.filter((staff) => staff.id !== id);
        setStaffData(updatedStaffData);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      if (error.response) {
        console.error("Server Response Data:", error.response.data);
        setValidationErrors(error.response.data);
      }
      });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleAddClick = () => {
    setAdding(true);
  };
  const addNewStaff = async (newStaff) => {
    try {
      console.log(newStaff);
      const response = await staffApi.addStaff(newStaff);
      setStaffData([...staffData, newStaff]);
      setAdding(false);
      setNewStaff({
        firstName: "",
        lastName: "",
        gender: "", 
        startDay: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "STAFF",
      });
      alert("Create new staff successfully");
      window.location.reload();
    } catch (error) {
      console.error("Axios Error:", error);
      if (error.response) {
        console.error("Server Response Data:", error.response.data);
        setValidationErrors(error.response.data);
      }
    }
  };

  const handleAddStaff = () => {
    addNewStaff(newStaff);

    // Tải lại trang sau khi thêm thành công
    
    // })
    // .catch((error) => {
    //   console.error('Lỗi khi thêm nhân viên:', error);
    // });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({
      ...newStaff,
      [name]: value,
    });
  };

  const handleSaveClick = (id) => {
    const staffToUpdate = staffData.find((staff) => staff.id === id);
  
    // Copy the values from the staff being edited into newStaff
    const updatedStaff = {
      firstName: staffToUpdate.firstName,
      lastName: staffToUpdate.lastName,
      gender: staffToUpdate.gender,
      startDay: staffToUpdate.startDay,
      phoneNumber: staffToUpdate.phoneNumber,
    };
  
    axios
      .put(`${API_URL}/${id}`, updatedStaff)
      .then(() => {
        const updatedStaffData = staffData.map((staff) => {
          if (staff.id === id) {
            return {
              ...staff,
              ...updatedStaff, // Update with the edited values
            };
          }
          return staff;
        });
  
        setStaffData(updatedStaffData);
        setEditingId(null);
        clearValidationErrors();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Axios Error:", error);
        if (error.response) {
          console.error("Server Response Data:", error.response.data);
          setValidationErrors(error.response.data);
        }
      });
  };
  

  const clearValidationErrors = () => {
    setValidationErrors({});
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
                    onChange={(e) => {
                      const newStaffdata = [...staffData];
                      const index = newStaffdata.findIndex((i) => i.id === staff.id);
                      if (index !== -1) {
                        newStaffdata[index].firstName = e.target.value;
                        setStaffData(newStaffdata);
                      }
                    }}
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
      onChange={(e) => {
        const newStaffData = [...staffData];
        const index = newStaffData.findIndex((i) => i.id === staff.id);
        if (index !== -1) {
          newStaffData[index].lastName = e.target.value;
          setStaffData(newStaffData);
        }
      }}
    />
  ) : (
    <div onClick={() => startEditing(staff.id)}>{staff.lastName}
  </div>
  )}
</td>

<td>
  {editingId === staff.id ? (
    <input
      type="text"
      name="gender"
      value={staff.gender}
      onChange={(e) => {
        const newStaffData = [...staffData];
        const index = newStaffData.findIndex((i) => i.id === staff.id);
        if (index !== -1) {
          newStaffData[index].gender = e.target.value;
          setStaffData(newStaffData);
        }
      }}
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
      onChange={(e) => {
        const newStaffData = [...staffData];
        const index = newStaffData.findIndex((i) => i.id === staff.id);
        if (index !== -1) {
          newStaffData[index].startDay = e.target.value;
          setStaffData(newStaffData);
        }
      }}
    />
  ) : (
    <div onClick={() => startEditing(staff.id)}>{staff.startDay}</div>
  )}
</td>
<td>
  {/* {editingId === staff.id ? (
    <input
      type="text"
      name="email"
      value={staff.email}
      onChange={(e) => {
        const newStaffData = [...staffData];
        const index = newStaffData.findIndex((i) => i.id === staff.id);
        if (index !== -1) {
          newStaffData[index].email = e.target.value;
          setStaffData(newStaffData);
        }
      }}
    />
  ) : (
    <div onClick={() => startEditing(staff.id)}>{staff.email}</div>
  )} */}
  {staff.email}
</td>

<td>
  {editingId === staff.id ? (
    <input
      type="text"
      name="phoneNumber"
      value={staff.phoneNumber}
      onChange={(e) => {
        const newStaffData = [...staffData];
        const index = newStaffData.findIndex((i) => i.id === staff.id);
        if (index !== -1) {
          newStaffData[index].phoneNumber = e.target.value;
          setStaffData(newStaffData);
        }
      }}
    />
  ) : (
    <div onClick={() => startEditing(staff.id)}>{staff.phoneNumber}</div>
  )}
</td>

              <td>
                {editingId === staff.id ? (
                  <>
                     <button onClick={() => handleSaveClick(staff.id)} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
                      <i className="material-icons left small">save</i>
                    </button>
                    <button onClick={handleCancelClick} className="waves-effect waves-light btn">
                      <i className="material-icons left small">cancel</i>
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(staff.id)} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
                      <i className="material-icons left small">edit</i>
                    </button>
                    <button onClick={() => handleDeleteClick(staff.id)} className="waves-effect waves-light btn">
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
          <button onClick={() => setAdding(false)} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
            <i className="material-icons left">cancel</i>Cancel
          </button>
          <button onClick={handleAddStaff} className="waves-effect waves-light btn">
            <i className="material-icons left">add</i>Add
          </button>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={newStaff.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={newStaff.lastName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Gender"
            name="gender"
            value={newStaff.gender}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Start Day"
            name="startDay"
            value={newStaff.startDay}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={newStaff.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={newStaff.phoneNumber}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={newStaff.password}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <>
          <button className="waves-effect waves-light btn add-button" onClick={handleAddClick} style={{ marginRight: '10px' }}>
            <i className="material-icons left">add</i>Add
          </button>
          {renderTable()}
        </>
      )}
    </div>
  );
};

export default StaffManager;
