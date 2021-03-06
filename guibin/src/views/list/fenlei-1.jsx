import React, { Component } from 'react';
import axios from "axios";

export default class Fenlei1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []//整体的数据
        };
    }
    getTuijian() {

        axios.get('https://show.maoyan.com/maoyansh/myshow/ajax/performances/0;st=4;p=1;s=34;tft=0?sellChannel=13&cityId=1&lng=0&lat=0')
            .then((res) => {
                this.setState({
                    data: res.data.data,
                })

            })

    }


    componentDidMount() {
        this.getTuijian();
    }
    render() {
        return (
            <div>
                <div className="fenlei1"  >
                    <div className="quanbu">
                        <ul>
                            {
                                this.state.data.map((item, i) => {
                                    return (
                                        <li key={item.performanceId}><a href={"/xq/" + item.performanceId}><img src={item.posterUrl} alt="" />
                                            <p className="p1">{item.name}</p>
                                            <p className="p2">{item.showTimeRange}</p>
                                            <p className="p3">{item.cityName}{item.shopName}</p>
                                            <p className="p4"><span>售票中</span>  {item.priceRange}元<span>自营</span></p>
                                        </a></li>
                                    )
                                })
                            }</ul>

                    </div>
                </div >


            </div>
        )
    }
}