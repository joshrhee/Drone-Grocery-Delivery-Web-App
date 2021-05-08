import React from 'react';
import * as api from '../../../api';
import store from '../../../redux/store';
import './Customer.css';

const Customer = (props) => {

    const username = store.getState().userInfoReducer.Username;

    return(
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '70vh'
        }}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <br/>
                <h1>Customer Home</h1>
                
                <br/>
                <br/>
                <div className="buttons">
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <button className="buttons" onClick={() => {props.history.push("/customer/change_cc_info")}}>Change Credit
                            <br/>Card Info</button>
                        <button className="buttons" onClick={() => {props.history.push("/customer/review_order")}}>Review Order</button>
                    </div> 
                </div>

                <br/>
                <div className="buttons">
                <div style={{display: 'flex', flexDirection: 'row'}}>
                        <button className="buttons" onClick={() => {props.history.push("/customer/view_order_history")}}>View Order
                            <br/>History</button>
                        <button className="buttons" onClick={() => {
                            api.customerGetAvailableStores({
                                username: username
                            }).then((result) => {
                                console.log(result);
                                props.history.push({
                                    pathname: "/customer/view_store_items",
                                    state: {chainStore: result.data.result}
                                })
                            }).catch((error) => {
                                console.log(error);
                            })
                            // props.history.push("/customer/view_store_items")
                        }}><p>View Store <br/>Items</p></button>
                    </div>  
                </div>
            </div>
        </div>
        
    )
}

export default Customer;