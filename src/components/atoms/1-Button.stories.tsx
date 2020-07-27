import * as React from "react"
import { action } from "@storybook/addon-actions"
import { BigRedButton } from "./Button"

export default {
  title: "Button",
  component: BigRedButton,
}

export const Text = () => (
  <BigRedButton onClick={action("clicked")}>Hello Button</BigRedButton>
)

export const Emoji = () => (
  <BigRedButton onClick={action("clicked")}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </BigRedButton>
)
