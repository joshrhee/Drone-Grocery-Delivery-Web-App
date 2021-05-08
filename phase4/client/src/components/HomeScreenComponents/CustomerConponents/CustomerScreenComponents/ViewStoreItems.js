import React, {useState, useEffect} from 'react'
import store from '../../../../redux/store'
import * as api from '../../../../api';
import { CHAIN_NAME, STORE_NAME } from '../../../../redux/subscribers/type';

const ViewStoreItems = (props) => {
    
    const username = store.getState().userInfoReducer.Username;
    const userChainStores = props.location.state.chainStore.length === 0 ? [{ChainName: '', StoreName: ''}] : props.location.state.chainStore;
    const selectStore = userChainStores.map((object, i) => <option key={i}>{`${object['ChainName']}: ${object['StoreName']}`}</option>)
    let [chain, setChain] = useState(userChainStores[0].ChainName);
    let [stores, setStores] = useState(userChainStores[0].StoreName);
    let [category, setCategory] = useState('');
    let [table, setTable] = useState();
    let [order, setOrder] = useState({});
    
    
    const handleStoreChange = (e) => {
        console.log(e.target.value);
        setChain(e.target.value.split(": ")[0])
        setStores(e.target.value.split(": ")[1], () => {
            getItems();
        });
    }

    const handleCategoryChange = async (e) => {
        setCategory(e, () => {getItems()})

    }

    const onChangeOrder = (newOrder) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            [newOrder[0]]: newOrder[1]
        }), console.log(order)); // do customer_select_items;
    }

    const handlePlaceOrder = async () => {
        if (order === null || Object.keys(order).length > 0) {
        store.dispatch({
            type: CHAIN_NAME,
            payload: chain
        })
        store.dispatch({
            type:STORE_NAME,
            payload: stores
        })
        for (const [key, value] of Object.entries(order)) {
            if (value === 0) {
                continue;
            } else {
                // api call
                api.customerOrder({
                    username: username,
                    chainName: chain,
                    storeName: stores,
                    itemName: key,
                    quantity: value
                }).then((result) => {
                    console.log(result.data.result);
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
        props.history.push('/customer/review_order'); 
        // move to next screen
    }
    }

    const getItems = async () => {
        if (chain === '' || !chain || !stores || stores === '') {
            throw new Error("No Stores in your area")
        }
        console.log(`${username}, ${category}, ${chain}, ${stores}`)
        return api.customerGetStores({
            username: username,
            chainName: chain,
            storeName: stores,
            itemType: category === '' || category === null ? 'ALL' : category
        })
    }

    useEffect(() => {
        getItems()
        .then((result) => {
            setTable(result.data.results);
            console.log("Table is: ", table);
        }).catch((error) => {
            console.log("Error get items", error);
        })
        console.log(userChainStores);
    }, [category, stores]);

    useEffect(() => {
        console.log("order: ", order);
    },[order])

    return (
        <div  style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '80vh'
        }}>
        <div>
            <div>
                <h1>Customer View Store Items</h1>
            </div>
            <div>
                <label>
                    Username:
                    <input className="inputs" readOnly={true} defaultValue={username}></input>
                </label>
                <label>Store:</label>
                <select defaultValue={userChainStores[0]} onChange={(e) => {handleStoreChange(e)}}>
                    {selectStore}
                </select>
            </div>
            <div>
                <label>Category:</label>
                <select defaultValue={'ALL'} onChange={(e) => {handleCategoryChange(e.target.value)}}>
                    <option>ALL</option>
                    <option>Produce</option>
                    <option>Diary</option>
                    <option>Bakery</option>
                    <option>Meat</option>
                    <option>Personal Care</option>
                    <option>Beverages</option>
                    <option>Other</option>
                    <option>Paper Goods</option>
                </select>
            </div>
            <br />
            <ViewInfo propsTable={table} onChangeOrder={onChangeOrder}/>
            <br />
            <div style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center'
            }}>
                <button className="buttons" onClick={() => {props.history.goBack()}}>Cancel Order</button>
                <button className="buttons" onClick={() => {handlePlaceOrder()}}>Place Order</button>
            </div>
        </div>
        </div>
    )
}

const ViewInfo = ({propsTable, onChangeOrder}) => {

    let [table, setTable] = useState();
    let [order, setOrder] = useState({});


    const createDropDown = (n) => {
        let quantity = [];
        for (let i = 0; i <= n; i++) {
            quantity.push(<option key={i}>{i}</option>);
        }
        return quantity;
    }

    const handleSelectItem = (e) => {
        console.log(`Selected: ${e.target.id}, Amount: ${e.target.value}`)
        setOrder(prevOrder => ({
            ...prevOrder,
            [e.target.id]: parseInt(e.target.value)
        }));
        onChangeOrder([e.target.id, parseInt(e.target.value)]);
    }

    useEffect(() => {
        setTable(propsTable);
        console.log(order);
    }, [propsTable, order])

    return (
        <div className="table-wrapper-scroll-y my-custom-scrollbar" >      
            {!table || table.length === 0 ? <div><h2>There are no stores in your area</h2></div>
            : 
            <table className="table table-bordered table-striped mb-0">
            <thead>
                <tr>
                <th scope="col">Item Name</th>
                <th scope="col">Quantity</th>
                </tr>
            </thead>
            <tbody>
                {
                table.map((element) => {
                    return <tr key={element.chainitemname} id={element.chainitemname}>
                    <td>{element.chainitemname}</td>
                    <td>
                        <select
                        id={element.chainitemname}
                        onChange={(e) => {handleSelectItem(e)}}>
                            {createDropDown(parseInt(element.orderlimit))}
                        </select>
                    </td>
                    </tr>
                })
                }
            </tbody>
            </table>}
        </div>
    )
}

export default ViewStoreItems;