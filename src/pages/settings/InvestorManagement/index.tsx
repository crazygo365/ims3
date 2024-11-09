// ... 其他代码保持不变

const investors: Investor[] = [
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    shopCount: 4,
    totalInvestment: 1004000,
    currentNetWorth: 22222,
    totalDividends: -925194.6,
    investmentYears: 4.9,
    shops: [
      {
        name: '张万福1',
        investment: 1000,
        netWorth: 0,
        dividends: 333.4,
        years: 4.9,
        annualReturn: -13.60
      },
      {
        name: '张万福2',
        investment: 1000,
        netWorth: 5555.5,
        dividends: 56250,
        years: 3.8,
        annualReturn: 1600.14
      },
      {
        name: '中国黄金',
        investment: 2000,
        netWorth: 16666.5,
        dividends: 0,
        years: 3.5,
        annualReturn: 209.52
      },
      {
        name: '周大福宇宙超窝',
        investment: 1000000,
        netWorth: 0,
        dividends: 0,
        years: 4.9,
        annualReturn: -20.41
      }
    ],
    monthlyDividends: [
      { month: '2023-09', amount: 25000 },
      { month: '2023-10', amount: 28000 },
      { month: '2023-11', amount: 22000 },
      { month: '2023-12', amount: 30000 },
      { month: '2024-01', amount: 27000 },
      { month: '2024-02', amount: 32000 }
    ],
    radarData: [
      { shop: '张万福1', value: 60 },
      { shop: '张万福2', value: 85 },
      { shop: '中国黄金', value: 75 },
      { shop: '周大福', value: 90 }
    ]
  },
  {
    id: 2,
    name: '李四',
    phone: '13800138001',
    shopCount: 3,
    totalInvestment: 1500000,
    currentNetWorth: 1800000,
    totalDividends: 280000,
    investmentYears: 3.5,
    shops: [
      {
        name: '星巴克咖啡 - 中关村店',
        investment: 500000,
        netWorth: 600000,
        dividends: 90000,
        years: 3.5,
        annualReturn: 18.5
      },
      {
        name: '肯德基 - 望京店',
        investment: 600000,
        netWorth: 720000,
        dividends: 110000,
        years: 3.2,
        annualReturn: 20.1
      },
      {
        name: '必胜客 - 三里屯店',
        investment: 400000,
        netWorth: 480000,
        dividends: 80000,
        years: 2.8,
        annualReturn: 22.3
      }
    ],
    monthlyDividends: [
      { month: '2023-09', amount: 22000 },
      { month: '2023-10', amount: 24000 },
      { month: '2023-11', amount: 23000 },
      { month: '2023-12', amount: 25000 },
      { month: '2024-01', amount: 24000 },
      { month: '2024-02', amount: 26000 }
    ],
    radarData: [
      { shop: '星巴克', value: 82 },
      { shop: '肯德基', value: 88 },
      { shop: '必胜客', value: 85 }
    ]
  },
  {
    id: 3,
    name: '王五',
    phone: '13800138002',
    shopCount: 2,
    totalInvestment: 2000000,
    currentNetWorth: 2500000,
    totalDividends: 450000,
    investmentYears: 4.2,
    shops: [
      {
        name: '麦当劳 - 西单店',
        investment: 1200000,
        netWorth: 1500000,
        dividends: 280000,
        years: 4.2,
        annualReturn: 25.4
      },
      {
        name: '奈雪的茶 - 国贸店',
        investment: 800000,
        netWorth: 1000000,
        dividends: 170000,
        years: 3.8,
        annualReturn: 23.8
      }
    ],
    monthlyDividends: [
      { month: '2023-09', amount: 35000 },
      { month: '2023-10', amount: 38000 },
      { month: '2023-11', amount: 36000 },
      { month: '2023-12', amount: 40000 },
      { month: '2024-01', amount: 38000 },
      { month: '2024-02', amount: 42000 }
    ],
    radarData: [
      { shop: '麦当劳', value: 92 },
      { shop: '奈雪的茶', value: 88 }
    ]
  },
  {
    id: 4,
    name: '赵六',
    phone: '13800138003',
    shopCount: 5,
    totalInvestment: 3000000,
    currentNetWorth: 3600000,
    totalDividends: 720000,
    investmentYears: 5.5,
    shops: [
      {
        name: '瑞幸咖啡 - 望京店',
        investment: 600000,
        netWorth: 750000,
        dividends: 150000,
        years: 5.5,
        annualReturn: 27.2
      },
      {
        name: '瑞幸咖啡 - 中关村店',
        investment: 600000,
        netWorth: 720000,
        dividends: 140000,
        years: 5.0,
        annualReturn: 25.8
      },
      {
        name: '瑞幸咖啡 - 国贸店',
        investment: 600000,
        netWorth: 700000,
        dividends: 145000,
        years: 4.8,
        annualReturn: 26.4
      },
      {
        name: '瑞幸咖啡 - 西单店',
        investment: 600000,
        netWorth: 710000,
        dividends: 142000,
        years: 4.5,
        annualReturn: 26.1
      },
      {
        name: '瑞幸咖啡 - 三里屯店',
        investment: 600000,
        netWorth: 720000,
        dividends: 143000,
        years: 4.2,
        annualReturn: 26.7
      }
    ],
    monthlyDividends: [
      { month: '2023-09', amount: 58000 },
      { month: '2023-10', amount: 60000 },
      { month: '2023-11', amount: 59000 },
      { month: '2023-12', amount: 62000 },
      { month: '2024-01', amount: 61000 },
      { month: '2024-02', amount: 63000 }
    ],
    radarData: [
      { shop: '望京店', value: 95 },
      { shop: '中关村店', value: 92 },
      { shop: '国贸店', value: 90 },
      { shop: '西单店', value: 91 },
      { shop: '三里屯店', value: 93 }
    ]
  },
  {
    id: 5,
    name: '孙七',
    phone: '13800138004',
    shopCount: 3,
    totalInvestment: 2500000,
    currentNetWorth: 2800000,
    totalDividends: 520000,
    investmentYears: 4.8,
    shops: [
      {
        name: '喜茶 - 三里屯店',
        investment: 800000,
        netWorth: 920000,
        dividends: 180000,
        years: 4.8,
        annualReturn: 24.6
      },
      {
        name: '喜茶 - 望京店',
        investment: 850000,
        netWorth: 950000,
        dividends: 175000,
        years: 4.5,
        annualReturn: 23.8
      },
      {
        name: '喜茶 - 国贸店',
        investment: 850000,
        netWorth: 930000,
        dividends: 165000,
        years: 4.2,
        annualReturn: 22.9
      }
    ],
    monthlyDividends: [
      { month: '2023-09', amount: 42000 },
      { month: '2023-10', amount: 43000 },
      { month: '2023-11', amount: 44000 },
      { month: '2023-12', amount: 45000 },
      { month: '2024-01', amount: 44000 },
      { month: '2024-02', amount: 46000 }
    ],
    radarData: [
      { shop: '三里屯店', value: 89 },
      { shop: '望京店', value: 87 },
      { shop: '国贸店', value: 86 }
    ]
  },
  {
    id: 6,
    name: '周八',
    phone: '13800138005',
    shopCount: 4,
    totalInvestment: 2800000,
    currentNetWorth: 3200000,
    totalDividends: 580000,
    investmentYears: 5.2,
    shops: [
      {
        name: '海底捞 - 望京店',
        investment: 700000,
        netWorth: 820000,
        dividends: 150000,
        years: 5.2,
        annualReturn: 23.5
      },
      {
        name: '海底捞 - 中关村店',
        investment: 700000,
        netWorth: 800000,
        dividends: 145000,
        years: 4.8,
        annualReturn: 22.8
      },
      {
        name: '海底捞 - 西单店',
        investment: 700000,
        netWorth: 790000,
        dividends: 142000,
        years: 4.5,
        annualReturn: 22.3
      },
      {
        name: '海底捞 - 国贸店',
        investment: 700000,
        netWorth: 790000,
        dividends: 143000,
        years: 4.2,
        annualReturn: 22.5
      }
    ],
    monthlyDividends: [
      { month: '2023-09', amount: 47000 },
      { month: '2023-10', amount: 48000 },
      { month: '2023-11', amount: 48000 },
      { month: '2023-12', amount: 49000 },
      { month: '2024-01', amount: 48000 },
      { month: '2024-02', amount: 50000 }
    ],
    radarData: [
      { shop: '望京店', value: 88 },
      { shop: '中关村店', value: 86 },
      { shop: '西单店', value: 85 },
      { shop: '国贸店', value: 85 }
    ]
  }
];

// ... 其他代码保持不变