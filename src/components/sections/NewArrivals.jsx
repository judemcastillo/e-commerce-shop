import { useEffect, useState } from "react";
import Reveal from "../animations/Reveal.jsx";


export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=4") // Limit to 8 for demo
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 h-screen flex items-center justify-center">
        <div className="text-gray-500 text-xl animate-pulse">Loading...</div>
      </section>
    );
  }

  return (
    <section className="relative z-50 bg-white py-16 h-fit">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          New Arrivals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <Reveal
              key={product.id}
              delay={idx * 0.2}
              className="bg-gray-100 rounded-2xl shadow-lg overflow-hidden group hover:-translate-y-2 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-contain p-6 group-hover:scale-105 transition-transform"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">${product.price}</p>
                <button className="mt-auto px-6 py-2 border border-black rounded-full text-black hover:bg-black hover:text-white transition">
                  Add to Cart
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
