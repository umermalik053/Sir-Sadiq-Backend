import express from "express";
import { Products } from "../utils/constants/Products.js";

export const productRoute = express.Router();

productRoute.get("/", (req, res) => {
  try {
    res.status(200).send({ status: 200, message: "success", data: Products });
  } catch (error) {
    res.status(400).send({ status: 400, message: "Something went wrong" });
  }
});

productRoute.get("/category", (req, res) => {
  const category = req.query.category;

  //   validation
  const isCategoryfound = Products.find((item) => item.category == category);
  if (!isCategoryfound) {
    res.status(404).send({ status: 404, message: "Category not found" });
  }

  //  responase
  const isCategory = Products.filter((item) => item.category == category);
  res.status(200).send({ status: 200, message: "success", data: isCategory });
});

productRoute.get("/productID/:id", (req, res) => {
  const { id } = req.params; //1

  const isSingleProduct = Products.find((item) => item.id == id);
  if (!isSingleProduct) {
    res.status(404).send({ status: 404, message: "Product ID not found" });
  }
  res
    .status(200)
    .send({ status: 200, message: "success", data: isSingleProduct });
});

// POST ---> data transfer from input

productRoute.post("/", (req, res) => {
  const data = req.body;

  const isALreadyfound = Products.find((item) => item.id == data.id);
  if (isALreadyfound) {
    res.status(409).send({ status: 409, message: "Product already found" });
  }
  else{
    Products.push(data);
    res
      .status(201)
      .send({ status: 201, message: "Product add successfully", data: Products });
  }

  // const {id,title,description} = data;
});


productRoute.delete("/:id",(req,res)=>{
    const {id} = req.params;
    const IDnotfound = Products.find((item) => item.id == id);
  if (!IDnotfound) {
    res.status(409).send({ status: 409, message: "Product ID not found" });
  }

 const deleteItem = Products.filter((item)=>item.id != id);
 res
  .status(200)
  .send({ status: 200, message: "Product deleted successfully", data: deleteItem });
})
