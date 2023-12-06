import React, { useRef } from "react";
import { CloudType, clouds } from "../utils/constants";
import RevealerCloud from "../components/RevealerCloud";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { DraggableItem } from "../utils/types";
export default function Home() {
  const dropParentElemet = useRef<HTMLElement>(null);
  const [, drop]: [any, any] = useDrop({
    accept: CloudType,
    drop: (item: DraggableItem, monitor: DropTargetMonitor<DraggableItem>) => {
      const initialSource = monitor.getInitialSourceClientOffset();
      const differanceOffset = monitor.getDifferenceFromInitialOffset();
      const { width, height } =
        dropParentElemet.current!.getBoundingClientRect();

      let cloud = clouds.find((c) => c.key === item.key);

      if (cloud && initialSource && differanceOffset) {
        cloud.top =
          ((initialSource.y + differanceOffset.y) / height) * 100 + "%";
        cloud.left =
          ((initialSource.x + differanceOffset.x) / width) * 100 + "%";
      }
    },
  });
  return (
    <article ref={dropParentElemet}>
      <section ref={drop} className="revealer-container">
        <img
          src={require("../assets/images/step 1/base.jpg")}
          alt={"target visual"}
        />
        <img
          src={require("../assets/images/step 1/base.jpg")}
          className="hidden"
          alt={"target visual"}
        />

        {clouds.map((cloud) => (
          <RevealerCloud key={cloud.key} cloud={cloud} />
        ))}
      </section>
    </article>
  );
}
