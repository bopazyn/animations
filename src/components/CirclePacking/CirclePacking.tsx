import {useState, useMemo, Fragment, type CSSProperties} from "react";
import {AnimationCard} from '#/components/AnimationCard/AnimationCard';
import styles from "./CirclePacking.module.css";

const countCircles = (R: number, r: number, p: number) => {
  const chord = 2 * r + p;
  if (chord >= 2 * R) {
    return 1;
  }
  const theta = 2 * Math.asin(chord / (2 * R));
  return Math.max(0, Math.floor((2 * Math.PI) / theta));
};

interface SliderProps {
  label: string;
  id: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  color: string;
}

const Slider = ({label, id, min, max, step = 1, value, onChange, color}: SliderProps) => (
  <div className={styles.row}>
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
    <div className={styles.track}>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.valueAsNumber)}
        className={styles.input}
        style={{accentColor: color}}
      />
    </div>
    <span className={styles.valueDisplay}>
      {Number.isInteger(value) ? value : value.toFixed(1)}
    </span>
  </div>
);

const COLORS = {
  layers: [
    "#34d399",
    "#60a5fa",
    "#a78bfa",
    "#f87171",
    "#fbbf24",
    "#fb923c",
    "#38bdf8",
    "#e879f9",
  ],
};

type AnimationClass = "animation1" | "animation2";

const ANIMATIONS: AnimationClass[] = ["animation1", "animation2"];

const CirclePacking = () => {
  const [n, setN] = useState(7);
  const [r, setR] = useState(4);
  const [d, setD] = useState(40);
  const [p, setP] = useState(40);
  const [animationDuration, setAnimationDuration] = useState(4);
  const [enlargement, setEnlargement] = useState(3);
  const [animation, setAnimation] = useState<AnimationClass>("animation1");

  const RR = Array.from({length: n}, (_, i) => (i + 1) * (2 * r + d));
  const nn = Array.from({length: n}).map((_, i) => countCircles(RR[i], r, p));

  const padding = 24;
  const maxR = RR.at(-1)! + r;
  const svgSize = 400;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const scale = (svgSize / 2 - padding) / maxR;

  const layerNCircles = useMemo(
    () =>
      Array.from({length: n}, (_, i) => {
        const n = nn[i];
        const R = RR[i];
        return Array.from({length: n}, (_, i) => {
          const alfa = (2 * Math.PI * i) / n - Math.PI / 2;
          return {
            alfa,
            x: cx + R * Math.cos(alfa) * scale,
            y: cy + R * Math.sin(alfa) * scale
          };
        })
      }),
    [nn, RR, cx, cy, scale]
  );

  const rs = r * scale;

  return (
    <AnimationCard dot="●" title="CIRCLE PACKING">
      <div className={styles.layout}>
          <div className={styles.controls}>
            <div className={styles.sliderGroup}>
              <Slider label="n" id="n" min={1} max={10} value={n} onChange={setN} color={COLORS.layers[0]}/>
              <Slider label="r" id="r" min={1} max={100} value={r} onChange={setR} color={COLORS.layers[1]}/>
              <Slider label="d" id="d" min={0} max={100} value={d} onChange={setD} color={COLORS.layers[2]}/>
              <Slider label="p" id="p" min={0} max={100} value={p} onChange={setP} color={COLORS.layers[0]}/>
            </div>

            <div className={styles.divider}/>

            <div className={styles.sliderGroup}>
              <Slider label="t" id="t" min={1} max={10} value={animationDuration} onChange={setAnimationDuration} color={COLORS.layers[1]}/>
              <Slider label="×" id="x" min={1.1} max={3} step={0.1} value={enlargement} onChange={setEnlargement} color={COLORS.layers[2]}/>
            </div>

            <div className={styles.divider}/>

            <div className={styles.animationPicker}>
              <div className={styles.formulasLabel}>ANIMATION</div>
              <div className={styles.animationOptions}>
                {ANIMATIONS.map((a) => (
                  <button
                    key={a}
                    className={`${styles.animationOption} ${animation === a ? styles.animationOptionActive : ""}`}
                    onClick={() => setAnimation(a)}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.divider}/>

            <div className={styles.formulas}>
              <div className={styles.formulasLabel}>ORBIT RADII</div>
              {RR.map((x, i) => (
                <div key={i} className={styles.formulaRow}>
                  R<sub>{i + 1}</sub> ={" "}
                  <span style={{color: COLORS.layers[(i + 1) % COLORS.layers.length]}}>{2 * (i + 1)}r + {i + 1}d</span> ={" "}
                  <span className={styles.formulaResult}>{x}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.svgWrapper}>
            <svg
              key={[n, r, d, p, enlargement, animationDuration, animation].join('_')}
              width={svgSize}
              height={svgSize}
              viewBox={`0 0 ${svgSize} ${svgSize}`}
              className={styles[animation]}
            >
              {layerNCircles.map((x, i) => (
                <Fragment key={i}>
                  {x.map((c, j) => (
                    <circle
                      key={j}
                      cx={c.x}
                      cy={c.y}
                      r={rs}
                      fill={`${COLORS.layers[(i + 1) % COLORS.layers.length]}1a`}
                      stroke={COLORS.layers[(i + 1) % COLORS.layers.length]}
                      strokeWidth={0.8}
                      style={{
                        '--duration': animationDuration,
                        '--enlargement': enlargement,
                        '--alpha': c.alfa,
                        '--level': i,
                        '--n': n,

                      } as CSSProperties}
                    />
                  ))}
                </Fragment>
              ))}

              <circle
                cx={cx}
                cy={cy}
                r={rs * enlargement}
                fill={`${COLORS.layers[0]}22`}
                stroke={COLORS.layers[0]}
                strokeWidth={1.2}
              />
            </svg>
          </div>
      </div>
    </AnimationCard>
  );
};

export default CirclePacking
