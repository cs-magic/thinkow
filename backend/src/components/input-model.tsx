"use client"

import { useUncontrolled } from "@mantine/hooks"
import _ from "lodash"
import { ReactNode, useEffect, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export const models = ["agent-assistant", "gpt-3.5-turbo", "gpt-4"] as const
export type Model = (typeof models)[number]

export default function InputModel() {
  const [model, setModel] = useState<Model>(models[0])
  const [modelSearch, setModelSearch] = useState("")
  console.log("-- InputModel: ", { model, modelSearch })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"outline-none "}>
        <Badge variant={"default"}>{getModelTitle(model)}</Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={"p-2"}>
        {/* todo: fix: 输入的时候，如果匹配，则focus被item吸走 */}
        {/*<DropdownMenuGroup>*/}
        {/*  <Input*/}
        {/*    className={"focus-visible:ring-0"}*/}
        {/*    value={modelSearch}*/}
        {/*    onChange={(event) => {*/}
        {/*      setModelSearch(event.currentTarget.value);*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</DropdownMenuGroup>*/}

        {/*<DropdownMenuSeparator />*/}

        <DropdownMenuGroup>
          {models
            .filter((model) => model.includes(modelSearch))
            .map((model) => (
              <DropdownMenuItem
                key={model}
                onClick={() => {
                  setModel(model)
                }}
              >
                {/*{`${getModelTitle(model)} (${model})`}*/}
                {getModelTitle(model)}
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * todo: 要不要渲染 model 的类型，以及做一些变换
 * @param model
 */
const getModelTitle = (model: Model): ReactNode => {
  return model
  let modelTitle = model as string
  if (modelTitle === "gpt-4") modelTitle += " ★"

  const AGENT_PREFIX = "agent-"
  if (modelTitle.startsWith(AGENT_PREFIX)) modelTitle = modelTitle.slice(AGENT_PREFIX.length) + "-agent"
  modelTitle = _.startCase(_.toLower(modelTitle))
  return modelTitle
}
