export default function WhatsAppButton({ product }) {
  const message = `Hello, I want price for ${product.name}`;
  const url = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;

  return (
    <a href={url} target="_blank">
      <button style={{ width: "100%", marginTop: "10px" }}>
        WhatsApp Now
      </button>
    </a>
  );
}