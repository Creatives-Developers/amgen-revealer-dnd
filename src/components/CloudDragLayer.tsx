import React, { useEffect, useRef } from "react";
import { DragLayerMonitor, useDragLayer } from "react-dnd";
import { DragableItemPosition } from "../utils/types";

export default function CloudDragLayer({
  imageName,
  dragableItemPosition,
  width,
  isImageDragging,
}: {
  imageName: string;
  dragableItemPosition: DragableItemPosition;
  width: string;
  isImageDragging: boolean;
}) {
  const elementRef = useRef<HTMLElement>(null);
  const { isDragging, currentOffset, initialClientOffset } = useDragLayer(
    (monitor: DragLayerMonitor) => ({
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getSourceClientOffset(),
      initialClientOffset: monitor.getInitialClientOffset(),
    })
  );

  const style = {
    left: dragableItemPosition.x - (elementRef.current?.clientWidth || 0) / 2,
    top: dragableItemPosition.y - (elementRef.current?.clientHeight || 0) / 2,
    opacity: dragableItemPosition.x + dragableItemPosition.y === 0 ? 0 : 1,
  };
  // console.log(style, dragableItemPosition);
  return (
    <section ref={elementRef} className="drag-layer-container" style={style}>
      {isDragging && isImageDragging && (
        <img style={{ width }} src={require(`../assets/images/${imageName}`)} />
      )}
    </section>
  );
}
