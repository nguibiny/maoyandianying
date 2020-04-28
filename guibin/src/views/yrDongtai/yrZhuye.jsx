import React, { Component } from 'react';
import axios from "axios";
import img1 from './../../assets/img/yrzhuye1.png';
import img2 from './../../assets/img/yrzhuye2.png';
import img3 from './../../assets/img/dibu.png';
import {
    Link
} from "react-router-dom";
export default class Yrzhuye extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: [],
            data2: [],
            data3: [],
            urlId: window.location.pathname.split("/")[2],
            sfgz: ["关注"]
        };
    }

    // https://show.maoyan.com/maoyansh/myshow/ajax/celebrityBasicInfo/query?ipId=7&sellChannel=13&cityId=1&lng=0&lat=0
    getZhuye1() {
        axios.get(' https://show.maoyan.com/maoyansh/myshow/ajax/celebrityBasicInfo/query?ipId=' + this.state.urlId + '&sellChannel=13&cityId=1&lng=0&lat=0')
            .then((res) => {

                this.setState({
                    data1: res.data.data,
                })

                this.setState(this.state)
            })
    }
    // https://show.maoyan.com/maoyansh/myshow/ajax/celebrityTourGroup/query?ipId=15&tourSort=0&celebrityId=406976&sellChannel=13&cityId=1&lng=0&lat=0
    getZhuye2() {
        axios.get(' https://show.maoyan.com/maoyansh/myshow/ajax/celebrityTourGroup/query?ipId=' + this.state.urlId + '&tourSort=0&celebrityId=' + this.props.location.state.name + '&sellChannel=13&cityId=1&lng=0&lat=0')
            .then((res) => {

                this.setState({
                    data2: res.data.data,
                })
                this.setState(this.state)
            })
    }
    // https://show.maoyan.com/maoyansh/myshow/ajax/celebrityVideo/query?ipId=7&sellChannel=13&cityId=1&lng=0&lat=0
    getZhuye3() {
        axios.get('https://show.maoyan.com/maoyansh/myshow/ajax/celebrityVideo/query?ipId=' + this.state.urlId + '&sellChannel=13&cityId=1&lng=0&lat=0')
            .then((res) => {

                this.setState({
                    data3: res.data.data,
                })

                this.setState(this.state)
            })
    }

    //关注
    guanzhu() {

        if (window.localStorage.getItem("data") === "1") {
            axios.post("/api/guanzhu", {
                // celebrityName: "蔡依林"   celebrityId: 406976  headUrl: "https://p0.meituan.net/moviemachine/f3301599b4e89fe2bb25132d477de191132449.png"
                celebrityName: this.state.data1.celebrityName,
                celebrityId: this.state.data1.celebrityId,
                headUrl: this.state.data1.headUrl,
                id: window.location.pathname.split("/")[2]
            }).then(result => {
                if (result.data.ok === "1") {
                    alert("关注成功")
                    // console.log(result)
                    window.location.reload()
                } else {
                    alert("取消关注")
                    // console.log(result)
                    window.location.reload()
                }

            })
        } else {
            window.location.href = "http://localhost:3000/login"
        }
    }
    // 查看是否关注
    sfguanzhu() {
        if (window.localStorage.getItem("data") === "1") {
            axios.post("/api/sfguanzhu", {
                // celebrityName: "蔡依林"   celebrityId: 406976  headUrl: "https://p0.meituan.net/moviemachine/f3301599b4e89fe2bb25132d477de191132449.png"
                id: window.location.pathname.split("/")[2]
            }).then(result => {
                // console.log(result)
                this.setState({
                    sfgz: result.data.msg
                })
            })
        }
    }

    componentDidMount() {
        this.getZhuye1();
        this.getZhuye2();
        this.getZhuye3();
        this.sfguanzhu();
    }
    render() {
        const item1 = this.state.data1
        // console.log(this.state)

        return (
            <div className="yrzhuye">
                {/* 顶部 */}
                <div className="yrhead">
                    <img src={item1.headUrl} alt="" /><span>{item1.celebrityName}</span><span>
                        <button onClick={this.guanzhu.bind(this)} style={{ fontSize: "20px" }}>{this.state.sfgz}</button></span>
                </div>
                {/* 演唱会信息 */}
                <div className="yrbody1">
                    {
                        this.state.data2.map((item, i) => {
                            return (
                                <div key={i}>
                                    <img src={item.coverUrl} alt="" />
                                    <p>{item.tourName}</p>
                                    <p><img src={img2} alt="" /> {item.tourBrief}<img src={img1} alt="" /></p>
                                    {item.tourProjectList.map((item, i) => {
                                        return (
                                            <div className="yrbody1-1" key={i}>
                                                <div className="box1">
                                                    <div className="ycdz">{item.cityName}<img src={img3} alt="" /></div >
                                                    <div className="shijian"><h5>演出时间</h5>{item.showTimeRange}</div>
                                                    <Link to={{ pathname: `/xq/${item.performanceId}` }}>
                                                        <button className="yanqi">演出延期</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                            )
                        })
                    }

                </div>
                {/* 精彩现场回顾 */}
                <div className="yrbody2">
                    <h2>精彩现场回顾</h2>
                    {
                        this.state.data3.map((item, i) => {
                            return (
                                <div className="shipin" key={i}>
                                    <p>{item.videoName}</p>
                                    <video controls className="spbf" src={item.videoUrl} />
                                    <p><img className="tubiao" src={item.userAvatar} alt="" />{item.userName}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}