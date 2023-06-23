const router = require('express').Router();
const instance = require('../configuration');
const crypto = require('crypto');

router.post('/checkout', async (req, res) => {

    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };

        const order = await instance.orders.create(options);
        console.log(order);
        res.status(200).json({
            success: true,
            payload: order
        });
    }
    catch (error) {
        res.status(500).json(error.message);
    }

});






router.post('/paymentverification', async (req, res) => {
    console.log(req.body);
    let amount = 0;

    const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex');
    console.log("sig received ", req.body.razorpay_signature);
    console.log("sig generated ", expectedSignature);
    const response = { signatureIsValid: false }
    if (expectedSignature === req.body.razorpay_signature) {

        const timeOptions = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        const indianDateTime = new Date().toLocaleString('en-US', timeOptions);



        const orderPaymentDetails = {
            razorpay_order_id: req.body.razorpay_order_id,
            razorpay_payment_id: req.body.razorpay_payment_id,
            razorpay_signature: req.body.razorpay_signature,
            expectedSignature: expectedSignature,
            timeOfPayment: indianDateTime
        };


        res.redirect(`https://national-news.onrender.com/`);
    }

});


module.exports = router;