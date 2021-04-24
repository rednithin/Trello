import List from "./components/List";
import "./App.css";
import { UseDropCallbackType, useIDB } from "./hooks";
import { createNewList, createNewTask, IList } from "./models";
import AddListModal from "./components/AddListModal";
import AddTaskModal from "./components/AddTaskModal";
import { useAppContext } from "./state/AppContext";
import { setAddListModalStatus } from "./state/AppContext/actions";
import { ReactComponent as Github } from "./icons/Github.svg";
import Button from "./lib-components/Button";

const App = () => {
  const [listCollection, setListCollection] = useIDB<Record<string, IList>>({
    key: "listCollection",
    initialValue: {},
  });

  const dropCallback: UseDropCallbackType = ({ container, dragId, dropId }) => {
    let element = document.querySelector(
      `.task[data-drag-id="${dragId}"]`
    ) as any;
    if (element) {
      let initialListId = "";
      for (const key in listCollection) {
        const list = listCollection[key];
        if (list.tasks[element.id]) {
          initialListId = list.id;
          break;
        }
      }
      console.log({ initialListId });
      let newListCollection: Record<string, IList> = {
        ...listCollection,
        [initialListId]: {
          ...listCollection[initialListId],
          tasks: {
            ...listCollection[initialListId].tasks,
          },
        },
      };
      let movedTask = newListCollection[initialListId].tasks[element.id];

      delete newListCollection[initialListId].tasks[element.id];

      newListCollection = {
        ...newListCollection,
        [container.id]: {
          ...newListCollection[container.id],
          tasks: {
            [movedTask.id]: movedTask,
            ...newListCollection[container.id].tasks,
          },
        },
      };
      setListCollection(newListCollection);
    }
  };

  const addNewList = ({ name }: any) => {
    const newList = createNewList(name);
    setListCollection({
      ...listCollection,
      [newList.id]: newList,
    });
  };

  const removeList = ({ listId }: any) => {
    const newListCollection = { ...listCollection };
    delete newListCollection[listId];
    setListCollection(newListCollection);
  };

  const removeTask = ({ listId, taskId }: any) => {
    const newListCollection: Record<string, IList> = {
      ...listCollection,
      [listId]: {
        ...listCollection[listId],
        tasks: {
          ...listCollection[listId].tasks,
        },
      },
    };
    delete newListCollection[listId].tasks[taskId];
    setListCollection(newListCollection);
  };

  const addNewTask = ({ listId, name, description }: any) => {
    const newTask = createNewTask(name, description);
    setListCollection({
      ...listCollection,
      [listId]: {
        ...listCollection[listId],
        tasks: {
          ...listCollection[listId].tasks,
          [newTask.id]: newTask,
        },
      },
    });
  };

  // eslint-disable-next-line
  const [_, dispatch] = useAppContext();

  return (
    <section className="app">
      <div className="app__heading">Trello Board</div>
      <div className="app__content">
        <div className="app__subheading">
          <Button
            value="Add List"
            onClick={() => dispatch(setAddListModalStatus(true))}
          />
        </div>

        {!Object.values(listCollection || {})?.length ? (
          <div className="list-collection--empty">
            <div>
              No Lists are Present. Click on the <b>Add List</b> button to add
              one.
            </div>
          </div>
        ) : (
          <div className="list-collection">
            {Object.values(listCollection || {})?.map((list) => (
              <List
                key={list.id}
                item={list}
                callback={dropCallback}
                removeList={removeList}
                removeTask={removeTask}
              />
            ))}
            {Array(8)
              .fill(0)
              .map((x) => (
                <div className="list list--dummy"></div>
              ))}
          </div>
        )}
        <AddListModal addNewList={addNewList} />
        <AddTaskModal addNewTask={addNewTask} />
      </div>
      <div className="app__footer">
        <a href="https://github.com/rednithin/Trello">
          <Github height={50} width={50} />
        </a>
      </div>
    </section>
  );
};

export default App;
