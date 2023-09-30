import getOneProducts, { getAllProducts } from "@/app/utils";
import Slider from "@/app/components/slider";
import { ParsedUrlQuery } from "querystring";
import { Product, ProductData } from "@/app/page";
import { ReactNode } from "react";


interface images {
  altText: string;
  id: string;
  url: string;
}

interface singleProduct {
  id: string;
  title: string;
  description: string;
  priceRange: {
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    }
  };
  images: {
    nodes: images[];
  };
}

interface ProductPageProps extends ParsedUrlQuery {
  slug: string;
}
type params = {
   slug: string;
}
interface StaticParams {
  params: {
    slug: string;
  };
}
export async function generateStaticParams(): Promise<any[]> {
    const res = await getAllProducts();
    const data: ProductData = res.body.data.products.edges;
    console.log(data); // Log the data to check its structure
    const arr = data.map((product: Product) => {
      return { slug: product.node.handle };
    });
    return arr
}

export default async function ProductPage({params}: { params: { slug: string } }) {
  const res = await getOneProducts(params.slug)
  const data: singleProduct = res.body.data.productByHandle
  const image: images[] = data.images.nodes
  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-8">
      <div className="w-50%">
        <Slider image={image}/>
      </div>
      <div className="w-50% flex flex-col gap-5">
        <h3 className="font-bold text-lg text0black">{data.title}</h3>
        <p>{data.priceRange.maxVariantPrice.currencyCode} {data.priceRange.maxVariantPrice.amount}</p>
        <div className="flex flex-col md:flex-row gap-5">
          <button className="py-[10px] px-8 rounded-2xl bg-blue-800 text-white flex flex-row gap-4 hover:shadow-lg justify-center items-center">
            Buy Now
            <svg className="w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
            </svg>
          </button>
          <button className="py-[10px] px-6 rounded-2xl border-2 border-blue-800 text-blue-800 flex flex-row gap-3 hover:shadow-lg font-semibold justify-center items-center">
            Add To Cart
            <svg className="w-6 text-blue-800" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
            </svg>
          </button>
        </div>
        <p>{data.description}</p>

      </div>
      

    </div>
  );
}
