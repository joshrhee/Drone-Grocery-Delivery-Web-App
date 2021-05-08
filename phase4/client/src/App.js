import React from 'react';
import { Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';


import LoginPage from './components/LoginComponents/Login.js';
import RegisterPage from './components/RegisterComponents/RegisterScreen.js';
import store from './redux/store.js';

import Admin from './components/HomeScreenComponents/AdminComponents/Admin.js'
import Customer from './components/HomeScreenComponents/CustomerConponents/Customer.js'
import ChainManager from './components/HomeScreenComponents/ChainManagerComponents/ChainManager.js'
import DroneTech from './components/HomeScreenComponents/DroneTechComponents/DroneTech.js'

//Admin's components
import CreateChain from './components/HomeScreenComponents/AdminComponents/AdminScreenComponents/CreateChain';
import CreateDrone from './components/HomeScreenComponents/AdminComponents/AdminScreenComponents/CreateDrone';
import CreateItem from './components/HomeScreenComponents/AdminComponents/AdminScreenComponents/CreateItem';
import CreateStore from './components/HomeScreenComponents/AdminComponents/AdminScreenComponents/CreateStore';
import ViewCustomer from './components/HomeScreenComponents/AdminComponents/AdminScreenComponents/ViewCustomer';

//ChainManager's componenets
import ViewDroneTech from './components/HomeScreenComponents/ChainManagerComponents/ChainManagerComponents/ViewDroneTech.js';
import ViewDrones from './components/HomeScreenComponents/ChainManagerComponents/ChainManagerComponents/ViewDrones.js';
import CreateChainItem from './components/HomeScreenComponents/ChainManagerComponents/ChainManagerComponents/CreateChainItem.js';
import ManageStores from './components/HomeScreenComponents/ChainManagerComponents/ChainManagerComponents/ManageStores.js';

//DroneTech's components
import ViewStoreOrders from './components/HomeScreenComponents/DroneTechComponents/DroneTechScreenComponents/ViewStoreOrders';
import ViewOrderDetails from './components/HomeScreenComponents/DroneTechComponents/DroneTechScreenComponents/ViewOrderDetails';
import TrackAssignedDrones from './components/HomeScreenComponents/DroneTechComponents/DroneTechScreenComponents/TrackAssignedDrones';

//Customer's components
import ChangeCCInfo from "./components/HomeScreenComponents/CustomerConponents/CustomerScreenComponents/ChangeCCInfo";
import ReviewOrder from "./components/HomeScreenComponents/CustomerConponents/CustomerScreenComponents/ReviewOrder";
import ViewOrderHistory from "./components/HomeScreenComponents/CustomerConponents/CustomerScreenComponents/ViewOrderHistory";
import ViewStoreItems from "./components/HomeScreenComponents/CustomerConponents/CustomerScreenComponents/ViewStoreItems";

import './App.css';

function App() {
  return (

    <Provider store={store}>
        <div className="App">
            <Switch>
              {/* Login Screen */}
              <Route exact path="/" component={LoginPage}/>
              {/* Register Screen */}
              <Route exact path="/register" component={RegisterPage} />
              {/* Admin Home */}
              <Route exact path="/admin" component={Admin}/>
              <Route exact path="/admin/create_chain" component={CreateChain} />
              <Route exact path="/admin/create_drone" component={CreateDrone} />
              <Route exact path="/admin/create_item" component={CreateItem} />
              <Route exact path="/admin/create_store" component={CreateStore} />
              <Route exact path="/admin/view_customer" component={ViewCustomer} />
              {/* Customer Home */}
              <Route exact path="/customer" component={Customer}/>
              <Route exact path="/customer/change_cc_info" component={ChangeCCInfo}/>
              <Route exact path="/customer/review_order" component={ReviewOrder}/>
              <Route exact path="/customer/view_order_history" component={ViewOrderHistory}/>
              <Route exact path="/customer/view_store_items" component={ViewStoreItems}/>
              {/* Chain Manager Home */}
              <Route exact path="/manager" component={ChainManager}/>
              <Route exact path="/manager/drone_techs" component={ViewDroneTech}/>
              <Route exact path="/manager/drones" component={ViewDrones}/>
              <Route exact path="/manager/create_item" component={CreateChainItem}/>
              <Route exact path="/manager/stores" component={ManageStores}/>
              {/* Drone Tech Home */}
              <Route exact path="/drone_tech" component={DroneTech}/>
              <Route exact path="/drone_tech/view_store_orders" component={ViewStoreOrders} />
              <Route exact path="/drone_tech/view_order_details" component={ViewOrderDetails} />
              <Route exact path="/drone_tech/track_assigned_drones" component={TrackAssignedDrones} />
            </Switch>
        </div>
    </Provider>

  );
}

export default App;
