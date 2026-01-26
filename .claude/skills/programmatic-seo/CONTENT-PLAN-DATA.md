# Content Plan Data Reference

This document contains the complete data structure for all planned programmatic pages. Use this as a reference when implementing pages.

## Tire Size Pages

```json
{
  "tireSizePages": [
    {
      "slug": "20x3-0",
      "displaySize": "20x3.0",
      "category": "Fat Tire (Small)",
      "typicalPSI": { "min": 20, "max": 30 },
      "priority": "P0",
      "searchVolume": "Medium",
      "targetKeywords": [
        "20x3.0 tire pressure",
        "20x3 ebike psi",
        "20 inch fat tire pressure"
      ]
    },
    {
      "slug": "20x4-0",
      "displaySize": "20x4.0",
      "category": "Fat Tire",
      "typicalPSI": { "min": 15, "max": 25 },
      "priority": "P0",
      "searchVolume": "High",
      "targetKeywords": [
        "20x4.0 tire pressure",
        "20x4 fat tire psi",
        "20 inch fat tire ebike pressure"
      ]
    },
    {
      "slug": "26x4-0",
      "displaySize": "26x4.0",
      "category": "Fat Tire",
      "typicalPSI": { "min": 15, "max": 30 },
      "priority": "P0",
      "searchVolume": "High",
      "targetKeywords": [
        "26x4.0 tire pressure",
        "26 inch fat tire psi",
        "26x4 ebike pressure"
      ]
    },
    {
      "slug": "27-5x2-2",
      "displaySize": "27.5x2.2",
      "category": "Commuter",
      "typicalPSI": { "min": 35, "max": 65 },
      "priority": "P0",
      "searchVolume": "Medium",
      "targetKeywords": [
        "27.5x2.2 tire pressure",
        "27.5 ebike psi",
        "27.5 inch commuter tire pressure"
      ]
    },
    {
      "slug": "27-5x2-4",
      "displaySize": "27.5x2.4",
      "category": "Hybrid",
      "typicalPSI": { "min": 30, "max": 50 },
      "priority": "P1",
      "searchVolume": "Medium"
    },
    {
      "slug": "700x35c",
      "displaySize": "700x35c",
      "category": "Road",
      "typicalPSI": { "min": 50, "max": 80 },
      "priority": "P1",
      "searchVolume": "Medium"
    },
    {
      "slug": "700x40c",
      "displaySize": "700x40c",
      "category": "Gravel/Hybrid",
      "typicalPSI": { "min": 45, "max": 75 },
      "priority": "P1",
      "searchVolume": "Medium"
    },
    {
      "slug": "20x2-4",
      "displaySize": "20x2.4",
      "category": "Cargo",
      "typicalPSI": { "min": 35, "max": 55 },
      "priority": "P1",
      "searchVolume": "Low-Medium"
    },
    {
      "slug": "22x3-0",
      "displaySize": "22x3.0",
      "category": "Specialty (RadWagon)",
      "typicalPSI": { "min": 20, "max": 30 },
      "priority": "P2",
      "searchVolume": "Low"
    },
    {
      "slug": "16x1-5",
      "displaySize": "16x1.5",
      "category": "Folding",
      "typicalPSI": { "min": 60, "max": 100 },
      "priority": "P2",
      "searchVolume": "Low"
    },
    {
      "slug": "24x2-4",
      "displaySize": "24x2.4",
      "category": "Cargo/Utility",
      "typicalPSI": { "min": 30, "max": 55 },
      "priority": "P2",
      "searchVolume": "Low"
    },
    {
      "slug": "29x2-5",
      "displaySize": "29x2.5",
      "category": "Mountain",
      "typicalPSI": { "min": 20, "max": 35 },
      "priority": "P2",
      "searchVolume": "Low"
    },
    {
      "slug": "27-5x2-6",
      "displaySize": "27.5x2.6",
      "category": "Trail",
      "typicalPSI": { "min": 25, "max": 45 },
      "priority": "P2",
      "searchVolume": "Low"
    },
    {
      "slug": "20x2-5",
      "displaySize": "20x2.5",
      "category": "Compact",
      "typicalPSI": { "min": 30, "max": 50 },
      "priority": "P3",
      "searchVolume": "Low"
    },
    {
      "slug": "19x2-5",
      "displaySize": "19x2.5",
      "category": "Moto-Style",
      "typicalPSI": { "min": 12, "max": 18 },
      "priority": "P3",
      "searchVolume": "Low"
    }
  ]
}
```

## Category Pages

```json
{
  "categoryPages": [
    {
      "slug": "cargo-ebike-tire-pressure",
      "name": "Cargo E-Bike",
      "priority": "P0",
      "searchVolume": "High",
      "targetKeywords": [
        "cargo ebike tire pressure",
        "longtail cargo bike psi",
        "family ebike tire pressure"
      ],
      "relatedBrands": ["Tern", "Yuba", "Rad Power Bikes", "Benno", "Aventon"],
      "contentFocus": [
        "Load-based PSI adjustments",
        "Passenger safety",
        "Rear tire priority",
        "Weight capacity limits"
      ]
    },
    {
      "slug": "folding-ebike-tire-pressure",
      "name": "Folding E-Bike",
      "priority": "P0",
      "searchVolume": "Medium-High",
      "targetKeywords": [
        "folding ebike tire pressure",
        "foldable electric bike psi",
        "compact ebike tire pressure"
      ],
      "relatedBrands": ["Brompton", "Lectric", "Tern", "GoCycle", "Velotric"],
      "contentFocus": [
        "Small wheel PSI requirements",
        "Portability vs pressure",
        "Storage considerations"
      ]
    },
    {
      "slug": "fat-tire-ebike-tire-pressure",
      "name": "Fat Tire E-Bike",
      "priority": "P0",
      "searchVolume": "High",
      "targetKeywords": [
        "fat tire ebike pressure",
        "fat bike tire psi",
        "wide tire electric bike pressure"
      ],
      "relatedBrands": ["Lectric", "Rad Power Bikes", "Aventon", "Himiway", "Super73"],
      "contentFocus": [
        "Low PSI benefits",
        "Terrain flotation",
        "Sand and snow riding"
      ]
    },
    {
      "slug": "commuter-ebike-tire-pressure",
      "name": "Commuter E-Bike",
      "priority": "P1",
      "searchVolume": "Medium",
      "targetKeywords": [
        "commuter ebike tire pressure",
        "city electric bike psi",
        "urban ebike tire pressure"
      ],
      "relatedBrands": ["Aventon", "VanMoof", "Trek", "Specialized", "Priority"],
      "contentFocus": [
        "Efficiency optimization",
        "Battery range impact",
        "Pothole protection"
      ]
    },
    {
      "slug": "moto-style-ebike-tire-pressure",
      "name": "Moto-Style E-Bike",
      "priority": "P1",
      "searchVolume": "Medium",
      "targetKeywords": [
        "sur-ron tire pressure",
        "electric dirt bike psi",
        "moto ebike tire pressure"
      ],
      "relatedBrands": ["Sur-Ron", "Talaria", "UBCO", "Ariel Rider"],
      "contentFocus": [
        "Off-road traction",
        "Jump/landing considerations",
        "Dirt vs street settings"
      ]
    },
    {
      "slug": "class-3-ebike-tire-pressure",
      "name": "Class 3 E-Bike",
      "priority": "P2",
      "searchVolume": "Low-Medium",
      "targetKeywords": [
        "class 3 ebike tire pressure",
        "28 mph ebike psi",
        "high speed electric bike tire pressure"
      ],
      "contentFocus": [
        "High-speed safety",
        "Braking distance",
        "Heat buildup"
      ]
    }
  ]
}
```

## GEO Pages

```json
{
  "geoPages": {
    "international": [
      {
        "slug": "ebike-tyre-pressure",
        "name": "UK/EU E-Bike Tyre Pressure",
        "priority": "P0",
        "language": "en-GB",
        "units": "Bar (with PSI)",
        "targetKeywords": [
          "ebike tyre pressure",
          "electric bike tyre pressure uk",
          "ebike tyre pressure bar"
        ],
        "featuredBrands": ["Tern", "Brompton", "GoCycle", "Riese & Müller", "Gazelle", "Cube"]
      },
      {
        "slug": "ebike-tyre-pressure-bar",
        "name": "E-Bike Tyre Pressure in Bar",
        "priority": "P1",
        "language": "en-GB",
        "units": "Bar primary",
        "targetKeywords": [
          "ebike tyre pressure bar",
          "electric bike bar pressure",
          "ebike bar vs psi"
        ]
      }
    ],
    "climate": [
      {
        "slug": "hot-weather-ebike-tire-pressure",
        "name": "Hot Weather E-Bike Tire Pressure",
        "priority": "P1",
        "targetKeywords": [
          "hot weather tire pressure",
          "summer ebike psi",
          "tire pressure in heat"
        ],
        "contentFocus": ["Heat expansion", "Max PSI safety", "Morning inflation tips"]
      },
      {
        "slug": "cold-weather-ebike-tire-pressure",
        "name": "Cold Weather E-Bike Tire Pressure",
        "priority": "P1",
        "targetKeywords": [
          "winter ebike tire pressure",
          "cold weather tire psi",
          "tire pressure drop cold"
        ],
        "contentFocus": ["PSI drop formula", "Winter storage", "Snow riding tips"]
      },
      {
        "slug": "beach-ebike-tire-pressure",
        "name": "Beach E-Bike Tire Pressure",
        "priority": "P2",
        "targetKeywords": [
          "beach ebike tire pressure",
          "sand riding psi",
          "beach cruiser tire pressure"
        ],
        "contentFocus": ["Sand flotation", "Salt protection", "Fat tire recommendation"]
      },
      {
        "slug": "mountain-ebike-tire-pressure",
        "name": "Mountain E-Bike Tire Pressure",
        "priority": "P2",
        "targetKeywords": [
          "mountain ebike tire pressure",
          "trail riding psi",
          "altitude tire pressure"
        ],
        "contentFocus": ["Altitude effects", "Trail traction", "Descent safety"]
      }
    ],
    "usStates": [
      {
        "slug": "california-ebike-tire-pressure",
        "name": "California E-Bike Tire Pressure",
        "priority": "P2",
        "climate": "Mediterranean/Desert",
        "terrainTypes": ["Beach", "Urban", "Mountain", "Desert"],
        "regulations": "Class 1/2/3 allowed on bike paths with restrictions"
      },
      {
        "slug": "florida-ebike-tire-pressure",
        "name": "Florida E-Bike Tire Pressure",
        "priority": "P2",
        "climate": "Subtropical",
        "terrainTypes": ["Beach", "Urban", "Flat"],
        "regulations": "E-bikes treated as bicycles"
      },
      {
        "slug": "colorado-ebike-tire-pressure",
        "name": "Colorado E-Bike Tire Pressure",
        "priority": "P3",
        "climate": "Mountain/Semi-arid",
        "terrainTypes": ["Mountain", "Trail", "Urban"],
        "regulations": "Local jurisdiction varies"
      },
      {
        "slug": "texas-ebike-tire-pressure",
        "name": "Texas E-Bike Tire Pressure",
        "priority": "P3",
        "climate": "Hot/Humid to Arid",
        "terrainTypes": ["Urban", "Ranch", "Hill Country"],
        "regulations": "E-bikes classified by motor power"
      },
      {
        "slug": "new-york-ebike-tire-pressure",
        "name": "New York E-Bike Tire Pressure",
        "priority": "P3",
        "climate": "Continental",
        "terrainTypes": ["Urban", "Trail"],
        "regulations": "NYC specific rules for delivery bikes"
      },
      {
        "slug": "arizona-ebike-tire-pressure",
        "name": "Arizona E-Bike Tire Pressure",
        "priority": "P3",
        "climate": "Desert",
        "terrainTypes": ["Desert", "Urban"],
        "regulations": "Standard 3-class system"
      }
    ]
  }
}
```

## Weight Category Pages

```json
{
  "weightPages": [
    {
      "slug": "lightweight-rider-tire-pressure",
      "name": "Lightweight Rider",
      "weightRange": [100, 150],
      "priority": "P2",
      "targetKeywords": [
        "lightweight rider tire pressure",
        "small rider ebike psi",
        "low weight tire pressure"
      ],
      "contentFocus": [
        "Comfort vs efficiency",
        "Avoiding over-inflation",
        "Pinch flat at low PSI"
      ]
    },
    {
      "slug": "heavy-rider-ebike-tire-pressure",
      "name": "Heavy Rider",
      "weightRange": [220, 300],
      "priority": "P0",
      "searchVolume": "High",
      "targetKeywords": [
        "heavy rider ebike tire pressure",
        "ebike psi 250 lbs",
        "overweight rider tire pressure"
      ],
      "contentFocus": [
        "Higher PSI needs",
        "Weight capacity",
        "Reinforced tire options",
        "Rim strength"
      ]
    },
    {
      "slug": "300-lb-rider-ebike-tire-pressure",
      "name": "300+ lb Rider",
      "weightRange": [280, 400],
      "priority": "P1",
      "targetKeywords": [
        "300 lb rider tire pressure",
        "350 lb ebike psi",
        "heavy person electric bike"
      ],
      "contentFocus": [
        "Max PSI often needed",
        "E-bike weight limits",
        "Suitable models list",
        "Spoke tension"
      ]
    }
  ]
}
```

## Comparison Pages

```json
{
  "comparisonPages": {
    "modelVsModel": [
      {
        "slug": "lectric-xp-3-vs-rad-power-radrunner-plus",
        "modelA": "lectric-xp-3",
        "modelB": "rad-power-radrunner-plus",
        "priority": "P1",
        "searchVolume": "Medium"
      },
      {
        "slug": "aventon-aventure-2-vs-rad-power-radrover-6-plus",
        "modelA": "aventon-aventure-2",
        "modelB": "rad-power-radrover-6-plus",
        "priority": "P1",
        "searchVolume": "Medium"
      },
      {
        "slug": "lectric-xpedition-2-vs-rad-power-radwagon-5",
        "modelA": "lectric-xpedition-2",
        "modelB": "rad-power-radwagon-5",
        "priority": "P2",
        "searchVolume": "Low-Medium"
      },
      {
        "slug": "super73-s2-vs-ariel-rider-grizzly",
        "modelA": "super73-s2",
        "modelB": "ariel-rider-grizzly",
        "priority": "P2",
        "searchVolume": "Low"
      }
    ],
    "categoryComparisons": [
      {
        "slug": "fat-tire-vs-standard-tire-ebike",
        "title": "Fat Tire vs Standard Tire E-Bikes",
        "priority": "P1"
      },
      {
        "slug": "tubed-vs-tubeless-ebike-tires",
        "title": "Tubed vs Tubeless E-Bike Tires",
        "priority": "P1"
      },
      {
        "slug": "20-inch-vs-26-inch-fat-tire",
        "title": "20 vs 26 Inch Fat Tire E-Bikes",
        "priority": "P2"
      }
    ]
  }
}
```

## Learn/Glossary Pages

```json
{
  "learnPages": [
    {
      "slug": "psi-vs-bar",
      "title": "PSI vs Bar: Tire Pressure Units Explained",
      "priority": "P1",
      "targetKeywords": ["psi vs bar", "psi to bar", "bar to psi conversion"]
    },
    {
      "slug": "pinch-flat",
      "title": "What is a Pinch Flat? Prevention Guide",
      "priority": "P1",
      "targetKeywords": ["pinch flat", "snake bite flat", "pinch flat prevention"]
    },
    {
      "slug": "tire-sidewall-numbers",
      "title": "E-Bike Tire Sidewall Numbers Explained",
      "priority": "P2",
      "targetKeywords": ["tire sidewall numbers", "tire size meaning", "reading tire size"]
    },
    {
      "slug": "tubeless-setup",
      "title": "E-Bike Tubeless Tire Setup Guide",
      "priority": "P2",
      "targetKeywords": ["tubeless ebike setup", "convert to tubeless", "tubeless sealant"]
    },
    {
      "slug": "tire-pressure-gauge-types",
      "title": "Best Tire Pressure Gauges for E-Bikes",
      "priority": "P2",
      "targetKeywords": ["tire pressure gauge", "digital vs analog gauge", "best bike pump"]
    },
    {
      "slug": "cold-weather-psi-drop",
      "title": "Why Tire Pressure Drops in Cold Weather",
      "priority": "P2",
      "targetKeywords": ["tire pressure cold weather", "psi drop winter", "cold tire pressure"]
    },
    {
      "slug": "overinflation-dangers",
      "title": "Dangers of Over-Inflating E-Bike Tires",
      "priority": "P3",
      "targetKeywords": ["over inflated tire", "tire blowout", "max psi danger"]
    },
    {
      "slug": "underinflation-risks",
      "title": "Risks of Under-Inflated E-Bike Tires",
      "priority": "P3",
      "targetKeywords": ["under inflated tire", "low tire pressure danger", "flat tire risk"]
    }
  ]
}
```

## Implementation Priority Summary

| Priority | Page Type | Count | Implementation Order |
|----------|-----------|-------|---------------------|
| P0 | Tire Size (High Volume) | 4 | 1st |
| P0 | Categories (Core) | 3 | 1st |
| P0 | UK/EU GEO | 1 | 1st |
| P0 | Heavy Rider | 1 | 1st |
| P1 | Tire Size (Medium) | 4 | 2nd |
| P1 | Categories (Secondary) | 2 | 2nd |
| P1 | Climate GEO | 2 | 2nd |
| P1 | Weight Pages | 1 | 2nd |
| P1 | Model Comparisons | 4 | 2nd |
| P1 | Learn Pages | 2 | 2nd |
| P2 | Remaining Tire Sizes | 5 | 3rd |
| P2 | Climate GEO | 2 | 3rd |
| P2 | US State GEO | 3 | 3rd |
| P2 | Learn Pages | 4 | 3rd |
| P3 | Low Priority | 10+ | 4th |

**Total P0 Pages:** 9 pages (implement first)
**Total P1 Pages:** 15 pages (implement second)
**Total P2+ Pages:** 25+ pages (implement as resources allow)
