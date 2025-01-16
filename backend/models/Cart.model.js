import mongoose from "mongoose";
const cartSchema=mongoose.Schema({
    _clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    cartDetails:[{
        type:orderDetailSchema
    },
  ],
});
const Cart=mongoose.model('carts', cartSchema);
module.exports={Cart};