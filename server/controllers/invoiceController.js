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

    // Initialize document with A4 size and margins
    const doc = new PDFDocument({ size: "A4", margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`,
    );

    doc.pipe(res);

    // --- COLORS & STYLES ---
    const primaryColor = "#2C3E50"; // Dark Blue/Grey for primary text
    const secondaryColor = "#7F8C8D"; // Lighter Grey for secondary text
    const accentColor = "#2980B9"; // Blue for highlights
    const currency = "₹"; // Note: Standard PDFKit fonts may need a custom .ttf for the ₹ symbol. Use 'INR' if it renders as a box.

    // --- 1. HEADER SECTION ---
    doc
      .fillColor(primaryColor)
      .fontSize(26)
      .font("Helvetica-Bold")
      .text("NARAYANAM", 50, 50);

    doc.fontSize(10).fillColor(secondaryColor).font("Helvetica");
    doc.text("123 Business Road, City, State, 12345", 50, 85);
    doc.text("Email: support@narayanam.com | Phone: +91 12345 67890", 50, 100);

    // Invoice Title & Meta Data (Right Aligned)
    doc
      .fillColor(accentColor)
      .fontSize(20)
      .font("Helvetica-Bold")
      .text("INVOICE", 400, 50, { align: "right" });
    doc.fillColor(primaryColor).fontSize(10).font("Helvetica-Bold");

    const shortOrderId = order._id.toString().substring(0, 8).toUpperCase();
    doc.text(`Invoice No: INV-${shortOrderId}`, 400, 75, { align: "right" });

    doc.font("Helvetica").fillColor(secondaryColor);
    const orderDate = order.createdAt
      ? new Date(order.createdAt).toLocaleDateString()
      : new Date().toLocaleDateString();
    doc.text(`Date: ${orderDate}`, 400, 90, { align: "right" });

    // Divider Line
    doc
      .moveTo(50, 130)
      .lineTo(545, 130)
      .lineWidth(1)
      .strokeColor("#EEEEEE")
      .stroke();

    // --- 2. BILLING & ORDER INFO ---
    const infoStartY = 150;

    // Customer Info (Left)
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fillColor(primaryColor)
      .text("Billed To:", 50, infoStartY);
    doc.font("Helvetica").fontSize(10).fillColor(secondaryColor);
    doc.text(order.customerName || "N/A", 50, infoStartY + 15);
    doc.text(order.address || "N/A", 50, infoStartY + 30);
    doc.text(`Email: ${order.email || "N/A"}`, 50, infoStartY + 45);
    doc.text(`Phone: ${order.phone || "N/A"}`, 50, infoStartY + 60);

    // Order Details (Right)
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fillColor(primaryColor)
      .text("Order Details:", 350, infoStartY);
    doc.font("Helvetica").fontSize(10).fillColor(secondaryColor);
    doc.text(`Order ID: ${order._id}`, 350, infoStartY + 15);
    doc.text(
      `Payment Status: ${order.paymentStatus || "Pending"}`,
      350,
      infoStartY + 30,
    );
    doc.text(
      `Order Status: ${order.status || "Processing"}`,
      350,
      infoStartY + 45,
    );

    // --- 3. TABLE HEADER ---
    const tableTop = 250;
    doc.rect(50, tableTop, 495, 25).fill("#F8F9FA"); // Light grey background for table header

    doc.fillColor(primaryColor).font("Helvetica-Bold").fontSize(10);
    doc.text("Item", 60, tableTop + 8);
    doc.text("Description", 150, tableTop + 8);
    doc.text("Qty", 350, tableTop + 8);
    doc.text("Unit Price", 400, tableTop + 8);
    doc.text("Total", 480, tableTop + 8);

    // --- 4. TABLE ROWS (PRODUCTS) ---
    let currentY = tableTop + 35;

    for (const item of order.products) {
      // Pagination Check: If we are close to the bottom of the page, add a new one
      if (currentY > 700) {
        doc.addPage();
        currentY = 50; // Reset Y for the new page
      }

      const price = item.productId?.price_min || item.productId?.price || 0;
      const rowTotal = price * item.quantity;

      // Product Image
      if (item.selectedColorImage) {
        try {
          const response = await axios.get(item.selectedColorImage, {
            responseType: "arraybuffer",
          });
          // Made the image slightly smaller to fit tabular layout better
          doc.image(Buffer.from(response.data), 60, currentY, {
            width: 50,
            height: 60,
          });
        } catch (err) {
          console.error("Image load failed for product:", item.productId?.name);
          doc
            .fillColor(secondaryColor)
            .font("Helvetica-Oblique")
            .text("No Image", 60, currentY + 25);
        }
      }

      // Product Name & Variations
      doc
        .fillColor(primaryColor)
        .font("Helvetica-Bold")
        .text(item.productId?.name || "Product Name", 150, currentY);
      doc.fillColor(secondaryColor).font("Helvetica").fontSize(9);

      let detailsY = currentY + 15;
      if (item.size) {
        doc.text(`Size: ${item.size}`, 150, detailsY);
        detailsY += 12;
      }
      if (item.selectedColor) {
        doc.text(`Color: ${item.selectedColor}`, 150, detailsY);
      }

      // Quantity, Price, and Total (Aligned to columns)
      doc.fontSize(10).fillColor(primaryColor);
      doc.text(item.quantity.toString(), 350, currentY);
      doc.text(`${currency}${price.toFixed(2)}`, 400, currentY);
      doc.text(`${currency}${rowTotal.toFixed(2)}`, 480, currentY);

      // Increment Y coordinate for the next row and draw a bottom border
      currentY += 75;
      doc
        .moveTo(50, currentY - 10)
        .lineTo(545, currentY - 10)
        .lineWidth(0.5)
        .strokeColor("#EEEEEE")
        .stroke();
    }

    // --- 5. TOTALS SECTION ---
    currentY += 10;

    // Pagination Check for totals
    if (currentY > 700) {
      doc.addPage();
      currentY = 50;
    }

    doc.font("Helvetica-Bold").fillColor(primaryColor).fontSize(12);
    doc.text("Total Amount:", 380, currentY);
    doc
      .fillColor(accentColor)
      .fontSize(14)
      .text(`${currency}${order.totalAmount.toFixed(2)}`, 480, currentY - 1);

    // --- 6. FOOTER ---
    const footerY = doc.page.height - 80;
    doc
      .moveTo(50, footerY)
      .lineTo(545, footerY)
      .lineWidth(1)
      .strokeColor("#EEEEEE")
      .stroke();
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor(primaryColor)
      .text("Thank you for shopping with Narayanam!", 50, footerY + 15, {
        align: "center",
      });
    doc
      .font("Helvetica")
      .fillColor(secondaryColor)
      .text(
        "If you have any questions regarding this invoice, please contact us.",
        50,
        footerY + 30,
        { align: "center" },
      );

    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
