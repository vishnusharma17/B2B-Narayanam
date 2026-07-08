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
    // LOGO & HEADER
    // =========================
    try {
      const logo = await axios.get(
        "https://res.cloudinary.com/dpvzakvb4/image/upload/v1750000000/narayanam/logo.png",
        { responseType: "arraybuffer" },
      );
      doc.image(Buffer.from(logo.data), 40, 35, { width: 75 });
    } catch (err) {
      doc
        .fontSize(22)
        .fillColor(PRIMARY)
        .font("Helvetica-Bold")
        .text("NARAYANAM", 40, 45);
    }

    // INVOICE TITLE
    doc
      .fillColor(PRIMARY)
      .font("Helvetica-Bold")
      .fontSize(22)
      .text("TAX INVOICE", 330, 40);
    doc.fontSize(10).fillColor(GRAY).font("Helvetica");
    doc.text(
      `Invoice No : INV-${order._id.toString().slice(-8).toUpperCase()}`,
      330,
      65,
    );
    doc.text(`Order ID : ${order._id.toString().slice(-10)}`, 330, 80);
    doc.text(
      `Date : ${new Date(order.createdAt).toLocaleDateString()}`,
      330,
      95,
    );

    // =========================
    // COMPANY & CUSTOMER DETAILS
    // =========================
    // Sold By Box
    doc.roundedRect(40, 125, 250, 90, 8).fill(LIGHT);
    doc
      .fillColor(PRIMARY)
      .fontSize(12)
      .font("Helvetica-Bold")
      .text("Sold By", 50, 135);
    doc.font("Helvetica").fontSize(10).fillColor("#444");
    doc.text("Narayanam", 50, 155);
    doc.text("Jaipur, Rajasthan", 50, 170);
    doc.text("support@narayanam.com", 50, 185);
    doc.text("+91 XXXXX XXXXX | GST: XXXXXXXX", 50, 200);

    // Bill To Box
    doc.roundedRect(305, 125, 250, 90, 8).fill("#FFF9EF");
    doc
      .fillColor(PRIMARY)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("Bill To", 315, 135);
    doc.fillColor("#444").font("Helvetica").fontSize(10);
    doc.text(order.customerName || "-", 315, 155);
    doc.text(order.phone || "-", 315, 170);
    doc.text(order.email || "-", 315, 185, { width: 230 });
    doc.text(order.address || "-", 315, 200, { width: 230 });

    // =========================
    // STATUS BADGES
    // =========================
    const paymentColor = order.paymentStatus === "paid" ? "#27AE60" : "#F39C12";
    let statusColor = "#F39C12";
    if (order.status === "confirmed") statusColor = "#3498DB";
    if (order.status === "shipped") statusColor = "#8E44AD";
    if (order.status === "delivered") statusColor = "#27AE60";
    if (order.status === "cancelled") statusColor = "#E74C3C";

    doc.roundedRect(40, 230, 90, 20, 5).fill(paymentColor);
    doc
      .fillColor("white")
      .fontSize(9)
      .font("Helvetica-Bold")
      .text(order.paymentStatus.toUpperCase(), 40, 236, {
        width: 90,
        align: "center",
      });

    doc.roundedRect(140, 230, 90, 20, 5).fill(statusColor);
    doc
      .fillColor("white")
      .fontSize(9)
      .font("Helvetica-Bold")
      .text(order.status.toUpperCase(), 140, 236, {
        width: 90,
        align: "center",
      });

    // =========================
    // TABLE HEADER
    // =========================
    const tableY = 265;
    doc.rect(40, tableY, 515, 24).fill(PRIMARY);
    doc.fillColor("white").font("Helvetica-Bold").fontSize(9);
    doc.text("IMAGE", 50, tableY + 7);
    doc.text("PRODUCT", 110, tableY + 7);
    doc.text("COLOR", 280, tableY + 7);
    doc.text("SIZE", 345, tableY + 7);
    doc.text("QTY", 405, tableY + 7);
    doc.text("PRICE", 455, tableY + 7);

    let currentY = tableY + 30;

    // =========================
    // PRODUCTS LOOP
    // =========================
    for (const item of order.products) {
      const price = item.productId?.price_min || item.productId?.price || 0;

      // Row Background (Reduced height to 60)
      doc.roundedRect(40, currentY - 4, 515, 60, 5).fill("#FFFFFF");

      // Product Image (Smaller thumbnail)
      const image =
        item.selectedColorImage || item.colorImage || item.productId?.mainImage;
      if (image) {
        try {
          const response = await axios.get(image, {
            responseType: "arraybuffer",
          });
          doc.image(Buffer.from(response.data), 45, currentY, {
            width: 40,
            height: 50,
          });
        } catch (err) {
          doc
            .fillColor("#999")
            .fontSize(8)
            .text("No Image", 45, currentY + 20);
        }
      }

      // Details
      doc
        .fillColor("#111")
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(item.productId?.name || "Product", 110, currentY + 5, {
          width: 160,
        });
      doc
        .fillColor("#777")
        .font("Helvetica")
        .fontSize(8)
        .text(
          `SKU: ${item.productId?.sku || "-"}  |  MOQ: ${item.productId?.moq || "-"}`,
          110,
          currentY + 25,
        );

      doc.fillColor("#333").fontSize(9);
      doc.text(item.selectedColor || item.color || "-", 280, currentY + 15);
      doc.text(item.size || "-", 345, currentY + 15);
      doc.text(item.quantity.toString(), 405, currentY + 15);
      doc.text(`${currency}${price.toFixed(2)}`, 455, currentY + 15);

      // Line
      doc
        .moveTo(40, currentY + 56)
        .lineTo(555, currentY + 56)
        .strokeColor("#ECECEC")
        .stroke();

      currentY += 65; // Much tighter spacing

      // Page Break only if really needed (e.g., > 5 products)
      if (currentY > 600) {
        doc.addPage();
        currentY = 60;
      }
    }

    currentY += 10;

    // =========================
    // BOTTOM SECTIONS (SIDE BY SIDE)
    // =========================
    // To save space: Payment/Shipping on Left, Totals on Right

    // Left Column: Payment & Shipping
    doc.roundedRect(40, currentY, 255, 65, 8).fill("#F8F3EC");
    doc
      .fillColor(PRIMARY)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("Payment Details", 50, currentY + 10);
    doc.fillColor("#444").font("Helvetica").fontSize(9);
    doc.text(`Method : ${order.paymentMethod || "-"}`, 50, currentY + 28);
    doc.text(`Payment ID : ${order.paymentId || "-"}`, 50, currentY + 42);

    doc.roundedRect(40, currentY + 75, 255, 65, 8).fill("#FFF9EF");
    doc
      .fillColor(PRIMARY)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("Shipping Details", 50, currentY + 85);
    doc.fillColor("#444").font("Helvetica").fontSize(9);
    doc.text(
      `Courier : ${order.courierName || "Not Assigned"}`,
      50,
      currentY + 103,
    );
    doc.text(`Tracking ID : ${order.trackingId || "-"}`, 50, currentY + 117);

    // Right Column: Totals Box
    doc.roundedRect(305, currentY, 250, 140, 8).fill("#FFF9EF");
    doc.fillColor("#333").font("Helvetica").fontSize(10);
    doc.text("Subtotal", 320, currentY + 20);
    doc.text(`${currency}${order.totalAmount.toFixed(2)}`, 450, currentY + 20, {
      width: 90,
      align: "right",
    });

    doc.text("Shipping", 320, currentY + 45);
    doc.text("FREE", 450, currentY + 45, { width: 90, align: "right" });

    doc.text("Discount", 320, currentY + 70);
    doc.text(`${currency}0.00`, 450, currentY + 70, {
      width: 90,
      align: "right",
    });

    doc
      .moveTo(320, currentY + 95)
      .lineTo(535, currentY + 95)
      .strokeColor("#DDD")
      .stroke();

    doc.fillColor("#7A1E1E").font("Helvetica-Bold").fontSize(12);
    doc.text("Grand Total", 320, currentY + 110);
    doc.text(
      `${currency}${order.totalAmount.toFixed(2)}`,
      430,
      currentY + 110,
      { width: 110, align: "right" },
    );

    currentY += 155;

    // =========================
    // THANK YOU STRIP & TERMS
    // =========================
    if (currentY > 700) {
      doc.addPage();
      currentY = 60;
    } // Fallback

    // Thin Thank you banner
    doc.roundedRect(40, currentY, 515, 30, 8).fill(PRIMARY);
    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("Thank You For Shopping With Narayanam ❤️", 40, currentY + 10, {
        align: "center",
      });

    currentY += 45;

    // Compact Terms
    doc
      .fillColor(PRIMARY)
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Terms & Conditions", 40, currentY);
    doc.fillColor("#666").font("Helvetica").fontSize(8);
    doc.text(
      "• Goods once sold are subject to our return policy.   • Keep this invoice for future reference.",
      40,
      currentY + 15,
    );
    doc.text(
      "• Product colors may slightly vary because of screen settings.   • For support contact support@narayanam.com",
      40,
      currentY + 28,
    );

    // =========================
    // FOOTER
    // =========================
    const footerY = doc.page.height - 40;
    doc
      .moveTo(40, footerY)
      .lineTo(555, footerY)
      .strokeColor("#DDDDDD")
      .stroke();
    doc
      .fillColor("#999")
      .fontSize(8)
      .font("Helvetica")
      .text(
        "This is a computer generated invoice and does not require a signature.",
        40,
        footerY + 10,
        { align: "center" },
      );

    doc.end();
  } catch (error) {
    console.error("Error generating invoice:", error);
    if (!res.headersSent) {
      res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error while generating invoice",
        });
    }
  }
};
