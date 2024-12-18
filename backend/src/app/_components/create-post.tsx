"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { api } from "@/trpc/react"

export function CreatePost() {
  const router = useRouter()
  const [name, setName] = useState("")

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh()
      setName("")
    },
  })

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        createPost.mutate({ name })
      }}
    >
      <input
        className="w-full rounded-full px-4 py-2 text-black"
        placeholder="Title"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isLoading}
        type="submit"
      >
        {createPost.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  )
}
