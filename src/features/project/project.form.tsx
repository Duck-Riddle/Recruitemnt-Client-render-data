import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AsyncRequest, selectProject } from "./project.Slice";
import { StyledFromContainer } from "./project.styles";

const ProjectForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectProject);

  const [projectId, setProjectId] = React.useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectId(event.target.value);
  };

  return (
    <StyledFromContainer>
      <form
        noValidate
        autoComplete="off"
        onSubmit={(event: React.SyntheticEvent) => {
          event.preventDefault();
        }}
      >
        <label>Project id: </label>
        <input type="text" value={projectId} onChange={handleInputChange} />
        <button
          onClick={() => {
            dispatch(AsyncRequest(projectId));
            setProjectId("");
          }}
        >
          x
        </button>
        <div>
          <label>Project name: </label>
          <input
            type="text"
            value={data.currentPrject?.name || data.init?.name || ""}
            disabled={true}
          />
        </div>
        <p>
          state: {data.state}; {data.errMessage}
        </p>
      </form>
    </StyledFromContainer>
  );
};

export default ProjectForm;
