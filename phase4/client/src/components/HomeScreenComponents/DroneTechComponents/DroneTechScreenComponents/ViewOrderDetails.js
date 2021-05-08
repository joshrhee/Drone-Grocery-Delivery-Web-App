import React, {useEffect, useState} from 'react';

import * as api from '../../../../api';

import '../DroneTech.css';

const ViewOrderDetails = (props) => {

  let [orderDetails, setOrderDetails] = useState();
  let [orderItems, setOrderItems] = useState();
  let [ready, setReady] = useState(false);

  // const orderDetails = props.location.state.orderDetails[0];
  // const orderItems = props.location.state.orderItems
  const username = props.location.state.username;
  const row = props.location.state.row;

  /* for moving onto view order details screen, get the info we need before renderining the next page */
  const getOrderDetails = async () => {
    return api.getOrderDetails({
      username: username,
      orderid: row.ID
    })
    
  }
 /* same as above, get order items for next page */
  const getOrderItems = async () => {
    return api.getOrderItems({
      username: username,
      orderid: row.ID
    })
  }

  useEffect(() => {
    console.log(orderDetails);
    console.log(orderItems);
    console.log(username);
    console.log(row);
    const getInfo = async () => {
      return Promise.all([getOrderDetails(), getOrderItems()])
    }
    getInfo()
    .then((results) => {
      console.log(results);
      setOrderDetails(results[0].data.result[0]);
      setOrderItems(results[1].data.result);
      setReady(true);
      }).catch((error) => {
      console.log("failed to get data");
      console.log(error);
    })
  }, [ready]);
 
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '80vh'
    }}>
      {!orderDetails && !orderItems ? <div></div> : 
      <div>
        <div>
          <h1>View Order Details</h1>
        </div>
        <br />
        
        <div style={{
          display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'
        }}>
          <div style={{
            display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'column'
          }}>
            <label>
              Customer Name: 
              <input className="inputs" readOnly={true} value={orderDetails.Customer_Name}></input>
            </label>
            <label>
              Order ID: 
              <input className="inputs" readOnly={true} value={orderDetails.Order_ID}></input>
            </label>
            <label>
              Total: 
              <input className="inputs" readOnly={true} value={orderDetails.Total_Amount}></input>
            </label>
            <label>
              Total Items:
              <input className="inputs" readOnly={true} value={orderDetails.Total_Items}></input>
            </label>
            <label>
              Date of Purchase: 
              <input className="inputs" readOnly={true} value={orderDetails.Date_of_Purchase}></input>
            </label>
            <label>
              Drone ID: 
              <input className="inputs" readOnly={true} value={orderDetails.Drone_ID}></input>
            </label>
            <label>
              Store Associate: 
              <input className="inputs" readOnly={true} value={orderDetails.Store_Associate}></input>
            </label>
            <label>
              Order Status:
              <input className="inputs" readOnly={true} value={orderDetails.Order_Status}></input>
            </label>
            
          </div>
          <div style={{
            display: 'flex', justifyContent: 'flex-start', flexDirection: "column"
          }}>
            <label>
              Address: 
              <input className="address" readOnly={true} value={orderDetails.Address}></input>
            </label>
            <ViewInfo table={orderItems} />
          </div>
        </div>
        <br/>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <button className="buttons" onClick={() => {props.history.goBack()}}>Back</button>
        </div>
      </div>
    }
    </div>
  )
}


const ViewInfo =({table}) => {
   return(
    <div className="table-wrapper-scroll-y my-custom-scrollbar" >
      {!table ? <div></div> :
    <table className="table table-bordered table-striped mb-0">
      <thead>
          <tr>
          <th scope="col">Item Name</th>
          <th scope="col">Quantity</th>
          </tr>
      </thead>
      <tbody>
        {
          table.map((element) => {
            return <tr>
              <td>{element.Item}</td>
              <td>{element.Count}</td>
            </tr>
          })
        }
      </tbody>
      </table>
    }
    </div>
  )
}

export default ViewOrderDetails
