import React from 'react';
import store from '../../../redux/store.js';
import * as api from '../../../api';
import './ChainManager.css';

const ChainManager = (props) => {

const userName = store.getState().userInfoReducer.Username;

const getChainName = async () => {
    return api.getChainName({
        chainName: store.getState().userInfoReducer.ChainName
    })
}

const getStores = async () => {
    return api.managerGetStores({
        username: userName,
        storename: 'NULL',
        mintotal: 'NULL',
        maxtotal: 'NULL'
    })
}

const getDrones = async () => {
    return api.managerGetDrones({
        username: userName, 
        droneid: 'NULL', 
        droneradius: 'NULL'
    })
}

    return(
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '70vh'
        }}>
            <div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <br/>
                    <h1>Chain Manager Home</h1>
                    
                    <br/>
                    <br/>
                    <div className="buttons">
                        <div style={{display: 'flex', flexDirection: 'row'}}>

                                {/* Need getStores API call */}
                                <button id="ViewDroneTech" className="buttons" //onClick={()=>{props.history.push("/manager/drone_techs")}}
                                onClick={() => {
                                        getStores()
                                        .then((results) => {
                                            console.log("StoreList is : ", results.data.result);

                                            props.history.push({
                                                pathname: "/manager/drone_techs",
                                                state: {storelist: results.data.result}
                                            })
                                        })
                                        .catch((error) => {
                                            console.log("Fail to get data from getStores()");
                                            console.log(error);
                                        })
                                        
                                    }}
                                    >View Drone
                                <br/>Technicians</button>
                            
                                <button id="ViewDrones" className="buttons" 
                                onClick={() => {
                                    getDrones()
                                    .then((results) => {
                                        console.log("API getDrones() result is: ", results.data.result);
                                        props.history.push({
                                            pathname: "/manager/drones",
                                            state: {drones: results.data.result}
                                        })
                                    })
                                    .catch((error) => {
                                        console.log("Fail to get data from getDrones()");
                                        console.log(error);
                                    })
                                    
                                    }}>View Drones</button>
                        </div>  
                        
                    </div>

                    <br/>
                    <div className="buttons">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                <button id="ChainItem" className="buttons" 
                                onClick={() => {
                                    getChainName()
                                    .then((results) => {
                                        console.log("getChainName from ChainManager is: ", results)
                                        props.history.push({
                                            pathname: "/manager/create_item",
                                            state: {items: results.data.items, plu: results.data.plu}
                                        })
                                    })
                                    }}>Create
                                <br/>Chain Item</button>
                            
                                <button id="manageStores" className="buttons" 
                                onClick={() => {
                                    getStores()
                                    .then((results) => {
                                        console.log("getStores from ChainManager is: ", results)
                                        props.history.push({
                                            pathname: "/manager/stores",
                                            state: {getStores: results.data.result}
                                        })
                                    })
                                }}
                                >Manage Stores</button>
                            
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChainManager;