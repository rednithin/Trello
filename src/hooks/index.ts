import { DragEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { set, get } from "idb-keyval";
import { useDnD } from "../state/DNDContext";
import { setDndStatus } from "../state/DNDContext/actions";

interface IUseDragArgs {
  dragKey?: string;
}

const useDrag = ({ dragKey }: IUseDragArgs = {}) => {
  const [backupClass, setBackupClass] = useState("");
  const [dragId] = useState(dragKey ?? uuidv4());
  // eslint-disable-next-line
  const [_, dispatch] = useDnD();

  const onDragStart = (e: DragEvent) => {
    const element = e.target as any;
    setBackupClass(element.className ?? "");
    element.className += " drag--border";
    setImmediate(() => (element.className += " drag--invisible"));
    e.dataTransfer.setData("dragId", dragId);
    setImmediate(() => dispatch(setDndStatus(true)));
  };
  const onDragEnd = (e: DragEvent) => {
    const element = e.target as any;
    element.className = backupClass;
    dispatch(setDndStatus(false));
  };
  return {
    onDragStart,
    onDragEnd,
    draggable: true,
    "data-drag-id": dragId,
  };
};

export type UseDropCallbackType = (args: {
  container: any;
  dragId: string;
  dropId: string;
}) => void;

interface IUseDropArgs {
  dropKey?: string;
  callback?: UseDropCallbackType;
  computeDroppable: (e: DragEvent) => HTMLElement;
}

const useDrop = ({ dropKey, callback, computeDroppable }: IUseDropArgs) => {
  const [backupClass, setBackupClass] = useState("");
  const [dropId] = useState(dropKey ?? uuidv4());
  // eslint-disable-next-line
  const [_, dispatch] = useDnD();
  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const onDragEnter = (e: DragEvent) => {
    const element = computeDroppable(e);
    if (!element) {
      return;
    }
    setBackupClass(element.className);
    element.className += " drop--hovered";
  };
  const onDragLeave = (e: DragEvent) => {
    const element = computeDroppable(e);
    if (!element) {
      return;
    }
    element.className = backupClass;
  };
  const onDrop = (e: DragEvent) => {
    const element = computeDroppable(e);
    if (!element) {
      return;
    }
    element.className = backupClass;
    const dragId = e.dataTransfer.getData("dragId");
    callback?.({ container: element, dragId, dropId });
    if(dragId && dropId) {
      dispatch(setDndStatus(false));
    }
  };
  return {
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop,
    "data-drop-id": dropId,
  };
};

interface IUseIDB<Type> {
  key: string;
  initialValue: Type;
}

// Can improve further using versioning in IDB.
function useIDB<Type>({
  key,
  initialValue,
}: IUseIDB<Type>): [Type, (args: Type) => void] {
  const [state, setState] = useState<Type>();

  useEffect(() => {
    get(key)
      .then((value: Type) => {
        if (value) {
          setState(value);
        } else {
          setState(initialValue);
        }
      })
      .catch(() => set(key, initialValue).then(() => setState(initialValue)));
  }, [initialValue, key]);

  const customSetState = (value: Type) => {
    set(key, value).then(() => setState(value));
  };

  return [state as Type, customSetState];
}

export { useDrag, useDrop, useIDB };
