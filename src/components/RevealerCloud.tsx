import React from "react";
import { Cloud } from "../utils/types";
import { useDrag } from "react-dnd";
import { CloudType } from "../utils/constants";
export default function RevealerCloud({
  cloud: { imageName, key, top, left },
}: {
  cloud: Cloud;
}) {
  const [{ isDragging }, drag] = useDrag({
    type: CloudType,
    item: { key },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <section
      className={`cloud ${isDragging ? "dragging" : ""}`}
      style={{ top, left }}
    >
      <img ref={drag} src={require(`../assets/images/${imageName}`)} />
    </section>
  );
}
