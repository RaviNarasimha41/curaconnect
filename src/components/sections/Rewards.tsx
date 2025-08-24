import { Droplet, Gift, Ticket } from "lucide-react";

export function Rewards() {
  const rewards = [
    {
      icon: <Droplet className="w-10 h-10 text-red-500" />,
      title: "Donate & Earn",
      desc: "Earn 50 points every time you donate blood. Maximum 2 donations per year.",
    },
    {
      icon: <Gift className="w-10 h-10 text-indigo-600" />,
      title: "Track Your Points",
      desc: "Your points accumulate throughout the year as you donate.",
    },
    {
      icon: <Ticket className="w-10 h-10 text-green-500" />,
      title: "Convert to Coupons",
      desc: "At year-end, redeem your points for exciting coupons and benefits.",
    },
  ];

  return (
    <section id="rewards" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Rewards Program</h2>
        <p className="text-lg text-gray-600 mb-12">
          We value your noble act of blood donation. Earn points for every
          donation and redeem them for exclusive coupons.
        </p>

        {/* Rewards Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 flex flex-col items-center"
            >
              {reward.icon}
              <h3 className="text-xl font-semibold mt-4">{reward.title}</h3>
              <p className="text-gray-500 mt-2">{reward.desc}</p>
            </div>
          ))}
        </div>

        {/* Progress Example */}
        <div className="mt-16 text-left max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Your Donation Progress (This Year)
          </h3>
          <div className="bg-gray-200 rounded-full h-4 w-full overflow-hidden">
            <div
              className="bg-red-500 h-4 rounded-full"
              style={{ width: "50%" }} // Example: 1 donation = 50%
            ></div>
          </div>
          <p className="mt-2 text-gray-600 text-center">
            1 out of 2 donations completed – 50 points earned
          </p>
        </div>
      </div>
    </section>
  );
}
