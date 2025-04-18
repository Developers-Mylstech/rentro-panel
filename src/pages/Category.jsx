import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../systemdesign/CustomeButton";
import CategoryList from "../components/listing/CategoryListing";
import useCategoryStore from "../Context/CategoryContext"




export default function Category() {

  
  const { categoryList, getAllCategories,removeCategory} = useCategoryStore()
  
  useEffect(()=>{
    getAllCategories()
    console.log(categoryList,"catogeryData list")
  },[])
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      mainCategory: "Water Tanker",
      subCategory: "Sweet Water/Salt Water/Sewage",
      image: "http://panelro.xpertspot.com/assets/images/categories/water%20tanker.png",
    },
    {
      id: 2,
      mainCategory: "Accessories",
      subCategory: "Accessories",
      image: "http://panelro.xpertspot.com/assets/images/categories/accessories.png",
    },
    {
      id: 3,
      mainCategory: "Appliances",
      subCategory: "Appliances",
      image: "http://panelro.xpertspot.com/assets/images/categories/appliances.png",
    },
    {
      id: 4,
      mainCategory: "Chillers",
      subCategory: "Chillers",
      image: "http://panelro.xpertspot.com/assets/images/categories/chiller.png",
    },
    {
      id: 5,
      mainCategory: "Dispenser",
      subCategory: "Dispenser",
      image: "http://panelro.xpertspot.com/assets/images/categories/dispenser.png",
    },
    {
      id: 6,
      mainCategory: "Water Cooler",
      subCategory: "Cooler",
      image: "http://panelro.xpertspot.com/assets/images/categories/water-cooler.png",
      
    },
    {
      id: 7,
      mainCategory: "Industrial",
      subCategory: "Filter",
      image: "http://panelro.xpertspot.com/assets/images/categories/industrial.png",
    },
  ];

  return (
    <div className="md:h-screen dark:bg-gray-900">
      <CategoryList categoryList={categoryList} removeCategory={removeCategory} />
    </div>
  );
}
