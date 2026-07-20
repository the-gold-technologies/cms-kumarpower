"use client";

import Link from "next/link";

export function AdminRightSidebar() {
  const activities = [
    { type: "update", text: 'Layout "Value-Added Services" updated', time: "2h ago" },
    { type: "update", text: 'Layout "Airport Services" updated', time: "2h ago" },
    { type: "enquiry", text: "New enquiry from Sudeesh Kumar", time: "3 days ago" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Dark Promo Card */}
      <div className="bg-[#0B0F29] rounded-[2rem] p-7 text-white relative overflow-hidden shadow-xl">
        {/* Decorative Bubbles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#2D6FBA]/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="flex items-center gap-2 font-bold tracking-tight text-white/90 mb-6">
          <div className="w-6 h-6 rounded-full bg-white text-[#0B0F29] flex items-center justify-center font-serif italic text-sm font-black">
            KP
          </div>
          Kumar Power Setup
        </div>

        <h2 className="text-[26px] font-black leading-[1.1] mb-3">
          Optimize <br />
          Performance
        </h2>

        <p className="text-sm font-medium text-gray-400 leading-relaxed max-w-[200px] mb-8">
          Enable advanced analytics and track 25k+ user interactions effortlessly.
        </p>

        <Link
          href="/seo/global"
          className="inline-block bg-[#2D6FBA] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white hover:text-[#2D6FBA] transition-colors transform hover:scale-105 shadow-[0_0_20px_rgba(160,0,79,0.4)] relative z-10"
        >
          Get Access
        </Link>

        {/* Illustration Image */}
        <div className="absolute -bottom-4 right-0 w-36 h-36 opacity-90 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Illustration&backgroundColor=transparent"
            className="w-full h-full object-contain filter drop-shadow-2xl grayscale contrast-125"
            alt="illustration"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="font-bold text-lg text-[#0B0F29]">Recent Activity</h3>
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-xs ring-1 ring-gray-100/80 space-y-4">
          {activities.map((activity, idx) => {
            const isEnquiry = activity.type === "enquiry";

            return (
              <div key={idx} className="flex items-start gap-3 text-[13px]">
                <div
                  className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                    isEnquiry ? "bg-green-500 animate-pulse" : "bg-[#2D6FBA]"
                  }`}
                ></div>
                <div className="flex flex-col flex-1 leading-snug">
                  <span className="font-bold text-[#0B0F29]">
                    {activity.text}
                  </span>
                  <span className="text-[11px] text-gray-400 font-semibold mt-0.5">
                    {activity.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
