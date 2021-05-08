import React, {useState, useEffect} from 'react'
import * as api from '../../../../api';
import store from '../../../../redux/store';

const ReviewOrder = (props) => {
    
    const username = store.getState().userInfoReducer.Username;
    const storeName = store.getState().userInfoReducer.StoreName;
    const chainName = store.getState().userInfoReducer.ChainName;

    let [order, setOrder] = useState();
    let [table, setTable] = useState();
    let [total, setTotal] = useState(0)

    const totalHandler = (table) => {
        if (table === undefined) {
            return 0
        } else {
            table.map((element) => {
                setTotal(total + element.Price)
            })
            return total
        }
        
    }

    const handleUpdateOrder = (newQuantity) => {
        console.log(newQuantity);
        let newOrder = order;
        for (let item of newOrder) {
            if (item.ItemName === newQuantity[0]) {
                console.log(item.ItemName);
                item.Quantity = newQuantity[1];
                break;
            }
        }
        console.log(newOrder);
        setOrder(newOrder);
    }

    const handlePlaceOrder = () => {
        console.log('The Current Order is: ', order);
        for (const item of order) { // creating two orders. ore more
            console.log("Current Item: ", item);
            api.customerUpdateOrder({
                username: username,
                itemName: item.ItemName,
                quantity: item.Quantity
            }).then((result) => {
                console.log(result);
            }).catch((error) => {
                console.log(error);
            })
        }
        api.finalizeOrder({
            username: username
        }).then((result) => {
            console.log(result);
            props.history.push('/customer');
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        console.log("new order is: ", order);
    }, [order])

    useEffect(() => {
        api.customerReview({
            username: username
        }).then((result) => {
            setOrder(result.data.results);
            setTable(result.data.results);
        }).catch((error) => {
            console.log(error);
        })
        console.log(order);
    }, [])

    return (
        <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '80vh'
        }}>
            <div>
            <div>
                <h1>Customer Review Order</h1>
            </div>
            <div>
                <label>
                    Chain:
                    <input className="inputs" readOnly={true} value={chainName}></input>
                </label>
                <label>
                    Store:
                    <input className="inputs" readOnly={true} value={storeName}></input>
                </label>
            </div>
            <div>
                <ViewInfo propsTable={table} onUpdateOrder={handleUpdateOrder}/>
            </div>
            <br/>
            <div style={{
                display: 'flex', justifyContent: 'center'
            }}>
                <button className="buttons" onClick={() => {props.history.push('/customer')}}>Back</button>
                <button className="buttons" onClick={() => {handlePlaceOrder()}}>Place Order</button>
            </div>
            <br/>
            <div style={{
                display: 'flex', justifyContent: 'center'
            }}>
                <h3>Total: {totalHandler(table)}</h3>
            </div>
            </div>
        </div>
    )
}

const ViewInfo = ({propsTable, onUpdateOrder}) => {

    let [table, setTable] = useState();

    const createSelectValue = (n) => {
        let quantity = []
        for (let i = 0; i <= n; i++) {
            quantity.push(<option key={i}>{i}</option>)
        }
        return quantity;
    }
    
    const handleChangeQuantity = (e) => {
        console.log(`Changed: ${e.target.id}, to: ${e.target.value}`);
        onUpdateOrder([e.target.id, e.target.value])      
    }

    useEffect(() => {
        setTable(propsTable);
    }, [propsTable])

    return(
        <div className="table-wrapper-scroll-y my-custom-scrollbar" >   
            {!table ? <div></div>
            : 
            <table className="table table-bordered table-striped mb-0">
            <thead>
                <tr>
                <th scope="col">Item Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
                {
                table.map((element) => {
                    return <tr key={element.ItemName}>
                    <td>{element.ItemName}</td>
                    <td>
                        <select
                        id={element.ItemName}
                        defaultValue={element.Quantity}
                        onChange={(e) => {handleChangeQuantity(e)}}>
                            {createSelectValue(element.Orderlimit)}
                        </select>
                    </td>
                    <td>{element.Price}</td>
                    </tr>
                })
                }
            </tbody>
            </table>}
        </div>
    )
}

export default ReviewOrder;