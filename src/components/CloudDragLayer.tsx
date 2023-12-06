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

  return (
    <section
      ref={elementRef}
      className="drag-layer-container"
      style={
        isDragging && isImageDragging
          ? {
              left:
                dragableItemPosition.x - elementRef.current!.clientWidth / 2,
              top:
                dragableItemPosition.y - elementRef.current!.clientHeight / 2,
              opacity:
                dragableItemPosition.x + dragableItemPosition.y === 0 ? 0 : 1,
            }
          : { visibility: "hidden" }
      }
    >
      {isDragging && isImageDragging && (
        <img style={{ width }} src={require(`../assets/images/${imageName}`)} />
      )}
    </section>
  );
}
