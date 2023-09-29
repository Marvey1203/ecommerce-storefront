import  getOneProduct  from "@/app/utils";
import Slider from "@/app/components/slider";
interface images {
  altText: string;
  id: string;
  url: string;
}
interface singleProduct {
  id: string;
  title: string;
  description: string;
  priceRange:{
    maxVariantPrice:{
      amount: string;
      currencyCode: string;
    }
  }
  images:{
    nodes: images[]
  }
}
interface ProductPageProps {
    slug: string;

}

export default async function ProductPage({params}: {params: ProductPageProps}) {
  const res = await getOneProduct(params.slug)
  const data: singleProduct = res.body.data.productByHandle
  const image: images[] = data.images.nodes
  return (
    <div className="w-full grid grid-cols-2 gap-8">
      <div className="w-50%">
        <Slider image={image}/>
      </div>
      <div className="w-50% flex flex-col gap-5">
        <h3 className="font-bold text-lg text0black">{data.title}</h3>
        <p>{data.description}</p>
        <p>{data.priceRange.maxVariantPrice.currencyCode} {data.priceRange.maxVariantPrice.amount}</p>
      </div>
      

    </div>
  );
}
