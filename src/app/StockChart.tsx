
"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const chartData = {
  "1D": [
    { time: "9 AM", price: 245 },
    { time: "10 AM", price: 252 },
    { time: "11 AM", price: 249 },
    { time: "12 PM", price: 261 },
    { time: "1 PM", price: 257 },
    { time: "2 PM", price: 269 },
    { time: "3 PM", price: 275 },
  ],
  "1W": [
    { time: "Mon", price: 230 },
    { time: "Tue", price: 242 },
    { time: "Wed", price: 238 },
    { time: "Thu", price: 255 },
    { time: "Fri", price: 275 },
  ],
  "1M": [
    { time: "Week 1", price: 210 },
    { time: "Week 2", price: 225 },
    { time: "Week 3", price: 218 },
    { time: "Week 4", price: 245 },
    { time: "Now", price: 275 },
  ],
};

type Range = keyof typeof chartData;

export default function StockChart() {
  const [range, setRange] = useState<Range>("1D");
  const data = chartData[range];
  const firstPrice = data[0].price;
  const lastPrice = data[data.length - 1].price;
  const change = ((lastPrice - firstPrice) / firstPrice) * 100;

  return (
    <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Sample stock</p>
          <h2 className="mt-1 text-xl font-bold text-white">
            Stock Price Overview
          </h2>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-2xl font-bold text-white">
              ₹{lastPrice.toFixed(2)}
            </span>
            <span className="text-sm font-semibold text-emerald-400">
              +{change.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {(["1D", "1W", "1M"] as Range[]).map((item) => (
            <button
              key={item}
              onClick={() => setRange(item)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                range === item
                  ? "bg-cyan-500 text-slate-950"
                  : "border border-slate-700 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#263449" strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis
              stroke="#94a3b8"
              domain={["dataMin - 10", "dataMax + 10"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#fff",
              }}
              formatter={(value) => [
                `₹${Number(value).toFixed(2)}`,
                "Price",
              ]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={{ fill: "#22d3ee", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Demo chart using sample prices — not live market data.
      </p>
    </section>
  );
}