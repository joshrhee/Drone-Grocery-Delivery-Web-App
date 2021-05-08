import React from 'react';

import * as api from '../../../api';

import '../HomeScreen.css';

const Admin = (props) => {
    return(
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '70vh'
        }}>
            <div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <br/>
                    <h1>Admin Home</h1>
                    
                    <br/>
                    <br/>
                    <div className="buttons">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <button className="buttons" onClick={() => {
                                props.history.push('/admin/create_item')
                            }}>Create Item</button>

                            {/* Need zipcode of stores and employee list for each*/}
                            <button className="buttons" onClick={() => {
                                api.getZipcodeAndEmployee({})
                                .then((result) => {
                                    console.log(result.data)
                                    props.history.push({
                                        pathname: '/admin/create_drone',
                                        state: {data: result.data.result,
                                                droneID: result.data.drone}
                                    })
                                }).catch((error) => {
                                    console.log(error);
                                })
                                
                            }}>Create Drone</button>
                            <button className="buttons" onClick={() => {
                                props.history.push('/admin/view_customer')
                            }}>View Customer<br/>Info</button>
                        </div>  
                        
                    </div>

                    <br/>
                    <div className="buttons">
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                            <button className="buttons" onClick={() => {
                                props.history.push('/admin/create_chain')
                            }}>Create Grocery<br/>Chain</button>

                            {/* Need list of chains */}
                            <button className="buttons" onClick={() => {
                                api.getChains({})
                                .then((result) => {
                                    console.log(result);
                                    props.history.push({
                                        pathname: '/admin/create_store',
                                        state: {data: result.data.result}
                                    })
                                }).catch((error) => {
                                    console.log(error);
                                })
                            }}>Create Store</button>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Admin;