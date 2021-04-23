import { v4 as uuidv4 } from "uuid";

export interface ITask {
  id: string;
  name: string;
  description: string;
}

export const createNewTask = (name: string, description: string): ITask => {
  return {
    id: uuidv4(),
    name,
    description,
  };
};

export interface IList {
  id: string;
  name: string;
  tasks: Record<string, ITask>;
}

export const createNewList = (name: string): IList => {
  return {
    id: uuidv4(),
    name,
    tasks: {},
  };
};
