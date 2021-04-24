import "./index.css";

interface IFormFieldProps {
  label: React.ReactNode;
  input: React.ReactNode;
  error: React.ReactNode;
}

const FormField: React.FC<IFormFieldProps> = ({ label, input, error }) => {
  return (
    <div className="formfield">
      <div className="formfield__label">{label}</div>
      <div className="formfield__input">{input}</div>
      <div className="formfield__error">{error}</div>
    </div>
  );
};

export default FormField;
