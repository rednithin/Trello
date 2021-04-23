import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../lib-components/Modal";
import { useAppContext } from "../../state/AppContext";
import { setAddListModalStatus } from "../../state/AppContext/actions";

interface IAddListModalProps {
  addNewList: (args: any) => void;
}

interface IFormInputs {
  name: string;
}

const AddListModal: React.FC<IAddListModalProps> = ({ addNewList }) => {
  const [state, dispatch] = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>();
  const onSubmit = (data: IFormInputs) => {
    console.log(data);
    addNewList({ name: data.name });
    dispatch(setAddListModalStatus(false));
  };

  useEffect(() => {
    if (state.isAddListModalOpen) {
      reset();
    }
  }, [state.isAddListModalOpen, reset]);

  return (
    <Modal
      title={"Add List"}
      isOpen={state.isAddListModalOpen}
      setIsOpen={(status) => dispatch(setAddListModalStatus(status))}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor="addListName">List Name: </label>
            <input
              id="addListName"
              placeholder="Pending Tasks"
              {...register("name", { required: true })}
            />
          </div>
          <div>{errors.name && <span>This field is required</span>}</div>
        </div>

        <input type="submit" value="Add New List" />
      </form>
    </Modal>
  );
};

export default AddListModal;
