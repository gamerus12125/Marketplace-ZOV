import { Button } from "../ui/button"
import { ProductImage } from "../ui/product-image"

export const ProductPage = ({id}: {id:number}) => {
    return(
        <div className="mx-5 mt-5 w-fit flex flex-col gap-5 sm:mx-auto">
            <h1 className="text-3xl font-bold">Title</h1>
            <ProductImage src="/image-placeholder-product.png" alt="Фото товара"/>
            <p>Description</p>
            <span className="text-xl">
                CostP
            </span>
            <Button type="button">
                Написать продавцу
            </Button>
        </div>
    )
}