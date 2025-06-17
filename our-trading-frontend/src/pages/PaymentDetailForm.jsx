import React from "react";

function PaymentDetailsForm() {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather form data into an object
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validate account and confirm account match
    if (data["account-number"] !== data["confirm-account-number"]) {
      alert("Account Number and Confirm Account Number do not match.");
      return;
    }

    console.log("Form submission object :", data);
    // Here you can send this `data` to your API
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 p-6"
    >
      <div>
        <label
          htmlFor="account-holder-name"
          className="block text-gray-400 mb-2"
        >
          Account Holder Name
        </label>
        <input
          id="account-holder-name"
          name="account-holder-name"
          type="text"
          defaultValue="Our-Trading"
          required
          className="w-full p-2 bg-gray-900 text-gray-200 rounded-md outline-none border border-gray-700"
        />
      </div>

      <div>
        <label htmlFor="ifsc" className="block text-gray-400 mb-2">
          IFSC Code
        </label>
        <input
          id="ifsc"
          name="ifsc"
          type="text"
          defaultValue="YESB0000009"
          required
          className="w-full p-2 bg-gray-900 text-gray-200 rounded-md outline-none border border-gray-700"
        />
      </div>

      <div>
        <label htmlFor="account-number" className="block text-gray-400 mb-2">
          Account Number
        </label>
        <input
          id="account-number"
          name="account-number"
          type="text"
          defaultValue="*********5602"
          required
          className="w-full p-2 bg-gray-900 text-gray-200 rounded-md outline-none border border-gray-700"
        />
      </div>

      <div>
        <label
          htmlFor="confirm-account-number"
          className="block text-gray-400 mb-2"
        >
          Confirm Account Number
        </label>
        <input
          id="confirm-account-number"
          name="confirm-account-number"
          type="text"
          placeholder="Confirm Account Number"
          required
          className="w-full p-2 bg-gray-900 text-gray-200 rounded-md outline-none border border-gray-700"
        />
      </div>

      <div>
        <label htmlFor="bank-name" className="block text-gray-400 mb-2">
          Bank Name
        </label>
        <input
          id="bank-name"
          name="bank-name"
          type="text"
          defaultValue="YES Bank"
          required
          className="w-full p-2 bg-gray-900 text-gray-200 rounded-md outline-none border border-gray-700"
        />
      </div>

      <button
        type="submit"
        className="w-full p-2 mt-4 bg-gray-500 text-gray-900 font-semibold rounded-md hover:bg-gray-400 transition"
      >
        Submit
      </button>
    </form>
  )
}

export default PaymentDetailsForm;
