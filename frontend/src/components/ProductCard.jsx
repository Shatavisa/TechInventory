import { Box } from "lucide-react";
import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  const StatusBadge = ({ status }) => {
    const isPaid = status === "Paid";
    return (
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.04em",
        }}
        className={`px-2 py-0.5 rounded-md ${
          isPaid ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col justify-between"
      style={{
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 30px rgba(0,0,0,0.08)"
          : "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
          }}
        >
          <Box size={32} color="#5669f5" />
        </div>
        <h3
          className="text-gray-800 tracking-tight"
          style={{ fontSize: "15px", fontWeight: 600 }}
        >
          {product.name}
        </h3>
      </div>

      {/* Divider */}
      <div
        className="h-px mb-4"
        style={{
          background:
            "linear-gradient(90deg, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent)",
        }}
      />

      {/* Rows */}
      <div className="flex flex-col gap-3 flex-1">
        {/* Size */}
        <div className="flex items-center justify-between">
          <span
            className="text-gray-400 font-medium"
            style={{ fontSize: "13px" }}
          >
            Size
          </span>
          <span
            className="text-gray-700"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            {product.size}
          </span>
        </div>

        {/* Color */}
        <div className="flex items-center justify-between">
          <span
            className="text-gray-400 font-medium"
            style={{ fontSize: "13px" }}
          >
            Color
          </span>
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3.5 h-3.5 rounded-full border border-gray-200"
              style={{ backgroundColor: product.color.hex }}
            />
            <span
              className="text-gray-700"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              {product.color.label}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span
            className="text-gray-400 font-medium"
            style={{ fontSize: "13px" }}
          >
            Price
          </span>
          <div className="flex items-center gap-2">
            <span
              className="text-gray-700"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              {product.price}
            </span>
            <StatusBadge status={product.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
