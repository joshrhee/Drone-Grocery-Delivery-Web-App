import { useState } from 'react';

import store from '../../redux/store.js';
import * as api from '../../api';
// import { USER_NAME } from '../../redux/subscribers/type.js';

//props has location, history attributes
function Login( {location, history} ) {

    let [userName, setUserName] = useState(""); //This state will save Username information
    let [password, setPassword] = useState(""); //This state will save Password information
    let [isNotUser, setIsNotUser] = useState(false); 

    const userNameHanlder = (e) => {setUserName(e.currentTarget.value)};
    const passwordHandler = (e) => {setPassword(e.currentTarget.value)};

    const userVerifyHandler = () => {
        console.log("Current state is: ", store.getState().userInfoReducer)
        //Check user is customer
        if (store.getState().userInfoReducer.CcNumber !== ""
        && store.getState().userInfoReducer.CVV !== ""
        && store.getState().userInfoReducer.EXP_DATE !== "") {
            history.push('/customer');
        //Check user is drone_tech
        } else if (store.getState().userInfoReducer.StoreName !== ""
        && store.getState().userInfoReducer.ChainName !== "") {
            history.push('/drone_tech');
        //Check user is chain manager
        } else if (store.getState().userInfoReducer.ChainName !== ""
        && store.getState().userInfoReducer.StoreName === "") {
            history.push('/manager');
        //Check user is admin
        } else {
            history.push('/admin');
        }
    }

    const handleGettingInfo = async (e) => {
        console.log("ACTIVATED")
        api.login({
            username: userName,
            password: password 
        })
        .then((results)=>{
            console.log("Succeed to get data!");
            // setUserInfo(result);
            console.log(results);
            for (var i = 0; i < results.data.length; i++) {
                // console.log(results.data[i]);
                store.dispatch(results.data[i]);
            }
            // }
            // store.dispatch(result.data);  //Maybe have some bug
            userVerifyHandler();
        })
        .catch((error)=>{
            console.log("Fail to get data...");
            console.log(error);
            setIsNotUser(true);
        })
        // e.preventDefault();
    };

    return (
        <div>
            <br/>
            <br/>
            {
                isNotUser === true
                ?(
                    <div className="login-alert">
                        <p>"We cannot find your information. Please register first"</p>
                        <button onClick={()=>{setIsNotUser(false)}}>close</button>
                    </div>
                )
                : null
            }
            

            <br/>
            <div>
                <h1 className="Login">Login</h1>
            </div>
            <br/>
            <div>
                <h5>Username: <input type="text" value={userName} onChange={userNameHanlder}/></h5>
                <h5>Password: <input type="password" value={password} onChange={passwordHandler}/></h5>
                <br/>
            </div>
            <div>
                <button onClick={(e)=>{handleGettingInfo(e)}}>Login</button> <button onClick={()=>{history.push('/register')}}>Register</button>
            </div>
                 
        </div>
             
    )
}

export default Login;