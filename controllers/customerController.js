const {subscriber} = require('../models/customer');

const getAllCustomers = async (req, res, next) => {
    subscriber.find().sort({'timestamp': -1}).exec((err, users) => {
        if(err) return console.log(err)
        res.render('customerlist', {
            customers: users
        });
      });
    //const list = await subscriber.find().exec();

}

const searchCustomer = async (req, res, next) =>{
    try {  
        subscriber.find({$or:[{email:{'$regex':req.query.dsearch}},{discord_id:{'$regex':req.query.dsearch}},{discord_name:{'$regex':req.query.dsearch}},{discord_twitter:{'$regex':req.query.dsearch}},{cust_id:{'$regex':req.query.dsearch}}]}).sort({'timestamp': -1}).exec((err, users) =>{  
        if(err){  
        console.log(err);  
        }else{  
        res.render('customerlist',{
            customers:users
        });  
        }  
        })  
        } catch (error) {  
        console.log(error);  
        }  
}


const getAddCustomerView = (req, res, next) => {
    res.render('addCustomer');
}

const addCustomer = async (req, res, next) => {
    const data = req.body;
    let user = await new subscriber({
        timestamp: data.timestamp,
        email: data.email,
        discord_id: data.discord_id,
        discord_name: data.discord_name,
        status: data.status,
        twitter: data.twitter,
        cust_id:data.cust_id,
        channel:data.channel,
    });
    user = await user.save();
    res.redirect('/');
}

const getUpdateCustomerView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const onecustomer = await subscriber.findById(id).exec();
        res.render('updateCustomer', {
            customer: onecustomer
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateCustomer = async(req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    let user = await subscriber.findByIdAndUpdate(id, {
        timestamp: data.timestamp,
        email: data.email,
        discord_id: data.discord_id,
        discord_name: data.discord_name,
        status: data.status,
        twitter: data.twitter,
        cust_id:data.cust_id,
        channel:data.channel,
    }, {new: true});
    if(!user) return res.status(404).send('Subscriber with the given id not found');

    res.redirect('/');
}

const getDeleteCustomerView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const onecustomer = await subscriber.findById(id).exec();
        res.render('deleteCustomer', {
            customer: onecustomer
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteCustomer = async (req, res, next) => {
    try {
        const id = req.params.id;
        const customer = await subscriber.findByIdAndRemove(id);
        if(!customer) return res.status(404).send('Subsciber with the given id not found');
        res.redirect('/');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAllCustomers,
    searchCustomer,
    getAddCustomerView,
    addCustomer,
    getUpdateCustomerView,
    updateCustomer,
    getDeleteCustomerView,
    deleteCustomer
}