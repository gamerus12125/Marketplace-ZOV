"use client"
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes"

export default function Home() {
  const theme = useTheme()
  console.log(theme)
  return (
    <main className="">
      <Button>Test</Button>
    </main>
  );
}
