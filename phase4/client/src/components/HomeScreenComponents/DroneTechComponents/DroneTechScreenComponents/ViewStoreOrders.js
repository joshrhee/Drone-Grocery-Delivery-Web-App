/**
 * Screen 17: View Store Orders
 * Drone Technician View Store Orders
 */
import React, {useState, useEffect} from 'react'
import store from '../../../../redux/store';
import * as api from '../../../../api';

import ViewInfo from './ViewStoreOrderComponents/ViewInfo.js'


const ViewStoreOrders = (props) => {
  /* Set the state variables for the program */
  let [startDate, setStartDate] = useState();
  let [endDate, setEndDate] = useState();
  let [table, setTable] = useState();
  let [row, setRow] = useState();
  let [drones, setDrones] = useState();
  let [newRow, setNewRow] = useState({droneid: null, operator: null, status: null});
  const username = store.getState().userInfoReducer.Username;

    /* Set selected row */ 
  const handleSelectRow = (row) => {
    console.log(row);
    setRow(row);
  }

  const handleUpdateRow = (data) => {
    console.log("New selected order assignment: ", data);
    setNewRow(data);
  }

  /* Reset button, set variables to null and then filter again */
  const handleReset = () => {
    setStartDate();
    setEndDate();
    setRow();
    handleFilter();
  }

  /* Format the parameters and make a call to the api */
  const handleFilter = async () => {
    startDate = !startDate || startDate === 'NULL' ? 'NULL' : `'${startDate}'`;
    endDate = !endDate || endDate === 'NULL' ? 'NULL' : `'${endDate}'`;
    console.log(`${username}, ${startDate}, ${endDate}`);
    api.techGetHistory({
      username: username,
      startDate: startDate,
      endDate: endDate
    }).then((result) => {
      console.log("Success: Filter ", result);
      setTable(result.data.results);
    }).catch((error) => {
      console.log(error);
    })
  }

  const isEmpty = (data) => {
    return !Object.values(data).some(x => (x !== null && x !== ''));
  }

  /* Update information in the selected row */
  const handleSave = () => {
    console.log("saving...");
    console.log(isEmpty(newRow));
    if (!isEmpty(newRow) && row) {
      console.log("valid inputs", newRow);
      api.assignDrone({
        username: newRow.operator,
        droneid: newRow.droneid,
        orderStatus: newRow.status,
        orderid: row.ID
      })
      .then(() => {
        console.log("Success posting data!");
        handleReset();
      }).catch((error) => {
        console.log("Failed to post data");
        console.log(error);
      });
    } else {
      console.log("failed because of wrong data", newRow);
    }
    
  }

  /* Use effect, get the drones of the user to use when selecting info for assigning drones */
  /* This executes right after the page renders */
  useEffect(() => {
    const getDrones = async() => {
      return api.techGetDrones({
        username: username,
        droneid: 'NULL',
        status: 'Available'
      })
    }
    getDrones(username).then((result) => {
      setDrones(result.data.result);
      console.log("Parent use effect success!")
      console.log(drones);
      handleFilter();
    }).catch((error) => {
      console.log(error);
    })
  }, []); // this only done when the page loads initially , []) <- second parameter empty

  useEffect(() => {
    console.log(drones);
  },[table])

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '80vh'
    }}>
      <div>
        <br />
        <div>
          <h1>View Store Orders</h1>
        </div>
        <br/>
        <div>
          <h3>Date Range: </h3> {/* Date range input, use setState for when input is given*/}
          <div style={{
            display: 'flex', flexDirection:'row', justifyContent: 'center'
          }}>
            <input placeholder={startDate} type="date" onChange={(e) => {
            setStartDate(e.currentTarget.value)
            }}></input>
            <text> ---- </text>
          <input placeholder={endDate} type="date" onChange={(e) => {
            setEndDate(e.currentTarget.value)
            }}></input>
          </div>
        </div>
        <br/>
        <div>
          {/* ViewInfo component a separate component for the table, has a callback function to update select row.*/}
          <ViewInfo
            table={table}
            onSelectRow={handleSelectRow} 
            row={row}
            drones={drones}
            username={username}
            onUpdateRow={handleUpdateRow}
          />
        </div>
        <br/>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <button className="backButton" onClick={() => {props.history.goBack()}}>Back</button>
          <button className="buttons" onClick={() => {handleReset()}}>Reset</button>
          <button className="buttons" onClick={() => {
            handleFilter()}}>Filter</button>
          <button className="buttons" onClick={() => {
            if (row) {
              props.history.push({
                pathname:"/drone_tech/view_order_details",
                state: { row: row, username: username} 
            })
          }}} > View Order Details</button>
          <button className="buttons" onClick={() => {handleSave()}}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default ViewStoreOrders