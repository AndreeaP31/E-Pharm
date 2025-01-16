import Order from  "../models/Order.model.js";
import mongoose from "mongoose";


export const getCourierOrders = async (req, res) => {
    const { pharmacyName } = req.params;
  
    try {
      // Găsim comenzile asociate farmaciei curierului
      const orders = await Order.find({ pharmacy: pharmacyName }).populate("products.product");
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this pharmacy." });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching courier orders:", error.message);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };

  export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate("products.product");
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found." });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching all orders:", error.message);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };export const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
  
    try {
      // Validăm statusul
      const validStatuses = ["plasata","acceptată", "preluată", "livrată", "anulată"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Valoare de status invalidă." });
      }
  
      // Găsim comanda în baza de date
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Comanda nu a fost găsită." });
      }
  
      // Dacă statusul este "livrată" sau "anulată", ștergem comanda
      if (status === "livrată" || status === "anulată") {
        await Order.findByIdAndDelete(orderId);
        return res.status(200).json({ message: `Comanda a fost ${status === "livrată" ? "livrată" : "anulată"} și ștearsă.` });
      }
  
      // Actualizăm statusul pentru alte cazuri
      order.status = status;
      order.updatedAt = Date.now();
      await order.save();
  
      res.status(200).json({ message: "Statusul comenzii a fost actualizat cu succes.", order });
    } catch (error) {
      console.error("Eroare la actualizarea statusului comenzii:", error.message);
      res.status(500).json({ message: "Eroare server. Încearcă din nou mai târziu." });
    }
  };
  
  
export const getUserOrders = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Verifică dacă userId este un ObjectId valid
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.error("Invalid userId:", userId);
        return res.status(400).json({ message: "Invalid userId." });
      }
  
      const orders = await Order.find({ user: userId }).populate("products.product").populate("pharmacy");
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found." });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };
export const createOrder = async (req, res) => {
    console.log("Request body:", req.body);
  
    const { userId, pharmacyId, products, address, name, phone } = req.body;
  
    try {
      // Validare date
      if (!userId || !pharmacyId || !products || !address || !name || !phone) {
        console.error("Missing required fields:", { userId, pharmacyId, products, address, name, phone });
        return res.status(400).json({ message: "All fields are required." });
      }
  
      if (!Array.isArray(products) || products.length === 0) {
        console.error("Invalid products array:", products);
        return res.status(400).json({ message: "Products array is invalid or empty." });
      }
  
      // Conversie la ObjectId folosind `new`
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const pharmacyObjectId = new mongoose.Types.ObjectId(pharmacyId);
      const productArray = products.map((item) => ({
        product: new mongoose.Types.ObjectId(item.productId),
        quantity: item.quantity,
      }));
  
      // Calculează totalul comenzii
      const totalPrice = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
      console.log("Calculated totalPrice:", totalPrice);
  
      // Creează comanda
      const newOrder = new Order({
        user: userObjectId,
        pharmacy: pharmacyObjectId,
        products: productArray,
        totalPrice,
        address,
        name,
        phone,
        status: "plasata",
      });
  
      // Salvează comanda
      await newOrder.save();
      console.log("Order created successfully:", newOrder);
  
      res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
      console.error("Error placing order:", error.message);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };