/*
 * @Author: qugang 
 * @Date: 2018-01-08 00:11:56 
 * @Last Modified by:   qugang 
 * @Last Modified time: 2018-01-08 00:11:56 
 */

import React, { Component } from 'react'
import fetch from './common/fetch'
import * as Ons from "react-onsenui"
import * as ons from "onsenui"
import * as path from './common/path'
var QRCode = require('qrcode.react');

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username,
            address: this.props.address,
            privateKey: "",
            value: ""
        }
    }

    utf16to8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }

    handleprivateKeyChange(e) {
        this.setState({ privateKey: e.target.value });
    }
    handleValueChange(e) {
        this.setState({ value: e.target.value });
    }

    handleClick(e){
        
        fetch(path.transfer, {
            'ethAddress':this.state.address,
            'value':this.value,
            'privateKey': this.privateKey
        },window.localStorage.token).then(function (res) {
            if(res.resultCode === "1000"){
                ons.notification.alert('转账成功')
            }
            else{
                ons.notification.alert('转账失败')
            }
        })
    }



    render() {
        return (
            <Ons.Page>
                <Ons.List>
                    <Ons.ListItem>
                        ETH地址二维码
                     <QRCode size={256} value={this.utf16to8(this.props.address)} />
                    </Ons.ListItem>
                    <Ons.ListItem>
                        <ons-icon icon="ion-ios-person-outline" />
                        您的账号<span className="right">{this.name}</span>
                    </Ons.ListItem>
                    <Ons.ListItem>
                        <ons-icon icon="ion-ios-location-outline" />
                        ETH地址<span className="right">{this.props.address}</span>
                    </Ons.ListItem>
                    <Ons.ListItem>
                        <Ons.Input
                            value={this.state.privateKey}
                            onChange={this.handleprivateKeyChange.bind(this)}
                            modifier='underbar'
                            float
                            placeholder='转账私钥' />
                    </Ons.ListItem>
                    <Ons.ListItem>
                        <Ons.Input
                            value={this.state.value}
                            onChange={this.handleValueChange.bind(this)}
                            modifier='underbar'
                            float
                            placeholder='转账ETH' />
                    </Ons.ListItem>
                    <Ons.ListItem>
                        <Ons.Button onClick={this.handleClick.bind(this)} >充值</Ons.Button>
                    </Ons.ListItem>
                </Ons.List>
            </Ons.Page >
        )
    }
}

export default Home