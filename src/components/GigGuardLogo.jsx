export function GigGuardLogo({ className }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0px 0px 10px rgba(99, 102, 241, 0.8))" }}
    >
      {/* Outer Glowing Shield Frame */}
      <path 
        d="M50 5 L90 20 L90 55 C90 75 70 90 50 95 C30 90 10 75 10 55 L10 20 L50 5 Z" 
        stroke="url(#gradient-outer)" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Inner Shield Accent */}
      <path 
        d="M50 15 L80 26 L80 53 C80 69 65 82 50 85 C35 82 20 69 20 53 L20 26 L50 15 Z" 
        stroke="url(#gradient-inner)" 
        strokeWidth="1.5" 
        fill="url(#fill-gradient)"
        strokeLinecap="round" 
        strokeLinejoin="round" 
        opacity="0.7"
      />
      {/* Abstract Circuit / Data Lines */}
      <path d="M25 40 L35 40 M25 50 L40 50" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <path d="M75 40 L65 40 M75 50 L60 50" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      
      {/* Powerful Lightning Bolt Target */}
      <path 
        d="M55 25 L35 55 L50 55 L45 80 L65 45 L50 45 L55 25 Z" 
        fill="url(#gradient-lightning)" 
        stroke="#FFFFFF" 
        strokeWidth="1"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0px 0px 5px rgba(45, 212, 191, 1))" }}
      />
      
      <defs>
        <linearGradient id="gradient-outer" x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="0.5" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#2DD4BF" />
        </linearGradient>
        <linearGradient id="gradient-inner" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="gradient-lightning" x1="45" y1="25" x2="55" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2DD4BF" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id="fill-gradient" x1="50" y1="15" x2="50" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#312E81" stopOpacity="0.4" />
          <stop offset="1" stopColor="#1E1B4B" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
