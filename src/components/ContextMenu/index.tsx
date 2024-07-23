import { useEffect, useState } from 'react'
import classes from './index.module.css'

const ContextMenu = ({...props}: any) => {


  const menuItems = [
    {
      title: "Добавить событие в этой точке",
      action: () => {}
    },
    {
      title: "Посмотреть события вокруг этой точки",
      action: () => {},
    },
  ]

  return (
    <div 
      style={{top: `calc(${props.y}px - 75px)`, left: `${props.x}px`}}
      className={classes.ContextMenu}
      onContextMenu={(e) => e.preventDefault()}
      
      >
      {menuItems.map((item) => (
        <div 
          className={classes.menuItem}
          onClick={item.action}
          >
          {item.title}
        </div>
      ))}
    </div>
  )
}

export default ContextMenu;