import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../lib-components/Button";
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
        <div className="formfield">
          <div className="formfield__label">
            <label htmlFor="addListName">List Name</label>
          </div>
          <div className="formfield__input">
            <input
              id="addListName"
              placeholder="Pending Tasks"
              {...register("name", { required: true })}
            />
          </div>
          <div className="formfield__error">
            {errors.name && <span>This field is required</span>}
          </div>
        </div>

        <Button type="submit" value="Add New List" />
      </form>
    </Modal>
  );
};

export default AddListModal;
