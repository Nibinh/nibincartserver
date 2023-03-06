//import mongoose 
const mongoose=require('mongoose')

//Using mongoose define connection string
mongoose.connect('mongodb://localhost:27017/nibincart',()=>{
    console.log('Mongodb connected succesfully')
})

//create model for the users
const User=mongoose.model('User',{
    eml:String,
    phonenumber:Number,
    password:String,
    wishlist:[],
    cart:[],
    order:[]
})


//create model for prducts
const Product=mongoose.model('Product',{

    
        id: Number,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        rating: {
          rate: Number,
          count: Number
        }
      

})




//export model
module.exports={
    User,
    Product
}