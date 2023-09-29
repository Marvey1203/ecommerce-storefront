import  getOneProduct  from "@/app/utils";
import Image from "next/image";
interface images {
  altText: string;
  id: string;
  url: string;
}
interface singleProduct {
  id: string;
  title: string;
  description: string;
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
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.id}</p>
      <p>{data.description}</p>
      {data.images.nodes.map((imageData)=>{
        return(
          <div key={imageData.id}>
            <Image
            src={imageData.url}
            alt=''
            height={500}
            width={500}

            />
          </div>
        )
      })}
      <p>Slug: {params.slug}</p>
    </div>
  );
}
