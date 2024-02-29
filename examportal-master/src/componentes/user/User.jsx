import React from 'react';
import { BrowserRouter, Switch, Route ,useLocation} from 'react-router-dom';
import Sidebar from "./sidebar";
import Dashboard from "./Dashboard";
import Instruction from './instruction';
// import TakeQuiz from './TakeQuiz';


const User = () => {
 const {query} = useLocation();
    console.log(query)
    return (
        <BrowserRouter>
            <div  className="d-flex flex-row ">
               
           
                <Sidebar />
    
               

                    <>


                            <div  className=' mx-auto'>
                        <Switch>
                            

                            <Route exact path='/user/dashboard/:category/:cid' component={Dashboard} />
                            <Route exact path='/user/pre-exam-instruction/:qid' component={Instruction}/>
                            
                            

                        </Switch>
                            </div>
                    </>

            </div>
        </BrowserRouter>
    );
};

export default User;