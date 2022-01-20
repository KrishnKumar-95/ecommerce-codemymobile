const express = require("express");
const router = express.Router();
const User = require("../src/models/Users")
const bcrypt = require("bcryptjs");
const async = require("hbs/lib/async");
const { db } = require("../src/db/conn_mysql");
const bcryptjs = require("bcryptjs");

require("../src/db/conn_mysql")

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
// router.post("/register",async(req,res)=>{
//     const password = req.body.password;
//     const cpassword = req.body.confirmpassword;
//     try{
//         if(password === cpassword){
//             const passcode = await bcrypt.hash(req.body.password,12);
//             const registerCust = new User({
//             name:req.body.name,
//             age:req.body.age,
//             email:req.body.email,
//             phone:req.body.phone,
//             password:passcode,
//             confirmpassword:passcode,
//             address: req.body.address
//         });
        
//         await registerCust.save();
//         res.status(201).render("products",{
//             name:req.body.name,
//             email:req.body.email
//         })
        
//     }else{
//         res.render("register",{
//             msg: `Both Passwords are not matching`
//         })
//     }
//     }catch{
//         res.status(500).render("register",{
//             msg: `Error Occured at server side`
//         })
//     }
// });

// Login Code
// router.post("/login",async(req,res)=>{
//     const phone = parseInt(req.body.phone);
//     const Cpass = req.body.password;

//     const custData = await User.findOne({phone:phone});
//     const comparePass = await bcrypt.compare(Cpass,custData.password);

//     try {
//         if(comparePass==true){
//             res.status(200).render("products",{
//                 name:custData.name,
//                 email: custData.email
//             })
//         }else{
//             res.status(400).render("login",{
//                 msg: `Invalid Login Details`
//             })
//         }
//     } catch{
//         res.status(500).render("login",{
//             msg: `Error Occured at server side`
//         })        
//     }

// });

// MYSQL SECTION

// CREATING THE TABLE BY GIVING TABLE NAME
router.get("/createtable/:table",(req,res)=>{
    let table = req.params.table;
    let sql = `CREATE TABLE ${table}(id int AUTO_INCREMENT, name VARCHAR(255), age int(150), email VARCHAR(255) UNIQUE, phone BIGINT UNIQUE, password CHAR(100), confirmpassword CHAR(100), address text(255), PRIMARY KEY (id))`;
    db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.status(200).render("products",{
            name: `MySql Table created for E-Commerce Website`,
            email: `Joy..! Now you can use MySql Database`
        });
    });
});

// SAVING THE COMING DATA FROM THE HTML FORM INTO THE MYSQL DATABASE
router.post("/register",async(req,res)=>{
    // USING THIS BECAUSE WE HAVE TO HASH THE PASSWORD
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    // TO CATCH DUPLICATE ENTRY
    const dupicateEntry = 'ER_DUP_ENTRY';
    try{
        if(password==cpassword){
            const passhash = await bcrypt.hash(password,12);
            let data = {
                name: name,
                age: age,
                email: email,
                phone: phone,
                password: passhash,
                confirmpassword: passhash,
                address: address
            };
            let sql = `INSERT INTO customers SET ?`;
            let query = db.query(sql, data, (err,result)=>{
                if(err) throw err;
                console.log(result);
                res.status(201).render("products",{
                    name: name,
                    email: email
                });
            });
        }else{
            res.status(400).render("register",{
                msg: `Both Passwords are not matching`
            })
        }
    }catch(err){
        res.status(500).render("register",{
            msg: `Server side error`
        })
    }
})

// LOGIN USING DATA SAVED IN THE MYSQL DATABASE
router.post("/login",async(req,res)=>{
    const phone = parseInt(req.body.phone);
    const enteredPassword = req.body.password;

    const sql = `SELECT * FROM customers WHERE phone = ${phone}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        
        try{
            const passCompare = bcrypt.compareSync(enteredPassword, result[0].password);
            if(passCompare == true){
                res.status(200).render("products",{
                    name: result[0].name,
                    email: `Logged in Successfully`
                })
            }else{
                res.status(400).render("login",{
                    msg: `Invalid Login Details`
                });
            }
        }catch(err){
            res.status(500).render("login",{
                msg: `Server side Error`
            });
        }
    });

})

module.exports = router;
