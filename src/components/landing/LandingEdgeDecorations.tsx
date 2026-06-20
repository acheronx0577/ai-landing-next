import {
  DECOR_LOWER_ROUNDED_HEIGHT,
  DECOR_LOWER_ROUNDED_TOP,
  DECOR_LOWER_ROUNDED_WIDTH,
  DECOR_ORANGE_CIRCLE_SIZE,
  DECOR_ORANGE_CIRCLE_TOP,
  DECOR_PRICING_PILL_HEIGHT,
  DECOR_PRICING_PILL_TOP,
  DECOR_PRICING_PILL_WIDTH,
  DESIGN_CANVAS_HEIGHT,
} from "@/components/landing/layout";

function s(scale: number, value: number) {
  return value * scale;
}

const DECOR_BORDER = 23.447;

export default function LandingEdgeDecorations({ scale }: { scale: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden"
      style={{ height: s(scale, DESIGN_CANVAS_HEIGHT) }}
      aria-hidden
    >
      {/* Coral pill — half cut at viewport left */}
      <div
        className="absolute left-0 flex items-center justify-center"
        style={{
          top: s(scale, DECOR_PRICING_PILL_TOP),
          left: s(scale, -DECOR_PRICING_PILL_HEIGHT / 2),
          width: s(scale, DECOR_PRICING_PILL_HEIGHT),
          height: s(scale, DECOR_PRICING_PILL_WIDTH),
        }}
      >
        <div className="flex-none rotate-90">
          <div
            className="relative rounded-[117.235px] border-solid border-[#ff9777]"
            style={{
              width: s(scale, DECOR_PRICING_PILL_WIDTH),
              height: s(scale, DECOR_PRICING_PILL_HEIGHT),
              borderWidth: s(scale, DECOR_BORDER),
            }}
            data-name="Rounded rectangle"
          />
        </div>
      </div>

      {/* Orange ring — half cut at viewport right */}
      <div
        className="absolute rounded-[1172.353px] border-solid border-[#ff541f]"
        style={{
          top: s(scale, DECOR_ORANGE_CIRCLE_TOP),
          right: s(scale, -DECOR_ORANGE_CIRCLE_SIZE / 2),
          width: s(scale, DECOR_ORANGE_CIRCLE_SIZE),
          height: s(scale, DECOR_ORANGE_CIRCLE_SIZE),
          borderWidth: s(scale, DECOR_BORDER),
          transform: "translateY(-50%)",
        }}
        data-name="Circle"
      />

      {/* Grey pill — half cut at viewport left */}
      <div
        className="absolute rounded-[117.235px] border-solid border-[#f6f6f6]"
        style={{
          top: s(scale, DECOR_LOWER_ROUNDED_TOP),
          left: s(scale, -DECOR_LOWER_ROUNDED_WIDTH / 2),
          width: s(scale, DECOR_LOWER_ROUNDED_WIDTH),
          height: s(scale, DECOR_LOWER_ROUNDED_HEIGHT),
          borderWidth: s(scale, DECOR_BORDER),
        }}
        data-name="Rounded rectangle"
      />
    </div>
  );
}
