import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Header from './components/Home/Header/Header';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Detail from './pages/Detail/Detail';
import PageNotDefound from './pages/PageNotDefound/PageNotDefound';
import Profile from './pages/Profile/Profile';
import ToDoListRFC from './pages/ToDoList/ToDoListRFC';
import ToDoListRCC from './pages/ToDoList/ToDoListRCC';
import ToDoListReducer from './pages/ToDoList/ToDoListReducer';
import BaiTapToDoListSaga from './pages/BaiTapToDoListSaga/BaiTapToDoListSaga';
import LoadingComponent from './components/GlobalSetting/LoadingComponents/LoadingComponent';
import DemoHoc from './pages/DemoHoc/DemoHoc';
import Modal from './HOC/Modal';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import UserLoginTemplate from './templates/HomeTemplate/UserLoginTemplate';
import LoginCyberBug from './pages/CyberBug/LoginCyberBug/LoginCyberBug';
import { useDispatch } from 'react-redux';
import CyberBugTemplate from './templates/HomeTemplate/CyberBugTemplate';
import IndexCyberBug from './pages/CyberBug/IndexCyberBug';
import CreateProjectCyberBug from './pages/CyberBug/CreateProjectCyberBug/CreateProjectCyberBug';
import ProjectManagement from './pages/CyberBug/ProjectManagement/ProjectManagement';
import DrawerCyberBugs from './HOC/cyberBugsHOC/DrawerCyberBug';
import RegisterCyberBug from './pages/CyberBug/RegisterCyberBug/RegisterCyberBug';
import UserManagement from './pages/CyberBug/UserManagement.js/UserManagement';

function App() {

  const history = useHistory();
  const dispatch = useDispatch();
  // console.log(history);
  useEffect(() => {
    dispatch({
      type: 'ADD_HISTORY',
      history: history
    })
  }, []);

  return (
    <>
      {/* <Header /> */}
      {/* <Modal /> */}
      <DrawerCyberBugs />
      <LoadingComponent />
      <Switch>

        <HomeTemplate exact path='/home' Component={Home} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/about' component={About} />
        <UserLoginTemplate exact path='/login' Component={LoginCyberBug} />
        <Route exact path='/profile' Component={Profile} />
        <Route exact path='/detail/:id' component={Detail} />
        <UserLoginTemplate exact path='/' Component={RegisterCyberBug} />
        <UserLoginTemplate exact path='/register' Component={RegisterCyberBug} />
        <Route exact path='/ToDoListRFC' component={ToDoListRFC} />
        <Route exact path='/ToDoListRCC' component={ToDoListRCC} />
        <Route exact path='/ToDoListReducer' component={ToDoListReducer} />
        <Route exact path='/ToDoListSaga' component={BaiTapToDoListSaga} />
        <Route exact path='/DemoHoc' component={DemoHoc} />
        <CyberBugTemplate exact path='/cyberBug' Component={IndexCyberBug} />
        <CyberBugTemplate exact path='/createProject' Component={CreateProjectCyberBug} />
        <CyberBugTemplate exact path='/ProjectManagement' Component={ProjectManagement} />
        <CyberBugTemplate exact path='/UserManagement' Component={UserManagement} />
        <CyberBugTemplate exact path='/projectdetail/:projectId' Component={IndexCyberBug}></CyberBugTemplate>
        <HomeTemplate exact path='*' Component={PageNotDefound} />
      </Switch>

    </>
  );
}

export default App;