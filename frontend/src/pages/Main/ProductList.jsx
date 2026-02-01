import ProductCard from "@/components/ProductCard";

export default function ProductList() {
  const products = [
    {
      name: "Tuple",
      size: "Medium",
      color: { label: "Indigo", hex: "#6366f1" },
      price: "$2,000.00",
      status: "Overdue",
    },
    {
      name: "SavvyCal",
      size: "Large",
      color: { label: "Amber", hex: "#f59e0b" },
      price: "$14,000.00",
      status: "Paid",
    },
    {
      name: "Reform",
      size: "Small",
      color: { label: "Emerald", hex: "#10b981" },
      price: "$7,600.00",
      status: "Paid",
    },
     {
      name: "SavvyCal",
      size: "Large",
      color: { label: "Amber", hex: "#f59e0b" },
      price: "$14,000.00",
      status: "Paid",
    },
    {
      name: "Reform",
      size: "Small",
      color: { label: "Emerald", hex: "#10b981" },
      price: "$7,600.00",
      status: "Paid",
    },
     {
      name: "SavvyCal",
      size: "Large",
      color: { label: "Amber", hex: "#f59e0b" },
      price: "$14,000.00",
      status: "Paid",
    },
    {
      name: "Reform",
      size: "Small",
      color: { label: "Emerald", hex: "#10b981" },
      price: "$7,600.00",
      status: "Paid",
    },
  ];
  return (
    <div>
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
          
        </div>
      </div>
    </div>
  );
}
