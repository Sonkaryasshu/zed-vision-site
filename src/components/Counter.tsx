import React from "react";

type DState = { counter: number; pastEvents: string[] };

const actions = {
  "+1": (s: DState) => ({ ...s, counter: s.counter + 1 }),
  "-1": (s: DState) => ({ ...s, counter: s.counter - 1 }),
};

const Component: React.FC<{ defaultState: DState }> = ({ defaultState }) => {
  const [state, setState] = React.useState(defaultState);

  const calculatedState = state.pastEvents.reduce(
    (prevValue, currentValue) => actions[currentValue](prevValue),
    { ...state },
  );

  return <div>
    <button {...update("-1")}>-</button>
    {calculatedState.counter}
    <button {...update("+1")}>+</button>
  </div>;

  type ActionType = keyof typeof actions;

  function update(action: ActionType) {
    return {
      "data-onclick": String(action),
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        setState({ ...state, pastEvents: [...state.pastEvents, action] });
      },
    };
  }
};

export const CounterTS = Component;
