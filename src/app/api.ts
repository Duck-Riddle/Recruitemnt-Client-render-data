import axios from "axios";

const url: string = "http://recruitment01.vercel.app/api";
export const getInit = async (): Promise<any> => {
  const response = await axios.get(`${url}/init`);
  return response.data;
};

export const getProject = async (id: string): Promise<any> => {
  const response = await axios.get(`${url}/project/${id}`);
  return response.data.project;
};
