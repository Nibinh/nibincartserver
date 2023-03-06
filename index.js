//import express 
const express=require('express')

//import cors
const cors=require('cors')

//import dataservice
const dataService=require('./services/dataService')

//create server app
const server=express()

//user cors
server.use(cors({
    origin:'http://localhost:4200'
}))

//to parse json data
server.use(express.json())

//setup port number
server.listen(3000,()=>{
    console.log('Server started at 3000')
})

//register api call
server.post('/register',(req,res)=>{
    console.log("inside regisster function")
    console.log(req.body)
    dataService.register(req.body.eml,req.body.pnum,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//login apicall
server.post('/login',(req,res)=>{
    console.log("inside login function")
    console.log(req.body)
    dataService.login(req.body.eml,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//All products API
server.get('/all-products',(req,res)=>{
    dataService.allProducts()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })

})

//view-product api
server.get('/view-product/:productId',(req,res)=>{
    dataService.viewProduct(req.params.productId)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//add to wishlist
server.post('/addToWishlist',(req,res)=>{
    dataService.addToWishlist(req.body.eml,req.body.product)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//getWishlist
server.get('/getWishlist/:eml',(req,res)=>{
    dataService.getWishlist(req.params.eml)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//removeWishlist
server.post('/removeWishlist',(req,res)=>{
    dataService.removeWishlist(req.body.eml,req.body.product)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//addToCart
server.post('/addToCart',(req,res)=>{
    dataService.addToCart(req.body.eml,req.body.product)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//getCartList
server.get('/getCartList/:eml',(req,res)=>{
    dataService.getCartList(req.params.eml)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//removeCartItem
server.post('/removeCartItem',(req,res)=>{
    dataService.removeCartItem(req.body.eml,req.body.product)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// emptyCart
server.post('/emptyCart',(req,res)=>{
    dataService.emptyCart(req.body.eml)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//deleteAccount
server.delete('/deleteAccount/:eml',(req,res)=>{
    dataService.deleteAccount(req.params.eml)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//order

server.post('/order',(req,res)=>{
    dataService.orderr(req.body.eml,req.body.data)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//getOrders
server.get('/get-orders/:eml',(req,res)=>{
    dataService.getOrders(req.params.eml)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//removeOrder
server.post('/remove-order',(req,res)=>{
    dataService.removeOrder(req.body.eml,req.body.product)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})




