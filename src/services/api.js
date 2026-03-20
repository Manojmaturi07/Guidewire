const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const defaultMockUsers = [
  { id: 1, name: "Admin User", email: "admin", password: "usl123", role: "admin", hasActivePlan: true },
  { id: 2, name: "John Doe", email: "usl", password: "usl123", role: "user", jobType: "Delivery", location: "Bangalore", hasActivePlan: true }
];

let mockUsers = [...defaultMockUsers];
try {
  const stored = localStorage.getItem("gig_mock_users");
  if (stored) {
    mockUsers = JSON.parse(stored);
  } else {
    localStorage.setItem("gig_mock_users", JSON.stringify(mockUsers));
  }
} catch (e) {}

const saveUsers = () => {
  localStorage.setItem("gig_mock_users", JSON.stringify(mockUsers));
};

export const api = {
  login: async (credentials) => {
    await delay(1000);
    const user = mockUsers.find(u => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      // Don't return password
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new Error("Invalid credentials");
  },

  register: async (userData) => {
    await delay(1000);
    if (mockUsers.some(u => u.email === userData.email)) {
      throw new Error("Email already registered");
    }
    const newUser = {
      id: mockUsers.length + 1,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: "user",
      jobType: userData.jobType,
      location: "Unknown",
      hasActivePlan: false,
    };
    mockUsers.push(newUser);
    saveUsers();
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },
  completeOnboarding: async (userId, details) => {
    await delay(1000);
    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error("User not found");
    user.location = details.location || user.location;
    user.jobType = details.jobType || user.jobType;
    user.hasActivePlan = true;
    user.planDetails = details.plan;
    saveUsers();
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  getAllUsers: async () => {
    await delay(800);
    // return users without password mapped to AdminPanel table formats
    return mockUsers.map(u => ({
...u,
      id: `USR00${u.id}`,
      name: u.name,
      email: u.email,
      role: u.jobType || u.role,
      jobType: u.jobType || "N/A",
      risk: u.role === "admin" ? "Low" : (u.hasActivePlan ? "Medium" : "High"),
      premium: u.planDetails === "Premium" ? "₹299" : u.planDetails === "Standard" ? "₹149" : u.planDetails === "Basic" ? "₹99" : "₹0",
      status: u.hasActivePlan ? "Active" : "Inactive"
    }));
  },

  adminDeleteUser: async (rawId) => {
    await delay(500);
    const numericId = parseInt(rawId.replace("USR00", ""));
    mockUsers = mockUsers.filter(u => u.id !== numericId);
    saveUsers();
    return true;
  },

  adminUpdateUser: async (rawId, payload) => {
    await delay(500);
    const numericId = parseInt(rawId.replace("USR00", ""));
    const idx = mockUsers.findIndex(u => u.id === numericId);
    if (idx === -1) throw new Error("User not found");
    mockUsers[idx] = { ...mockUsers[idx], ...payload };
    saveUsers();
    return true;
  },

  adminAddUser: async (payload) => {
    await delay(600);
    if (mockUsers.some(u => u.email === payload.email)) {
      throw new Error("Email/Username already exists");
    }
    const newUser = {
      id: mockUsers.length ? Math.max(...mockUsers.map(u => u.id)) + 1 : 1,
      name: payload.name,
      email: payload.email,
      password: payload.password || "admin123",
      role: payload.role || "user",
      jobType: payload.jobType || "Delivery",
      location: payload.location || "Unknown",
      hasActivePlan: !!payload.hasActivePlan,
      planDetails: payload.planDetails || "Basic"
    };
    mockUsers.push(newUser);
    saveUsers();
    return newUser;
  },
  
  getDashboardMetrics: async (userId) => {
    await delay(800);
    const user = mockUsers.find(u => u.id === userId);
    if (user && !user.hasActivePlan) {
      return {
        activeCoverage: "₹0",
        weeklyPremium: "₹0",
        earningsProtected: "0%",
        riskScore: "N/A",
      };
    }
    return {
      activeCoverage: "₹50,000",
      weeklyPremium: "₹149",
      earningsProtected: "85%",
      riskScore: "Low",
    };
  },

  getAnalytics: async (userId) => {
    await delay(1000);
    const user = mockUsers.find(u => u.id === userId);
    if (user && !user.hasActivePlan) {
      return {
        earningsVsProtection: [
          { name: "Mon", earnings: 0, protection: 0 },
          { name: "Tue", earnings: 0, protection: 0 },
          { name: "Wed", earnings: 0, protection: 0 },
          { name: "Thu", earnings: 0, protection: 0 },
          { name: "Fri", earnings: 0, protection: 0 },
        ],
        riskTrends: []
      };
    }
    return {
      earningsVsProtection: [
        { name: "Mon", earnings: 4000, protection: 3500 },
        { name: "Tue", earnings: 3000, protection: 3500 },
        { name: "Wed", earnings: 2000, protection: 3500 },
        { name: "Thu", earnings: 2780, protection: 3500 },
        { name: "Fri", earnings: 1890, protection: 3500 },
        { name: "Sat", earnings: 2390, protection: 3500 },
        { name: "Sun", earnings: 3490, protection: 3500 },
      ],
      riskTrends: [
        { month: "Jan", aq: 120, rain: 40, traffic: 80 },
        { month: "Feb", aq: 150, rain: 30, traffic: 85 },
        { month: "Mar", aq: 180, rain: 20, traffic: 90 },
        { month: "Apr", aq: 140, rain: 50, traffic: 70 },
        { month: "May", aq: 200, rain: 90, traffic: 100 },
      ]
    };
  },

  getRecentClaims: async (userId) => {
    await delay(600);
    const user = mockUsers.find(u => u.id === userId);
    if (user && !user.hasActivePlan) {
      return [];
    }
    return [
      { id: "CLM-001", date: "2026-03-15", amount: "₹850", status: "Paid", type: "Heavy Rain" },
      { id: "CLM-002", date: "2026-03-18", amount: "₹420", status: "Processing", type: "High AQI" },
      { id: "CLM-003", date: "2026-03-10", amount: "₹1200", status: "Approved", type: "Curfew" },
    ];
  },

  getDisruptions: async () => {
    await delay(500);
    return [
      { id: 1, type: "weather", title: "Heavy Rain Alert", severity: "high", location: "Koramangala, Bangalore", time: "10 mins ago" },
      { id: 2, type: "aqi", title: "Severe AQI 350+", severity: "warning", location: "Delhi NCR", time: "1 hour ago" },
      { id: 3, type: "curfew", title: "Section 144 Imposed", severity: "critical", location: "Central Zone", time: "2 hours ago" },
    ];
  },

  getFlaggedClaims: async () => {
    await delay(900);
    return [
      { id: "CLM-F01", user: "Jane Smith", amount: "₹5000", reason: "Multiple claims in 24h", riskScore: 85 },
      { id: "CLM-F02", user: "Ravi Kumar", amount: "₹3200", reason: "Location mismatch", riskScore: 78 },
      { id: "CLM-F03", user: "Alex T", amount: "₹1500", reason: "Unusual weather data", riskScore: 65 },
    ]
  }
};
