import React, {useState, useEffect} from 'react';
import store from '../../../../redux/store.js';
import * as api from '../../../../api';

import '../ChainManager.css';

const ManageStores = (props) => {

    let originInfo = props.location.state.getStores;
    

    const userName = store.getState().userInfoReducer.Username;
    let [min, setMin] = useState('');
    let [max, setMax] = useState('');
    let [StoreName, setStoreName] = useState('NULL');

    let [table, setTable] = useState(originInfo);

    const nameDropwDown = !originInfo ? null :
        originInfo.map((obj, i) => {
            return <option key={i} id={obj['StoreName']}>{obj['StoreName']}</option>
        })

    const filterHandler = async (StoreName, min, max) => {
        console.log("Username is: ", userName,
        "storename is: ", StoreName, "mintotal is: ", min, "maxtotal is: ", max)
        api.managerGetStores({
            username: userName,
            storename: StoreName === 'NULL' ? 'NULL' : `"${StoreName}"`,
            mintotal: min === '' ? 'NULL' : min,
            maxtotal: max === '' ? 'NULL' : max
        })
        .then((results) => {
            setTable(results.data.result);
            console.log("Result is : ", results);
        })
        .catch((error) => {
            console.log("API CALL error is: ", error)
        })
    }
 
    useEffect(() => {
        console.log(table);
    }, [table])
    

    return(
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '70vh'
        }}>
            {console.log("originInfo is: ", originInfo)}
            {console.log("Storename is : ", StoreName)}
        <div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <h1>Manage Chain's Stores</h1>
                
                <br/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <h3>Chain:</h3>
                            <input className="inputs" readOnly={true} value={store.getState().userInfoReducer.ChainName}></input>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <h3>Store:</h3>
                            <select onChange={(e) => {setStoreName(e.target.value)}}>
                                <option id="NULL">NULL</option>
                                {
                                    nameDropwDown
                                }
                            </select>
                        </div>
                    </div>
                    <br/>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h4>Total Range: </h4>
                        <input className="inputs" id="min"  onChange={(e)=>{setMin(e.target.value)}}></input>
                        <h4>-</h4>
                        <input className="inputs" id="max"  onChange={(e)=>{setMax(e.target.value)}}></input>
                    </div>
                </div>
                
            </div>
            
            <br/>
            { 
                <ViewInfo table={table}/>
            }

            <br/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <button className="backButton" onClick={() => {props.history.push('/manager')}}>Back</button>
                <button className="buttons" onClick={()=>{setTable(originInfo)}}>Reset</button>

                <button className="buttons" onClick={()=>{
                    filterHandler(StoreName, min, max);
                }}>Filter</button>
            </div>
        </div>  
        </div>
    )
}

const ViewInfo = (props) => {

    let [componentTable, setComponentTable] = useState();
    let [nameSort, setNameSort] = useState(true);
    let [addressSort, setAddressSort] = useState(true);
    let [odersSort, setOrdersSort] = useState(true);
    let [employeesSort, setEmployeesSort] = useState(true);
    let [totalSort, setTotalSort] = useState(true);

    const handleSort = (e, key) => {
        let sortedTable = componentTable;
        let bool;
        switch(key) {
            case 'StoreName':
                bool = nameSort;
                setNameSort(!nameSort);
                break;
            case 'Address':
                bool = addressSort;
                setAddressSort(!addressSort);
                break;
            case 'Orders':
                bool = odersSort;
                setOrdersSort(!odersSort);
                break;
            case 'Employees':
                bool = employeesSort;
                setEmployeesSort(!employeesSort);
                break;
            case 'Total':
                bool = totalSort;
                setTotalSort(!totalSort);
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
                            <th scope="col">Name
                            <br/>
                                <span>
                                    <button onClick={(e)=>{handleSort(e, 'StoreName')}}>sort</button>
                                </span>
                            </th>
                            <th scope="col">Address
                            <br/>
                                <span>
                                    <button onClick={(e)=>{handleSort(e, 'Address')}}>sort</button>
                                </span>
                            </th>
                            <th scope="col"># Orders
                            <br/>
                                <span>
                                    <button onClick={(e)=>{handleSort(e, 'Orders')}}>sort</button>
                                </span></th>
                            <th scope="col">Employees
                            <br/>
                                <span>
                                    <button onClick={(e)=>{handleSort(e, 'Employees')}}>sort</button>
                                </span></th>
                            <th scope="col">Total
                            <br/>
                                <span>
                                    <button onClick={(e)=>{handleSort(e, 'Total')}}>sort</button>
                                </span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.table.map((e) => {
                                if (e.Total === null) {
                                    return <tr>
                                        <td>{e.StoreName}</td>
                                        <td>{e.Address}</td>
                                        <td>{e.Orders}</td>
                                        <td>{e.Employees}</td>
                                        <td>{0}</td>
                                    </tr>
                                }
                                return <tr>
                                    <td>{e.StoreName}</td>
                                    <td>{e.Address}</td>
                                    <td>{e.Orders}</td>
                                    <td>{e.Employees}</td>
                                    <td>{e.Total}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}

export default ManageStores;