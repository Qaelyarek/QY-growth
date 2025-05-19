import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
 
import { cn } from "../../lib/utils"
 
const starBorderVariants = cva(
  "relative z-0 inline-flex overflow-hidden rounded-md border before:absolute before:inset-0 before:-z-[1] before:rounded-[inherit] before:animate-star-border before:bg-[linear-gradient(90deg,transparent,rgba(57,255,20,0.8),transparent)] before:bg-[length:400%_100%]",
  {
    variants: {
      variant: {
        default: "border-[#39FF14]/30",
        active: "border-white/30 before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)]",
      },
      size: {
        default: "p-[1px]",
        sm: "p-[0.5px]",
        lg: "p-[2px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
 
export interface StarBorderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof starBorderVariants> {}
 
const StarBorder = React.forwardRef<HTMLDivElement, StarBorderProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      className={cn(starBorderVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
)
StarBorder.displayName = "StarBorder"
 
export { StarBorder, starBorderVariants }