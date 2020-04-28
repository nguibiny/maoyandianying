import React, { Component } from 'react';
import Dingwei from './shouye-nr/dingwei'; //首页顶部的定位与搜索
import Fenlei from './shouye-nr/fenlei'; //分类导航
import Lunbo from './shouye-nr/lunbo';//轮播广告
import Dongtai from './shouye-nr/dongtai';//大咖新动态
import Tuijian from './shouye-nr/tuijian';//为你推荐
import {
    NavLink
} from "react-router-dom";
export default class Shouye extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }






    render() {
        // console.log(window.localStorage.getItem("data"))
        const dlstate = window.localStorage.getItem("data")
        return (
            <div>
                <Dingwei />
                <Fenlei />
                <Lunbo />
                <Dongtai />
                <Tuijian />
                <nav className={"dibu-nav"}>
                    <NavLink className={"App-link"} exact activeClassName={"App-active"} to={"/"}>首页</NavLink>
                    <NavLink className={"App-link"} activeClassName={"App-active"} to={dlstate === "1" ? "/wode" : "/login"}>{dlstate === "1" ? "我的" : "登陆"}</NavLink>
                </nav>
            </div>

        )
    }
}