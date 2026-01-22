"use client"

import { ProductForm } from "@/components/product-form"
import { MainLayout } from "@/components/layout/main-layout"

export default function AddProductPage() {
    return (
        <MainLayout>
            <ProductForm mode="create" />
        </MainLayout>
    )
}
