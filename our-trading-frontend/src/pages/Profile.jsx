import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Simulating API calls
function sendOtpAPI(email) {
  console.log("Send OTP to", email);
  return Promise.resolve(true);
}

function verifyOtpAPI(otp) {
  console.log("Verifying OTP", otp);
  return Promise.resolve(otp === "1234"); // Mock validation
}

const twoStepEnabled = false;
const accountStatus = "pending";

function ProfilePage() {
  const [isTwoStepEnabled, setIsTwoStepEnabled] = useState(twoStepEnabled);
  const [openSendOtp, setOpenSendOtp] = useState(false);
  const [openVerifyOtp, setOpenVerifyOtp] = useState(false);
  const [email] = useState("codewithzosh@example.com"); // User's email
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    const res = await sendOtpAPI(email);
    if (res) {
      setOpenSendOtp(false);
      setOpenVerifyOtp(true);
    }
  };

  const handleVerifyOtp = async () => {
    const res = await verifyOtpAPI(otp);
    if (res) {
      setIsTwoStepEnabled(true);
      setOpenVerifyOtp(false);
    } else {
      alert("Invalid OTP.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Your Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-semibold mr-2">Email:</span> {email}
              </p>
              <p>
                <span className="font-semibold mr-2">Full Name:</span> Our Trading
              </p>
              <p>
                <span className="font-semibold mr-2">Date Of Birth:</span> 25/09/2000
              </p>
              <p>
                <span className="font-semibold mr-2">Nationality:</span> indian
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold mr-2">Address:</span> our-trading
              </p>
              <p>
                <span className="font-semibold mr-2">City:</span> mumbai
              </p>
              <p>
                <span className="font-semibold mr-2">Postcode:</span> 345020
              </p>
              <p>
                <span className="font-semibold mr-2">Country:</span> india
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2-step Section with Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>2 Step Verification</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <span>2 Step Verification </span>
            <Badge variant={isTwoStepEnabled ? "success" : "destructive"}>
              {isTwoStepEnabled ? "Verified" : "Not Verified"}
            </Badge>
          </div>

          {!isTwoStepEnabled && (
            <>
              {/* Send OTP Dialog */}
              <Dialog open={openSendOtp} onOpenChange={setOpenSendOtp}>
                <DialogTrigger asChild>
                   <Button onClick={() => setOpenSendOtp(true)}>Enable 2-step</Button>
                </DialogTrigger>
                <DialogContent>
                   <DialogHeader>
                      <DialogTitle>Verify your account</DialogTitle>
                   </DialogHeader>
                   <div className="flex flex-col space-y-4">
                      <div>
                         <Label htmlFor="email">Email</Label>
                         <Input id="email" disabled value={email} />
                      </div>
                      <Button onClick={handleSendOtp}>
                         Send OTP
                      </Button>
                   </div>
                </DialogContent>
              </Dialog>

              {/* Verify OTP Dialog */}
              <Dialog open={openVerifyOtp} onOpenChange={setOpenVerifyOtp}>
                <DialogContent>
                   <DialogHeader>
                      <DialogTitle>Enter OTP</DialogTitle>
                   </DialogHeader>
                   <div className="flex flex-col space-y-4">
                      <div>
                         <Label htmlFor="otp">OTP</Label>
                         <Input
                           id="otp"
                           value={otp}
                           onChange={(e) => setOtp(e.target.value)}
                           placeholder="Enter the 4-digits code"
                         />
                      </div>
                      <Button onClick={handleVerifyOtp}>
                         Submit
                      </Button>
                   </div>
                </DialogContent>
              </Dialog>
            </>
          )}

        </CardContent>
      </Card>

      {/* Change Password Section with Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <span className="font-semibold mr-2">Email:</span> {email}
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-2">Change Password</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                   <Label htmlFor="current">Current Password</Label>
                   <Input id="current" type="password" placeholder="Enter current password" />
                </div>
                <div>
                   <Label htmlFor="new">New Password</Label>
                   <Input id="new" type="password" placeholder="Enter new password" />
                </div>
                <div>
                   <Label htmlFor="confirm">Confirm Password</Label>
                   <Input id="confirm" type="password" placeholder="Confirm password" />
                </div>
                <div className="flex justify-end mt-4">
                   <Button>Save</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Account Status Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <span className="font-semibold mr-2">Email:</span> {email}
          </p>
          <p>
            <span className="font-semibold mr-2">Mobile:</span> +918987667899
          </p>
          <Badge variant={accountStatus === "pending" ? "warning" : "success"}>
            {accountStatus}
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage;
