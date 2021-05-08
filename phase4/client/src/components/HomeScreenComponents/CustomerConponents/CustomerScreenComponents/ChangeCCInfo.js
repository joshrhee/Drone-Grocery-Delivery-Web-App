import React, {useReducer, useState} from 'react'
import * as api from '../../../../api';
import store from '../../../../redux/store';

const ChangeCCInfo = (props) => {

    const username = store.getState().userInfoReducer.Username;
    const firstName = store.getState().userInfoReducer.FirstName;
    const lastName = store.getState().userInfoReducer.LastName;
    let [creditCardNumber, setCCNumber] = useState("");
    let [securityCode, setSecurityCode] = useState("");
    let [expDate, setExpDate] = useState("");

    let [success, setSuccess] = useState(false);
    let [wrongInfo, setWrongInfo] = useState(false);

    const setCard = async () => {
        return api.setCard({
            username: username,
            newCCNumber: creditCardNumber,
            newCVV: securityCode,
            newExpDate: expDate
        })
            .then(() => {
                setSuccess(true);
            }).catch((error) => {
                console.log(error);
            })
    };

    const ccHandler = () => {
        let d = new Date().toISOString().split('T')[0];
        // let month = d.getUTCMonth() + 1;
        // let year = d.getUTCFullYear();
        // let day = d.getUTCDay();
        // let current = year + '-' + month + '-' + day;
        // console.log(d);
        // console.log(expDate < d);
        // console.log(current);
        if (creditCardNumber.length !== 16 || securityCode.length !== 3 || expDate < d) {
            setWrongInfo(true);
        } else {
            // console.log(expDate);
            setCard();
        }
    }

    return (
        <div>
            <div>
                <h1>Change Credit Card Information</h1>
            </div>
            <br/>
            <div style={{
                direction: 'flex'
            }}>
                <h5>Username: <input type="text" value={username} readOnly={true}/></h5>
                <h5>First Name: <input type="text" value={firstName} readOnly={true}/></h5>
                <h5>Last Name: <input type="text" value={lastName} readOnly={true}/></h5>
                <h5>New Credit Card Number: <input type="text" value={creditCardNumber} onChange={(e) => {setCCNumber(e.currentTarget.value)}}/></h5>
                <h5>CVV: <input type="text" value={securityCode} onChange={(e) => {setSecurityCode(e.currentTarget.value)}}/></h5>
                <h5>Expiration Date: <input type="date" value={expDate} onChange={(e) => {setExpDate(e.currentTarget.value)}}/></h5>
            </div>
            <br/>
            <div style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center'
            }}>
                <button className="buttons" onClick={() => {ccHandler()}}>Approve</button>
                {/*<button onClick={() => {console.log(store.getState())}}>Dev_Log</button>*/}
 
                <button className="buttons" onClick={() => {props.history.goBack()}}>Back</button>

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
                    wrongInfo === true
                        ? (
                            <div>
                                <p> Something is wrong with your Credit Card Information </p>
                                <button onClick={() => setWrongInfo(false)}>Close</button>
                            </div>
                        )
                        : null
                }
            </div>
        </div>
    )
}

export default ChangeCCInfo;