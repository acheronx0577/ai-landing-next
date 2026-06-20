type DotCircle = {
  viewBox: string;
  radius: number;
  center: number;
};

type RotatedDotPreset = DotCircle & {
  wrapperSize: number;
  innerSize: number;
  rotation: number;
};

type FlatDotPreset = DotCircle & {
  size: number;
};

export const ROTATED_DOT_PRESETS = {
  sm66: {
    wrapperSize: 8.624,
    innerSize: 6.558,
    viewBox: "0 0 6.5576 6.5576",
    radius: 3.2788,
    center: 3.2788,
    rotation: -66.57,
  },
  md66: {
    wrapperSize: 17.24,
    innerSize: 13.108,
    viewBox: "0 0 13.1084 13.1084",
    radius: 6.55421,
    center: 6.55421,
    rotation: -66.57,
  },
  sm661: {
    wrapperSize: 12.124,
    innerSize: 9.218,
    viewBox: "0 0 9.21833 9.21833",
    radius: 4.60917,
    center: 4.60917,
    rotation: -66.57,
  },
  sm61: {
    wrapperSize: 9.834,
    innerSize: 7.255,
    viewBox: "0 0 7.25508 7.25508",
    radius: 3.62754,
    center: 3.62754,
    rotation: -61.58,
  },
  md61: {
    wrapperSize: 19.657,
    innerSize: 14.503,
    viewBox: "0 0 14.5027 14.5027",
    radius: 7.25133,
    center: 7.25133,
    rotation: -61.58,
  },
  sm120: {
    wrapperSize: 11.009,
    innerSize: 8.042,
    viewBox: "0 0 8.04234 8.04234",
    radius: 4.02117,
    center: 4.02117,
    rotation: -120.45,
  },
  md120: {
    wrapperSize: 22.006,
    innerSize: 16.076,
    viewBox: "0 0 16.0764 16.0764",
    radius: 8.03819,
    center: 8.03819,
    rotation: -120.45,
  },
  lg120: {
    wrapperSize: 15.475,
    innerSize: 11.305,
    viewBox: "0 0 11.3055 11.3055",
    radius: 5.65275,
    center: 5.65275,
    rotation: -120.45,
  },
} satisfies Record<string, RotatedDotPreset>;

export const FLAT_DOT_PRESETS = {
  p13: {
    size: 13.29,
    viewBox: "0 0 13.2898 13.2898",
    radius: 6.6449,
    center: 6.6449,
  },
  p6: {
    size: 6.648,
    viewBox: "0 0 6.64834 6.64834",
    radius: 3.32417,
    center: 3.32417,
  },
} satisfies Record<string, FlatDotPreset>;

function OrangeCircle({
  preset,
  overlay,
}: {
  preset: DotCircle;
  overlay?: boolean;
}) {
  const circle = (
    <circle
      cx={preset.center}
      cy={preset.center}
      fill="var(--fill-0, #FF541F)"
      r={preset.radius}
    />
  );

  return (
    <svg
      className="absolute block inset-0 size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox={preset.viewBox}
      aria-hidden
    >
      {overlay ? (
        <g style={{ mixBlendMode: "overlay" }}>{circle}</g>
      ) : (
        circle
      )}
    </svg>
  );
}

export function RotatedOrangeDot({
  left,
  top,
  preset,
  overlay = false,
}: {
  left: number;
  top: number;
  preset: RotatedDotPreset;
  overlay?: boolean;
}) {
  return (
    <div
      className={`absolute flex items-center justify-center ${overlay ? "mix-blend-overlay" : ""}`}
      style={{
        left,
        top,
        width: preset.wrapperSize,
        height: preset.wrapperSize,
      }}
    >
      <div
        className="flex-none"
        style={{ transform: `rotate(${preset.rotation}deg)` }}
      >
        <div
          className="relative"
          style={{ width: preset.innerSize, height: preset.innerSize }}
          data-name="Ellipse"
        >
          <OrangeCircle preset={preset} overlay={overlay} />
        </div>
      </div>
    </div>
  );
}

export function FlatOrangeDot({
  left,
  top,
  preset,
  overlay = true,
}: {
  left: number;
  top: number;
  preset: FlatDotPreset;
  overlay?: boolean;
}) {
  return (
    <div
      className={`absolute ${overlay ? "mix-blend-overlay" : ""}`}
      style={{ left, top, width: preset.size, height: preset.size }}
      data-name="Ellipse"
    >
      <OrangeCircle preset={preset} overlay={overlay} />
    </div>
  );
}
