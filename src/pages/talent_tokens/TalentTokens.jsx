import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const tokenData = {
  JLO: [
    { time: "01:00 - 13 Mar", value1: 15, value2: 16 },
    { time: "03:00 - 13 Mar", value1: 24, value2: 25 },
    { time: "06:00 - 14 Mar", value1: 22, value2: 20 },
    { time: "09:00 - 14 Mar", value1: 15, value2: 18 },
    { time: "12:00 - 15 Mar", value1: 35, value2: 40 },
    { time: "15:00 - 15 Mar", value1: 20, value2: 17 },
    { time: "18:00 - 15 Mar", value1: 20, value2: 22 },
    { time: "21:00 - 15 Mar", value1: 22, value2: 24 },
    { time: "00:00 - 16 Mar", value1: 48, value2: 52 },
  ],
  "MC LITE": [
    { time: "01:00 - 13 Mar", value1: 15, value2: 16 },
    { time: "03:00 - 13 Mar", value1: 24, value2: 25 },
    { time: "06:00 - 14 Mar", value1: 22, value2: 20 },
    { time: "09:00 - 14 Mar", value1: 15, value2: 18 },
    { time: "12:00 - 15 Mar", value1: 35, value2: 40 },
    { time: "15:00 - 15 Mar", value1: 20, value2: 17 },
    { time: "18:00 - 15 Mar", value1: 20, value2: 22 },
    { time: "21:00 - 15 Mar", value1: 22, value2: 24 },
    { time: "00:00 - 16 Mar", value1: 48, value2: 42 },
  ],
  POISON: [
    { time: "01:00 - 13 Mar", value1: 12, value2: 18 },
    { time: "03:00 - 13 Mar", value1: 20, value2: 19 },
    { time: "06:00 - 14 Mar", value1: 23, value2: 21 },
    { time: "09:00 - 14 Mar", value1: 18, value2: 22 },
    { time: "12:00 - 15 Mar", value1: 33, value2: 37 },
    { time: "15:00 - 15 Mar", value1: 25, value2: 19 },
    { time: "18:00 - 15 Mar", value1: 21, value2: 23 },
    { time: "21:00 - 15 Mar", value1: 26, value2: 27 },
    { time: "00:00 - 16 Mar", value1: 45, value2: 50 },
  ],
  PINK: [
    { time: "01:00 - 13 Mar", value1: 10, value2: 15 },
    { time: "03:00 - 13 Mar", value1: 18, value2: 20 },
    { time: "06:00 - 14 Mar", value1: 21, value2: 19 },
    { time: "09:00 - 14 Mar", value1: 14, value2: 17 },
    { time: "12:00 - 15 Mar", value1: 30, value2: 36 },
    { time: "15:00 - 15 Mar", value1: 23, value2: 20 },
    { time: "18:00 - 15 Mar", value1: 19, value2: 21 },
    { time: "21:00 - 15 Mar", value1: 25, value2: 26 },
    { time: "00:00 - 16 Mar", value1: 44, value2: 48 },
  ],
  MARRONE: [
    { time: "01:00 - 13 Mar", value1: 13, value2: 14 },
    { time: "03:00 - 13 Mar", value1: 22, value2: 23 },
    { time: "06:00 - 14 Mar", value1: 20, value2: 18 },
    { time: "09:00 - 14 Mar", value1: 16, value2: 17 },
    { time: "12:00 - 15 Mar", value1: 31, value2: 34 },
    { time: "15:00 - 15 Mar", value1: 19, value2: 16 },
    { time: "18:00 - 15 Mar", value1: 22, value2: 20 },
    { time: "21:00 - 15 Mar", value1: 23, value2: 25 },
    { time: "00:00 - 16 Mar", value1: 47, value2: 49 },
  ],
  STONES: [
    { time: "01:00 - 13 Mar", value1: 14, value2: 13 },
    { time: "03:00 - 13 Mar", value1: 23, value2: 22 },
    { time: "06:00 - 14 Mar", value1: 19, value2: 21 },
    { time: "09:00 - 14 Mar", value1: 17, value2: 19 },
    { time: "12:00 - 15 Mar", value1: 33, value2: 39 },
    { time: "15:00 - 15 Mar", value1: 21, value2: 22 },
    { time: "18:00 - 15 Mar", value1: 24, value2: 23 },
    { time: "21:00 - 15 Mar", value1: 27, value2: 28 },
    { time: "00:00 - 16 Mar", value1: 46, value2: 51 },
  ],
  "MARK ANTHONY": [
    { time: "01:00 - 13 Mar", value1: 16, value2: 14 },
    { time: "03:00 - 13 Mar", value1: 25, value2: 23 },
    { time: "06:00 - 14 Mar", value1: 21, value2: 22 },
    { time: "09:00 - 14 Mar", value1: 18, value2: 20 },
    { time: "12:00 - 15 Mar", value1: 32, value2: 35 },
    { time: "15:00 - 15 Mar", value1: 22, value2: 19 },
    { time: "18:00 - 15 Mar", value1: 26, value2: 24 },
    { time: "21:00 - 15 Mar", value1: 28, value2: 27 },
    { time: "00:00 - 16 Mar", value1: 49, value2: 53 },
  ],
  // --- Remaining tokens (dummy data below) ---
};

[
  "DRE",
  "JAY-Z",
  "DAFT PUNK",
  "ORIGINAL IMAGE",
  "BLACK SHELTON",
  "CHILI PEPPERS",
  "DEAD SUPERSTAR",
  "BEYONCE",
  "CANE BROWN",
  "MANILOW",
  "GAGA",
  "CASH MONEY",
  "LADY GAGA",
  "AREOSMITH",
  "LUKE BRYAB",
  "GUN-N-ROSES",
].forEach((token, idx) => {
  tokenData[token] = [
    { time: "01:00 - 13 Mar", value1: 10 + idx, value2: 11 + idx },
    { time: "03:00 - 13 Mar", value1: 20 + idx, value2: 21 + idx },
    { time: "06:00 - 14 Mar", value1: 22 + idx, value2: 19 + idx },
    { time: "09:00 - 14 Mar", value1: 17 + idx, value2: 18 + idx },
    { time: "12:00 - 15 Mar", value1: 30 + idx, value2: 32 + idx },
    { time: "15:00 - 15 Mar", value1: 23 + idx, value2: 20 + idx },
    { time: "18:00 - 15 Mar", value1: 24 + idx, value2: 25 + idx },
    { time: "21:00 - 15 Mar", value1: 26 + idx, value2: 28 + idx },
    { time: "00:00 - 16 Mar", value1: 45 + idx, value2: 50 + idx },
  ];
});

const TalentTokens = () => {
  const [selectedToken, setSelectedToken] = useState("MARK ANTHONY");

  return (
    <div className="mt-10 lg:mt-16 bg-black">
      <Navbar />
      <div className="flex flex-col md:flex-row container  py-12 w-full  text-white">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-[#0C0C0C] p-4">
          <h2 className="text-primary font-heading-section">
            TALENT TOKENS/ BRANDS
          </h2>
          {Object.keys(tokenData).map((token) => (
            <label
              key={token}
              onClick={() => setSelectedToken(token)}
              className={`flex items-center justify-between font-heading-section px-2 py-3 cursor-pointer hover:bg-[#111] ${
                selectedToken === token ? "text-primary" : "text-white"
              }`}
            >
              {token}
              <span
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedToken === token
                    ? "bg-primary border-primary"
                    : "border-white"
                }`}
              ></span>
            </label>
          ))}
        </div>

        {/* Graph */}
        <div className="flex-1 p-4 bg-black">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={tokenData[selectedToken]}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid stroke="#444" strokeDasharray="4 4" />
              <XAxis
                dataKey="time"
                stroke="#aaa"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#aaa"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Line
                type="monotone"
                dataKey="value1"
                stroke="#F3BA18"
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
              />{" "}
              <Line
                type="monotone"
                dataKey="value2"
                stroke="#aaa"
                strokeDasharray="5 5"
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TalentTokens;
