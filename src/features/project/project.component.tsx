import React from "react";
import { useAppSelector } from "../../app/hooks";
import ProjectElement from "./project.element";
import { selectProject } from "./project.Slice";
import { StyledProjectContainer } from "./project.styles";

const Project: React.FC = () => {
  const { currentPrject } = useAppSelector(selectProject);
  return (
    <StyledProjectContainer>
      <svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${currentPrject?.width || 0} ${
            currentPrject?.height || 0
          }`}
        >
          <rect fill="#efefef" width="100%" height="100%" />
          {currentPrject?.items.map((item) => (
            <ProjectElement
              key={item.id}
              id={item.id}
              color={item.color}
              rotation={item.rotation}
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.height}
            />
          ))}
        </svg>
      </svg>
    </StyledProjectContainer>
  );
};

export default Project;
