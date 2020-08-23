import * as React from "react"

const Placeholder: React.FC = () => <div>wait</div>

interface Props {}

export const LazyThing: React.FC<Props> = ({ children }) => {
  // While the component is loading, we'll render a fallback placeholder.
  // (The Placeholder is a component that renders nothing).
  const [Component, setComponent] = React.useState(() => <Placeholder />)
  // After the initial render, kick off a dynamic import to fetch
  // the real component, and set it into our state.
  React.useEffect(() => {
    import("./atoms/Button").then(({ BigRedButton }) =>
      setComponent(() => <BigRedButton>{children}</BigRedButton>)
    )
  }, [])
  return Component //{...props}
}
