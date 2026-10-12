export type Stock = {
  id: number;
  symbol: string;
  company: string;
  sector: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
  pe: number;
  pb: number;
  dividendYield: number;
  eps: number;
  roe: number;
  roce: number;
  debtToEquity: number;
  promoterHolding: number;
  revenueGrowth: number;
  profitGrowth: number;
  beta: number;
  rsi: number;
};

const sectors = [
  "Banking & Financial Services",
  "Information Technology",
  "Pharmaceuticals & Healthcare",
  "Consumer Goods",
  "Automobile",
  "Metals & Mining",
  "Energy",
  "Real Estate",
  "Telecom & Media",
  "Infrastructure",
  "Chemicals",
  "Others",
];

const companies = [
  "Apex Technologies",
  "Bharat Industries",
  "Global Finance",
  "Nova Healthcare",
  "Prime Motors",
  "Future Energy",
  "Vertex Systems",
  "Smart Consumer",
  "National Telecom",
  "Universal Infra",
];

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number) {
  return Math.floor(random(min, max));
}

export function generateStocks(count = 5000): Stock[] {
  return Array.from({ length: count }, (_, index) => {
    const marketCap = random(50, 100000);

    let beta: number;

    if (marketCap > 50000) {
      beta = random(0.5, 1.2);
    } else if (marketCap < 1000) {
      beta = random(0.3, 2.5);
    } else {
      beta = random(0.5, 1.8);
    }

    const revenueGrowth = random(-20, 60);

    let pe: number;

    if (revenueGrowth > 25) {
      pe = random(20, 80);
    } else if (revenueGrowth < 0) {
      pe = random(5, 15);
    } else {
      pe = random(10, 35);
    }

    const sector =
      sectors[randomInt(0, sectors.length)];

    let debtToEquity = random(0, 2);

    if (sector === "Banking & Financial Services") {
      debtToEquity = random(5, 15);
    }

    if (
      sector === "Information Technology" ||
      sector === "Consumer Goods"
    ) {
      debtToEquity = random(0, 0.5);
    }

    const change = random(-10, 10);

    const rsi =
      change >= 0
        ? random(50, 80)
        : random(20, 50);

    return {
      id: index + 1,
      symbol: `STK${String(index + 1).padStart(4, "0")}`,
      company:
        companies[index % companies.length] +
        ` ${index + 1}`,
      sector,
      price: Number(random(50, 5000).toFixed(2)),
      change: Number(change.toFixed(2)),
      volume: randomInt(10000, 10000000),
      marketCap: Number(marketCap.toFixed(2)),
      pe: Number(pe.toFixed(2)),
      pb: Number(random(0.5, 20).toFixed(2)),
      dividendYield: Number(random(0, 8).toFixed(2)),
      eps: Number(random(-50, 500).toFixed(2)),
      roe: Number(random(-10, 40).toFixed(2)),
      roce: Number(random(-10, 45).toFixed(2)),
      debtToEquity: Number(debtToEquity.toFixed(2)),
      promoterHolding: Number(random(20, 90).toFixed(2)),
      revenueGrowth: Number(revenueGrowth.toFixed(2)),
      profitGrowth: Number(random(-20, 100).toFixed(2)),
      beta: Number(beta.toFixed(2)),
      rsi: Number(rsi.toFixed(2)),
    };
  });
}

export const stocks = generateStocks(5000);