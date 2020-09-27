import React from "react";
import { CounterTS } from "../components/Counter";

import styled from "styled-components";

import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

const Styled = styled.div`
text-align: center;
border-radius: 25px;
width: 200px;
height: 200px;
display: flex;
  place-content: center;
  place-items: center;
  margin: 0;
  padding: 0;
background: rgb(255, 255, 255) none repeat scroll 0% 0%;
user-select: none;
box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px 0px, rgba(0, 0, 0, 0.06) 0px 10px 15px 0px;
`;

const Container = styled.div`

  text-align: center;
  width: 99vw;
  height: 99vh;
  display: flex;
  place-content: center;
  place-items: center;
  background: rgba(0, 85, 255, 1);
  margin: 0;
  padding: 0;
  perspective: 1000px;


`;

export const MyComponent: React.FC = ({ children }) => {
  const x = useMotionValue(0);

  // const dragControls = useDragControls();
  // dragControls;

  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ff008c", "#7700ff", "rgb(230, 255, 0)"],
  );

  return (
    <motion.div style={{ width: 400, background }}>
      <motion.div
        drag={true}
        // dragControls={dragControls}
        dragConstraints={{ top: -600, bottom: 600, left: -200, right: 200 }}
        style={{ x }}
      >
        <Styled>
          <ScopedCssBaseline>
            {children}
          </ScopedCssBaseline>
        </Styled>
      </motion.div>
    </motion.div>
  );
};

export default function Page() {
  if (typeof window === "undefined") return <Container>Loading</Container>;
  return <Container>
    <MyComponent>
      <CounterTS
        startState={{ counter: 0 }}
        pastEvents={[]}
        onEvent={(action) => console.log(action)}
      />
    </MyComponent>
  </Container>;
}
