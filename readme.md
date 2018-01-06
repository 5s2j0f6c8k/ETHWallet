# 此项目是ETH钱包的实现

## 了解知识

> 现在的平台的数字货币钱包都是中心化的，一般会为个人开一个账户，然后机构开一个账户
>
> 当外部账户充值到平台一般是先充值到个人账户然后再转账到机构账户
>
> 两笔转账都是走公链,转账到机构账户以后方便平台自己清算。

## 实现功能

> 用户注册
>
> 申请钱包
>
> 转账充值

## 服务端实现技术

>
> 服务器采用node.js
>
> 数据库使用mongodb
>
> ETH 客户端使用 Ganache
>
> 使用jwt 来做客户端token
>
> 数据库使用mongoose 进行对象管理和数据库连接
>
> 测试框架采用mocha
>
> 执行测试案例 npm test
>
> 运行项目npm start

## 服务端配置文件

> 配置在config 文件夹下面
```
{
    "appConfig": {
      "dbConfig": {
        "host": "localhost",
        "port": 5984,
        "dbName": "mydb"
      },
      "server":{
          "host":"localhost",
          "port":3005
      },
      "jwtConfig":{
          "jwtTokenSecret":"!qaz2WSX#edc4RFV'"
      },
      "web3":{
          "host":"127.0.0.1",
          "port":"7545"
      }
    }
  }
```

## 参考

> http://web3js.readthedocs.io/en/1.0/
>
> https://github.com/lukaswhite/jwt-node-express