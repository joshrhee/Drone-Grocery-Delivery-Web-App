import React, {useState} from 'react'
import * as api from '../../../../api';

const CreateChain = (props) => {

  let [chainName, setChainName] = useState();
  let [success, setSuccess] = useState(false);
  let [queryError, setError] = useState(false);

  const handleCreateChain = async () => {
    if (!chainName) {
        setError(true);
        return;
    } else {
        return api.createChain({
                chainname: chainName
            }).then(() => {
                setSuccess(true);
            }).catch((error) => {
                setError(true);
            })
    }
  }

  return (
    <div>
      <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '20vh'
        }}>
          <h1>Create Grocery Chain</h1>
      </div>
      <div>
        <label>Grocery Chain Name: </label>
        <input className="inputs" onChange={(e) => {setChainName(e.target.value)}}></input>
      </div>
      <br/>
      <div style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'center'
      }}> 
          <button className="buttons" onClick={() => {props.history.goBack()}}>Back</button>
          <button className="buttons" onClick={() => {handleCreateChain()}}>Create Chain</button>
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
                            <p> Failed to create chain </p>
                            <button onClick={() => setError(false)}>Close</button>
                        </div>
                    )
                    : null
            }
        </div>
    </div>
  )
}

export default CreateChain
