import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Nav } from 'react-bootstrap';

import store from '../../redux/store.js';
import * as api from '../../api';

import RegisterCustomer from './jobComponents/RegisterCustomer.js';
import RegisterEmployee from './jobComponents/RegisterEmployee.js';
import {FIRST_NAME, STREET, LAST_NAME, CITY, USER_NAME, STATE, PASSWORD, ZIP, CHAIN_NAME, 
    CVV, EXP, STORE_NAME, CARD_NUMBER} from '../../redux/subscribers/type.js';

const Register = (props) => {

    //Password Confirm is not useful, so just using useState and not saving at the store.js
    let [passConfirm, setPassConfirm] = useState("");
    const passConfirmHandler = (e) => {setPassConfirm(e.currentTarget.value)};

    let [isInputEmpty, setIsInputEmpty] = useState(false);
    let [passwordLengthAlert, setPasswordLengthAlert] = useState(false);
    let [zipLengthAlert, setZipLengthAlert] = useState(false);
    let [confirmLengthAlert, setConfirmLengthAlert] = useState(false);
    let [passwordNotSame, setPasswordNotSame] = useState(false);
    //If register as an customer, isCustomer is true. If register as an employee, is Customer is false
    let [isCustomer, setIsCustomer] = useState(true);
    let [CcnNumberLengthAlert, setCcnNumberLengthAlert] = useState(false);
    let [CvvLengthAlert, setCvvLengthAlert] = useState(false);
    let [postSucceed, setPostSucceed] = useState(true);

    const handlePosingInfo = async (e) => {

        //Preventing empty inputs
        if (store.getState().userInfoReducer.FirstName === ""
        || store.getState().userInfoReducer.Street === ""
        || store.getState().userInfoReducer.LastName === ""
        || store.getState().userInfoReducer.City === ""
        || store.getState().userInfoReducer.Username === ""
        || store.getState().userInfoReducer.State === ""
        || store.getState().userInfoReducer.Pass === ""
        || store.getState().userInfoReducer.Zipcode === "") {
            setIsInputEmpty(true);
                return
        }

        //Checking Password typed bigger than length 8
        let passwordInput = document.getElementById("Password").value;
        if (passwordInput.length < 8) {
            setPasswordLengthAlert(true);
            return
        }

        //Checking Zipcode typed exactly length 5
        let zipInput = document.getElementById("Zip").value;
        if (zipInput.length < 5) {
            setZipLengthAlert(true);
            return
        }

        //Checking Password Confirm typed bigger than length 8
        let cofirmInput = document.getElementById("Confirm").value;
        if (cofirmInput.length < 8) {
            setConfirmLengthAlert(true);
            return
        }

        //Checking password and confirm password is same or not
        if (store.getState().userInfoReducer.Pass !== passConfirm) {
            setPasswordNotSame(true);
            return
        }

        if (isCustomer) {
            //Preventing empty inputs for customer 
            if (store.getState().userInfoReducer.CcNumber === ""
            || store.getState().userInfoReducer.CVV === ""
            || store.getState().userInfoReducer.EXP_DATE === "") {
                setIsInputEmpty(true);
                return
            }

            let CcnNumberInput = document.getElementById("CcnNumber").value;
            if (CcnNumberInput.length < 16) {
                setCcnNumberLengthAlert(true);
                return
            }

            let CvvInput = document.getElementById("CVV").value;
            if (CvvInput.length < 3) {
                setCvvLengthAlert(true);
                return
            }

            // Preventing both customer and employee states has values.
            // User should register either customer or employee
            store.dispatch({
                type: STORE_NAME,
                payload: ""
            })
            store.dispatch({
                type: CHAIN_NAME,
                payload: ""
            })
            
        } else {
            //Preventing empty inputs for employee
            if (store.getState().userInfoReducer.ChainName === "") {
                setIsInputEmpty(true);
                return
            }
            // Preventing both customer and employee states has values.
            // User should register either customer or employee
            store.dispatch({
                type: CARD_NUMBER,
                payload: ""
            })
            store.dispatch({
                type: CVV,
                payload: ""
            })
            store.dispatch({
                type: EXP,
                payload: ""
            })
        }

        console.log("props: ", props);
        console.log("Current state is: ", store.getState());
        api.register({type: isCustomer, data: store.getState().userInfoReducer})
        .then((result)=>{
            console.log(result);
            console.log("Succeed to post data!");
            props.history.push('/')
        })
        .catch((error)=>{
            console.log("Fail to post data...");
            console.log(error);
            setPostSucceed(false);
        })
    }


    return (
        <div>
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '100%', height: '70vh'
            }}>
                <form name="registerForm" style={{display: 'flex', flexDirection: 'column'}}>

                    <div>
                        <br/>
                            <h1>Register</h1>

                        <br/>
                        <form style={{display: 'flex', flexDirection: 'row'}}>
                            <h4>First Name: </h4>
                            <input id="FirstName" type="text" onChange={props.onUpdateFirstName}></input>
                            <h4>Street: </h4>
                            <input id="Street" type="text" onChange={props.onUpdateStreet}></input>
                        </form>

                        <br/>
                        <form style={{display: 'flex', flexDirection: 'row'}}>
                            <h4>Last Name: </h4>
                            <input id="LastName" type="text" onChange={props.onUpdateLastName}></input>
                            <h4>City: </h4>
                            <input id="City" type="text" onChange={props.onUpdateCity}></input>
                        </form>

                        <br/>
                        <form style={{display: 'flex', flexDirection: 'row'}}>
                            <h4>Username: </h4>
                            <input id="Username" type="text" onChange={props.onUpdateUserName}></input>
                            <h4>State: </h4>
                            <select id="State" onChange={props.onUpdateState}>
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
                            {/* <input id="State" type="text" maxLength="2" onChange={props.onUpdateState}></input> */}
                        </form>

                        <br/>
                        <form style={{display: 'flex', flexDirection: 'row'}}>
                            <h4>Password: </h4>
                            <input id="Password" type="password" onChange={props.onUpdatePassword}></input>
                            <h4>Zip: </h4>
                            <input id="Zip" type="text" maxLength="5" onChange={props.onUpdateZip}></input>
                        </form>

                        <br/>
                        <form style={{display: 'flex', flexDirection: 'row'}}>
                            <h4>Confirm: </h4>
                            <input id="Confirm" type="password" onChange={passConfirmHandler}></input>
                        </form>
                    </div>

                    <br/>
                    <div>
                        <Nav fill variant="tabs" defaultActiveKey="/home">
                            <Nav.Item>
                                <Nav.Link onClick={()=>{setIsCustomer(true)}}>Customer</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={()=>{setIsCustomer(false);}}>Employee</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    
                    <br/>
                    <form style={{display: 'flex', flexDirection: 'row'}}>
                        {/* Using Redux, so we don't have to send props */}
                            {
                                isCustomer === true
                                ? <RegisterCustomer/>
                                : <RegisterEmployee/>
                            }
                    </form>
                    
                    <br/>
                </form>
            </div>

            <br/>
            <div>
                {/* Post user input information to the server
                and go back to Login page */} 
                <button onClick={(e)=>{handlePosingInfo(e)}}>Register</button>
            </div>

            {
                isInputEmpty === true
                ? (
                    <div className="inputEmpty-alert">
                        <p>"You need to fill out all informations"</p>
                        <button onClick={()=>{setIsInputEmpty(false)}}>close</button>
                    </div>
                )
                : null
            }

            {
                passwordLengthAlert === true
                ? (
                    <div className="password-alert">
                        <p>"Password should be at least 8 length of characters"</p>
                        <button onClick={()=>{setPasswordLengthAlert(false)}}>close</button>
                    </div>
                )
                : null
            }

            {
                zipLengthAlert === true
                ? (
                    <div className="zip-alert">
                        <p>"Zip code length must be 5 digits"</p>
                        <button onClick={()=>{setZipLengthAlert(false)}}>close</button>
                    </div>
                )
                : null
            }

            {
                confirmLengthAlert === true
                ? (
                    <div className="confirm-alert">
                        <p>"Password Confirm should be at least 8 length of characters"</p>
                        <button onClick={()=>{setConfirmLengthAlert(false)}}>close</button>
                    </div>
                )
                : null
            }

            {
                passwordNotSame === true
                ? (
                    <div className="confirm-alert">
                        <p>"Check your Password confirm"</p>
                        <button onClick={()=>{setPasswordNotSame(false)}}>close</button>
                    </div>
                )
                : null
            }

            {
                CcnNumberLengthAlert === true
                ? (
                    <div className="ccnNumber-alert">
                        <p>"Credit card number should be 16 digits"</p>
                        <button onClick={()=>{setCcnNumberLengthAlert(false)}}>close</button>
                    </div>
                )
                : null
            }

            {
                CvvLengthAlert === true
                ? (
                    <div className="ccnNumber-alert">
                        <p>"CVV should be 3 digits"</p>
                        <button onClick={()=>{setCvvLengthAlert(false)}}>close</button>
                    </div>
                )
                : null
            }

            {
                postSucceed === true
                ? null
                :(
                    <div className="login-alert">
                        <p>"Something wrong in your information. Please check and retry."</p>
                        <button onClick={()=>{setPostSucceed(true)}}>close</button>
                    </div>
                )
            }
        </div>
        
    )
}

const mapStateToProps = (state) => {
    return {
        FirstName: state.FirstName,
        Street: state.Street,
        LastName: state.LastName,
        City: state.City,
        Username: state.Username,
        State: state.State,
        Pass: state.Pass,
        Zipcode: state.Zipcode
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        onUpdateFirstName: (e) => {
            dispatch({
                type: FIRST_NAME,
                payload: e.currentTarget.value
            })
        },
        onUpdateStreet: (e) => {
            dispatch({
                type: STREET,
                payload: e.currentTarget.value
            })
        },
        onUpdateLastName: (e) => {
            dispatch({
                type: LAST_NAME,
                payload: e.currentTarget.value
            })
        },
        onUpdateCity: (e) => {
            dispatch({
                type: CITY,
                payload: e.currentTarget.value
            })
        },
        onUpdateUserName: (e) => {
            dispatch({
                type: USER_NAME,
                payload: e.currentTarget.value
            })
        },
        onUpdateState: (e) => {
            dispatch({
                type: STATE,
                payload: e.currentTarget.value
            })
        },
        onUpdatePassword: (e) => {
            dispatch({
                type: PASSWORD,
                payload: e.currentTarget.value
            })
        },
        onUpdateZip: (e) => {
            dispatch({
                type: ZIP,
                payload: e.currentTarget.value
            })
        },
        deleteCardNumber: (e) => {
            dispatch({
                type: CARD_NUMBER,
                payload: ""
            })
        },
        deleteCvv: (e) => {
            dispatch({
                type: CVV,
                payload: ""
            })
        },
        deleteExp: (e) => {
            dispatch({
                type: EXP,
                payload: ""
            })
        },
        deleteGroceryChain: (e) => {
            dispatch({
                type: CHAIN_NAME,
                payload: ""
            })
        },
        deleteStoreName: (e) => {
            dispatch({
                type: STORE_NAME,
                payload: ""
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
