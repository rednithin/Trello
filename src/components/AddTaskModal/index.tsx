import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../lib-components/Modal";
import FormField from "../../lib-components/FormField";
import { useAppContext } from "../../state/AppContext";
import { setAddTaskModalStatus } from "../../state/AppContext/actions";
import Button from "../../lib-components/Button";

interface IAddTaskModalProps {
  addNewTask: (args: any) => void;
}

interface IFormInputs {
  name: string;
  description: string;
}

const AddTaskModal: React.FC<IAddTaskModalProps> = ({ addNewTask }) => {
  const [state, dispatch] = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>();
  const onSubmit = ({ name, description }: IFormInputs) => {
    addNewTask({ name, description, listId: state.selectedListId });
    dispatch(setAddTaskModalStatus(true));
  };

  useEffect(() => {
    if (state.isAddTaskModalOpen) {
      reset();
    }
  }, [state.isAddTaskModalOpen, reset]);

  return (
    <Modal
      title={"Add Task"}
      isOpen={state.isAddTaskModalOpen}
      setIsOpen={(status) => dispatch(setAddTaskModalStatus(status))}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label={<label htmlFor="addTaskName">Task Name</label>}
          input={
            <input
              id="addTaskName"
              placeholder="Buy Milk"
              {...register("name", { required: true })}
            />
          }
          error={errors.name && <span>This field is required</span>}
        />

        <FormField
          label={<label htmlFor="addTaskDescription">Task Description</label>}
          input={
            <textarea
              id="addTaskDescription"
              placeholder="Buy Milk Tomorrow Morning"
              {...register("description", { required: true })}
            />
          }
          error={errors.description && <span>This field is required</span>}
        />

        <Button type="submit" value="Add New Task" />
      </form>
    </Modal>
  );
};

export default AddTaskModal;
