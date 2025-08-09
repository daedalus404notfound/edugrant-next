import React, { useEffect, useRef, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange" | "emerald";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean; // When true, ignores size prop and uses width/height or className
  borderWidth?: number; // Border thickness in pixels (default: 3)
  noPadding?: boolean; // Remove default padding (default: false)
  borderRadius?: number; // Border radius in pixels (default: 14)
  glowSize?: number; // Glow spotlight size (default: 200)
  glowIntensity?: number; // Glow intensity 0-1 (default: 0.1)
  borderGlowIntensity?: number; // Border glow intensity 0-1 (default: 1)
}

const glowColorMap = {
  blue: { hue: 220, saturation: 100, lightness: 50 },
  purple: { hue: 280, saturation: 100, lightness: 55 },
  green: { hue: 120, saturation: 100, lightness: 45 },
  emerald: { hue: 160, saturation: 100, lightness: 42 },
  red: { hue: 0, saturation: 100, lightness: 50 },
  orange: { hue: 30, saturation: 100, lightness: 55 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
  borderWidth = 3,
  noPadding = false,
  borderRadius = 14,
  glowSize = 200,
  glowIntensity = 0.15,
  borderGlowIntensity = 1,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;

      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", x.toFixed(2));
        cardRef.current.style.setProperty(
          "--xp",
          (x / window.innerWidth).toFixed(2)
        );
        cardRef.current.style.setProperty("--y", y.toFixed(2));
        cardRef.current.style.setProperty(
          "--yp",
          (y / window.innerHeight).toFixed(2)
        );
      }
    };

    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  const { hue, saturation, lightness } = glowColorMap[glowColor];

  // Helper function to get border radius class
  const getBorderRadiusClass = () => {
    if (borderRadius === 0) return "rounded-none";
    if (borderRadius <= 4) return "rounded-sm";
    if (borderRadius <= 8) return "rounded";
    if (borderRadius <= 12) return "rounded-lg";
    if (borderRadius <= 16) return "rounded-xl";
    if (borderRadius <= 24) return "rounded-2xl";
    if (borderRadius <= 32) return "rounded-3xl";
    return "rounded-full";
  };

  // Determine sizing
  const getSizeClasses = () => {
    if (customSize) {
      return ""; // Let className or inline styles handle sizing
    }
    return sizeMap[size];
  };

  const getInlineStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      "--hue": hue.toString(),
      "--saturation": saturation.toString(),
      "--lightness": lightness.toString(),
      "--radius": borderRadius.toString(),
      "--border": borderWidth.toString(),
      "--backdrop": "hsl(0 0% 60% / 0.12)",
      "--backup-border": "var(--backdrop)",
      "--size": glowSize.toString(),
      "--outer": "1",
      "--border-size": "calc(var(--border, 2) * 1px)",
      "--spotlight-size": "calc(var(--size, 150) * 1px)",
      "--bg-spot-opacity": glowIntensity.toString(),
      "--border-spot-opacity": borderGlowIntensity.toString(),
      "--border-light-opacity": (borderGlowIntensity * 0.8).toString(),
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue) calc(var(--saturation) * 1%) calc(var(--lightness) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
      backgroundColor: "var(--backdrop, transparent)",
      backgroundSize:
        "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
      backgroundPosition: "50% 50%",
      backgroundAttachment: "fixed",
      border: "var(--border-size) solid var(--backup-border)",
      position: "relative",
      touchAction: "none",
      borderRadius: `${borderRadius}px`, // This ensures the background follows the border radius
    } as React.CSSProperties;

    // Add width and height if provided
    if (width !== undefined) {
      baseStyles.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === "number" ? `${height}px` : height;
    }

    return baseStyles;
  };

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue) calc(var(--saturation) * 1%) calc(var(--lightness) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }
    
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }
    
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? "aspect-[3/4]" : ""}
          ${getBorderRadiusClass()}
          relative 
          ${noPadding ? "" : "grid grid-rows-[1fr_auto]"}
          
          ${noPadding ? "" : "p-4 gap-4"}
          backdrop-blur-[5px]
          ${className}
        `}
      >
        <div ref={innerRef} data-glow></div>
        {children}
      </div>
    </>
  );
};

export { GlowCard };
