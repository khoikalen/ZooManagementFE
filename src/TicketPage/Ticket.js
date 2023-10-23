import React from 'react'
import Header from '../Component/Header'
import './Ticket.css'

export default function Ticket() {
  return (
    <>
     <Header />
     <div className='ticket-show'>
        <div className='daily-ticket'>
            <h2>Giá vé ngày thường</h2>
            <hr></hr>
            <p>Người lớn: 50.000 VND ( &gt; 1.3m )</p>
            <p>Trẻ em: 30.000 VND ( &lt;= 1.3m )</p>
        </div>
        <div className='holiday-ticket'>
            <h2>Giá vé dịp lễ</h2>
            <hr></hr>
            <p>Người lớn: 70.000 VND ( &gt; 1.3m )</p>
            <p>Trẻ em: 40.000 VND ( &lt;= 1.3m )</p>
        </div>
     </div>
    </>
    
  )
}
