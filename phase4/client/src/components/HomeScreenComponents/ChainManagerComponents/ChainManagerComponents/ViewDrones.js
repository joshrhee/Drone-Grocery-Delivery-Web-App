import React, {useState, useEffect} from 'react';
import store from '../../../../redux/store.js';
import * as api from '../../../../api';

const ViewDrones = (props) => {

    let originInfo = props.location.state.drones;
    const userName = store.getState().userInfoReducer.Username;
    let [droneID, setDroneID] = useState('');
    let [radius, setRadius] = useState('');

    let [table, setTable] = useState(originInfo);

    const handleFilter = async (droneID, radius) => {
        console.log("Username is: ", userName, "DroneID is: ", droneID,
        "Radius is : ", radius);
        api.managerGetDrones({
            username: userName,
            droneid: droneID === '' ? 'NULL' : droneID,
            droneradius: radius === '' ? 'NULL' : radius
        })
        .then((results) => {
            console.log("Result is: ", results);
            setTable(results.data.result)
        })
        .catch((error) => {
            console.log("API call error is: ", error);
        })
    }

    return(
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {console.log("Origin info is: ", originInfo)}
                <h1>Chain Manager View Drones</h1>
            
                <br/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <h3>Drone ID:</h3>
                    <input onChange={(e)=>{setDroneID(e.currentTarget.value)}}></input>
                    <h3>Radius: </h3>
                    <input onChange={(e)=>{setRadius(e.currentTarget.value)}}></input>
                </div>

                <br/>
                <div>
                    <button onClick={()=>{
                        handleFilter(droneID, radius)
                    }}>Filter</button>
                </div>

                <br/>
                {
                    <ViewInfo table={table}/>
                }

                <br/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <button className="backButton" onClick={() => {props.history.push('/manager')}}>Back</button>
                    <button className="buttons" onClick={()=>{setTable(originInfo)}}>Reset</button>
                </div>
            </div>
           
        </div>
    )
}

const ViewInfo = (props) => {

    let [componentTable, setComponentTable] = useState();
    let [droneIDSort, setDroneIDSort] = useState(true)
    let [radiusSort, setRadiusSort] = useState(true)
    let [zipSort, setZipSort] = useState(true)
    let [statusSort, setStatusSort] = useState(true)

    const handleSort = (e, key) => {
        let sortedTable = componentTable;
        let bool;
        switch(key) {
            case 'DroneID':
                bool = droneIDSort;
                setDroneIDSort(!droneIDSort);
                break;
            case 'Radius':
                bool = radiusSort;
                setRadiusSort(!radiusSort);
                break;
            case 'ZipCode':
                bool = zipSort;
                setZipSort(!zipSort);
                break;
            case 'Status':
                bool = statusSort;
                setStatusSort(!statusSort);
                break;
        }
        if (bool) {
            sortedTable.sort((a, b) => a[key].localeCompare(b[key]));
        } else {
            sortedTable.sort((b, a) => a[key].localeCompare(b[key]));
        }
        console.log("Sorted Table is: ", sortedTable);
        setComponentTable(sortedTable);
    }

    useEffect(() => {
        console.log("The very first table is: ", props.table)
        setComponentTable(props.table)
    }, [])

    useEffect(() => {
        console.log("Table is sorted. It is: ", props.table);
        setComponentTable(props.table)
    }, [props.table])

    return(
        <div className="table-wrapper-scroll-y my-custom-scrollbar" >
            {
                !props.table ? <div></div> :
                    <table className="table table-bordered table-striped mb-0">
                        <thead>
                            <tr>
                                <th scope="col">DroneID
                                    <span>
                                        <button onClick={(e)=>{handleSort(e, 'DroneID')}}>sort</button>
                                    </span>
                                </th>
                                <th scope="col">Operator</th>
                                <th scope="col">Radius
                                    <span>
                                        <button onClick={(e)=>{handleSort(e, 'Radius')}}>sort</button>
                                    </span>
                                </th>
                                <th scope="col">Zip Code
                                    <span>
                                        <button onClick={(e)=>{handleSort(e, 'ZipCode')}}>sort</button>
                                    </span>
                                </th>
                                <th scope="col">Status
                                    <span>
                                        <button onClick={(e)=>{handleSort(e, 'Status')}}>sort</button>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.table.map((e) => {
                                    return <tr>
                                        <td>{e.DroneID}</td>
                                        <td>{e.Operator}</td>
                                        <td>{e.Radius}</td>
                                        <td>{e.ZipCode}</td>
                                        <td>{e.Status}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>

            }
        </div>

    )
}

export default ViewDrones;