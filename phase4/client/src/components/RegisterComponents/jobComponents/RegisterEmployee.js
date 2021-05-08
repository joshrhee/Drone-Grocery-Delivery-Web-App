import React from 'react';
import {connect} from 'react-redux';

import {CHAIN_NAME, STORE_NAME} from '../../../redux/subscribers/type.js';


const RegisterEmployee = (props) => {

    return(
        <div>
            <form style={{display: 'flex', flexDirection: 'colum'}}>
                <h4>Associated Grocery Chain: </h4>
                <input type="text" onChange={props.onUpdateGroceryChain}/>

                <br/>
                <h4>Associated Store Name: </h4>
                <input type="text" onChange={props.onUpdateStoreName}/>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ChainName: state.ChainName,
        StoreName: state.StoreName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateGroceryChain: (e) => {
            dispatch({
                type: CHAIN_NAME,
                payload: e.currentTarget.value
            })
        }
            ,
        onUpdateStoreName: (e) => {
            dispatch({
                type: STORE_NAME,
                payload: e.currentTarget.value
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterEmployee);