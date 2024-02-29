import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Sidebar from "./sidebar";
import Profile from './profile';
import Categories from './categories';
import Add_Category from './Add_Category';
import Quizzes from './Quizzes';
import Add_Quizz from './Add_Quizz';
import Upadate_Quizzes from './Upadate_Quizzes';
import Questions from './Questions';
import Add_Questions from './Add_Questions';
import Dashboard from './Dashboard';



const Admin = () => {
    return (
        <BrowserRouter>
            <div  className="d-flex flex-row ">
                <Sidebar />

                    <>
                            <div  className='overflow-auto mx-auto'>
                        <Switch>
                            
                            <Route exact path='/admin/dashboard' component={Dashboard} />
                            <Route exact path='/admin/profile' component={Profile} />
                            
                            <Route exact path='/admin/categories' component={Categories} />
                            <Route exact path='/admin/add-category' component={Add_Category} />
                            <Route exact path='/admin/quizzes' component={Quizzes} />
                            <Route exact path='/admin/add-quizz' component={Add_Quizz} />
                            <Route exact path='/admin/update-quizz/:qid' component={Upadate_Quizzes} />
                            <Route exact path='/admin/questions/:title/:qid' component={Questions} />
                            <Route exact path='/admin/add-question/:title/:qid' component={Add_Questions} />

                        </Switch>
                            </div>
                    </>

            </div>
        </BrowserRouter>
    );
};

export default Admin;