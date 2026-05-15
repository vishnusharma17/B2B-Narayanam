const categories = [
  {
    name: "Luxury Dupatta",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e1"
  },
  {
    name: "Designer Sarees",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c"
  },
  {
    name: "Bridal Lehenga",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65"
  }
];

export default function CategorySection() {
  return (
    <section className="py-24 px-10 bg-white">

      {/* Heading */}
      <div className="text-center mb-14">
        <p className="uppercase tracking-[6px] text-sm text-gray-500 mb-3">
          Curated Collections
        </p>

        <h2 className="text-5xl font-semibold">
          Shop By Category
        </h2>
      </div>

      {/* Category Cards */}
      <div className="grid md:grid-cols-3 gap-10">
        {categories.map((item, index) => (
          <div
            key={index}
            className="relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition duration-500"></div>

            {/* Text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h3 className="text-3xl font-semibold mb-4">
                {item.name}
              </h3>

              <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition duration-300">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}