import React, { useState } from "react";
import Header from "../Component/Header";
import "./Ticket.css";
import axios from "axios";

const API_URL = "https://zouzoumanagement.xyz/api/v1/ticket";
const Ticket = () => {
  const [ticketErrors, setTicketErrors] = useState({});
  const [newTicket, setNewTicket] = useState({
    id: "",
    type: "",
    price: "",
    quantity: "",
    date: "",
  });

  const handlePurchaseClick = () => {
    const validationErrors = {};
    if (!newTicket.type.trim()) {
      validationErrors.type = "Type is required";
    }
    if (!newTicket.quantity.match("^[0-9]+$")) {
      validationErrors.quantity = "Quantity should be number";
    }

    setTicketErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(API_URL, newTicket)
        .then(() => {
          alert("Purchase successfully!");

          window.location.reload();
        })
        .catch((error) => {
          console.error("Lỗi khi mua vé", error);
        });
    }
  };

  return (
    <>
      <Header />
      <div className="ticket-show">
        <div className="daily-ticket">
          <h2>Giá vé ngày thường</h2>
          <hr></hr>
          <p>Người lớn: 50.000 VND ( &gt; 1.3m )</p>
          <p>Trẻ em: 30.000 VND ( &lt;= 1.3m )</p>
        </div>
        <div className="holiday-ticket">
          <h2>Giá vé dịp lễ</h2>
          <hr></hr>
          <p>Người lớn: 70.000 VND ( &gt; 1.3m )</p>
          <p>Trẻ em: 40.000 VND ( &lt;= 1.3m )</p>
        </div>
      </div>
      <div className="ticket-form">
        <label for="typeOfPerson">Choose type of Ticket</label>
        <select
          id="typeOfPerson"
          className="TOP"
          onChange={(e) => setNewTicket({ ...newTicket, type: e.target.value })}
        >
          <option selected disabled hidden value="">
            --Select type of Ticket--
          </option>
          <option value="ADULT">Adult</option>
          <option value="CHILD">Child</option>
        </select>
        {ticketErrors.type && <span className="ticket-validation">{ticketErrors.type}</span>}
        <input
          type="text"
          name="price"
          placeholder="Price"
          onChange={(e) =>
            setNewTicket({ ...newTicket, price: e.target.value })
          }
        />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          onChange={(e) =>
            setNewTicket({ ...newTicket, quantity: e.target.value })
          }
        />
        {ticketErrors.quantity && <span className="ticket-validation">{ticketErrors.quantity}</span>}
        <input
          type="text"
          name="date"
          placeholder="Date"
          onChange={(e) => setNewTicket({ ...newTicket, date: e.target.value })}
        />
        <button onClick={handlePurchaseClick}>Purchase</button>
      </div>
    </>
  );
};

export default Ticket;
