import { useDrag } from "../../hooks";
import { ITask } from "../../models";
import "./index.css";
import { ReactComponent as Close } from "../../icons/Close.svg";

interface ITaskProps {
  item: ITask;
  listId: string;
  removeTask: (arg: any) => void;
}

const Task: React.FC<ITaskProps> = ({ item, listId, removeTask }) => {
  const draggableProps = useDrag();

  return (
    <div id={item.id} className="task" {...draggableProps}>
      <div className="task__heading">
        <div>{item.name}</div>
        <Close
          height={24}
          width={24}
          onClick={() => removeTask({ listId, taskId: item.id })}
        />
      </div>
      <div className="task__description">{item.description}</div>
    </div>
  );
};

export default Task;
