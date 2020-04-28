import React, { Component } from 'react';
import axios from "axios";
import bofan from '../../assets/img/bofan.jpg'
import shanchu from './../../assets/img/shanchu.jpg'
// import {
//     Link
// } from "react-router-dom";
export default class Xq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data1: [],
            url: [],
            display: ['hide'],
            display1: ['hide'],
            sfsc: ["收藏"]//是否收藏
        };
    }
    getTuijian() {
        const url = window.location.pathname.split("/");
        const urlId = url[2];
        axios.get('https://show.maoyan.com/maoyansh/myshow/ajax/v2/performance/' + urlId + '?sellChannel=13&cityId=1&lng=0&lat=0')
            .then((res) => {

                this.setState({
                    data: res.data.data,
                    url: urlId
                })

                // console.log(urlId, this.state)
                this.setState(this.state)
            })
    }
    // https://show.maoyan.com/maoyansh/myshow/ajax/performance/recommends/140896?sellChannel=13&cityId=1&lng=0&lat=0
    getTuijian1() {
        const url = window.location.pathname.split("/");
        const urlId = url[2];
        axios.get('https://show.maoyan.com/maoyansh/myshow/ajax/performance/recommends/' + urlId + '?sellChannel=13&cityId=1&lng=0&lat=0')
            .then((res) => {

                this.setState({
                    data1: res.data.data,
                    url: urlId
                })

                // console.log(urlId, this.state)
                this.setState(this.state)
            })
    }

    tanchu() {
        this.setState({
            display: this.state.display === 'hide' ? 'show' : 'hide'
        })
    }

    // 收藏
    shoucang() {
        // posterUrl: "https://p0.meituan.net/myvideodistribute/a1540d2da5eee9ec588e9c85da70fe9b508090.jpg"
        if (window.localStorage.getItem("data") === "1") {
            axios.post("/api/shoucang", {
                Id: this.state.url,
                imgUrl: this.state.data.posterUrl,
                idName: this.state.data.name
            }).then(result => {
                if (result.data.ok === "1") {
                    alert("收藏成功")
                    // console.log(result)
                    window.location.reload()
                } else {
                    alert("取消收藏")
                    // console.log(result)
                    window.location.reload()
                }

            })
        } else {
            // alert("尊敬的贵宾，请先去登陆再来操作")
            window.location.href = "http://localhost:3000/login"
        }
    }
    // 查看是否收藏
    sfshoucang() {
        if (window.localStorage.getItem("data") === "1") {
            axios.post("/api/sfshoucang", {
                Id: window.location.pathname.split("/")[2]
            }).then(result => {
                // console.log(result)
                this.setState({
                    sfsc: result.data.msg
                })
            })
        }
    }


    componentDidMount() {
        this.getTuijian();
        this.getTuijian1();
        this.sfshoucang();
    }


    render() {
        const item = this.state.data
        const item1 = item.brightPointList
        const item2 = item.serviceTitleList
        const item3 = item.videoList
        const display = this.state.display

        return (
            <div>
                <div className="xq"  >
                    <div className="xq-1">
                        <img src={item.posterUrl} alt="" />
                        <p>{item.name}</p>
                        <p className="p2">
                            {
                                item.priceList && item.priceList.map((item, i) => {
                                    return (
                                        // {item.priceList}元

                                        <span key={i} className="spans">{item}<span className="spansc">~</span></span>
                                    )
                                })
                            }
元
                        </p>
                        <div className="dizhi">
                            <p>{item.showTimeRange}</p>
                            <p>{item.cityName}{item.shopName}</p>
                            {/* <img src={} /> */}
                        </div>
                        <div className="xpiao">
                            {
                                item2 && item2.map((item, i) => {
                                    return (
                                        <span onClick={this.tanchu.bind(this)} key={i} style={{ fontSize: "14px" }} >
                                            {item.key}
                                        </span>

                                    )
                                })
                            }
                            {/* 服务保障弹出框 */}

                            <div className={`tanchu ${display}`}>
                                <span className="btfwbz">服务保障</span><span className="span1" onClick={this.tanchu.bind(this)}><img src={shanchu} alt="" /></span>

                                {
                                    item2 && item2.map((item, i) => {
                                        return (
                                            <p key={i} className="fw">
                                                <span>{item.key}</span><br />
                                                <span>{item.value}</span>
                                            </p>
                                        )
                                    })
                                }
                            </div>
                        </div>


                        <div className="anniu">
                            <button onClick={this.shoucang.bind(this)} >{this.state.sfsc}</button>
                            <button  > 分享</button>
                        </div>
                    </div>

                    {/* 演出亮点 */}
                    <div className={JSON.stringify(item1) === '[]' ? 'ycld hide' : 'ycld show'}>
                        <h4  >演出亮点</h4>
                        {
                            item1 && item1.map((item, i) => {
                                return (
                                    <div className="box1" key={i}>
                                        <h2>{i + 1}</h2>
                                        <div><span>{item.title}</span>
                                            <br /><span>{item.content}</span>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* 精彩现场 */}
                    <div className={JSON.stringify(item3) === '[]' ? 'gbjcxc hide' : 'gbjcxc show'}>
                        <h4  >精彩现场</h4>
                        {/* photoUrl  videoUrl */}
                        {item3 && item3.map((item, i) => {
                            return (
                                <div className="xcshipin" key={item.id}>
                                    <a href={item.videoUrl}>
                                        <img src={item.photoUrl} alt="" />
                                        <img className="bofan" src={bofan} alt="" />
                                    </a>
                                </div>
                            )
                        })
                        }

                    </div>
                    {/* 简介 */}
                    <div className="jianjie">
                        <h4 >演出详情</h4>
                        <div className="nr" dangerouslySetInnerHTML={{ __html: `${item.detail}` }} />
                    </div>
                    {/* 购票须知 */}
                    <div className="goupiao">
                        <h4>购票须知</h4>
                        <div className="xz" dangerouslySetInnerHTML={{ __html: `${item.ticketNotes}` }} />
                    </div>
                    {/* 推荐 */}
                    <div className="tuijian1">
                        <h4 >为你推荐</h4>
                        <ul>
                            {
                                this.state.data1.map((item, i) => {
                                    return (
                                        <li key={item.performanceId}><a href={"/xq/" + item.performanceId}><img src={item.posterUrl} alt="" />
                                            <p className="p1">{item.name}</p>
                                            <p className="p2">{item.showTimeRange}</p>
                                            <p className="p3">{item.cityName}{item.shopName}</p>
                                            <p className="p4"><span>售票中</span>  {item.priceRange}元<span>自营</span></p>
                                        </a></li>
                                    )
                                })
                            }
                        </ul>
                        {/* 更多演出，立即购票 */}
                        <div className="box">
                            <a href={"/"}><button className="gdyc">更多演出</button></a>

                            <a href={"/login"}> <button className="ljgp" >立即购票</button></a>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}