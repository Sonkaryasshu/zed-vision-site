import React from "react";

export function CounterTS(){
  const defaultState = { counter: 0, pastEvents: new Array<string>(0) };

  const actions = {
    reset: () => defaultState,
    increment: (s = defaultState) => ({ ...s, counter: s.counter + 1 }),
    decrement: (s = defaultState) => ({ ...s, counter: s.counter - 1 }),
  };

  const [state, setState] = React.useState(defaultState);

  const calculatedState = state.pastEvents.reduce((prevValue,currentValue) => actions[currentValue](prevValue), {...state});

  return <div>
    <button onClick={update("decrement")}>-</button>
    {calculatedState.counter}
    <button onClick={update("increment")}>+</button>
  </div>;

  function update(action: ActionType) {
    return (e: React.MouseEvent) => {
      e.stopPropagation();
      setState({...state, pastEvents: [...state.pastEvents, action]});
    };
  }

  type ActionType = keyof typeof actions;
};
