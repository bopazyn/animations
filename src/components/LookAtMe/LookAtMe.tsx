import {type CSSProperties, Fragment, useCallback, useState} from "react";
import styles from './LookAtMe.module.css';
import {throttle} from 'es-toolkit'

const LookAtMe = () => {
  const [x, setX] = useState<number>(50)
  const [y, setY] = useState<number>(50)

  const onMouseMove = useCallback(throttle(ev => {
    const point = ev.currentTarget.createSVGPoint();
    point.x = ev.clientX;
    point.y = ev.clientY;

    const ctm = ev.currentTarget.getScreenCTM();
    if (!ctm) {
      return;
    }

    const svgPoint = point.matrixTransform(ctm.inverse());
    setX(svgPoint.x)
    setY(svgPoint.y)
  }, 30), []);

  return (
    <div className={styles.page}>
    <svg width="800" height="800" viewBox="0 0 400 400" onMouseMove={onMouseMove}>
      <defs>
        <symbol id="arrow">
          <path
            d="M 0 3.999 C 0 3.685 0.224 3.429 0.5 3.429 L 6.292 3.429 L 4.146 0.977 C 3.873 0.665 3.997 0.134 4.37 0.019 C 4.542 -0.033 4.727 0.024 4.853 0.168 L 7.853 3.596 C 8.049 3.818 8.049 4.182 7.853 4.404 L 4.853 7.832 C 4.58 8.144 4.116 8.001 4.015 7.576 C 3.97 7.378 4.02 7.167 4.146 7.023 L 6.292 4.572 L 0.5 4.572 C 0.224 4.572 0 4.316 0 3.999"/>
        </symbol>
      </defs>

      {Array.from({length: 20}).map((_, i) => (
        <Fragment key={i}>
          {Array.from({length: 20}).map((_, j) => (
            <g
              key={j}
              className={styles.circle}
              style={{
                '--dx': x - (i * 10 + 4),
                '--dy': y - (j * 10 + 4),
              } as CSSProperties}
            >
              <use href="#arrow" x={i * 10} y={j * 10} fill="green"/>
            </g>
          ))}
        </Fragment>
      ))}
      <circle r={3} cx={x} cy={y} fill="grey"/>
    </svg>
    </div>
  );
};

export default LookAtMe;
