import { useState } from "react";
import classes from "./index.module.css"
import EventCard from "../EventCard";

interface Marker {
  address: {
    name: string,
    description: string
  };
  coordinates: [number, number];
  createdAt: Date;
  description: string;
  rating: number;
  time: number;
  type: string;
  userId: number;
  _id: string;
}

interface SidebarProps {
  markers: Marker[] | undefined
}

const Sidebar: React.FC<SidebarProps> = ({markers}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={[classes.Sidebar, !isOpen && classes.closed].join(" ")} onContextMenu={(e) => e.stopPropagation()}>
      <button 
        className={classes.toggleSidebar}
        onClick={() => setIsOpen(!isOpen)}
        >
      
      </button>
      <div className={classes.events}>
        {markers?.map((marker) => (
          <EventCard key={marker._id} markerData={marker} style={{position: "unset"}}/>
        ))}
      </div>
    </div>
  )
}

export default Sidebar;