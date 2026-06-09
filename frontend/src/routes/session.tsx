import { createFileRoute } from '@tanstack/react-router'
import React from "react"

export const Route = createFileRoute('/session')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Тут буде движ :3</div>
}
