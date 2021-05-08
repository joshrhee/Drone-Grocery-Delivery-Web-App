import React from 'react';
import {connect} from 'react-redux';

import {CARD_NUMBER, CVV, EXP} from '../../../redux/subscribers/type.js';

const RegisterCustomer = (props) => {

    return (
        <div>
            {props.deleteGroceryChain}
            {props.deleteStoreName}
            <form style={{display: 'flex', flexDirection: 'column'}}>
                <form style={{display: 'flex', flexDirection: 'row'}}>
                    <h4>Card Number </h4>
                    <input id="CcnNumber" type="text" maxLength="16" onChange={props.onUpdateCardNumber}></input>
                </form>
                <br/>
                <form style={{display: 'flex', flexDirection: 'row'}}>
                    <h4>CVV: </h4>
                    <input id="CVV" type="text" maxLength="3" onChange={props.onUpdateCvv}></input>
                    <h4>Exp:  </h4>
                    <input id="Exp" type="date" onChange={props.onUpdateExp}></input>
                </form>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        CcNumber: state.CcNumber,
        CVV: state.CVV,
        EXP_DATE: state.EXP_DATE
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateCardNumber: (e) => {
            dispatch({
                type: CARD_NUMBER,
                payload: e.currentTarget.value
            })
        },
        onUpdateCvv: (e) => {
            dispatch({
                type: CVV,
                payload: e.currentTarget.value
            })
        },
        onUpdateExp: (e) => {
            dispatch({
                type: EXP,
                payload: e.currentTarget.value
            })
        }   
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps)(RegisterCustomer);