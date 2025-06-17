import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PaymentDetailsForm from "./PaymentDetailForm";

function PaymentDetails() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Payment Details
      </h1>

      <Card className="bg-gray-900 text-gray-200 p-6 shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Yes Bank</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="font-semibold mr-2">A/C No :</span> ************1651
          </div>

          <div className="mb-4">
            <span className="font-semibold mr-2">A/C Holder :</span> Our-Trading
          </div>

          <div>
            <span className="font-semibold mr-2">IFSC :</span> YESB0000007
          </div>
        </CardContent>
      </Card>

      <Dialog>
        <DialogTrigger>
          <Button>Add Payment Details</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          {/* Here we reuse the form we defined above */}
          <PaymentDetailsForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PaymentDetails;
