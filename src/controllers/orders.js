const PurchaseOrder = require("../models/PurchaseOrder");
const { ApiResponse } = require("../utils/apiResponse");

const createPurchaseOrder = async (req, res) => {
  try {
    const { purchasedFrom, purchasedBy, lineItems } = req.body;
    const newOrder = new PurchaseOrder({
      purchasedFrom,
      purchasedBy,
      lineItems,
    });
    const savedOrder = await newOrder.save();
    res
      .status(201)
      .json(new ApiResponse(201, savedOrder, "Order created Successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error, error.message));
  }
};

const getPurchaseOrderById = async(req,res) =>{
    try {
        const orderId = req.body.id;
        const order = await PurchaseOrder.findById(orderId);
        if(!order){
            throw new Error("Order Not Found");
        }
        res.status(200).json(new ApiResponse(200,order,"order fetched successfully"))

        
    } catch (error) {
        res.status(400).json(new ApiResponse(400,error,error.message))
        
    }
}


const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const PurchaseOrder = await Order.findById(orderId);
    if (!order) throw new Error("Order Not Found");
    if (order.status === "Completed") {
      throw new Error("Order is already completed");
    }
    if (status === "Shipped" && order.status !== "Pending") {
      throw new Error("Order Must be Pending before it can be shipped");
    }
    order.status = status;
    await order.save();
    return res.json(new ApiResponse(201, order, "Sucessfully Updated"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error, "Order Not Found"));
  }
};
module.exports ={createPurchaseOrder,updateOrderStatus,getPurchaseOrderById}