import React, { Component } from 'react';
// import { Route } from "react-router-dom";
import axios from "axios";
import {
    Link
} from "react-router-dom";
export default class Tuijian extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],//整体的数据
            leftData: [],//左边的数据
            rightData: []//右边的数据
        };
    }

    getTuijian() {

        axios.get('https://show.maoyan.com/maoyansh/myshow/ajax/performances/0;st=4;p=1;s=34;tft=0?sellChannel=13&cityId=1&lng=0&lat=0')
            .then((res) => {
                var leftData1 = [];
                var rightData1 = [];



                this.setState({

                    data: res.data.data,
                    leftData: leftData1,
                    rightData: rightData1

                })
                //leftData: [],//左,右边的数据

                for (let i = 0; i <= this.state.data.length - 1; i++) {
                    if (i % 2 === 0) {
                        leftData1[leftData1.length] = this.state.data[i]
                    } else { if (i % 2 === 1) { rightData1[rightData1.length] = this.state.data[i] } }
                }

                // console.log(this.state)
                this.setState(this.state)
            })

    }


    componentDidMount() {
        this.getTuijian();


    }

    render() {
        return (
            <div className="tuijian"  >
                <h3>为你推荐</h3>
                <div className="pubu">
                    <ul className="ul1">
                        {
                            this.state.leftData.map((item, i) => {
                                return (
                                    <li key={item.performanceId}>
                                        <Link to={{ pathname: `/xq/${item.performanceId}` }}><img src={item.posterUrl} alt="" />
                                            <p>[{item.cityName}]{item.name}</p>
                                            <p>{item.showTimeRange}</p>
                                            <p>￥{item.lowestPrice}</p>
                                        </Link></li>
                                )
                            })
                        }</ul>

                    <ul className="ul2">{this.state.rightData.map((item, i) => {

                        return (
                            <li key={item.performanceId}>
                                <Link to={{ pathname: `/xq/${item.performanceId}` }}><img src={item.posterUrl} alt="" />
                                    <p>[{item.cityName}]{item.name}</p>
                                    <p>{item.showTimeRange}</p>
                                    <p>￥{item.lowestPrice}</p>
                                </Link></li>
                        )
                    })
                    }</ul>
                </div>
            </div >
        )
    }
}