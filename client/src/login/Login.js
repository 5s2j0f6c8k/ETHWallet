/*
 * @Author: qugang 
 * @Date: 2018-01-07 00:39:16 
 * @Last Modified by: qugang
 * @Last Modified time: 2018-01-07 01:08:24
 */

import React, { Component } from 'react'
import fetch from '../common/fetch'
import * as Ons from "react-onsenui"
import * as ons from "onsenui"
import * as path from '../common/path'
class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:"",
            password:""
        }
    }

    handleClick(e) {
        console.log("login")
        fetch(path.login,{
            username:this.state.username,
            userpwd:this.state.password
        }).then(function(res){
            if(res.resultCode === "1000"){
                ons.notification.alert('登陆成功')
            }
            else{
                ons.notification.alert('登陆失败')
            }
        })
    }
    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }
    render() {
        return (
            <div>
            <Ons.Page>
                <section style={{ textAlign: 'center' }}>
                    <p>
                    <Ons.Icon icon="ion-person" />
                        <Ons.Input
                            value={this.state.username}
                            onChange={this.handleUsernameChange.bind(this)}
                            modifier='underbar'
                            float
                            placeholder='Username' />
                    </p>
                    <p>
                    <ons-icon icon="ion-ios-locked" />
                        <Ons.Input
                            value={this.state.password}
                            onChange={this.handlePasswordChange.bind(this)}
                            modifier='underbar'
                            type='password'
                            float
                            placeholder='Password' />
                    </p>
                    <p>
                        <Ons.Button  modifier="btn-login" onClick={this.handleClick.bind(this)}>Sign in</Ons.Button>
                    </p>
                </section>
            </Ons.Page>
            </div>
        )
    }

}

export default Login