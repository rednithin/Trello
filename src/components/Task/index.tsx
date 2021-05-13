import { useDrag } from "../../hooks";
import { ITask } from "../../models";
import "./index.css";
import { ReactComponent as Close } from "../../icons/Close.svg";
import { useContext, useEffect } from "react";
import { TaskValueContext } from "../../state/TaskValueContext";

interface ITaskProps {
  item: ITask;
  listId: string;
  removeTask: (arg: any) => void;
}

const Task: React.FC<ITaskProps> = ({ item, listId, removeTask }) => {
  const draggableProps = useDrag();
  const {taskValues, setTaskValues} = useContext(TaskValueContext);
  console.log({taskValues, setTaskValues})

  
  const key = `${item.key}-${item.id}`

  return (
    <div id={item.id} className="task cursor-pointer" {...draggableProps}>
      <div className="task__heading">
        <div>{item.name}</div>
        <Close
          className="cursor-pointer"
          height={24}
          width={24}
          onClick={() => removeTask({ listId, taskId: item.id })}
        />
      </div>
      <div className="task__description">
        <div>
          {item.description}
        </div>
        <div>
          <input 
            type="text" 
            value={taskValues[key] ?? 0}  
            onChange={e => {
              setTaskValues({...taskValues, [key]: e.target.value})
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
