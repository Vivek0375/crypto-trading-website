import React, { useState, useEffect } from "react";

// Format dates nicely (using JavaScript's toLocaleString here, or you can use dayjs if you prefer).
function formatDate(dateString) {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusClass(status) {
  if (status === "Success") return "bg-green-500 text-gray-900";
  if (status === "Pending") return "bg-yellow-500 text-gray-900";
  if (status === "Failed") return "bg-red-500 text-gray-900";
  return "bg-gray-500 text-gray-900";
}

function WithdrawalPage() {
  const [withdrawals, setWithdrawals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Simulating API call
  useEffect(() => {
    setTimeout(() => {
      setWithdrawals([
        { id: 1, date: "2024-06-02T11:43:00Z", method: "Bank Account", amount: 89, status: "Success" },
        { id: 2, date: "2024-06-04T09:15:00Z", method: "UPI", amount: 500, status: "Pending" },
        { id: 3, date: "2024-06-05T14:30:00Z", method: "Bank Account", amount: 250, status: "Failed" },
        { id: 4, date: "2024-06-06T10:42:00Z", method: "UPI", amount: 100, status: "Success" },
        { id: 5, date: "2024-06-07T15:20:00Z", method: "Bank Account", amount: 400, status: "Success" },
        { id: 6, date: "2024-06-08T18:05:00Z", method: "UPI", amount: 350, status: "Failed" }
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  // paginate
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentWithdrawals = withdrawals.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(withdrawals.length / itemsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-100">
        Withdrawal
      </h1>

      {loading ? (
        <div className="flex justify-center items-center">
          {/* Loading spinner */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-400"></div>
        </div>
      ) : withdrawals.length === 0 ? (
        <div className="flex flex-col items-center">
          <p className="mb-4 text-gray-400">
            No transactions found.
          </p>
          <button
            onClick={() => console.log("Add Withdrawal button clicked")} // Handle adding withdrawal here
            className="px-4 py-2 font-semibold bg-gray-500 text-gray-900 rounded-md hover:bg-gray-400 transition"
          >
            Add Withdrawal
          </button>
        </div>
      ) : (
        <>
          <table className="w-full text-gray-400">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-4 text-left font-semibold">Date</th>
                <th className="p-4 text-left font-semibold">Method</th>
                <th className="p-4 text-left font-semibold">Amount</th>
                <th className="p-4 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentWithdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="border-b border-gray-700">
                   <td className="p-4">{formatDate(withdrawal.date)}</td>
                   <td className="p-4">{withdrawal.method}</td>
                   <td className="p-4">₹{withdrawal.amount}</td>
                   <td className="p-4">
                     <span
                       className={`px-2 py-1 rounded-full font-semibold ${getStatusClass(withdrawal.status)}`}
                     >
                       {withdrawal.status}
                     </span>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage <= 1}
              className="px-3 py-1 mr-2 bg-gray-500 text-gray-900 font-semibold rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-3 py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                   Math.min(prev + 1, totalPages)
                 )
               }
               disabled={currentPage >= totalPages}
               className="px-3 py-1 ml-2 bg-gray-500 text-gray-900 font-semibold rounded disabled:opacity-50"
             >
               Next
             </button>
          </div>
        </>
      )}

    </div>
  )
}

export default WithdrawalPage;
