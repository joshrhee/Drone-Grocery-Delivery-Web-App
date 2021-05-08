import React, {useState, useEffect} from 'react';
import store from '../../../../redux/store.js';
import * as api from '../../../../api';


const TrackAssignedDrones = (props) => {
  let [droneid, setDroneid] = useState('');
  let [status, setStatus] = useState('');
  let [table, setTable] = useState();
  const username = store.getState().userInfoReducer.Username;

  const handleReset = () => {
    console.log(`${username}, ${status}, ${droneid}`);
    handleFilter('', '');
  };

  const handleFilter = (droneid_in=droneid, status_in=status) => {
    console.log(status_in, droneid_in)
    status_in = status_in === '' || !status_in ? 'ALL' : status_in;
    droneid_in = droneid_in === '' || !droneid_in ? 'NULL' : droneid_in;
    console.log(`${username}, ${status_in}, ${droneid_in}`);
    api.techGetDrones({
      username: username,
      droneid: droneid_in,
      status: status_in
    })
    .then((results) => {
      console.log(results);
      setTable(results.data.result);
    }).catch((error) => {
      console.log("Failed to get data...");
      console.log(error);
   });
  }

  useEffect(() => {
    console.log("loading table")
    handleFilter();
  }, [])

  useEffect(() => {
    console.log(table);
  }, [table]);

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '70vh'
    }}>
    <div>
      <div>
        <br />
        <h1>Track Assigned Drones</h1>
        <br />
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <h3>Drone ID:  </h3>
          <input placeholder={droneid} onChange={(e) => setDroneid(e.target.value)}></input>

          
          <h3>Status:  </h3> 
          <select onChange={(e) => setStatus(e.target.value)} defaultValue={''}>
            <option></option>
            <option>Available</option>
            <option>Busy</option>
          </select>
        </div>
      </div>
      <br/>
      <ViewInfo table={table}/>
      <br/>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <button className="backButton" onClick={() => {props.history.goBack()}}>Back</button>
        <button className="buttons" onClick={() => {handleReset()}}>Reset</button>
        <button className="buttons" onClick={() => {handleFilter()}}>Filter</button>
      </div>
    </div>  
    </div>
  )
}

const ViewInfo = ({table}) => {

  let [componentTable, setComponentTable] = useState();
  let [sortDroneID, setSortDroneID] = useState(true);
  let [sortStatus, setSortStatus] = useState(true);
  let [sortRadius, setSortRadius] = useState(true);

  const handleSort = (e, key) => {
    let sortedTable = componentTable;
    let bool;
    console.log(key);
    switch (key) {
      case 'Drone_ID':
        bool = sortDroneID;
        setSortDroneID(!sortDroneID);
        break;
      case 'DroneStatus':
        bool = sortStatus;
        setSortStatus(!sortStatus);
        break;
      case 'Radius':
        bool = sortRadius;
        setSortRadius(!sortRadius);
        break;
      default:
        break;
    }
    if (bool) {
      sortedTable.sort((a, b) => parseInt(a[key]) - parseInt(b[key]));
    } else {
      sortedTable.sort((b, a) => parseInt(a[key]) - parseInt(b[key])); 
    }
    console.log(sortedTable);
    setComponentTable(sortedTable);
  }

  useEffect(() => {
    setComponentTable(table);
  }, [])

  useEffect(() => {
    console.log(table);
    setComponentTable(table);
  }, [table])


  return(
    <div className="table-wrapper-scroll-y my-custom-scrollbar" >
      {!table ? <div></div> :
      <table className="table table-bordered table-striped mb-0">
      <thead>
          <tr>
          <th onClick={(e) => {handleSort(e, 'Drone_ID')}} scope="col">Drone ID</th>
          <th onClick={(e) => {handleSort(e, 'DroneStatus')}} scope="col">Drone Status</th>
          <th onClick={(e) => {handleSort(e, 'Radius')}} scope="col">Radius</th>
          </tr>
      </thead>
      <tbody>
        {
          table.map((element) => {
            return <tr key={element.Drone_ID}>
              <td>{element.Drone_ID}</td>
              <td>{element.DroneStatus}</td>
              <td>{element.Radius}</td>
            </tr>
          })
        }
      </tbody>
      </table>
      }

    </div>
  )
}

export default TrackAssignedDrones;
