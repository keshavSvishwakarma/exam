import React,{ createContext, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Switch ,Route} from 'react-router-dom';
import { intitialState, reducer } from "./reducer/useReducer";
import './App.css';
import Navbar from './componentes/basic/navbar';
import Registration from "./componentes/basic/Registration"
import Login from './componentes/basic/Login';
import Logout from './componentes/basic/Logout';
import {Alert} from './componentes/alert/Alert';
import Admin from './componentes/admin/Admin';
import User from './componentes/user/User';
import TakeQuiz from './componentes/user/TakeQuiz';
import Home from './componentes/basic/Home';
import baseUrl from './config';
import axios from 'axios';
// import Sidebar from "./scomponentes/sidebar"

export const UserContext = createContext();






const App = () => {

  const [state, dispatch] = useReducer(reducer, intitialState);
  
  

  return (



    <>

<UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        
        <Alert/>
     
        <Switch>

        <Route exact path="/" component={Home} />
        <Route exact path='/exam/:title/:qid/' render={()=>(state === "USER" ? <Route component={TakeQuiz}/> :(<Route component={Login} />))}/>
        <Route exact path="/Registration" component={Registration} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Logout" component={Logout} />
       
        <Route  path="/user" render={() =>( state === "USER" ? ( <Route  component={User} />): (<Route component={Login} />))}   />
        <Route  path="/admin" render={() =>( state === "ADMIN" ? ( <Route  component={Admin} />): (<Route component={Login} />))}   />
        </Switch>
     

      </Router>
      {/* </UserContext.Provider> */}
      </UserContext.Provider>
    </>

  );
}

export default App;
