import React, { useEffect } from "react";
import { Cloud, DragableItemPosition } from "../utils/types";
import { useDrag } from "react-dnd";
import { CloudType } from "../utils/constants";
import { getEmptyImage } from "react-dnd-html5-backend";
import CloudDragLayer from "./CloudDragLayer";
export default function RevealerCloud({
  cloud: { imageName, key, top,mobileTop, left },
  dragableItemPosition,
  width,
  parentWidth,
  onImageLoad
}: {
  cloud: Cloud;
  dragableItemPosition: DragableItemPosition;
  width: string;
  parentWidth:number,
  onImageLoad:Function
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
    <section ref={drag} className={`cloud-item`} style={{ top:parentWidth>1200?top:mobileTop??top, left, width }}>
      <img
        className={`cloud-img  ${isDragging ? "dragging" : ""}`}
        src={require(`../assets/images/${imageName}`)}
        onLoad={()=>{onImageLoad()}}
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
