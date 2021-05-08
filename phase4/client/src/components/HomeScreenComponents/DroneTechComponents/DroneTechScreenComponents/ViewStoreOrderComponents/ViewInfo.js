import React, {useState, useEffect} from 'react';

import EditInfo from './EditInfo.js'

const ViewInfo = ({ table, onSelectRow, row, drones, username, onUpdateRow }) => {

  let [componentTable, setComponentTable] = useState();
  let [droneInfo, setDroneInfo] = useState();
  let [sortDate, setSortDate] = useState(true);
  let [sortDroneID, setSortDroneID] = useState(true);
  let [sortStatus, setSortStatus] = useState(true);
  let [sortTotal, setSortTotal] = useState(true);
  let [sortID, setSortID] = useState(true);

  const handleSelectRow = (row) => { // This function is for updating the parent component
    onSelectRow(row);
    setDroneInfo(droneInfo);
  }

   const handleSort = (e, key) => {
    let newSortedTable = componentTable;
    let bool;
    switch(key) {
      case 'OrderDate':
        bool = sortDate;
        setSortDate(!sortDate);
        break;
      case 'DroneID':
        bool = sortDroneID;
        setSortDroneID(!sortDroneID);
        break;
      case 'Status':
        bool = sortStatus;
        setSortStatus(!sortStatus);
        break;
      case 'Total':
        bool = sortTotal;
        setSortTotal(!sortTotal);
        break;
      default:
        bool = sortID;
        setSortID(!sortID);
        break;
    }
    if (bool) {
      newSortedTable.sort((a, b) => a[key].localeCompare(b[key]));
    } else {
      newSortedTable.sort((b, a) => a[key].localeCompare(b[key]));
    }
    setComponentTable(newSortedTable);
    console.log(newSortedTable);
    setSortDate(!sortDate);

  }

  useEffect(() => {
    console.log(droneInfo);
    setDroneInfo(drones);
  }, [drones])


  useEffect(() => {
    console.log(componentTable);
    setComponentTable(table);
  }, [table]);

  useEffect(() =>  {
    setDroneInfo(drones);
    setComponentTable(table);
    console.log("Use effect of ViewInfo Triggered");
    console.log(droneInfo);
    console.log(table);
  }, [])

  return(
    <div className="table-wrapper-scroll-y my-custom-scrollbar" >      
      {!table ? <div></div>
      : 
      <table className="table table-bordered table-striped mb-0">
      <thead>
          <tr>
          <th scope="col"></th>
          <th onClick={(e) => {handleSort(e, 'ID')}} scope="col" >Order ID</th>
          <th scope="col">Operator Name</th>
          <th onClick={(e) => {handleSort(e, 'OrderDate')}} scope="col">Order Date</th>
          <th onClick={(e) => {handleSort(e, 'DroneID')}} scope="col">Drone ID</th>
          <th onClick={(e) => {handleSort(e, 'Status')}} scope="col">Order Status</th>
          <th onClick={(e) => {handleSort(e, 'Total')}} scope="col">Total</th>
          </tr>
      </thead>
      <tbody>
        {
          table.map((element) => {
            return <tr>
              <td><input type="radio" name="selected" onClick={() => {handleSelectRow(element)}}></input></td>
              <td>{element.ID}</td>
              <td>{element.Operator}</td>
              <td>{element.OrderDate}</td>
              <td>{element.DroneID}</td>
              <td>{element.Status}</td>
              <td>{element.Total}</td>
            </tr>
          })
        }
      </tbody>
      </table>}
      <br />
      {
        !table && !row ? <div></div> :
        <EditInfo
          table={table}
          row={row}
          drones={droneInfo}
          username={username}
          onUpdateRow={onUpdateRow}
        />
      }

    </div>
  )
}

export default ViewInfo