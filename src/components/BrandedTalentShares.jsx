import { LineChart, Line, ResponsiveContainer } from "recharts";
import imageText from "../assets/images/fame-exchange-image-text.png";
const BrandedTalentShares = () => {
  const talentData = [
    {
      name: "Pink",
      price: "$30,446.36",
      change: "+4.39%",
      volume: "$575,133,39,800.07",
      graphData: [
        { pv: 400 },
        { pv: 420 },
        { pv: 390 },
        { pv: 430 },
        { pv: 460 },
        { pv: 450 },
        { pv: 470 },
      ],
    },
    {
      name: "Lady Gaga",
      price: "$30,446.36",
      change: "+4.39%",
      volume: "$575,133,39,800.07",
      graphData: [
        { pv: 310 },
        { pv: 340 },
        { pv: 320 },
        { pv: 350 },
        { pv: 360 },
        { pv: 370 },
        { pv: 390 },
      ],
    },
    {
      name: "Aerosmith",
      price: "$30,446.36",
      change: "+4.39%",
      volume: "$575,133,39,800.07",
      graphData: [
        { pv: 10 },
        { pv: 15 },
        { pv: 12 },
        { pv: 18 },
        { pv: 20 },
        { pv: 25 },
        { pv: 23 },
      ],
    },
    {
      name: "Luke Bryan",
      price: "$30,446.36",
      change: "+4.39%",
      volume: "$575,133,39,800.07",
      graphData: [
        { pv: 5 },
        { pv: 7 },
        { pv: 6 },
        { pv: 8 },
        { pv: 7.5 },
        { pv: 9 },
        { pv: 10 },
      ],
    },
    {
      name: "Guns-N-Roses",
      price: "$30,446.36",
      change: "+4.39%",
      volume: "$575,133,39,800.07",
      graphData: [
        { pv: 60 },
        { pv: 62 },
        { pv: 61 },
        { pv: 65 },
        { pv: 68 },
        { pv: 67 },
        { pv: 70 },
      ],
    },
  ];

  return (
    <div className=" bg-[#171717] text-white py-12 2xl:py-16">
      <div className="mb-10 container">
        <img src={imageText} alt="" />
      </div>
      <div className="container">
        <h1 className="custom-heading-two mb-8 text-center">
          Top Branded Talent Shares (BTS)
        </h1>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Table Body */}
            <tbody>
              {talentData.map((talent, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                >
                  {/* Artist Name */}
                  <td className="py-4 custom-heading-six px-4 font-medium">
                    {talent.name}
                  </td>

                  {/* Price */}
                  <td className="py-4 custom-heading-six  px-4 text-right">
                    {talent.price}
                  </td>

                  {/* Change */}
                  <td className="py-4 custom-heading-six  px-4 text-right text-[#15ab9c]">
                    {talent.change}
                  </td>

                  {/* Volume */}
                  <td className="py-4 px-4 custom-heading-six text-right">
                    {talent.volume}
                  </td>

                  {/* Trade Now Button with Chart */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-4">
                      <div className="w-24 h-10">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={talent.graphData}>
                            <Line
                              type="monotone"
                              dataKey="pv"
                              stroke="#15ab9c"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <button className="bg-[#e0aa0d] cursor-pointer hover:brightness-110 transition-all text-white px-4 py-2 rounded-md whitespace-nowrap">
                        Trade Now
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Learn More Button */}
        <div className="mt-10 text-center">
          <button className="bg-[#e0aa0d] hover:brightness-110 transition-all cursor-pointer text-white py-3 px-6 rounded-md">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandedTalentShares;
