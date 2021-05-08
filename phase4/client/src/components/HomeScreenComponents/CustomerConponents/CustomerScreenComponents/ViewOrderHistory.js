import React, {useEffect, useState} from 'react';
import store from '../../../../redux/store'
import * as api from '../../../../api';

const ViewOrderHistory = (props) => {
    const username = store.getState().userInfoReducer.Username;
    let [orderIDs, setOrderIDs] = useState([]);
    let [currentID, setCurrentID] = useState(null);
    let [totalAmount, setTotalAmount] = useState('');
    let [totalItems, setTotalItems] = useState('');
    let [datePurchased, setDatePurchased] = useState('');
    let [droneID, setDroneID] = useState('');
    let [storeAssociate, setStoreAssociate] = useState('');
    let [status, setStatus] = useState('');

    const getOrderIDs = async () => {
        return api.customerGetOrderNumbers({
            username: username
        });
    }

    useEffect(() => {
        getOrderIDs()
            .then((result) => {
                // console.log(result.data.results);
                setOrderIDs(result.data.results);
                handleIDChange(result.data.results[0].ID)
            }).catch((error) => {
                console.log(error)
        })
    }, []);

    useEffect(() => {
        console.log(orderIDs);
    }, [orderIDs]);

    const getOrderInfo = async () => {
        api.customerGetHistory({
            username: username,
            orderID: currentID
        }).then((result) => {
            console.log(result.data.results);
            setTotalAmount(result.data.results[0].total_amount);
            setTotalItems(result.data.results[0].total_items);
            setDatePurchased(result.data.results[0].orderdate);
            setStatus(result.data.results[0].orderstatus);
            setDroneID(result.data.results[0].droneID === null ? '' : result.data.results[0].droneID);
            setStoreAssociate(result.data.results[0].dronetech === null ? '' : result.data.results[0].dronetech)
        }).catch ((error) => {
            console.log(error);
        })
    }

    const handleIDChange = (e) => {
        console.log(e);
        setCurrentID(e);
    }

    useEffect(() => {
        console.log(currentID);
        getOrderInfo();
    }, [currentID]);


    const orderIDsIndex = orderIDs.map((object, i) => <option key={i}>{object['ID']}</option>);

    return (
        <div>
            <div>
                <h1>Customer View Order History</h1>
            </div>
            {/*<div>*/}
            {/*    <button onClick={() => console.log(orderIDs)}>Test</button>*/}
            {/*</div>*/}
            <div>
            <label>
                Username:
                <input className="inputs" readOnly={true} value={username}></input>
            </label>
            </div>
            <div>
                <label>
                    Order ID:
                    <select defaultValue={''} onChange={(e) => {handleIDChange(e.currentTarget.value)}}>
                        {orderIDsIndex}
                    </select>
                </label>
            </div>
            <div>
            <label>
                Total Amount:
                <input className="inputs" readOnly={true} value={totalAmount}></input>
            </label>
            </div>
            <div>
            <label>
                Total Items:
                <input className="inputs" readOnly={true} value={totalItems}></input>
            </label>
            </div>
            <div>
            <label>
                Date of Purchase:
                <input className="inputs" readOnly={true} value={datePurchased}></input>
            </label>
            </div>
            <div>
            <label>
                Drone ID:
                <input className="inputs" readOnly={true} value={droneID}></input>
            </label>
            </div>
            <div>
            <label>
                Store Associate:
                <input className="inputs" readOnly={true} value={storeAssociate}></input>
            </label>
            </div>
            <div>
            <label>
                Status:
                <input className="inputs" readOnly={true} value={status}></input>
            </label>
            </div>

            <div>
                <button onClick={() => {props.history.goBack()}}>Back</button>
            </div>
        </div>
    )
}

export default ViewOrderHistory;