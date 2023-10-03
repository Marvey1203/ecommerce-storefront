"use client"
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";
export interface Product {
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
  data: {
    data: {
      products: {
        edges: Product[];
      };
    };
  };
}



export default function Home() {  
  const [ProductData, setProductData] = useState<ProductData | null>(null)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/products/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Your cartInput data if needed
          }),
        });
    
        if (response.ok) {
          const data: ProductData = await response.json();
          setProductData(data)
          
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData()
  }, [])
  
  if(!ProductData){
    return <div>Loading...</div>
  }
  const data = ProductData.data.data.products.edges
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5">
      {
      data.map((products: Product)=> {
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
