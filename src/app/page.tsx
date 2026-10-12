
"use client";

import { useEffect, useState } from "react";
import { stocks } from "../lib/mockData";
import StockChart from "./StockChart";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sectors = [
    "All",
    ...Array.from(new Set(stocks.map((stock) => stock.sector))),
  ];

  const filteredStocks = stocks.filter((stock) => {
    const term = search.toLowerCase();

    const matchesSearch =
      stock.company.toLowerCase().includes(term) ||
      stock.symbol.toLowerCase().includes(term);

    const matchesSector =
      selectedSector === "All" || stock.sector === selectedSector;

    return matchesSearch && matchesSector;
  });

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "change-high") return b.change - a.change;
    if (sortBy === "change-low") return a.change - b.change;
    return 0;
  });

  const gainers = stocks.filter((stock) => stock.change > 0).length;
  const losers = stocks.filter((stock) => stock.change < 0).length;
  
  const topGainers = [...stocks]
    .filter((stock) => stock.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 5);

  const topLosers = [...stocks]
    .filter((stock) => stock.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 5);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        Loading Stock Screener...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-4 text-white sm:p-8">
      <div className="mx-auto max-w-7xl">

        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Market Insights
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Stock Screener
            </h1>
            <p className="mt-2 text-slate-400">
              Discover, compare and explore stocks.
            </p>
          </div>

          <div className="w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            ● Dashboard Ready
          </div>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Total Stocks</p>
            <h2 className="mt-3 text-3xl font-bold">
              {stocks.length.toLocaleString()}
            </h2>
            <p className="mt-2 text-sm text-cyan-400">
              Stocks in sample dataset
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Gainers</p>
            <h2 className="mt-3 text-3xl font-bold text-emerald-400">
              {gainers.toLocaleString()}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Stocks with positive change
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Losers</p>
            <h2 className="mt-3 text-3xl font-bold text-rose-400">
              {losers.toLocaleString()}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Stocks with negative change
            </p>
          </div>
        </section>
                <StockChart />
                
        <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-4 text-xl font-bold text-emerald-400">
              Top Gainers
            </h2>

            <div className="space-y-3">
              {topGainers.map((stock) => (
                <div
                  key={stock.id}
                  className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {stock.symbol}
                    </p>
                    <p className="text-sm text-slate-400">
                      {stock.company}
                    </p>
                  </div>
                  <span className="font-semibold text-emerald-400">
                    +{stock.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-4 text-xl font-bold text-rose-400">
              Top Losers
            </h2>

            <div className="space-y-3">
              {topLosers.map((stock) => (
                <div
                  key={stock.id}
                  className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {stock.symbol}
                    </p>
                    <p className="text-sm text-slate-400">
                      {stock.company}
                    </p>
                  </div>
                  <span className="font-semibold text-rose-400">
                    {stock.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Explore Stocks</h2>
            <p className="mt-1 text-sm text-slate-400">
              Search companies, filter sectors and sort results.
            </p>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            <input
              type="text"
              placeholder="Search company or symbol..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />

            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-cyan-500"
            >
              {sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-cyan-500"
            >
              <option value="default">Default Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="change-high">Change: High to Low</option>
              <option value="change-low">Change: Low to High</option>
            </select>
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-400">
              Showing {sortedStocks.length.toLocaleString()} matching stocks
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedSector("All");
                setSortBy("default");
              }}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              Reset Filters
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-slate-800/80 text-slate-300">
                <tr>
                  <th className="p-4">Symbol</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Sector</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Change %</th>
                  <th className="p-4">Volume</th>
                  <th className="p-4">Market Cap</th>
                  <th className="p-4">P/E</th>
                  <th className="p-4">ROE</th>
                  <th className="p-4">Beta</th>
                </tr>
              </thead>

              <tbody>
                {sortedStocks.slice(0, 100).map((stock) => (
                  <tr
                    key={stock.id}
                    className="border-t border-slate-800 transition hover:bg-slate-800/60"
                  >
                    <td className="p-4 font-semibold text-cyan-400">
                      {stock.symbol}
                    </td>
                    <td className="p-4 text-slate-200">
                      {stock.company}
                    </td>
                    <td className="p-4 text-slate-400">
                      {stock.sector}
                    </td>
                    <td className="p-4 font-medium">
                      ₹{stock.price.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td
                      className={`p-4 font-semibold ${
                        stock.change >= 0
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change}%
                    </td>
                    <td className="p-4 text-slate-300">
                      {stock.volume.toLocaleString("en-IN")}
                    </td>
                    <td className="p-4 text-slate-300">
                      ₹{stock.marketCap.toLocaleString("en-IN")} Cr
                    </td>
                    <td className="p-4">{stock.pe}</td>
                    <td className="p-4">{stock.roe}%</td>
                    <td className="p-4">{stock.beta}</td>
                  </tr>
                ))}

                {sortedStocks.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="p-10 text-center text-slate-400"
                    >
                      No stocks found. Try different search filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {sortedStocks.length > 100 && (
            <p className="mt-4 text-sm text-slate-500">
              Showing the first 100 of {sortedStocks.length.toLocaleString()} matching stocks.
            </p>
          )}
        </section>

        <footer className="py-6 text-center text-xs text-slate-500">
          Stock Screener • Educational demo using sample data • Not investment advice
        </footer>
      </div>
    </main>
  );
}