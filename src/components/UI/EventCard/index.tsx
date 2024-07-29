import classes from "./index.module.css"

const EventCard = () => {
  return (
    <div className={classes.EventCard}>
      <div className={classes.header}>
        <div className={classes.type}>
          <div className={classes.img}></div>
          <p>Пожар</p>
        </div>
        <div className={classes.date}>
          <p>12.12.2024</p>
          <p>12:12</p>
        </div>
      </div>
      <div className={classes.address}>Ул.садовая, московская обл, москва, россия</div>
      <div className={classes.description}>Опииииииииисанииииииеееееее</div>
      <div className={classes.footer}>
        <p>@user</p>
        <div className={classes.buttons}>
          <button>+</button>
          <button>-</button>
          <button>=</button>
        </div>
      </div>
    </div>
  )
}

export default EventCard