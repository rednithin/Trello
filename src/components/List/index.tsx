import { useDrop, UseDropCallbackType } from "../../hooks";
import { IList } from "../../models";
import Task from "../Task";
import "./index.css";
import { ReactComponent as Add } from "../../icons/Add.svg";
import { useAppContext } from "../../state/AppContext";
import { setAddTaskModalStatus } from "../../state/AppContext/actions";
import { useDnD } from "../../state/DNDContext";
import { ReactComponent as Close } from "../../icons/Close.svg";

interface IListProps {
  children?: React.ReactNode;
  item: IList;
  callback: UseDropCallbackType;
  removeList: (arg: any) => void;
  removeTask: (arg: any) => void;
}

const List: React.FC<IListProps> = ({
  item,
  callback,
  removeList,
  removeTask,
}) => {
  const droppableProps = useDrop({
    callback,
    computeDroppable: (e) => {
      if ((e.target as any).parentElement.dataset.dropId) {
        return (e.target as any).parentElement;
      }
      return null;
    },
  });

  // eslint-disable-next-line
  const [_, dispatch] = useAppContext();
  const [dndState] = useDnD();
  return (
    <div id={item.id} className="list" {...droppableProps}>
      <div className="list__heading">
        <div>{item.name}</div>
        <Close
          height={24}
          width={24}
          onClick={() => removeList({ listId: item.id })}
        />
      </div>
      <div className="list__tasks">
        {Object.values(item.tasks)?.map((task) => (
          <Task
            key={task.id}
            item={task}
            listId={item.id}
            removeTask={removeTask}
          />
        ))}
      </div>
      <div className="list__add_task">
        <Add
          width={50}
          height={50}
          onClick={() =>
            dispatch(setAddTaskModalStatus({ status: true, listId: item.id }))
          }
        />
      </div>
      {dndState.isDnD ? <div className="list__dnd_mask"></div> : null}
    </div>
  );
};

export default List;
