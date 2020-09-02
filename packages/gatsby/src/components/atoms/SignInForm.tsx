import * as React from "react"
import SignIn from "./signIn"

const SignInActioned = () => {
  const [state, setState] = React.useState({ email: "" })

  return (
    <>
      <SignIn email={state.email} />
      <br />
      <h2 onClick={() => setState({ email: "booo" })}>setEmail</h2>
    </>
  )
}

export default SignInActioned
