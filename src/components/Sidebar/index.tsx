import { useState } from "react";
import classes from "./index.module.css"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={[classes.Sidebar, !isOpen && classes.closed].join(" ")}>
      <button 
        className={classes.toggleSidebar}
        onClick={() => setIsOpen(!isOpen)}
        >

      </button>
    </div>
  )
}

export default Sidebar;