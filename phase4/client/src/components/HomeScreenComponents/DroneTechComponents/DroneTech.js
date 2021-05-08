import React from 'react';

const DroneTech = (props) => {
    return(
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '70vh'
        }}>
            <div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <br/>
                    <h1>Drone Technician Home</h1>
                    
                    <br/>
                    <br/>
                    <div className="buttons">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <button className="buttons" onClick={() => {props.history.push("/drone_tech/view_store_orders")}}>View Store 
                                <br/>Orders</button>
                            <button className="buttons" onClick={() => {props.history.push("/drone_tech/track_assigned_drones")}}>Track Drone 
                                <br/>Delivery</button>
                        </div>
                    </div>
                            
                </div>
            </div>
        </div>
    )
}

export default DroneTech;