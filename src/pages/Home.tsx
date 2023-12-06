import React, { useEffect, useRef, useState } from "react";
import { CloudType, clouds } from "../utils/constants";
import RevealerCloud from "../components/RevealerCloud";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { DragableItemPosition, DraggableItem } from "../utils/types";
export default function Home() {
  const [dragableItemPosition, setDragableItemPosition] =
    useState<DragableItemPosition>({
      x: 0,
      y: 0,
    });
  const dropParentElemet = useRef<HTMLElement>(null);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
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
  useEffect(() => {
    const { width, height } = dropParentElemet.current!.getBoundingClientRect();
    setParentSize({ width, height });
  }, []);

  function getValue(percetage: string, total: number): string {
    console.log(Number(percetage.replace("%", "")));
    const imageVal = (Number(percetage.replace("%", "")) / 100) * total;
    return imageVal + "px";
  }
  return (
    <article
      ref={dropParentElemet}
      onDrag={(e) => {
        setDragableItemPosition((_) => ({ x: e.clientX, y: e.clientY }));
      }}
      onDragEnd={() => {
        setDragableItemPosition({ x: 0, y: 0 });
      }}
      onTouchMove={(e: any) => {
        const touch = e.touches[0];
        setDragableItemPosition((_) => ({
          x: touch.clientX,
          y: touch.clientY,
        }));
      }}
    >
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
          <RevealerCloud
            key={cloud.key}
            cloud={cloud}
            width={getValue(cloud.width, parentSize.width)}
            dragableItemPosition={dragableItemPosition}
          />
        ))}
      </section>
    </article>
  );
}
