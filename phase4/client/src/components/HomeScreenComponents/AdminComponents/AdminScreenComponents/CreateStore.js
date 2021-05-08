import React, {useState, useEffect} from 'react';
import * as api from '../../../../api';

const CreateStore = (props) => {

  const selectChain = props.location.state.data.map((object, i) => <option key={i}>{object.ChainName}</option>)
  let [storeName, setStoreName] = useState('');
  let [chainName, setChainName] = useState('');
  let [street, setStreet] = useState('');
  let [city, setCity] = useState('');
  let [state, setState] = useState('AL');
  let [zip, setZip] = useState('');
  let [success, setSuccess] = useState(false);
  let [queryError, setError] = useState(false);

  // get chain list when entering
  const handleSetChain = (e) => {
    setChainName(e.target.value);
  }

  const handleSetStoreName = (e) => {
    // set store
    setStoreName(e.target.value);

  }

  const handleSetStreet = (e) => {
    // set street;
    setStreet(e.target.value);
  }

  const handleSetCity = (e) => {
    // set city;
    setCity(e.target.value);
  }

  const handleSetState = (e) => {
    setState(e.target.value);
  }

  const handleSetZip = (e) => {
    setZip(e.target.value);
  }

  const handleCreateStore = () => {
    chainName = !chainName ? document.getElementById("ChainSelect").value : chainName;
    // console.log(`${chainName}, ${storeName}, ${street}, ${city}, ${state}, ${zip}`);
    api.createStore({
      storename: storeName,
      chainname: chainName,
      street: street,
      city: city,
      state: state,
      zipcode: zip
    }).then((result) => {
      console.log(result);
      setSuccess(true);
      setError(false);
    }).catch((error) => {
      console.log(error);
      setError(true);
      setSuccess(false);
    })
  }

  useEffect(() => {
    console.log("Use Effect of Create Store")
  }, [])

  return (
    <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          width: '100%', height: '70vh'
      }}>
        <div>
        <h1>Create Store</h1>
        <br/>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <h3>Affiliated Grocery Chain: </h3>
          <select id="ChainSelect" onChange={(e) => {handleSetChain(e)}}>{selectChain}</select>
        </div>
        <br/>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <h3>Grocery Store Location Name: </h3>
          <input onChange={(e) => {handleSetStoreName(e)}}></input>
        </div>
        <br/>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <h3>Street:</h3>
          <input onChange={(e) => {handleSetStreet(e)}}></input>
        </div>
        <br/>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <h3>City: </h3>
          <input onChange={(e) => {handleSetCity(e)}}></input>
          <h3>State: </h3>
          <select onChange={(e) => {handleSetState(e)}}>
           	<option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AR">AR</option>	
            <option value="AZ">AZ</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DC">DC</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="IA">IA</option>	
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="MA">MA</option>
            <option value="MD">MD</option>
            <option value="ME">ME</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MO">MO</option>	
            <option value="MS">MS</option>
            <option value="MT">MT</option>
            <option value="NC">NC</option>	
            <option value="NE">NE</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>			
            <option value="NV">NV</option>
            <option value="NY">NY</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WI">WI</option>	
            <option value="WV">WV</option>
            <option value="WY">WY</option>
          </select> 
          <h3>ZIP: </h3>
          <input onChange={(e) => {handleSetZip(e)}}></input>
        </div>
        <br/>
        <div style={{display: 'flex', flexDirection:'row', justifyContent: 'center'}}>
            <button className="buttons" onClick={() => {props.history.goBack()}}>Back</button>
            <button className="buttons" onClick={() => {handleCreateStore()}}>Create</button>
        </div>
          <div>
            {
              success === true
                  ? (
                      <div>
                        <p> Success </p>
                        <button onClick={() => setSuccess(false)}>Close</button>
                      </div>
                  )
                  : null
            }
          </div>
          <div>
            {
              queryError === true
                  ? (
                      <div>
                        <p> Failed to create store - possible duplicate or same ZIP </p>
                        <button onClick={() => setError(false)}>Close</button>
                      </div>
                  )
                  : null
            }
          </div>
        </div>
    </div>
  )
}

export default CreateStore
