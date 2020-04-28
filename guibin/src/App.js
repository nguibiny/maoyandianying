import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from "./views/Login";
import Zhuce from "./views/zhuce";
import Wode from './views/wode'
import Shouye from "./views/Shouye";
import Fenleis from './views/list/fenlei-s';
import Xq from './views/xiangqing/xq'
import Yrzhuye from './views/yrDongtai/yrZhuye'
import {
  BrowserRouter as Router,
  // NavLink,
  Route,// 路由，根据地址显示相对应的组件信息
  // Switch
} from "react-router-dom";

function App() {
  const dlstate = window.localStorage.getItem("data")
  return (
    <div className="App">
      <Router>

        <Route path={"/"} exact component={Shouye}></Route>
        <Route path={"/login"} exact component={dlstate ? Wode : Login}></Route>
        <Route path={"/zhuce"} exact component={Zhuce}></Route>
        <Route path={"/wode"} exact component={dlstate ? Wode : Login}></Route>
        <Route path={"/fenleis"} component={Fenleis}></Route>
        <Route path={"/xq"} component={Xq}></Route>
        <Route path={"/zhuye"} component={Yrzhuye}></Route>

      </Router>

    </div >
  );
}

export default App;
