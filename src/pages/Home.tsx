import React, { useEffect, useMemo, useRef, useState } from "react";
import { CloudType, clouds } from "../utils/constants";
import RevealerCloud from "../components/RevealerCloud";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { DragableItemPosition, DraggableItem } from "../utils/types";
import CloudDragLayer from "../components/CloudDragLayer";
import Result from "../components/Result";
const CLOUD_COUNT = clouds.length;

export default function Home() {
  const [cloudsCount,setCloudCount] = useState(clouds.length)
  const [resultVisability,setResultVisability] = useState(false)
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
      const { width, height,x,y } =
        dropParentElemet.current!.getBoundingClientRect();
       
      let cloud = clouds.find((c) => c.key === item.key);
      if (cloud && initialSource && differanceOffset) {
        initialSource.y-=y
        initialSource.x-=x
        const topVal = ((initialSource.y + differanceOffset.y) / height) * 100;
        const leftVal = ((initialSource.x + differanceOffset.x) / width) * 100;
        cloud.top = topVal + "%";
        cloud.left = leftVal + "%";
        const isOutFromTop =  (initialSource.y + differanceOffset.y) <= (height/100);
        const isOutFromBottom = (initialSource.y + differanceOffset.y) + (125) >= height;
        const isOutFromLeft =  leftVal < 0;
        const isOutFromRight =   leftVal + getPercentage(cloud.width, parentSize.width) > 100;
        if (isOutFromTop ||
          isOutFromBottom ||
          isOutFromLeft ||
          isOutFromRight) {
            clouds.splice(clouds.indexOf(cloud), 1);
            setCloudCount(clouds.length)
          }
      }
    },
  });


  function getPercentage(percetage: string, total: number): number {
    return Number(percetage.replace("%", ""));
  }
  function getValue(percetage: string, total: number): number {
    return (getPercentage(percetage, total) / 100) * total;
  }

  const imageStep = useMemo(() => {
    const sector = parseInt(CLOUD_COUNT / 3 + "");
    if (cloudsCount==0) return 3;
    else if (sector * 2 < cloudsCount) return 1;
    return 2;
  },[cloudsCount]);


  useEffect(() => {
    const { width, height } = dropParentElemet.current!.getBoundingClientRect();
    setParentSize({ width, height });
  }, []);

  useEffect(() => {
    let timer:any;
      if(cloudsCount===0){
        timer= setTimeout(()=>{
          setResultVisability(true)
        },3000)
      }
      return ()=>{
        timer && clearTimeout(timer)
      }
  }, [cloudsCount]);

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
      className="home-container"
    >
      <section ref={drop} className="revealer-container">
        <img
          src={require(`../assets/images/step ${imageStep}/base.jpg`)}
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
            parentWidth={parentSize.width}
            dragableItemPosition={dragableItemPosition}
          />
        ))}
      </section>

      <Result resultVisability={resultVisability} />
    </article>
  );
}
