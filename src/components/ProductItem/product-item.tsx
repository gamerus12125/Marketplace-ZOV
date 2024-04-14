import { Product } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"
import Image from "next/image"
import { ProductImage } from "../ui/product-image"

export const ProductItem = ({product}: {product: Product}) => {
    return (
        <Card className="max-w-96">
            <CardHeader>
            <ProductImage src="image-placeholder-product.png" alt="Фото товара"/>
                <CardTitle className="text-xl sm:text-2xl">
                    <Link href={`/catalog/${product.id}`} className="break-words font-extrabold">
                    {product.title}
                    </Link>
                </CardTitle>
                <CardDescription className="text-xl break-words">
                    {product.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <span className="font-bold text-xl">
                    {product.cost}Р
                </span>
            </CardContent>
            <CardFooter>
                <span>
                    {product.creation_date}
                </span>
            </CardFooter>
        </Card>
    )
}