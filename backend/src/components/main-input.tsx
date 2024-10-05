"use client"

import { getHotkeyHandler, useHotkeys } from "@mantine/hooks"
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"
import React, { useRef, useState } from "react"
import { CiFileOn } from "react-icons/ci"
import { toast } from "sonner"

import InputModel from "@/components/input-model"
import { Button } from "@/components/ui/button"
import { INPUT_CLASSNAMES } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export default function MainInput() {
  const refInput = useRef<HTMLTextAreaElement>(null)
  const [input, setInput] = useState("")

  const router = useRouter()

  const submit = () => {
    if (!input.length) return toast.warning("input can't empty")

    console.log("-- sending: ", input)
    setInput("")

    router.push(`c/${nanoid()}`)
  }

  const focus = () => {
    if (refInput.current !== document.activeElement) return refInput.current?.focus()
  }

  useHotkeys([["space", focus]])

  return (
    <div className={cn("flex flex-col gap-2 text-black", INPUT_CLASSNAMES)}>
      <div className={"flex gap-2"}>
        <InputModel />
      </div>

      <Separator orientation={"horizontal"} />

      <Textarea
        ref={refInput}
        placeholder={"Ask anything..."}
        className={"resize-none"}
        value={input}
        onChange={(event) => {
          setInput(event.currentTarget.value)
        }}
        onKeyDown={getHotkeyHandler([
          [
            "enter",
            (event) => {
              if ((event as KeyboardEvent).isComposing) return
              submit()
            },
          ],
        ])}
      />
      <div className={"text-muted-foreground"}>Space to focus, Enter to send</div>

      <div className={"flex w-full items-center justify-between gap-1 "}>
        <div className={"text-muted-foreground"}>{input.length ?? 0} words</div>

        <Separator orientation={"vertical"} className={"h-4"} />

        {/*<CiImageOn className={"h-6 w-6"} />*/}

        <CiFileOn className={"h-6 w-6"} />

        <Button className={"ml-auto "} size={"sm"} onClick={submit}>
          Query
        </Button>
      </div>
    </div>
  )
}
