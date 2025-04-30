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

 

  return (
    <div className="md:h-screen dark:bg-gray-900">
      <CategoryList categoryList={categoryList} removeCategory={removeCategory} />
    </div>
  );
}
