import React, {useState, useEffect} from 'react';
import store from '../../../../redux/store.js';
import * as api from '../../../../api';


import '../ChainManager.css';


const ViewDroneTech = (props) => {

    const chainName = store.getState().userInfoReducer.ChainName;
    // create stores options list from the props
    const stores = props.location.state.storelist.map((object, i) => <option key={i}>{object['StoreName']}</option>);
    let [table, setTable] = useState();
    let [username, setUsername] = useState(); // set from inpus
    let [storeName, setStoreName] = useState();

    const handleFilter = async (storeName='NULL', username='NULL') => {
        // make sure to have the correct inputs here
        console.log(`Username is: ${username}, Store name is: ${storeName}`)
        api.getDroneTechs({
            storename: storeName === 'NULL' ? storeName : `'${storeName}'`, // change this to storeName later
            username: username === 'NULL' ? username : `'${username}'`, // change this to username later
            chainname: chainName
        }).then((result) => {
            console.log("Success: Fetched Drone Techs")
            setTable(result.data.result);
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleReset = () => {
        console.log("RESET");
        handleFilter();
    }

    useEffect(() => {
        console.log(chainName);
        console.log(stores);
        handleFilter()
    }, [])

    useEffect(() => {
        console.log(table);
    }, [table])

    return(
        <div className="ViewDroneTech" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '90vh'
        }}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {console.log("StoreList from previous page is: ", )}
                <br/>
                <h1>Chain Manager View Drone Technicians</h1>
            
                <br/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <h3>Chain:</h3>
                    <input value={chainName} readOnly={true}></input>

                    {/* Make local username state 
                    When Filter button clicked, Just show username's info
                     */}
                    <h3>Username:</h3> 
                    <input onChange={(e) => {setUsername(e.target.value)}}></input>
                </div>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <h3>Location:</h3>
                    <select onChange={(e) => {setStoreName(e.target.value)}}>
                        <option>NULL</option>
                        {stores}
                    </select>

                    {/* When Filter clicked, */}
                    <button className="buttons"
                        onClick={() => {
                            handleFilter(storeName, username);
                            }}>Filter</button> 
                    
                </div>

                <br/>
                <ViewInfo table={table}/>

                <br/>
                <div style={{display: 'flex', flexDirection: 'row'}}>

                    <button className="backButton" onClick={() => {props.history.push('/manager')}}>Back</button>
                    <button className="buttons" onClick={() => {handleReset()}}>Reset</button>
                    <button className="buttons">Save</button>

                </div>
            </div>
            
        </div>
    )
}


const ViewInfo = ({table}) => {

    useEffect(() => {
        console.log("Table is changed: ", table);
    }, [table])

    return(
        <div className="table-wrapper-scroll-y my-custom-scrollbar" >
        {
            !table ? <div></div> :
            <table className="table table-bordered table-striped mb-0">
            <thead>
                <tr>
                <th scope="col">Username</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
                </tr>
            </thead>
            <tbody>
                {
                table.map((e) => {
                    return <tr>
                        <td>{e.Username}</td>
                        <td>{e.FullName}</td>
                        <td>{e.Location}</td>
                    </tr>
                    })
                }
                
            </tbody>
            </table>
        }
            
        </div>
    )
}

export default ViewDroneTech;