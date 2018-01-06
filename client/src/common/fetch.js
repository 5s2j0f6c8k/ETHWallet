/*
 * @Author: qugang 
 * @Date: 2018-01-07 01:18:32 
 * @Last Modified by:   qugang 
 * @Last Modified time: 2018-01-07 01:18:32 
 */

import 'whatwg-fetch'
import FormData from 'isomorphic-form-data'

export default (path, param = {}, authorization = "",method = "post") => {

    const jsonValue =  JSON.stringify(param)
    const options = {
        method: method,
        body: jsonValue,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            "x-access-token":authorization
          },
    }
    return fetch(`${path}`, options)
        .then(function (res) {
            return res.json()
        })
}
