"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [income, setIncome] = useState(7000);
  const [equity, setEquity] = useState(150000);
  const [interest, setInterest] = useState(0.04);
  const [term, setTerm] = useState(30);
  const [dti, setDti] = useState(0.35);

  // Berechnungen
  const monthlyCap = useMemo(() => income * dti, [income, dti]);
  const loanCap = useMemo(() => {
    const r = interest / 12;
    const n = term * 12;
    return (monthlyCap * (1 - Math.pow(1 + r, -n))) / r;
  }, [monthlyCap, interest, term]);

  const priceIndicative = useMemo(() => (equity + loanCap) / 1.05, [equity, loanCap]); // +5% Nebenkosten
  const ltv = useMemo(() => loanCap / priceIndicative, [loanCap, priceIndicative]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <h1 className="mb-2 text-2xl font-bold">Expat Property Advisory</h1>
      <p className="mb-6 text-slate-600">Neutral advisor – no hidden commissions</p>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Eingaben */}
        <div className="space-y-4 rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="font-semibold">Your Profile</h2>

          <label className="block text-sm">
            Monthly net income (€)
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="mt-1 w-full rounded border p-2"
            />
          </label>

          <label className="block text-sm">
            Available equity (€)
            <input
              type="number"
              value={equity}
              onChange={(e) => setEquity(Number(e.target.value))}
              className="mt-1 w-full rounded border p-2"
            />
          </label>

          <label className="block text-sm">
            Interest rate (% p.a.)
            <input
              type="number"
              step="0.01"
              value={interest * 100}
              onChange={(e) => setInterest(Number(e.target.value) / 100)}
              className="mt-1 w-full rounded border p-2"
            />
          </label>

          <label className="block text-sm">
            Term (years)
            <input
              type="number"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="mt-1 w-full rounded border p-2"
            />
          </label>

          <label className="block text-sm">
            Max. mortgage as % of income
            <input
              type="number"
              step="1"
              value={dti * 100}
              onChange={(e) => setDti(Number(e.target.value) / 100)}
              className="mt-1 w-full rounded border p-2"
            />
          </label>
        </div>

        {/* Report */}
        <div className="space-y-4 rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="font-semibold">Report Preview</h2>
          <p className="text-sm text-slate-600">
            Based on your inputs, here is an indicative property budget:
          </p>
          <ul className="list-disc pl-5 text-sm">
            <li>Affordable monthly payment: {monthlyCap.toFixed(0)} €</li>
            <li>Loan capacity: {loanCap.toFixed(0)} €</li>
            <li>Indicative property price: {priceIndicative.toFixed(0)} €</li>
            <li>LTV: {(ltv * 100).toFixed(0)}%</li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Disclaimer: This is for information only – not legal, tax, or financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
