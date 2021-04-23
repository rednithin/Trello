import { useDrag } from "../../hooks";
import { ITask } from "../../models";
import "./index.css";

interface ITaskProps {
  item: ITask;
}

const Task: React.FC<ITaskProps> = ({ item }) => {
  const draggableProps = useDrag();

  return (
    <div id={item.id} className="task" {...draggableProps}>
      <div className="task__heading">{item.name}</div>
      <div className="task__description">{item.description}</div>
    </div>
  );
};

export default Task;
