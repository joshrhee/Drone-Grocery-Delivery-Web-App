import React, {useState} from 'react';
import store from '../../../../redux/store.js';
import * as api from '../../../../api';

//Create buttons needs to be implemented!!!!
const CreateChainItem = (props) => {

    const items = props.location.state.items;
    const select_items = items.map((object, i) => <option value={object['ItemName']} key={i}>{object['ItemName']}</option>);
    const chainName = store.getState().userInfoReducer.ChainName;
    const plu = props.location.state.plu[0].PLU;
    let [item, setItem] = useState(`${items[0].ItemName}`);
    let [quantity, setQuantity] = useState('');
    let [order, setOrder] = useState('');
    let [price, setPrice] = useState('');

    const createHandler = async (item, quantity, order, price) => {
        console.log("createHandler is started!")
        console.log("Chainname is: ", chainName, " item is: ", item, " quantity is: ", quantity,
        " order is: ", order, " pluNumber is: ", plu, " Price is: ", price);

        return api.createChainItem({
            chainname: chainName,
            itemname: item,
            quantity: quantity,
            orderlimit: order,
            plunumber: plu,
            price: price
        })
    }

    return(
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '70vh'
        }}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <br/>
                <br/>
                <h1>Chain Manager Create Chain Item</h1>
                <br/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <h3>Chain Name:</h3>
                    <input readOnly={true} value={chainName}></input>
                </div>

                <br/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <h3>Item:</h3>
                    <select onChange={(e)=>{setItem(e.target.value)}}>
                        {select_items}
                    </select>
                    {console.log("Item is: ", item)}
                </div>
                <br/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <h3>Quantity Available:</h3>
                    <input onChange={(e)=>{setQuantity(e.target.value)}}></input>
                </div>

                <br/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <h3>Limit Per Order:</h3>
                    <input onChange={(e)=>{setOrder(e.target.value)}}></input>
                </div>

                <br/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <h3>PLU Number:</h3>
                    <input readOnly={true} value={plu}></input>
                </div>

                <br/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <h3>Price per Unit $</h3>
                    <input onChange={(e)=>{setPrice(e.target.value)}}></input>
                </div>

                <br/>
                <br/>
                <br/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <button className="backButton" onClick={() => {props.history.push('/manager')}}>Back</button>
                    <button className="createButton" onClick={()=>{
                        createHandler(item, quantity, order, price)
                        .then((result) => {
                            console.log(result);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                        }}>Create</button>
                </div>
            </div>

            
        </div>
    )
}

export default CreateChainItem;