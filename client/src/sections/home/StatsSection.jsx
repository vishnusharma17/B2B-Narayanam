export default function StatsSection() {
  const stats = [
    "500+ Designs",
    "1000+ Retailers",
    "50+ Cities",
    "Fast Delivery"
  ];

  return (
    <section className="bg-black text-white py-24">
      <div className="grid md:grid-cols-4 gap-10 text-center">
        {stats.map((item, i) => (
          <div key={i}>
            <h2 className="text-3xl font-bold">{item}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}