import React, { useState, useRef } from "react";

import { useSprings, animated, interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";

const items = [0, 1, 2, 3, 4, 5];

const Boxes = () => {
  const order = useRef(items.map((_,i)=>{return i;}));
   const [props, setSprings] = useSprings(items.length, i => {
    return { x: i * 100, zIndex: "0", scale: 1 };
  });
  const bind = useDrag(({ args: [currentBoxId], down, delta, distance }) => {
    setSprings(i => {
      if (down && currentBoxId === i) {

        console.log(order.current.indexOf(currentBoxId))
        return {
          zIndex: "1",
          scale: 1.2,
          x: currentBoxId * 100 + delta[0]
        };
      }
      if (!down && currentBoxId === i) {
        return {
          zIndex: "0",
          scale: 1.1,
          x: currentBoxId * 100
        };
      }
    });
  });
  return (
    <>
      <div className="boxes">
        {props.map(({ x, scale, zIndex }, i) => {
          return (
            <animated.div
              {...bind(i)}
              children={i.toString()}
              key={i}
              style={{
                zIndex,

                transform: interpolate(
                  [x, scale],
                  (x, s) => `translate3d(${x}px,0,0) scale(${s})`
                )
              }}
              className="box"
            />
          );
        })}
      </div>
    </>
  );
};
export default Boxes;
