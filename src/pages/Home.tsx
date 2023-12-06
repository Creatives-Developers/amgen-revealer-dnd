import React, { useEffect, useMemo, useRef, useState } from "react";
import { CloudType, clouds } from "../utils/constants";
import RevealerCloud from "../components/RevealerCloud";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { DragableItemPosition, DraggableItem } from "../utils/types";
const CLOUD_COUNT = clouds.length;

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
        const topVal = ((initialSource.y + differanceOffset.y) / height) * 100;
        const leftVal = ((initialSource.x + differanceOffset.x) / width) * 100;
        cloud.top = topVal + "%";
        cloud.left = leftVal + "%";
        const isOut =
          topVal <= -1 ||
          topVal +
            ((0.5 * getValue(cloud.width, parentSize.width)) /
              parentSize.height) *
              100 >
            100 ||
          leftVal < 0 ||
          leftVal + getPercentage(cloud.width, parentSize.width) > 100;
        if (isOut) clouds.splice(clouds.indexOf(cloud), 1);
      }
    },
  });
  useEffect(() => {
    const { width, height } = dropParentElemet.current!.getBoundingClientRect();
    setParentSize({ width, height });
  }, []);

  function getPercentage(percetage: string, total: number): number {
    return Number(percetage.replace("%", ""));
  }
  function getValue(percetage: string, total: number): number {
    return (getPercentage(percetage, total) / 100) * total;
  }

  const imageStep = () => {
    const sector = parseInt(CLOUD_COUNT / 3 + "");
    if (sector * 2 < clouds.length) return 1;
    else if (sector < clouds.length) return 2;
    return 3;
  };
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
          src={require(`../assets/images/step ${imageStep()}/base.jpg`)}
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
            width={getValue(cloud.width, parentSize.width) + "px"}
            dragableItemPosition={dragableItemPosition}
          />
        ))}
      </section>
    </article>
  );
}
