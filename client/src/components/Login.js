/*
 * @Author: qugang 
 * @Date: 2018-01-07 00:39:16 
 * @Last Modified by: qugang
 * @Last Modified time: 2018-01-07 20:52:33
 */

import React, { Component } from 'react'
import fetch from './common/fetch'
import * as Ons from "react-onsenui"
import * as ons from "onsenui"
import * as path from './common/path'
import Register from './Register'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    handleClick(e) {
        fetch(path.login, {
            username: this.state.username,
            userpwd: this.state.password
        }).then(function (res) {
            if (res.resultCode === "1000") {
                ons.notification.alert('登陆成功')
            }
            else {
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

    register(){
        this.props.navigator.pushPage({comp: Register,props:{key:"Register",navigator:this.props.navigator}})
    }
    render() {
        return (
                <Ons.Page renderToolbar={() => (
                <Ons.Toolbar>
                    <div className='center'>登陆</div>
                </Ons.Toolbar>
            )}>
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
                            <Ons.Button onClick={this.handleClick.bind(this)}>登陆</Ons.Button>
                            <Ons.Button onClick={this.register.bind(this)}>注册</Ons.Button>
                        </p>
                    </section>
                </Ons.Page>
        )
    }

}

export default Login