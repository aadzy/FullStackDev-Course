import { useState } from "react";
import Navbar from "./Navbar";

export default function MatchTicket() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    tickets: 1,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">
          Grandfinals Match Ticket Booking
        </h2>
        {submitted ? (
        <div className="text-green-600">
          <p>
            Thank you, {form.name}! Your booking for {form.tickets} ticket(s) is
            confirmed.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Number of Tickets</label>
            <input
              type="number"
              name="tickets"
              min="1"
              max="10"
              value={form.tickets}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Book Ticket
          </button>
        </form>
      )}
    </div>
  </>
  );
}
