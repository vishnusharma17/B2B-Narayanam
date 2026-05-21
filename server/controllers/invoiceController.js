import PDFDocument from "pdfkit";
import Order from "../models/orderModel.js";

export const generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.productId",
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`,
    );

    doc.pipe(res);

    doc.fontSize(22).text("Narayanam Invoice", {
      align: "center",
    });

    doc.moveDown();

    doc.text(`Order ID: ${order._id}`);

    doc.text(`Customer: ${order.customerName}`);

    doc.text(`Email: ${order.email}`);

    doc.text(`Phone: ${order.phone}`);

    doc.text(`Address: ${order.address}`);

    doc.moveDown();

    doc.text("Products:");

    order.products.forEach((item) => {
      doc.text(`${item.productId?.name} - Qty: ${item.quantity}`);
    });

    doc.moveDown();

    doc.text(`Total Amount: ₹${order.totalAmount}`);

    doc.text(`Payment Status: ${order.paymentStatus}`);

    doc.text(`Order Status: ${order.status}`);

    doc.end();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
