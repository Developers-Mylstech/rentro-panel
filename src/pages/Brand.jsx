import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../systemdesign/CustomeButton";
import BrandList from "../components/listing/BrandListing";

export default function Brand() {
  const navigate = useNavigate();

  const brands = [
    { id: 1, name: "RENT RO", image: "https://via.placeholder.com/80" },
    { id: 2, name: "Kent RO", image: "https://via.placeholder.com/80" },
    { id: 3, name: "Aqua Pro", image: "https://via.placeholder.com/80" },
    { id: 4, name: "Waterlogic", image: "https://via.placeholder.com/80" },
    { id: 5, name: "Culligan", image: "https://via.placeholder.com/80" },
    { id: 6, name: "Super General", image: "https://via.placeholder.com/80" },
    { id: 7, name: "Aquaguard", image: "https://via.placeholder.com/80" },
  ];

  return (
    <div>
      <BrandList brands={brands} />
    </div>
  );
}
