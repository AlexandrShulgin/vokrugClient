import classes from "./index.module.css"

type MyButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  width?: string
  height?: string
};

const MyButton: React.FC<MyButtonProps> = ({ onClick, children, disabled = false, type, width, height }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={classes.MyButton} 
      type={type}
      style={{width: `${width}`, height: `${height}`}}
      >

      {children}
    </button>
  );
};

export default MyButton;