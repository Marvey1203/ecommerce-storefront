import Image from "next/image"
import { getAllProducts } from "./utils"
import Link from "next/link";
interface Product {
  node:{
    id: string;
    title: string;
    description: string;
    featuredImage:{
      url: string;
    }
    handle: string;
  }
  

}

interface ProductData {
  map(arg0: (products: Product) => import("react").JSX.Element): import("react").ReactNode;
  body: {
    data: {
      products: {
        edges: Product[];
      };
    };
  };
}



export default async function Home() {
  const res = await getAllProducts()
  const productData :ProductData = res.body.data.products.edges
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5">
      {
      productData.map((products: Product)=> {
        return(
          <Link href={'/shop/'+ products.node.handle} key={products.node.id} className="flex flex-col gap-3 shadow-2xl bg-gray-300">
            <Image
            src={products.node.featuredImage.url}
            alt=""
            height={500}
            width={500}
            />
            <h2 className="text-lg font-semibold px-2">{products.node.title}</h2>
          </Link>
        )
      })
}
    </div>
  )
}
