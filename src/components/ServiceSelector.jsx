import React from "react";
import { MdElectricBolt, MdWaterDrop } from "react-icons/md";
import { GiGasStove } from "react-icons/gi";  // Changed to stove icon

export default function ServiceSelector({ selected, setSelected }) {
  const services = [
    {
      name: "Electricity",
      icon: <MdElectricBolt className="text-xl" />,
      activeGlow: "ring-yellow-300/50",
      gradient: "from-yellow-400 to-orange-500",
      font: "Space Mono bold",
    },
    {
      name: "Water",
      icon: <MdWaterDrop className="text-xl" />,
      activeGlow: "ring-blue-300/50",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      name: "Gas",
      icon: <GiGasStove className="text-2xl" />,  // Made slightly larger for better visibility
      activeGlow: "ring-orange-300/50",
      gradient: "from-orange-400 to-red-500",
    },
  ];

  
  return (
    <div className="flex gap-3 flex-wrap">
      {services.map((service) => {
        const active = selected === service.name;
        return (
          <button
            key={service.name}
            onClick={() => setSelected(service.name)}
            className={`
              px-5 py-2 rounded-xl font-semibold
              transition-all duration-300 transform
              flex items-center gap-2
              ${active
                ? `bg-gradient-to-r ${service.gradient} text-white 
                   shadow-lg shadow-current/20
                   ring-4 ${service.activeGlow} 
                   scale-105`
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:scale-105"}
            `}
            aria-pressed={active}
          >
            <span className={`${active ? "animate-pulse" : ""}`}>
              {service.icon}
            </span>
            {service.name}
          </button>
        );
      })}
    </div>
  );
}