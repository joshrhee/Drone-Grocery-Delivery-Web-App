import React, {useState} from 'react';
import * as api from '../../../../api';

const CreateItem = (props) => {

  let [itemName, setItemName] = useState('');
  let [itemType, setItemType] = useState('Dairy');
  let [organic, setOrganic] = useState('Yes');
  let [origin, setOrigin] = useState('');

  const createHandler = async (itemName, itemType, organic, origin) => {
    if (itemName !== '' && origin !== '') {
      console.log("createHandler is started!")
      console.log("Itemname is: ", itemName, " ItemType is: ", itemType, " Organic is: ", organic,
          " Origin is: ", origin);

      return api.createItem({
        itemname: itemName,
        itemtype: itemType,
        organic: organic,
        origin: origin
      })
    }
  }

  return (
    <div>
      <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '70vh'
        }}>
          <div style={{
            display: 'flex', flexDirection: 'column'
          }}>
            <h1>Create Item</h1>

            <br/>
            <div style={{
              display: 'flex', flexDirection: 'row'
            }}>
              <label>Name: </label>
              <input onChange={(e)=>{setItemName(e.target.value)}} ></input>
            </div>
            
            <br/>
            <div style={{
              display: 'flex', flexDirection: 'row'
            }}>
              <label>Type: </label>
              <select onChange={(e)=>{setItemType(e.target.value)}}>
                <option value='Dairy'>Dairy</option>
                <option value='Bakery'>Bakery</option>
                <option value='Meat'>Meat</option>
                <option value='Produce'>Produce</option>
                <option value='Personal'>Personal Care</option>
                <option value='Paper Goods'>Paper Goods</option>
                <option value='Beverages'>Beverages</option>
                <option value='Other'>Other</option>
              </select>
            </div>

            <br/>
            <div style={{
              display: 'flex', flexDirection: 'row'
            }}>
              <label>Organic: </label>
              <select onChange={(e)=>{setOrganic(e.target.value)}}>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </select>
            </div>

            <br/>
            <div style={{
              display: 'flex', flexDirection: 'row'
            }}>
              <label>Origin: </label>
              <input onChange={(e)=>{setOrigin(e.target.value)}}></input>
            </div>

            <br/>
            <div style={{
                display: 'flex', justifyContent: 'center', flexDirection: 'row'
              }}>
                <button onClick={() => {props.history.goBack()}}>Back</button>
                <button onClick={() => {createHandler(itemName, itemType, organic, origin)}}>Create</button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default CreateItem
