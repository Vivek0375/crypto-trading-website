import React, { useState } from "react";
import WalletDialog from "@/components/WalletDialog";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock transactions; in a real scenario you'd fetch from API
const initialTransactions = [
  { id: 1, type: "withdrawal", amount: "$89", date: "2024-06-02" },
  { id: 2, type: "buy tether", amount: "$99", date: "2024-06-01" },
  { id: 3, type: "withdrawal", amount: "$50", date: "2024-05-30" },
]

function WalletPage() {
  const [transactions, setTransactions] = useState(initialTransactions);

  // Simulating refresh by adding a new transaction
  const handleRefresh = () => {
    // Ideally you'd fetch from API here
    setTransactions((prev) => [
      { id: Math.random(), type: "withdrawal", amount: "$20", date: new Date().toISOString().split("T")[0] },
      ...prev,
    ]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        My Wallet
      </h1>

      <div className="flex space-x-4 mb-6">
        <WalletDialog type="add" />
        <WalletDialog type="withdraw" />
        <WalletDialog type="transfer" />
      </div>

      {/* Transaction History Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          History
        </h2>
        <Button variant="outline" onClick={handleRefresh}>
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {transactions.length > 0 ? (
          transactions.map((txn) => (
            <Card key={txn.id}>
              <CardHeader>
                 <CardTitle>{txn.date}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                 <span className="font-semibold">
                    {txn.amount}
                 </span>
                 <span
                   className={`px-2 py-1 rounded-md text-sm ${
                     txn.type === "withdrawal" 
                       ? "bg-red-100 text-red-600" 
                       : "bg-green-100 text-green-600"
                   }`}
                 >
                    {txn.type}
                 </span>
               </CardContent>
            </Card>)
          )
        ) : (
          <p className="text-gray-500">No transactions</p>
        )}

      </div>
    </div>
  )
}

export default WalletPage;
