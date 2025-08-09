import * as React from "react"

interface GradientTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of colors for the gradient
   * @default ["#ffaa40", "#9c40ff", "#ffaa40"]
   */
  colors?: string[]
  /**
   * Animation duration in seconds
   * @default 8
   */
  animationSpeed?: number
  /**
   * Show animated border
   * @default false
   */
  showBorder?: boolean
}

export default function GradientText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
  showBorder = false,
  style,
  ...props
}: GradientTextProps) {
  const gradientKeyframes = `
    @keyframes gradient-animation {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    animation: `gradient-animation ${animationSpeed}s linear infinite`,
  }

  const borderInnerStyle = {
    width: "calc(100% - 2px)",
    height: "calc(100% - 2px)",
  }

  return (
    <>
      <style>{gradientKeyframes}</style>
      <div
        className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${className}`}
        style={style}
        {...props}
      >
        {showBorder && (
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={gradientStyle}
          >
            <div
              className="absolute bg-white rounded-[1.25rem] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-1]"
              style={borderInnerStyle}
            />
          </div>
        )}
        <div
          className="inline-block relative z-[2] text-transparent bg-clip-text"
          style={{
            ...gradientStyle,
            WebkitBackgroundClip: "text",
          }}
        >
          {children}
        </div>
      </div>
    </>
  )
}