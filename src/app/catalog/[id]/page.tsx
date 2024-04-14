import { ProductPage } from "@/components/ProductPage/product-page";

const Product = ({ params }: { params: { id: number } }) => {
  return <ProductPage id={params.id}/>
};

export default Product;
