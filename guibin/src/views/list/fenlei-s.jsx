import React, { Component } from 'react';
import {
    NavLink,
    Route
} from "react-router-dom";
import Fenlei1 from './fenlei-1'
import Fenlei2 from './fenlei-2'
import Fenlei3 from './fenlei-3'
import Fenlei4 from './fenlei-4'
import Fenlei5 from './fenlei-5'
import Fenlei6 from './fenlei-6'
export default class Fenleis extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="fenleis">
                <div className="fenleistop">
                    <input type="text" placeholder="找明星，演出，场馆" />
                </div>
                <nav className="daohang">
                    <NavLink exact className={"App-link"} activeClassName={"App-active"} to={"fenlei-1"}>全部</NavLink>
                    <NavLink exact className={"App-link"} activeClassName={"App-active"} to={"fenlei-2"}>演唱会</NavLink>
                    <NavLink exact className={"App-link"} activeClassName={"App-active"} to={"fenlei-3"}>话剧歌剧</NavLink>
                    <NavLink exact className={"App-link"} activeClassName={"App-active"} to={"fenlei-4"}>休闲展览</NavLink>
                    <NavLink exact className={"App-link"} activeClassName={"App-active"} to={"fenlei-5"}>戏曲相声</NavLink>
                    <NavLink exact className={"App-link"} activeClassName={"App-active"} to={"fenlei-6"}>亲子</NavLink>
                </nav>
                <Route component={Fenlei1} exact path={"/fenleis/fenlei-1"}></Route>
                <Route component={Fenlei2} exact path={"/fenleis/fenlei-2"}></Route>
                <Route component={Fenlei3} exact path={"/fenleis/fenlei-3"}></Route>
                <Route component={Fenlei4} exact path={"/fenleis/fenlei-4"}></Route>
                <Route component={Fenlei5} exact path={"/fenleis/fenlei-5"}></Route>
                <Route component={Fenlei6} exact path={"/fenleis/fenlei-6"}></Route>

                <div className="dibu">
                    没有更多数据了！
                </div>
            </div>
        )
    }
}