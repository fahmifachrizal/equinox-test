"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { MainLayout } from "@/components/layout/main-layout"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations("errorPage")

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <MainLayout>
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 text-destructive mb-2">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p className="text-muted-foreground text-center max-w-125">
          {t("description")}
        </p>
        <Button onClick={() => reset()}>{t("tryAgain")}</Button>
      </div>
    </MainLayout>
  )
}
