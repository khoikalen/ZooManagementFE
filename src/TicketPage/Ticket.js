import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import "./Ticket.css";
import axios from "axios";

const API_URL = "https://zouzoumanagement.xyz/api/v3/ticket";
const Ticket = () => {
  const [ticketErrors, setTicketErrors] = useState({});
  const [newTicket, setNewTicket] = useState({
    quantityOfAdult: "",
    quantityOfChild: "",
    date: "",
  });
  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const [totalAdultPrice, setTotalAdultPrice] = useState(0);
  const [totalChildPrice, setTotalChildPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleTicketPrice = (date) => {
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setAdultPrice(70000);
      setChildPrice(40000);
    } else {
      setAdultPrice(50000);
      setChildPrice(30000);
    }
  };
  const handleTotalPrice = () => {
    setNewTicket((prevNewTicket) => {
      const adultQuantity = prevNewTicket.quantityOfAdult;
      const childQuantity = prevNewTicket.quantityOfChild;

      const totalAdultPrice = adultQuantity * adultPrice;
      const totalChildPrice = childQuantity * childPrice;
      const totalPrice = totalAdultPrice + totalChildPrice;

      setTotalAdultPrice(totalAdultPrice);
      setTotalChildPrice(totalChildPrice);
      setTotalPrice(totalPrice);

      return { ...prevNewTicket };
    });
  };

  const handlePurchaseClick = () => {
    const validationErrors = {};
    // if (!newTicket.type.trim()) {
    //   validationErrors.type = "Type is required";
    // }
    if (!newTicket.quantityOfAdult.match("^[0-9]*$|^w$")) {
      validationErrors.quantityOfAdult = "Quantity should be number";
    }
    if (!newTicket.quantityOfChild.match("^[0-9]*$|^w$")) {
      validationErrors.quantityOfChild = "Quantity should be number";
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
  useEffect(() => {
    handleTotalPrice();
  }, [newTicket.date, adultPrice, childPrice]);

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
          <h2>Giá vé cuối tuần</h2>
          <hr></hr>
          <p>Người lớn: 70.000 VND ( &gt; 1.3m )</p>
          <p>Trẻ em: 40.000 VND ( &lt;= 1.3m )</p>
        </div>
      </div>
      <div className="ticket-form">
        {/* <label for="typeOfPerson">Choose type of Ticket</label>
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
        {ticketErrors.type && <span className="ticket-validation">{ticketErrors.type}</span>} */}

        <label htmlFor="OD">Order Date</label>
        <input
          id="OD"
          type="date"
          name="date"
          placeholder="Format: mm/dd/yyyy"
          onChange={(e) => {
            const selectedDate = e.target.value;
            setNewTicket({ ...newTicket, date: selectedDate });
            handleTicketPrice(selectedDate);
          }}
        />
        <div className="ticket-by-day">
          <span>Giá vé người lớn: {adultPrice} VND</span>
          <span>Giá vé trẻ em: {childPrice} VND</span>
        </div>
        <label htmlFor="QOA">Quantity Of Adult</label>
        <input
          id="QOA"
          type="text"
          name="quantityOfAdult"
          placeholder="Enter Quantity Of Adult"
          onChange={(e) => {
            setNewTicket({ ...newTicket, quantityOfAdult: e.target.value });
            handleTotalPrice();
          }}
        />
        <p>
          {ticketErrors.quantityOfAdult && (
            <span className="ticket-validation">
              {ticketErrors.quantityOfAdult}
            </span>
          )}
        </p>
        <label htmlFor="QOC">Quantity Of Child</label>
        <input
          id="QOC"
          type="text"
          name="quantityOfChild"
          placeholder="Enter Quantity of Child"
          onChange={(e) => {
            setNewTicket({ ...newTicket, quantityOfChild: e.target.value });
            handleTotalPrice();
          }}
        />
        <p>
          {ticketErrors.quantityOfChild && (
            <span className="ticket-validation">
              {ticketErrors.quantityOfChild}
            </span>
          )}
        </p>
        <h5>Total: {totalPrice}</h5>
        <button onClick={handlePurchaseClick}>Purchase</button>
      </div>
    </>
  );
};

export default Ticket;
