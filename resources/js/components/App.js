import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { isAuthenticated } from './config/auth';
import Header from "./frontend/Header";
import { ROOT_URL } from './service/service';
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./frontend/Home";
import ManageUser from "./frontend/manageuser/ManageUser";
import ManageRole from './frontend/managerole/ManageRole';
import ManageProduct from './frontend/manageproduct/ManageProduct';
import CreateUser from './frontend/manageuser/CreateUser';
import EditUser from './frontend/manageuser/EditUser';
import CreateRole from './frontend/managerole/CreateRole';
import EditRole from './frontend/managerole/EditRole';
import CreateProduct from './frontend/manageproduct/CreateProduct';
import EditProduct from './frontend/manageproduct/EditProduct';

import { isAllowed } from "./config/auth";
import useUser from './customHooks/useUser';

function App() {

    const { user, setUser } = useUser();
    // console.log(isAuthenticated);
    // console.log(localStorage.getItem('token'));


    if (isAuthenticated)
        return (
            <Router>
                <Header />

                <Switch>

                    <Route path="/" exact component={Home} />


                    <Route path="/manage-users" exact component={ManageUser} />
                    <Route path="/create-users" exact component={CreateUser} />
                    <Route path="/edit-user/:usersId" exact component={EditUser} />


                    {isAllowed(user, ['role-list']) && <Route path="/manage-role" component={ManageRole} />}
                    <Route path="/create-roles" component={CreateRole} />
                    <Route path="/edit-role/:roleId" exact component={EditRole} />


                    <Route path="/manage-product" component={ManageProduct} />
                    <Route path="/create-products" component={CreateProduct} />
                    <Route path="/edit-product/:productId" exact component={EditProduct} />
                    <Route>Page Not Found</Route>


                    {/* <Route path="/register" exact component={Register} /> */}
                </Switch>
            </Router >

        )
    else {
        return (
            <Router>
                <Header />

                <Switch>

                    <Route path="/login" exact component={Login} />
                    <Route>Page Not Found</Route>

                </Switch>
            </Router >

        )

    }





}








// return (
//     <Router>
//         <Header />

//         <Switch>

//             <Route path="/login" exact component={Login} />

//             {/* <Route path="/home" exact component={Home} /> */}
//             {/* {isAuthenticated ? */}
//             <Route path="/manage-users" exact component={ManageUser} />


//             {/* <Route path="/register" exact component={Register} /> */}
//         </Switch>
//     </Router >

// );
// }

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
