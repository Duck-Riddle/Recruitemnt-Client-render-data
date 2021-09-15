import React from "react";
import { ElementProps } from "./project.interfaces";
import Color from "tinycolor2";

function boundingBox(
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number
) {
  //this one is ugly...
  let Y: number[] = [];
  let X: number[] = [];
  const half_width = width / 2;
  const half_height = height / 2;
  const top_left = { x: x - half_width, y: y - half_height };
  const top_right = { x: x + half_width, y: y - half_height };
  const bottom_left = { x: x - half_width, y: y + half_height };
  const bottom_right = { x: x + half_width, y: y + half_height };
  const corners = [top_left, top_right, bottom_left, bottom_right];
  // borrowed from https://stackoverflow.com/a/622172/16591754
  corners.forEach((coord) => {
    X.push(
      x +
        (coord.x - x) * Math.cos(rotation * (Math.PI / 180)) +
        (coord.y - y) * Math.sin(rotation * (Math.PI / 180))
    );
    Y.push(
      y -
        (coord.x - x) * Math.sin(rotation * (Math.PI / 180)) +
        (coord.y - y) * Math.cos(rotation * (Math.PI / 180))
    );
  });
  const min_X = Math.min(...X);
  const min_Y = Math.min(...Y);
  const max_X = Math.max(...X);
  const max_Y = Math.max(...Y);
  return {
    x: min_X,
    y: min_Y,
    width: max_X - min_X,
    height: max_Y - min_Y,
  };
}

const ProjectElement: React.FC<ElementProps> = (item) => {
  const box = boundingBox(
    item.x,
    item.y,
    item.width,
    item.height,
    item.rotation
  );
  const color = Color(item.color);

  return (
    <g>
      <rect
        fill={item.color}
        width={item.width}
        height={item.height}
        transform={`translate(${item.x}, ${item.y}) rotate(${
          item.rotation
        })  translate(${-item.width / 2},${-item.height / 2})`}
      />
      <circle
        fill={color.isDark() ? "#fff" : "#000"}
        cx={item.x}
        cy={item.y}
        r="4"
      />
      <text x={item.x + 5} y={item.y} fill={color.isDark() ? "#fff" : "#000"}>
        <tspan>{item.rotation}°</tspan>
      </text>
      <rect
        fill="none"
        strokeWidth="2"
        strokeOpacity="0.4"
        stroke="#FF0000"
        width={box.width}
        height={box.height}
        transform={`translate(${box.x}, ${box.y})`}
      />
    </g>
  );
};

export default ProjectElement;
