import React, {useState, useEffect} from 'react';

const EditInfo = ({table, row, drones, username, onUpdateRow}) => {
  /*
  Need: Operator -> Username and NULL (if order is pending);
        Drone ID -> Drone IDs of technician (order pending);
        Status   -> Status of order (Pending -> Assigned -> In Transit -> Delivered);
        `SELECT DroneID, DroneStatus FROM drones WHERE DroneTech = '${username}' AND DroneStatus like 'Available'` -> techGetDrones
  */
  let [droneInfo, setDroneInfo] = useState();
  let [updateInfo, setUpdateInfo] = useState({droneid: null, operator: null, status: null});

  const handleSelectDroneID = (e) => {
    console.log('Selected Drone ID:', e.target.value);
    updateInfo.droneid = e.target.value;
    setUpdateInfo(updateInfo);
    onUpdateRow(updateInfo);
    console.log("New update info is: ", updateInfo);
  }

  const handleSelectOperator = (e) => {
    console.log('Selected Operator: ', e.target.value);
    updateInfo.operator = e.target.value;
    setUpdateInfo(updateInfo);
    onUpdateRow(updateInfo);
  }

  const handleSelectOrderStatus = (e) => {
    console.log('Selected Order Status: ', e.target.value);
    updateInfo.status = e.target.value;
    setUpdateInfo(updateInfo);
    onUpdateRow(updateInfo);
  }

  const createSelectDroneID = () => {
    console.log("Running select drone: ", droneInfo)
    if (droneInfo) {
      let items = [];
      items.push(<option key='NULL'></option>)
      for (let i = 0; i < droneInfo.length; i++) {
        console.log("Pushing in: ", droneInfo[i].Drone_ID)
        items.push(<option key={i}>{droneInfo[i].Drone_ID}</option>)
      }
      return items;
    }
  }

  const createSelectOrderStatus= () => {
    console.log("Running create select order id: ", row);
    let items = [
      <option key="0">Pending</option>,
      <option key="1">Drone Assigned</option>,
      <option key="2">In Transit</option>,
      <option key="3">Delivered</option>
    ];
    
    switch (row.Status) {
      case 'Pending':
        items = items.slice(0, 2);
        break;
      case 'Drone Assigned':
        items = items.slice(1, 3);
        break;
      case 'In Transit':
        items = items.slice(2, );
        break;
      default:
        break;
    }
    return items;
  }

  useEffect(() => {
    console.log(droneInfo);

  }, [droneInfo])

  useEffect(() => {
    console.log("Use Effect of EditInfo Triggered")
    console.log(droneInfo);
    setDroneInfo(drones);
  }, [row, table]);

  return (
    <div className="table-wrapper-scroll-y my-custom-scrollbar" >
    {
      !row ? <div></div> :
      <table className="table table-bordered table-striped mb-0">
        <tbody>
            <td>{row.ID}</td>
            <td>{!row.Operator ? 
            <select onChange={(e) => {handleSelectOperator(e)}}>
              <option key={'NULL'}></option>
              <option key={username}>{`${username}`}</option>
            </select> : row.Operator}</td>
            <td>{row.OrderDate}</td>
            <td>{!row.DroneID ? 
            <select onChange={(e) => {handleSelectDroneID(e)}}> {createSelectDroneID()} </select> : row.DroneID}
            </td>
            <td>{!(row.Status === 'Creating' || row.Status === 'Delivered') ? 
            <select onChange={(e) => {handleSelectOrderStatus(e)}}>{createSelectOrderStatus()}</select> : row.Status}
            </td>
            <td>{row.Total}</td>
        </tbody>
      </table>
    }
    </div>
  )
}

export default EditInfo