import  getOneProduct  from "@/app/utils";

export default async function ProductPage({params}: {params: {slug: string}}) {
  const res = await getOneProduct(params.slug)
  const data = res.body.data.productByHandle
  return (
    <div>
      <h1>Product Details</h1>
      <p>Slug: {params.slug}</p>
    </div>
  );
}
