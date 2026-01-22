"use client"

import { BerryForm } from "@/components/berries/berry-form"
import { MainLayout } from "@/components/layout/main-layout"

export default function AddBerryPage() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add Berry</h1>
          <p className="text-muted-foreground">Create a new berry.</p>
        </div>
        <BerryForm mode="create" />
      </div>
    </MainLayout>
  )
}
