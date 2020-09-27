import React from "react";
import { CounterTS } from "../components/Counter";

import styled from "styled-components";

import {
  motion,
  useMotionValue,
  useTransform,
  useDragControls,
} from "framer-motion";

const Styled = styled.div`
display: block;
padding: 40px;
margin: auto;
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
  overflow: hidden;


`;

export const MyComponent: React.FC = ({ children }) => {
  const x = useMotionValue(0);

  const dragControls = useDragControls();

  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ff008c", "#7700ff", "rgb(230, 255, 0)"],
  );

  return (
    <motion.div style={{ width: 400, background }}>
      <motion.div
        drag={true}
        dragControls={dragControls}
        dragConstraints={{ top: -600, bottom: 600, left: -200, right: 200 }}
        style={{ x }}
      >
        <Styled>
          <div
            onPointerDown={(e) => dragControls.start(e, { snapToCursor: true })}
          >
            {children}
          </div>
        </Styled>
      </motion.div>
    </motion.div>
  );
};

export default function Page() {
  if (typeof window === "undefined") return <div>Loading</div>;
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
