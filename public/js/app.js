console.log("Client side Js file is loaded!")
//sxw=+SWX2@

const weatherForm=document.querySelector('form')
const search = document.querySelector('input')
const message1= document.querySelector('#msg1')
const message2= document.querySelector('#msg2')

//message1.textContent= 'para uno'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location= '/weather?address='
    const finalUrl=tempurl+location;
    message1.textContent='Loading...'
    message2.textContent=''
    fetch(finalUrl).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {   
                message1.textContent= data.error
                message2.textContent=''
            }
            else{
                message1.textContent= data.location
                message2.textContent= data.forecast
            }
        })
    })
})