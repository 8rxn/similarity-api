import { FC, HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../lib/utils";


const headingVariants = cva(
    "text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter",
    {
    variants:{
        size:{
            default:"text-4xl md:text-5xl lg:text-6xl",
            lg:"text-5xl md:text-6xl lg:text-7xl",
            sm:"text-2xl md:text-3xl lg:text-4xl",
        }
        
    },
    defaultVariants: {
        size:"default"
    }
}
);

interface Props extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {

}
const LargeHeading= forwardRef<HTMLHeadingElement, Props>(
    ({className,children,size, ...props },ref) => {
        return <p ref={ref} {...props} className={cn(headingVariants({size,className}))} >{children}</p>;
      }
)


LargeHeading.displayName= 'Heading'

export default LargeHeading