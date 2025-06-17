import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function WalletDialog({ type }) {
  let title = '';
  let fields = [];

  if (type === "add") {
    title = "Top Up Your Wallet";
    fields = [
      { type: "number", placeholder: "Enter amount" },
      { 
        type: "options", 
        label: "Select payment method", 
        options: [
          { label: "Razorpay", src: "/razorpay-logo.jpg" },
          { label: "Stripe", src: "/stripe-logo.jpg" }
        ] 
      }
    ];

  } else if (type === "withdraw") {
    title = "Withdraw from Wallet";
    fields = [
      { type: "number", placeholder: "Enter amount to withdraw" }
    ];

  } else if (type === "transfer") {
    title = "Transfer Funds";
    fields = [
      { type: "number", placeholder: "Enter amount" },
      { type: "text", placeholder: "Enter recipient wallet" }
    ];
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          {type === "add" ? "Add Money" : 
            type === "withdraw" ? "Withdraw" : "Transfer"}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          {fields?.map((field, idx) => {
            if (field.type === "options") {
              return (
                <div key={idx} className="mb-4">
                   <span>{field.label}</span>
                   <div className="flex space-x-4 mt-2">
                     {field.options?.map((opt, i) => (
                       <label key={i}>
                         <input
                           type="radio"
                           name="payment"
                           className="mr-2"
                         />
                         <img src={opt.src} alt={opt.label} className="inline w-24" />
                       </label>
                     ))}
                   </div>
                 </div>
               )
            }
            return (
              <input
                key={idx}
                type={field.type}
                placeholder={field.placeholder}
                className="border p-2 w-full mb-4"
              />
            )
          })}
          <Button variant="default">
            {type === "add" ? "Add" : 
              type === "withdraw" ? "Withdraw" : "Transfer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WalletDialog;
