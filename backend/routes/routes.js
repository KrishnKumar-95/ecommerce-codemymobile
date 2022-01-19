const express = require("express");
const router = express.Router();
const User = require("../src/models/Users")
const bcrypt = require("bcryptjs");
const async = require("hbs/lib/async");

// HOMEPAGE
router.get("/home",(req,res)=>{
    res.status(200).render("homepage");
})

// CART
router.get("/cart",(req,res)=>{
    res.status(200).render("cart");
});

// LOGIN PAGE
router.get("/login",(req,res)=>{
    res.status(200).render("login");
});

// ORDERS OF THE USER
router.get("/orderlist",(req,res)=>{
    res.status(200).render("orderlist");
});

// PRODUCT IN DETAIL
router.get("/product",(req,res)=>{
    res.status(200).render("product");
});

// REGISTRATION PAGE
router.get("/register",(req,res)=>{
    res.status(200).render("register");
});

// ALL PRODUCTS PAGE
router.get("/products",(req,res)=>{
    res.status(200).render("products");
});

// HELP CENTER
router.get("/help",(req,res)=>{
    res.status(200).render("help");
});

// SignUp Code
router.post("/register",async(req,res)=>{
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    try{
        if(password === cpassword){
            const passcode = await bcrypt.hash(req.body.password,12);
            const registerCust = new User({
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            phone:req.body.phone,
            password:passcode,
            confirmpassword:passcode,
            address: req.body.address
        });
        
        await registerCust.save();
        res.status(201).render("products",{
            name:req.body.name,
            email:req.body.email
        })
        
    }else{
        res.render("register",{
            msg: `Both Passwords are not matching`
        })
    }
    }catch{
        res.status(500).render("register",{
            msg: `Error Occured at server side`
        })
    }
});

// Login Code
router.post("/login",async(req,res)=>{
    const phone = parseInt(req.body.phone);
    const Cpass = req.body.password;

    const custData = await User.findOne({phone:phone});
    const comparePass = await bcrypt.compare(Cpass,custData.password);

    try {
        if(comparePass==true){
            res.status(200).render("products",{
                name:custData.name,
                email: custData.email
            })
        }else{
            res.status(400).render("login",{
                msg: `Invalid Login Details`
            })
        }
    } catch{
        res.status(500).render("login",{
            msg: `Error Occured at server side`
        })        
    }

});

module.exports = router;
