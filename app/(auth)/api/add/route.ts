// File: /app/(auth)/api/add/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../database";
import Product from "../../../../models/Product";
import ProductCategoryModel, {
  IProductCategory,
} from "../../../../models/ProductCategory";
import { IProduct } from "../../../../models/Product";

// Utility function to get category by slug
const getCategoryBySlug = async (
  slug: string
): Promise<IProductCategory | null> => {
  try {
    return await ProductCategoryModel.findOne({ slug }).exec();
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
};

// POST handler
export async function POST(request: NextRequest) {
  await connect();

  try {
    const {
      title,
      desc,
      img,
      price,
      options,
      catSlug,
    }: {
      title: string;
      desc: string;
      img: string;
      price: number;
      options: any;
      catSlug: string;
    } = await request.json();

    const category: IProductCategory | null = await getCategoryBySlug(catSlug);

    if (!category) {
      return NextResponse.json(
        { message: "Invalid category" },
        { status: 400 }
      );
    }

    const newProduct: IProduct = await Product.create({
      title,
      desc,
      img,
      price,
      options,
      category: category._id,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET handler
export async function GET(request: NextRequest) {
  await connect();

  try {
    const products = await Product.find().exec();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
