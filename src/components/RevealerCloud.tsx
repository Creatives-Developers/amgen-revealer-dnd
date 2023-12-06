import React, { useEffect } from "react";
import { Cloud, DragableItemPosition } from "../utils/types";
import { useDrag } from "react-dnd";
import { CloudType } from "../utils/constants";
import { getEmptyImage } from "react-dnd-html5-backend";
import CloudDragLayer from "./CloudDragLayer";
export default function RevealerCloud({
  cloud: { imageName, key, top, left },
  dragableItemPosition,
  width,
}: {
  cloud: Cloud;
  dragableItemPosition: DragableItemPosition;
  width: string;
}) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: CloudType,
    item: { key },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return (
    <section className={`cloud`} style={{ top, left, width }}>
      <img
        className={`cloud-img  ${isDragging ? "dragging" : ""}`}
        ref={drag}
        src={require(`../assets/images/${imageName}`)}
      />
      <CloudDragLayer
        imageName={imageName}
        width={width}
        isImageDragging={isDragging}
        dragableItemPosition={dragableItemPosition}
      />
    </section>
  );
}
