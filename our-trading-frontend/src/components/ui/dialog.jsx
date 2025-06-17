// src/components/ui/dialog.jsx
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = React.forwardRef(({ children, ...props }, ref) => (
  <DialogPrimitive.Content ref={ref} {...props}>
    {children}
  </DialogPrimitive.Content>
));

export const DialogHeader = ({ children }) => <div>{children}</div>;
export const DialogTitle = DialogPrimitive.Title;
