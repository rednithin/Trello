import "./index.css";
import { ReactComponent as Close } from "../../icons/Close.svg";

interface IModalProps {
  children: React.ReactNode;
  setIsOpen: (arg: boolean) => void;
  isOpen: boolean;
  title: string;
}

const Modal: React.FC<IModalProps> = ({
  children,
  title,
  isOpen,
  setIsOpen,
}) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal" onClick={() => setIsOpen(false)}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__heading">
          <div>{title}</div>
          <Close
            className="cursor-pointer"
            width={24}
            height={24}
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className="modal__children">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
