//sxw=+SWX2@
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./util/geocode')
const forecast=require('./util/forecast')

const app=express()
const port=process.env.PORT||3000
const dirPath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(dirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'My weather app',
        name: 'Rajat'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        val: "Hey, This is your help message!",
        title: 'Help',
        name: 'Rajat Pratap Singh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Rajat Pratap'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide address'
        })
    }
    const location=req.query.address
    geocode(location,(error,{latitude,longitude,location})=>{
        if(error)
        res.send({
            error: error
        })
        else{
            forecast(latitude,longitude,(error,data)=>{
                if(error)
                res.send({
                    error: error
                })
                else
                res.send({
                    forecast: data,
                    location: req.query.address
                })
            })
        }
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Please provide search code'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: 'ERROR 404',
        msg: 'Help article not found.',
        name: 'Rajat Pratap Singh'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title: 'ERROR 404',
        msg: 'Page not found',
        name: 'Rajat Pratap Singh'
    })
})
app.listen(port,()=>{
    console.log('Server iS running.')
})