// src/components/ui/label.jsx
import React from "react";
import { cn } from "@/lib/utils";

const Label = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn("text-sm font-semibold mb-1 block", className)}
      {...props}>
      {children}
    </label>
  )
});

Label.displayName = "Label";

export { Label };
