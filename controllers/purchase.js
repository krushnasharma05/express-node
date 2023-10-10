const razorpay = require('razorpay');
const dotenv = require('dotenv');
const Order = require('../models/orders');
const userTable = require('../models/user');
dotenv.config();

exports.primiumMembership = async (req, res, next) =>{
    try{
        var rzp = new razorpay ({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET 
        });
        const amount = 9900;
        rzp.orders.create({amount: amount, currency:"INR"},async (err,order)=>{
            if(err){
                console.log(err);
            }
            const result = await Order.create({orderId : order.id, status : "PENDING", userId: req.user.id});
            res.status(201).json({order, key_id : rzp.key_id});
        })

    }catch(err){
        console.log(err)
        res.status(403).json({massage: "something went wrong", error: err})};

};

exports.updateStatus = async (req,res,next) => {
    try{

        const { paymentId, orderId } = req.body;
        const order = await Order.findOne({where:{orderId:orderId}});

        await order.update({paymentId: paymentId, status: "SUCCESSFUL"});
        await req.user.update({isPremiumUser : true});
        res.status(200).json({success:true, massage: "transaction is succesful"})
    }
    catch(err){console.log(err)};



};