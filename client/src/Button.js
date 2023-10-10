import "./Button.css";

const Button = (props) => {
  return (
    <button
      className={`basic-button ${props.className || "blue"}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.name || "button"}
    </button>
  );
};
export default Button;
