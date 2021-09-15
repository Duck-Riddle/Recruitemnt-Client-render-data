import React from "react";
import Project from "./features/project/project.component";
import ProjectForm from "./features/project/project.form";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ProjectForm />
      <Project />
    </React.Fragment>
  );
};

export default App;
