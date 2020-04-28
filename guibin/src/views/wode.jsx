import React, { Component } from 'react';
import axios from "axios";
import { NavLink, Link } from 'react-router-dom';
export default class Wode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: [],
            guanzhu: [],
            shoucang: [],
            gzgs: [],
            scgs: []
        };
    }







    //退出登陆
    Wdout() {
        window.localStorage.setItem("data", "")
        window.location.href = "/login"
    }

    //关注数据
    wdguanzhu() {
        axios.post("/api/wdguanzhu").then(result => {
            // console.log(result.data.data)
            this.setState({
                guanzhu: result.data.data,
                gzgs: result.data.data.length
            })

        })
    }

    // 收藏数据
    wdshoucang() {
        axios.post("/api/wdshoucang").then(result => {
            // console.log(result.data.data.length)
            this.setState({
                shoucang: result.data.data,
                scgs: result.data.data.length
            })

        })
    }

    componentDidMount() {
        this.wdguanzhu();
        this.wdshoucang();
    }



    render() {
        const dlstate = window.localStorage.getItem("data")
        const gbuser = window.localStorage.getItem("user")
        // console.log(this.state)
        return (
            <div className="wode" >
                <div className="wode-head">超级会员《<span>{gbuser}</span>》的主页</div>
                {/* 我的关注 */}
                <div className="wode-gz dongtai">
                    <h3>我的关注({this.state.gzgs})</h3>
                    < ul >
                        {this.state.guanzhu.map((item, i) => {
                            return (
                                <li key={item.id}>
                                    <Link to={{ pathname: `/zhuye/${item.id}`, state: { name: item.celebrityId } }}>
                                        <img src={item.headUrl} alt="" /><p>{item.celebrityName}</p><p>{item.recommendTag}</p>
                                    </Link>
                                </li>
                            )
                        })
                        }
                    </ul>

                </div>
                {/* 我的收藏 */}
                <div className="wode-sc">
                    <h3>我的收藏({this.state.scgs})</h3>
                    < ul >
                        {this.state.shoucang.map((item, i) => {
                            return (
                                <li key={item.Id}>
                                    <Link to={{ pathname: `/xq/${item.Id}` }}>
                                        <img src={item.imgUrl} alt="" />
                                        <p>{item.idName}</p>
                                    </Link>
                                </li>
                            )
                        })
                        }
                    </ul>

                </div>
                {/* 退出登陆 */}
                <div className="wode-out">
                    <button onClick={this.Wdout.bind(this)}>退出登陆</button>
                </div>


                < nav className={"dibu-nav"} >
                    <NavLink className={"App-link"} exact activeClassName={"App-active"} to={"/"}>首页</NavLink>
                    <NavLink className={"App-link"} activeClassName={"App-active"} to={dlstate === "1" ? "/wode" : "/login"} style={{ color: 'red' }}>
                        {dlstate === "1" ? "我的" : "登陆"}</NavLink>
                </nav>
            </div >

        )
    }
}