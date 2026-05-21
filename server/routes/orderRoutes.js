import express from "express";
import {
  createOrder,
  getOrders,
  requestReturn,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrders);

router.put("/:id", updateOrderStatus);

router.put("/return/:id", requestReturn);

export default router;
