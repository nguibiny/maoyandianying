import React, { Component } from 'react';
import img1 from './../../assets/img/dizhi.jpg'
export default class Dingwei extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: []
        };
    }

    componentDidMount() {
        const _this = this;
        var BMap = window.BMap;
        var geoc = new BMap.Geocoder();
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            geoc.getLocation(r.point, function (rs) {
                console.log(rs)   //具体信息可以打印出来看一下，根据需求取值     经纬度，城市，街道等等
                var addComp = rs.addressComponents;
                let cityName = addComp.city
                _this.setState({
                    cityName: cityName,  //城市名
                })
            });
        });
    }




    render() {
        console.log(this.state)
        return (
            <div className="top">

                <span><img src={img1} alt="" />{this.state.cityName}</span>
                <input type="text" placeholder="找明星，演出，场馆！"></input>
            </div >
        )
    }
}