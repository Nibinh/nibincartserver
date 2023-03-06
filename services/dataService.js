//import db.js
const db=require('./db')

//register
const register=(eml,pnum,pswd)=>{
    console.log('Inside register Function')

    return db.User.findOne({
        eml
    }).then((result)=>{
        console.log(result)
        if(result){
            //email already exist
            return{
                statusCode:403,
                message:'Account already exists!'
            }
             
        }
        else{
            //to add new user
            const newUser=new db.User({
                eml,
                phonenumber:pnum,
                password:pswd,
                wishlist:[],
                cart:[],
                order:[]
            })
            newUser.save()
            return{
                statusCode:200,
                message:'Registration successfull'
            }
        }

    })
}

//login
const login=(eml,pswd)=>{
    console.log('inside login function')
    return db.User.findOne({
        eml,
        password:pswd
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                message:'login successfull',
                email:result.eml
            }
        }
        else{
            return{
                statusCode:404,
                message:'Invalid Account / password'
            }
        }
    })

}

//all-products
const allProducts=()=>{
    console.log('inside all products')
    return db.Product.find()
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                products:result
            }   
        }
        else{
            return{
                statusCode:404,
                message:"No data is present"
            }
        }
    })
}

//view product
const viewProduct=(id)=>{
    return db.Product.findOne({
        id
    })
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                product:result
            }

        }else{
            return{
                statusCode:404,
                message:"product is unvailable"
            }
        }
    })

}

//add to wishlist
const addToWishlist=(eml,product)=>{
    console.log('inside addtoWishlsit')
    return db.User.findOne({
        eml
    }).then((result)=>{
        if(result){
            result.wishlist.push(
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    image: product.image,
                    rating: {
                      rate: product.rating.rate,
                      count: product.rating.count
                    }                       
            }
            )
            result.save()
            return{
                statusCode:200,
                message:'product is added to your wishlist'
            }
        }
        else{
            return{
                statusCode:404,
                message:"please Login First"
            }
        }
    })
}

//getWishlist
const getWishlist=(eml)=>{
    console.log('inside getWishlist')
    return db.User.findOne({
        eml
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                allwishlist:result.wishlist
            }
        }
        else{
            return{
                statusCode:404,
                message:'whishlist not found'
            }
        }
    })

}

const removeWishlist=(eml,product)=>{
    console.log("inside remove wishlist")
    return db.User.findOne({
        eml
    }).then((result)=>{
        if(result){
            result.wishlist.pull(

                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    image: product.image,
                    rating: {
                      rate: product.rating.rate,
                      count: product.rating.count
                    }                       
            }
            )
            result.save()
            return{
                statusCode:200,
                message:'product removed successfully'
            }
        }
        else{
            return{
                statusCode:404,
                message:'wishlist not found'
            }
        }
    })
}

const addToCart=(eml,product)=>{
    console.log("inside add to cart")
    return db.User.findOne({
        eml
    }).then((result)=>{
        if(result){
            result.cart.push(
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    image: product.image,
                    rating: {
                      rate: product.rating.rate,
                      count: product.rating.count
                    }                       
            }
            )
            result.wishlist.pull(
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    image: product.image,
                    rating: {
                      rate: product.rating.rate,
                      count: product.rating.count
                    }                       
            }
            )
            result.save()
            return{
                statusCode:200,
                message:"product added to your cart"
            }
        }
        else{
            return{
                statusCode:404,
                message:"Please login first"
            }
        }
      
       
    })
 
}

const getCartList=(eml)=>{
    console.log("inside get cart list")
    return db.User.findOne({
        eml
    })
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                products:result.cart
            }
        }
        else{
            return{
                statusCode:404,
                message:"its not found "
            }
        }
    })

}

//removeCartItem

const removeCartItem=(eml,product)=>{
    console.log("inside removeCartItem")
    return db.User.findOne({
        eml
    })
    .then((result)=>{
        if(result){
            
            result.cart.pull(

                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    image: product.image,
                    rating: {
                        rate: product.rating.rate,
                      count: product.rating.count
       }                       
            }
            )
            result.save()
            return{
                statusCode:200,
                message:"Item removed from your cart list"
            }
        }
        else{
            return{
                statusCode:404,
                message:"not found"
            }
        }
    })
}

//emptyCart
const emptyCart =(eml)=>{
    console.log("inside empty cart")
    return db.User.updateOne({
        eml
    },{$set:{cart:[]}})
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                message:"updated"
            }
        }
        else{
            return{
                statusCode:404,
                message:"npe"
            }
        }
      
    })

}

//deleteAccount

const deleteAccount=(eml)=>{
    return db.User.deleteOne({
        eml
    })
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                message:"Account deleted successfully"
            }
        }
        else{
            return{
                statusCode:401,
                message:"Invalid Account"
            }
        }
    })
}

const orderr=(eml,data)=>{
    console.log("inside order")
    return db.User.findOne({
        eml
    })
    .then((result)=>{
        if(result){
            result.order.push(
                {
                    id: data.id,
                    title: data.title,
                    price: data.price,
                    description: data.description,
                    category: data.category,
                    image: data.image,
                    rating: {
                      rate: data.rating.rate,
                      count: data.rating.count
                    }                       
            }
            )
            result.save()
            return{
                statusCode:200,
                message:"added to order"
            }
        }
        else{
            return{
                statusCode:404,
                message:"not added"
            }
        }
       
    })
}
//getOrders
const getOrders=(eml)=>{
    console.log("inside get oreders")
    return db.User.findOne({
        eml
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                products:result.order
            }
        }
        else{
            return{
                statusCode:404,
                message:"not available"
            }
        }
    })
}
//removing a item from order
const removeOrder=(eml,product)=>{
    console.log("inside removeCartItem")
    return db.User.findOne({
        eml
    })
    .then((result)=>{
        if(result){
            
            result.order.pull(

                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    image: product.image,
                    rating: {
                        rate: product.rating.rate,
                      count: product.rating.count
       }                       
            }
            )
            result.save()
            return{
                statusCode:200,
                message:"Item removed from your order list"
            }
        }
        else{
            return{
                statusCode:404,
                message:"not found"
            }
        }
    })
}





module.exports={
    register,
    login,
    allProducts,
    viewProduct,
    addToWishlist,
    getWishlist,
    removeWishlist,
    addToCart,
    getCartList,
    removeCartItem,
    emptyCart,
    deleteAccount,
    orderr,
    getOrders,
    removeOrder
    
    
}