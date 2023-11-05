import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://zouzoumanagement.xyz/api/v1/expert";

const ExpertManager = () => {
  const [expertData, setExpertData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [newExpert, setNewExpert] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    startDay: "",
    email: "",
    phoneNumber: "",
    areaName: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setExpertData(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 500){
          alert(error.response.data.message);
          clearValidationErrors();
        } else if (error) {
          setValidationErrors(error.response.data);
        } else {
          setValidationErrors("An unexpected error occurred");
        }
      });
  }, []);

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const startEditing = (expertId) => {
    setEditingId(expertId);
  };

  const handleDeleteClick = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        const updatedExpertData = expertData.filter(
          (expert) => expert.id !== id
        );
        setExpertData(updatedExpertData);
      })
      .catch((error) => {
        if (error.response && error.response.status === 500){
          alert(error.response.data.message);
          clearValidationErrors();
        } else if (error) {
          setValidationErrors(error.response.data);
        } else {
          setValidationErrors("An unexpected error occurred");
        }
      });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleAddClick = () => {
    setAdding(true);
  };

  const handleAddExpert = () => {
    axios
      .post(API_URL, newExpert)
      .then((response) => {
        setExpertData([...expertData, response.data]);
        setAdding(false);
        setNewExpert({
          firstName: '',
          lastName: '',
          gender: '', 
          startDay: '',
          email: '',
          phoneNumber: '',
          areaName: '',
          password: '',
        });
        clearValidationErrors();
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.status === 500){
          alert(error.response.data.message);
          clearValidationErrors();
        } else if (error) {
          setValidationErrors(error.response.data);
        } else {
          setValidationErrors("An unexpected error occurred");
        }
      });
  };

  const clearValidationErrors = () => {
    setValidationErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpert({
      ...newExpert,
      [name]: value,
    });
  };

  const handleSaveClick = (id) => {
    const expertToUpdate = expertData.find((expert) => expert.id === id);
    const updatedFirstName = expertToUpdate.firstName;
    const updatedLastName = expertToUpdate.lastName;
    const updatedGender = expertToUpdate.gender; 
    const updatedStartDay = expertToUpdate.startDay;
    const updatedEmail = expertToUpdate.email;
    const updatedPhoneNumber = expertToUpdate.phoneNumber;
    const updatedAreaName = expertToUpdate.areaName;
    const updatedPassword = expertToUpdate.password;

    axios
      .put(`${API_URL}/${id}`, {
        firstName: updatedFirstName,
        lastName: updatedLastName,
        gender: updatedGender,
        startDay: updatedStartDay,
        email: updatedEmail,
        phoneNumber: updatedPhoneNumber,
        areaName: updatedAreaName,
        password: updatedPassword,
      })
      .then(() => {
        const updatedExpertData = expertData.map((expert) => {
          if (expert.id === id) {
            return {
              ...expert,
              firstName: updatedFirstName,
              lastName: updatedLastName,
              gender: updatedGender,
              startDay: updatedStartDay,
              email: updatedEmail,
              phoneNumber: updatedPhoneNumber,
              areaName: updatedAreaName,
              password: updatedPassword,
            };
          }
          return expert;
        });
        clearValidationErrors();
        setExpertData(updatedExpertData);
        setEditingId(null);
        
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.status === 500){
          alert(error.response.data.message);
          clearValidationErrors();
        } else if (error) {
          setValidationErrors(error.response.data);
        } else {
          setValidationErrors("An unexpected error occurred");
        }
      });
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
            <th>Area Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expertData.map((expert) => (
            <tr key={expert.id}>
              <td>
                {editingId === expert.id ? (
                  <input
                    type="text"
                    name="firstName"
                    value={expert.firstName}
                    onChange={(e) => {
                      const newExpertdata = [...expertData];
                      const index = newExpertdata.findIndex((i) => i.id === expert.id);
                      if (index !== -1) {
                        newExpertdata[index].firstName = e.target.value;
                        setExpertData(newExpertdata);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(expert.id)}>
                    {expert.firstName}
                  </div>
                )}
              </td>

              <td>
                {editingId === expert.id ? (
                  <input
                    type="text"
                    name="lastName"
                    value={expert.lastName}
                    onChange={(e) => {
                      const newExpertdata = [...expertData];
                      const index = newExpertdata.findIndex((i) => i.id === expert.id);
                      if (index !== -1) {
                        newExpertdata[index].lastName = e.target.value;
                        setExpertData(newExpertdata);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(expert.id)}>
                    {expert.lastName}
                  </div>
                )}
              </td>

              <td>
                {editingId === expert.id ? (
                  <input
                    type="text"
                    name="gender"
                    value={expert.gender}
                    onChange={(e) => {
                      const newExpertdata = [...expertData];
                      const index = newExpertdata.findIndex((i) => i.id === expert.id);
                      if (index !== -1) {
                        newExpertdata[index].gender = e.target.value;
                        setExpertData(newExpertdata);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(expert.id)}>
                    {expert.gender}
                  </div>
                )}
              </td>

              <td>
                {editingId === expert.id ? (
                  <input
                    type="text"
                    name="startDay"
                    value={expert.startDay}
                    onChange={(e) => {
                      const newExpertdata = [...expertData];
                      const index = newExpertdata.findIndex((i) => i.id === expert.id);
                      if (index !== -1) {
                        newExpertdata[index].startDay = e.target.value;
                        setExpertData(newExpertdata);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(expert.id)}>
                    {expert.startDay}
                  </div>
                )}
              </td>

              <td>
                {/* {editingId === expert.id ? (
                  <input
                    type="text"
                    name="email"
                    value={expert.email}
                    onChange={(e) => {
                      const newExpertdata = [...expertData];
                      const index = newExpertdata.findIndex((i) => i.id === expert.id);
                      if (index !== -1) {
                        newExpertdata[index].email = e.target.value;
                        setExpertData(newExpertdata);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(expert.id)}>
                    {expert.email}
                  </div>
                )} */}
                {expert.email}
              </td>

              <td>
                {editingId === expert.id ? (
                  <input
                    type="text"
                    name="phoneNumber"
                    value={expert.phoneNumber}
                    onChange={(e) => {
                      const newExpertdata = [...expertData];
                      const index = newExpertdata.findIndex((i) => i.id === expert.id);
                      if (index !== -1) {
                        newExpertdata[index].phoneNumber = e.target.value;
                        setExpertData(newExpertdata);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(expert.id)}>
                    {expert.phoneNumber}
                  </div>
                )}
              </td>

              <td>
                {editingId === expert.id ? (
                  <input
                    type="text"
                    name="areaName"
                    value={expert.areaName}
                    onChange={(e) => {
                      const newExpertdata = [...expertData];
                      const index = newExpertdata.findIndex((i) => i.id === expert.id);
                      if (index !== -1) {
                        newExpertdata[index].areaName = e.target.value;
                        setExpertData(newExpertdata);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(expert.id)}>
                    {expert.areaName}
                  </div>
                )}
              </td>

              <td>
                {editingId === expert.id ? (
                  <>
                     <button onClick={() => handleSaveClick(expert.id)} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
                      <i className="material-icons left small">save</i>
                    </button>
                    <button onClick={handleCancelClick} className="waves-effect waves-light btn">
                      <i className="material-icons left small">cancel</i>
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(expert.id)} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
                      <i className="material-icons left small">edit</i>
                    </button>
                    <button onClick={() => handleDeleteClick(expert.id)} className="waves-effect waves-light btn">
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
      <h1>Expert Manager</h1>
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
          <button onClick={() => {setAdding(false); clearValidationErrors()}} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
            <i className="material-icons left">cancel</i>Cancel
          </button>
          <button onClick={handleAddExpert} className="waves-effect waves-light btn">
            <i className="material-icons left">add</i>Add
          </button>
          <input type="text" placeholder="First Name" name="firstName" value={newExpert.firstName} onChange={handleInputChange} />
          <input type="text" placeholder="Last Name" name="lastName" value={newExpert.lastName} onChange={handleInputChange} />
          <input type="text" placeholder="Gender" name="gender" value={newExpert.gender} onChange={handleInputChange} />
          <input type="text" placeholder="Start Day" name="startDay" value={newExpert.startDay} onChange={handleInputChange} />
          <input type="text" placeholder="Email" name="email" value={newExpert.email} onChange={handleInputChange} />
          <input type="text" placeholder="Phone Number" name="phoneNumber" value={newExpert.phoneNumber} onChange={handleInputChange} />
          <input type="text" placeholder="Area Name" name="areaName" value={newExpert.areaName} onChange={handleInputChange} />
          <input type="password" placeholder="Password" name="password" value={newExpert.password} onChange={handleInputChange} />
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

export default ExpertManager;
