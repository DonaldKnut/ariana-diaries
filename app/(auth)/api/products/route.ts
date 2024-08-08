// /pages/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../database";
import ProductModel, { IProduct } from "../../../../models/Product";
import ProductCategoryModel from "../../../../models/ProductCategory";

// Connect to MongoDB

export const GET = async (req: NextRequest) => {
  await connect();
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");

  try {
    let products = [];

    if (cat) {
      // Find the category by slug
      const category = await ProductCategoryModel.findOne({ slug: cat });

      if (category) {
        // Use the category's ObjectId to find products
        products = await ProductModel.find({ category: category._id });
      }
    } else {
      // If no category is provided, fetch featured products
      products = await ProductModel.find({ isFeatured: true });
    }

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.error("Error fetching products:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const product: IProduct = new ProductModel(body);
    await product.save();
    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (err) {
    console.error("Error saving product:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
