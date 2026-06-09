import { createFileRoute } from '@tanstack/react-router'
import React from "react"

export const Route = createFileRoute('/library')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Тут буде збірник даних</div>
}
