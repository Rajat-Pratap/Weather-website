
//sxw=+SWX2@
const request=require('request')
function forecast(latitude,longitude,callback)
{
    //url="https://api.darksky.net/forecast/[key]/[latitude],[longitude]?key1=val1&...&key3=val3"
    const url="https://api.darksky.net/forecast/bb1b4356002373082c4316af5d6114f5/"+latitude+","+longitude
    request({url, json: true},(error, response)=>{
        if(error)
        callback("Unable to connect to find location!",undefined)
        else if(response.body.error ){
            callback(response.body.error,undefined)
        }
        else{
            callback(undefined,response.body.daily.data[0].summary)
        }
    })
}

module.exports=forecast