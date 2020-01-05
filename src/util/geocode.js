//sxw=+SWX2@
const request=require('request')

const geocode=(address,callback)=>{
    var latitude=undefined,longitude=undefined,location=undefined
    const urladd="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoicmFqYXQyMDA5IiwiYSI6ImNrMmxhbG45czA1MzQzZG11dnk5MDBybmwifQ.BnpcDbOK2Fy_pkqRVIMu6Q&limit=1"
    request({url: urladd,json: true},(error,response)=>{
        if(error)
        {
            callback('Unable to connect!',{
                latitude,longitude,location
            })
        }
        else if(response.body.features.length==0){
            callback('Place not found',{latitude,longitude,location})
        }
        else
        {
            latitude=response.body.features[0].center[1]
            longitude=response.body.features[0].center[0]
            callback(undefined,{
                latitude,
                longitude,
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode