import axios from "axios";
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
    doc.moveDown();

    for (const [index, item] of order.products.entries()) {
      doc.fontSize(14).text(`${index + 1}. ${item.productId?.name}`);

      // Product Image
      if (item.selectedColorImage) {
        try {
          const response = await axios.get(item.selectedColorImage, {
            responseType: "arraybuffer",
          });

          doc.image(Buffer.from(response.data), {
            fit: [80, 100],
            align: "left",
          });
        } catch (err) {
          console.log("Image load failed");
        }
      }

      doc.fontSize(11).text(`Quantity : ${item.quantity}`);

      if (item.size) {
        doc.text(`Size : ${item.size}`);
      }

      if (item.selectedColor) {
        doc.text(`Color : ${item.selectedColor}`);
      }

      doc.text(
        `Price : ₹${item.productId?.price_min || item.productId?.price || 0}`,
      );

      doc.moveDown(2);
    }

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
