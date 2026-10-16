import React, { useState } from "react";
import "./App.css";

const CATEGORIES = [
"Food",
"Transport",
"Shopping",
"Bills",
"Education",
"Entertainment",
"Healthcare",
"Other",
];

const today = new Date().toISOString().split("T")[0];

function ExpenseForm({ onAddExpense }) {
const [formData, setFormData] = useState({
title: "",
amount: "",
category: "",
date: today,
payment: "Cash",
});

const [error, setError] = useState("");

const handleChange = (e) => {
const { name, value } = e.target;


if (name === "amount") {
  if (!/^\d*\.?\d{0,2}$/.test(value)) return;
}

setFormData((prev) => ({
  ...prev,
  [name]: value,
}));

setError("");


};

const handleSubmit = (e) => {
e.preventDefault();


const title = formData.title.trim();
const amount = Number(formData.amount);

if (!title || !formData.category || !formData.date) {
  setError("Please complete all required fields.");
  return;
}

if (!Number.isFinite(amount) || amount <= 0) {
  setError("Please enter an amount greater than zero.");
  return;
}

if (formData.date > today) {
  setError("Expense date cannot be in the future.");
  return;
}

onAddExpense({
  id: `${Date.now()}-${Math.random()}`,
  title,
  amount,
  category: formData.category,
  date: formData.date,
  payment: formData.payment,
});

setFormData({
  title: "",
  amount: "",
  category: "",
  date: today,
  payment: "Cash",
});

setError("");


};

return ( <div className="panel form-panel"> <div className="panel-heading"> <div> <h2>Add New Expense</h2> <p>Record your daily spending</p> </div> <div className="heading-symbol">+</div> </div>


  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="title">Expense Name</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="e.g. Lunch, Bus Ticket"
        value={formData.title}
        onChange={handleChange}
        maxLength={80}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="amount">Amount (₹)</label>
      <input
        id="amount"
        name="amount"
        type="text"
        inputMode="decimal"
        placeholder="Enter amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="category">Category</label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Select category</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="date">Expense Date</label>
      <input
        id="date"
        name="date"
        type="date"
        value={formData.date}
        max={today}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="payment">Payment Method</label>
      <select
        id="payment"
        name="payment"
        value={formData.payment}
        onChange={handleChange}
      >
        <option value="Cash">Cash</option>
        <option value="UPI">UPI</option>
        <option value="Debit Card">Debit Card</option>
        <option value="Credit Card">Credit Card</option>
        <option value="Net Banking">Net Banking</option>
      </select>
    </div>

    {error && <p className="error-message">{error}</p>}

    <button type="submit" className="primary-button">
      + Add Expense
    </button>
  </form>
</div>


);
}

function SummaryCards({ expenses }) {
const total = expenses.reduce(
(sum, expense) => sum + expense.amount,
0
);

const average = expenses.length ? total / expenses.length : 0;

return ( <section className="summary-grid"> <div className="summary-card total-card"> <div className="summary-top"> <span>Total Expenses</span> <span className="summary-icon">₹</span> </div> <h2>{formatCurrency(total)}</h2> <p>Your total recorded spending</p> </div>


  <div className="summary-card transaction-card">
    <div className="summary-top">
      <span>Transactions</span>
      <span className="summary-icon">↗</span>
    </div>
    <h2>{expenses.length}</h2>
    <p>Expenses recorded so far</p>
  </div>

  <div className="summary-card average-card">
    <div className="summary-top">
      <span>Average Expense</span>
      <span className="summary-icon">∑</span>
    </div>
    <h2>{formatCurrency(average)}</h2>
    <p>Average per transaction</p>
  </div>
</section>


);
}

function formatCurrency(amount) {
return new Intl.NumberFormat("en-IN", {
style: "currency",
currency: "INR",
maximumFractionDigits: 2,
}).format(amount);
}

function ExpenseAnalysis({ expenses }) {
const totals = CATEGORIES.map((category) => ({
category,
total: expenses
.filter((expense) => expense.category === category)
.reduce((sum, expense) => sum + expense.amount, 0),
})).filter((item) => item.total > 0);

const grandTotal = expenses.reduce(
(sum, expense) => sum + expense.amount,
0
);

if (totals.length === 0) {
return ( <div className="empty-analysis"> <div className="empty-icon">▥</div> <h3>No Analysis Available</h3> <p>Add expenses to see your category-wise spending.</p> </div>
);
}

return ( <div className="analysis-list">
{totals
.sort((a, b) => b.total - a.total)
.map((item, index) => {
const percentage =
grandTotal > 0 ? (item.total / grandTotal) * 100 : 0;


      return (
        <div className="analysis-item" key={item.category}>
          <div className="analysis-info">
            <div className={`category-dot dot-${index % 6}`} />
            <span>{item.category}</span>
            <strong>{formatCurrency(item.total)}</strong>
          </div>

          <div className="progress-track">
            <div
              className={`progress-fill fill-${index % 6}`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="percentage-label">
            {percentage.toFixed(1)}% of total spending
          </p>
        </div>
      );
    })}
</div>


);
}

function ExpenseList({ expenses, onDeleteExpense, filter, onFilterChange }) {
const filteredExpenses =
filter === "All"
? expenses
: expenses.filter((expense) => expense.category === filter);

const sortedExpenses = [...filteredExpenses].sort(
(a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)
);

return ( <div className="panel transactions-panel"> <div className="panel-heading transaction-heading"> <div> <h2>Recent Transactions</h2> <p>Review and manage your expenses</p> </div>


    <select
      className="filter-select"
      aria-label="Filter expenses by category"
      value={filter}
      onChange={(e) => onFilterChange(e.target.value)}
    >
      <option value="All">All Categories</option>
      {CATEGORIES.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>

  {sortedExpenses.length === 0 ? (
    <div className="empty-state">
      <div className="empty-icon">₹</div>
      <h3>No Expenses Found</h3>
      <p>Add an expense or choose another category filter.</p>
    </div>
  ) : (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Expense</th>
            <th>Category</th>
            <th>Date</th>
            <th>Payment</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {sortedExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>
                <div className="expense-title">{expense.title}</div>
              </td>
              <td>
                <span className="category-badge">
                  {expense.category}
                </span>
              </td>
              <td>
                {new Date(
                  `${expense.date}T00:00:00`
                ).toLocaleDateString("en-IN")}
              </td>
              <td>{expense.payment}</td>
              <td className="amount-cell">
                {formatCurrency(expense.amount)}
              </td>
              <td>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => onDeleteExpense(expense.id)}
                  aria-label={`Delete ${expense.title}`}
                  title="Delete expense"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>


);
}

function App() {
const [expenses, setExpenses] = useState([]);
const [filter, setFilter] = useState("All");
const [notice, setNotice] = useState("");

const addExpense = (expense) => {
setExpenses((previous) => [...previous, expense]);
setNotice("Expense added successfully!");


window.setTimeout(() => setNotice(""), 2500);


};

const deleteExpense = (id) => {
setExpenses((previous) =>
previous.filter((expense) => expense.id !== id)
);
setNotice("Expense deleted.");
window.setTimeout(() => setNotice(""), 2500);
};

return ( <div className="app"> <header className="top-header"> <div className="header-inner"> <div className="brand-icon">₹</div> <div> <h1>Expense Tracker</h1> <p>Personal Finance Management</p> </div> </div> </header>


  <main className="main-container">
    <section className="welcome-section">
      <div>
        <p className="eyebrow">PERSONAL FINANCE</p>
        <h2>Expense Dashboard</h2>
        <p className="welcome-text">
          Track your spending, understand your habits, and manage your money.
        </p>
      </div>

      <div className="today-badge">
        {new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </div>
    </section>

    <SummaryCards expenses={expenses} />

    {notice && (
      <div className="success-message" role="status">
        {notice}
      </div>
    )}

    <section className="main-grid">
      <ExpenseForm onAddExpense={addExpense} />

      <div className="panel analysis-panel">
        <div className="panel-heading">
          <div>
            <h2>Expense Analysis</h2>
            <p>Category-wise spending breakdown</p>
          </div>
          <div className="analysis-heading-icon">▥</div>
        </div>

        <ExpenseAnalysis expenses={expenses} />
      </div>
    </section>

    <ExpenseList
      expenses={expenses}
      onDeleteExpense={deleteExpense}
      filter={filter}
      onFilterChange={setFilter}
    />

    <footer className="footer">
      Expense Tracker <span>•</span> Built with React
    </footer>
  </main>
</div>


);
}

export default App;
