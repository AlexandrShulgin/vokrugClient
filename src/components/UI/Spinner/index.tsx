import { CSSProperties } from 'react';
import classes from './index.module.css'

type SpinnerProps = {
  position: 'unset' | 'absolute';
}
const Spinner: React.FC<SpinnerProps> = ({ position }) => {
  return (
      <div className={classes.container} style={{position: position}}>
          <div className={classes.spinner}></div>
      </div>
  );
};

export default Spinner;