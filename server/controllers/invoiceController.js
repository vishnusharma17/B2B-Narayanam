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
        success: false,
        message: "Order not found",
      });
    }

    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`,
    );

    doc.pipe(res);

    const PRIMARY = "#7A1E1E";
    const GOLD = "#D4AF37";
    const GRAY = "#666666";
    const LIGHT = "#F8F3EC";

    const currency = "Rs. ";

    // =========================
    // LOGO
    // =========================

    try {
      const logo = await axios.get(
        "https://res.cloudinary.com/dpvzakvb4/image/upload/v1750000000/narayanam/logo.png",
        {
          responseType: "arraybuffer",
        },
      );

      doc.image(Buffer.from(logo.data), 40, 35, {
        width: 90,
      });
    } catch (err) {
      doc
        .fontSize(28)
        .fillColor(PRIMARY)
        .font("Helvetica-Bold")
        .text("NARAYANAM", 40, 45);
    }

    // =========================
    // INVOICE TITLE
    // =========================

    doc
      .fillColor(PRIMARY)
      .font("Helvetica-Bold")
      .fontSize(26)
      .text("TAX INVOICE", 330, 45);

    doc.fontSize(11).fillColor(GRAY).font("Helvetica");

    doc.text(
      `Invoice No : INV-${order._id.toString().slice(-8).toUpperCase()}`,
      330,
      78,
    );

    doc.text(`Order ID : ${order._id.toString().slice(-10)}`, 330, 94);

    doc.text(
      `Date : ${new Date(order.createdAt).toLocaleDateString()}`,
      330,
      110,
    );

    // =========================
    // COMPANY DETAILS
    // =========================

    doc.roundedRect(40, 150, 250, 135, 10).fill(LIGHT);

    doc
      .fillColor(PRIMARY)
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("Sold By", 55, 165);

    doc.font("Helvetica").fontSize(11).fillColor("#444");

    doc.text("Narayanam", 55, 190);

    doc.text("Jaipur, Rajasthan", 55, 208);

    doc.text("support@narayanam.com", 55, 226);

    doc.text("+91 XXXXX XXXXX", 55, 244);

    doc.text("GST : XXXXXXXX", 55, 262);

    // =========================
    // CUSTOMER DETAILS
    // =========================

    doc.roundedRect(305, 150, 250, 135, 10).fill("#FFF9EF");

    doc
      .fillColor(PRIMARY)
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Bill To", 320, 165);

    doc.fillColor("#444").font("Helvetica").fontSize(11);

    doc.text(order.customerName || "-", 320, 190);

    doc.text(order.phone || "-", 320, 208);

    doc.text(order.email || "-", 320, 226, {
      width: 210,
    });

    doc.text(order.address || "-", 320, 244, {
      width: 210,
    });

    // =========================
    // PAYMENT STATUS BADGE
    // =========================

    const paymentColor = order.paymentStatus === "paid" ? "#27AE60" : "#F39C12";

    doc.roundedRect(40, 305, 120, 26, 6).fill(paymentColor);

    doc
      .fillColor("white")
      .fontSize(10)
      .font("Helvetica-Bold")
      .text(order.paymentStatus.toUpperCase(), 67, 313);

    // =========================
    // ORDER STATUS BADGE
    // =========================

    let statusColor = "#F39C12";

    if (order.status === "confirmed") statusColor = "#3498DB";
    if (order.status === "shipped") statusColor = "#8E44AD";
    if (order.status === "delivered") statusColor = "#27AE60";
    if (order.status === "cancelled") statusColor = "#E74C3C";

    doc.roundedRect(180, 305, 120, 26, 6).fill(statusColor);

    doc
      .fillColor("white")
      .fontSize(10)
      .font("Helvetica-Bold")
      .text(order.status.toUpperCase(), 205, 313);

    // =========================
    // TABLE HEADER
    // =========================

    const tableY = 355;

    doc.rect(40, tableY, 515, 30).fill(PRIMARY);

    doc.fillColor("white").font("Helvetica-Bold").fontSize(10);

    doc.text("IMAGE", 50, tableY + 10);
    doc.text("PRODUCT", 120, tableY + 10);
    doc.text("COLOR", 275, tableY + 10);
    doc.text("SIZE", 345, tableY + 10);
    doc.text("QTY", 405, tableY + 10);
    doc.text("PRICE", 455, tableY + 10);

    let currentY = tableY + 45;

    // =========================
    // PRODUCTS
    // =========================

    for (const item of order.products) {
      const price = item.productId?.price_min || item.productId?.price || 0;
      const total = price * item.quantity;

      // Row Background
      doc.roundedRect(40, currentY - 8, 515, 90, 8).fill("#FFFFFF");

      // Product Image
      const image =
        item.selectedColorImage || item.colorImage || item.productId?.mainImage;

      if (image) {
        try {
          const response = await axios.get(image, {
            responseType: "arraybuffer",
          });

          doc.image(Buffer.from(response.data), 48, currentY, {
            width: 55,
            height: 70,
          });
        } catch (err) {
          doc
            .fillColor("#999")
            .fontSize(9)
            .text("No Image", 55, currentY + 25);
        }
      }

      // Product Name
      doc
        .fillColor("#111")
        .font("Helvetica-Bold")
        .fontSize(11)
        .text(item.productId?.name || "Product", 120, currentY, {
          width: 140,
        });

      // SKU
      doc
        .fillColor("#777")
        .font("Helvetica")
        .fontSize(9)
        .text(`SKU : ${item.productId?.sku || "-"}`, 120, currentY + 18);

      // MOQ
      doc.text(`MOQ : ${item.productId?.moq || "-"}`, 120, currentY + 32);

      // Color
      doc
        .fillColor("#333")
        .fontSize(10)
        .text(item.selectedColor || item.color || "-", 275, currentY + 15);

      // Size
      doc.text(item.size || "-", 345, currentY + 15);

      // Qty
      doc.text(item.quantity.toString(), 405, currentY + 15);

      // Price
      doc.text(`${currency}${price.toFixed(2)}`, 455, currentY + 15);

      // Line
      doc
        .moveTo(40, currentY + 85)
        .lineTo(555, currentY + 85)
        .strokeColor("#ECECEC")
        .stroke();

      currentY += 95;

      // New Page
      if (currentY > 650) {
        doc.addPage();
        currentY = 60;
      }
    }

    // =========================
    // TOTALS
    // =========================

    currentY += 15;

    doc.roundedRect(325, currentY, 230, 120, 10).fill("#FFF9EF");

    doc.fillColor("#333").font("Helvetica").fontSize(11);

    doc.text("Subtotal", 340, currentY + 18);

    doc.text(`${currency}${order.totalAmount.toFixed(2)}`, 470, currentY + 18);

    doc.text("Shipping", 340, currentY + 42);

    doc.text("FREE", 470, currentY + 42);

    doc.text("Discount", 340, currentY + 66);

    doc.text(`${currency}0.00`, 470, currentY + 66);

    // Divider

    doc
      .moveTo(340, currentY + 88)
      .lineTo(535, currentY + 88)
      .strokeColor("#DDD")
      .stroke();

    // Grand Total

    doc.fillColor("#7A1E1E").font("Helvetica-Bold").fontSize(14);

    doc.text("Grand Total", 340, currentY + 98);

    doc.text(`${currency}${order.totalAmount.toFixed(2)}`, 455, currentY + 98);

    currentY += 150;
    // =========================
    // PAYMENT DETAILS
    // =========================

    if (currentY > 620) {
      doc.addPage();
      currentY = 60;
    }

    doc.roundedRect(40, currentY, 245, 140, 10).fill("#F8F3EC");

    doc
      .fillColor(PRIMARY)
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Payment Details", 55, currentY + 15);

    doc.fillColor("#444").font("Helvetica").fontSize(11);

    doc.text(
      `Payment Method : ${order.paymentMethod || "-"}`,
      55,
      currentY + 45,
    );

    doc.text(
      `Payment Status : ${order.paymentStatus || "-"}`,
      55,
      currentY + 68,
    );

    doc.text(`Payment ID : ${order.paymentId || "-"}`, 55, currentY + 91);

    doc.text(`Order Status : ${order.status}`, 55, currentY + 114);

    // =========================
    // SHIPPING DETAILS
    // =========================

    doc.roundedRect(310, currentY, 245, 140, 10).fill("#FFF9EF");

    doc
      .fillColor(PRIMARY)
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Shipping Details", 325, currentY + 15);

    doc.fillColor("#444").font("Helvetica").fontSize(11);

    doc.text(
      `Courier : ${order.courierName || "Not Assigned"}`,
      325,
      currentY + 45,
    );

    doc.text(`Tracking ID : ${order.trackingId || "-"}`, 325, currentY + 68, {
      width: 190,
    });

    doc.text(
      `Tracking : ${order.trackingLink || "Not Available"}`,
      325,
      currentY + 91,
      {
        width: 190,
      },
    );

    // =========================
    // THANK YOU BOX
    // =========================

    currentY += 170;

    if (currentY > 690) {
      doc.addPage();
      currentY = 60;
    }

    doc.roundedRect(40, currentY, 515, 90, 10).fill(PRIMARY);

    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(18)
      .text("Thank You For Shopping With Narayanam ❤️", 40, currentY + 18, {
        align: "center",
      });

    doc
      .font("Helvetica")
      .fontSize(11)
      .text(
        "We truly appreciate your trust in us. We hope you enjoy your purchase.",
        40,
        currentY + 48,
        {
          align: "center",
        },
      );

    // =========================
    // TERMS
    // =========================

    currentY += 115;

    doc
      .fillColor(PRIMARY)
      .font("Helvetica-Bold")
      .fontSize(13)
      .text("Terms & Conditions", 40, currentY);

    doc.fillColor("#666").font("Helvetica").fontSize(10);

    doc.text(
      "• Goods once sold are subject to our return policy.",
      50,
      currentY + 22,
    );

    doc.text("• Keep this invoice for future reference.", 50, currentY + 38);

    doc.text(
      "• Product colors may slightly vary because of screen settings.",
      50,
      currentY + 54,
    );

    doc.text("• For support contact support@narayanam.com", 50, currentY + 70);

    // =========================
    // FOOTER
    // =========================

    const footerY = doc.page.height - 60;

    doc
      .moveTo(40, footerY)
      .lineTo(555, footerY)
      .strokeColor("#DDDDDD")
      .stroke();

    doc
      .fillColor("#666")
      .fontSize(9)
      .font("Helvetica")
      .text(
        "This is a computer generated invoice and does not require a signature.",
        40,
        footerY + 12,
        {
          align: "center",
        },
      );

    doc.end();
  } catch (error) {
    console.error("Error generating invoice:", error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error while generating invoice",
      });
    }
  }
};
