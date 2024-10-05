"use client"

import { useSearchParams } from "next/navigation"

import ConversationPage from "@/app/c/[id]/page"
import MainInput from "@/components/main-input"

export default function Home() {
  const query = useSearchParams()
  const conversationId = query.get("c")

  if (!conversationId)
    return (
      <div className={"flex w-full flex-col gap-2 px-4 sm:w-[480px]"}>
        <div className={"my-4 text-center text-2xl font-normal"}>Open AGI To The World</div>

        <MainInput />
      </div>
    )

  return <ConversationPage />
}
