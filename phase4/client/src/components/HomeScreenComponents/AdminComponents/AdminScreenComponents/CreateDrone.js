import React, {useEffect, useState} from 'react';
import * as api from '../../../../api';

const CreateDrone = (props) => {

  const droneid = props.location.state.droneID[0].ID + 1;
  const zipTech = props.location.state.data;
  let [zipTechMap, setZipTechMap] = useState();
  let [zipcodes, setZipcodes] = useState();
  let [selectedZipcode, setSelectedZipcode] = useState('');
  let [employee, setEmployee] = useState('');
  let [radius, setRadius] = useState(0);
  

  const matchZipAndTech = (data) => {
    let zipTech = {};
    for (const object of data) {
      if (!zipTech[object.Zipcode]) {
        zipTech[object.Zipcode] = [<option key={object.Username}>{object.Username}</option>]
      } else {
        zipTech[object.Zipcode].push(<option key={object.Username}>{object.Username}</option>);
      }
    }
    return zipTech;
  }

  const handleCreate = () => {
    console.log("create");
    if (radius <= 0) {
      return;
    }
    api.createDrone({
      droneid: droneid,
      radius: radius,
      zipcode: selectedZipcode,
      dronetech: employee
    }).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    setZipTechMap(matchZipAndTech(zipTech));
    setSelectedZipcode(Object.keys(matchZipAndTech(zipTech))[0])
    setZipcodes(Object.keys(matchZipAndTech(zipTech)).map((zip) => <option key={zip}>{zip}</option>));
    console.log(zipTechMap);
  }, [])

  useEffect(() => {
    try {
      setEmployee(zipTechMap[selectedZipcode][0].props.children);
    } catch (error) {
      console.log(error);
    }
  }, [zipTechMap, selectedZipcode]);
  
  return (
    <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          width: '100%', height: '70vh'
      }}>
    <div>
      <div>
        <h1>Create Drone</h1>
      </div>
      <br/>
      <div style={{
        display: 'flex', flexDirection: 'column'
      }}>
        <label>Drone ID: </label>
        <input readOnly={true} value={droneid}></input>
        <label>Associated Zip Code: </label>
        <select onChange={(e) => setSelectedZipcode(e.target.value)}>
          {zipcodes}
        </select>
        <label>Travel Radius: </label>
        <input onChange={(e) => {setRadius(parseInt(e.target.value))}}></input>
        <label>Status: </label>
        <input readOnly={true} value={'Available'}></input>
        <label>Store Associate: </label>
        {!zipTechMap ? <div></div> :
        <select onChange={(e) => {setEmployee(e.target.value)}}>{zipTechMap[selectedZipcode]}</select>}
      </div>
      <br/>
      <div style ={{
        display: 'flex', justifyContent: 'center', flexDirection: 'row'
      }}>
        <button className="buttons" onClick={() => {props.history.goBack()}}>Back</button>
        <button className="buttons" onClick={() => {handleCreate()}}>Create</button>
      </div>
    </div> 
    </div>
  )
}

export default CreateDrone
