// hospitals-data.js - Comprehensive West Bengal Healthcare Facilities Directory
// Includes State Medical Colleges, District Hospitals, and Rural Hospitals across West Bengal

export const HOSPITALS_DATA = [
  {
    "id": "hosp_001",
    "name": "Calcutta Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Kolkata",
    "lat": 22.5735,
    "lng": 88.3639,
    "totalBeds": 280,
    "occupiedBeds": 265,
    "medicines": {
      "paracetamol": 45,
      "amoxicillin": 12,
      "metformin": 150,
      "ors": 220,
      "chloroquine": 75
    },
    "vaccines": {
      "covid": 130,
      "polio": 85,
      "hepatitisB": 45
    },
    "childrenNeedingVaccines": 18,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 106,
        "occupied": 100,
        "free": 6
      },
      "female": {
        "total": 106,
        "occupied": 100,
        "free": 6
      },
      "maternity": {
        "total": 68,
        "occupied": 65,
        "free": 3
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.384Z"
  },
  {
    "id": "hosp_002",
    "name": "North Bengal Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Darjeeling",
    "lat": 26.6853,
    "lng": 88.3789,
    "totalBeds": 270,
    "occupiedBeds": 238,
    "medicines": {
      "paracetamol": 190,
      "amoxicillin": 120,
      "metformin": 95,
      "ors": 310,
      "chloroquine": 55
    },
    "vaccines": {
      "covid": 140,
      "polio": 95,
      "hepatitisB": 60
    },
    "childrenNeedingVaccines": 22,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 103,
        "occupied": 91,
        "free": 12
      },
      "female": {
        "total": 103,
        "occupied": 91,
        "free": 12
      },
      "maternity": {
        "total": 64,
        "occupied": 56,
        "free": 8
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_003",
    "name": "Howrah District Hospital",
    "type": "District Hospital",
    "category": "district",
    "district": "Howrah",
    "lat": 22.5892,
    "lng": 88.3247,
    "totalBeds": 220,
    "occupiedBeds": 192,
    "medicines": {
      "paracetamol": 120,
      "amoxicillin": 70,
      "metformin": 16,
      "ors": 160,
      "chloroquine": 40
    },
    "vaccines": {
      "covid": 90,
      "polio": 50,
      "hepatitisB": 25
    },
    "childrenNeedingVaccines": 31,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 84,
        "occupied": 73,
        "free": 11
      },
      "female": {
        "total": 84,
        "occupied": 73,
        "free": 11
      },
      "maternity": {
        "total": 52,
        "occupied": 46,
        "free": 6
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_004",
    "name": "Jhargram Government Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Jhargram",
    "lat": 22.4518,
    "lng": 86.9856,
    "totalBeds": 210,
    "occupiedBeds": 185,
    "medicines": {
      "paracetamol": 110,
      "amoxicillin": 14,
      "metformin": 75,
      "ors": 190,
      "chloroquine": 35
    },
    "vaccines": {
      "covid": 75,
      "polio": 55,
      "hepatitisB": 30
    },
    "childrenNeedingVaccines": 28,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 80,
        "occupied": 70,
        "free": 10
      },
      "female": {
        "total": 80,
        "occupied": 70,
        "free": 10
      },
      "maternity": {
        "total": 50,
        "occupied": 45,
        "free": 5
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_005",
    "name": "Barasat Government Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "North 24 Parganas",
    "lat": 22.721,
    "lng": 88.482,
    "totalBeds": 240,
    "occupiedBeds": 206,
    "medicines": {
      "paracetamol": 175,
      "amoxicillin": 85,
      "metformin": 110,
      "ors": 260,
      "chloroquine": 65
    },
    "vaccines": {
      "covid": 115,
      "polio": 75,
      "hepatitisB": 50
    },
    "childrenNeedingVaccines": 15,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 91,
        "occupied": 78,
        "free": 13
      },
      "female": {
        "total": 91,
        "occupied": 78,
        "free": 13
      },
      "maternity": {
        "total": 58,
        "occupied": 50,
        "free": 8
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_006",
    "name": "Hingalganj Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "North 24 Parganas",
    "block": "Hingalganj",
    "lat": 22.4682,
    "lng": 88.9814,
    "totalBeds": 50,
    "occupiedBeds": 32,
    "medicines": {
      "paracetamol": 15,
      "amoxicillin": 18,
      "metformin": 30,
      "ors": 45,
      "chloroquine": 9
    },
    "vaccines": {
      "covid": 25,
      "polio": 20,
      "hepatitisB": 12
    },
    "childrenNeedingVaccines": 37,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 19,
        "occupied": 12,
        "free": 7
      },
      "female": {
        "total": 19,
        "occupied": 12,
        "free": 7
      },
      "maternity": {
        "total": 12,
        "occupied": 8,
        "free": 4
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_007",
    "name": "Diamond Harbour Government Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "South 24 Parganas",
    "lat": 22.1916,
    "lng": 88.1882,
    "totalBeds": 210,
    "occupiedBeds": 165,
    "medicines": {
      "paracetamol": 150,
      "amoxicillin": 130,
      "metformin": 85,
      "ors": 280,
      "chloroquine": 70
    },
    "vaccines": {
      "covid": 100,
      "polio": 70,
      "hepatitisB": 40
    },
    "childrenNeedingVaccines": 20,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 80,
        "occupied": 63,
        "free": 17
      },
      "female": {
        "total": 80,
        "occupied": 63,
        "free": 17
      },
      "maternity": {
        "total": 50,
        "occupied": 39,
        "free": 11
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_008",
    "name": "Gosaba Rural Hospital (Sundarbans)",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "South 24 Parganas",
    "block": "Gosaba",
    "lat": 22.1645,
    "lng": 88.808,
    "totalBeds": 60,
    "occupiedBeds": 54,
    "medicines": {
      "paracetamol": 10,
      "amoxicillin": 7,
      "metformin": 12,
      "ors": 25,
      "chloroquine": 5
    },
    "vaccines": {
      "covid": 18,
      "polio": 15,
      "hepatitisB": 10
    },
    "childrenNeedingVaccines": 48,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 23,
        "occupied": 21,
        "free": 2
      },
      "female": {
        "total": 23,
        "occupied": 21,
        "free": 2
      },
      "maternity": {
        "total": 14,
        "occupied": 12,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_009",
    "name": "Murshidabad Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Murshidabad",
    "lat": 24.0988,
    "lng": 88.2678,
    "totalBeds": 275,
    "occupiedBeds": 246,
    "medicines": {
      "paracetamol": 160,
      "amoxicillin": 95,
      "metformin": 18,
      "ors": 185,
      "chloroquine": 12
    },
    "vaccines": {
      "covid": 120,
      "polio": 85,
      "hepatitisB": 55
    },
    "childrenNeedingVaccines": 35,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 105,
        "occupied": 94,
        "free": 11
      },
      "female": {
        "total": 105,
        "occupied": 94,
        "free": 11
      },
      "maternity": {
        "total": 65,
        "occupied": 58,
        "free": 7
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_010",
    "name": "Kalimpong District Hospital",
    "type": "District Hospital",
    "category": "district",
    "district": "Kalimpong",
    "lat": 27.0667,
    "lng": 88.4688,
    "totalBeds": 160,
    "occupiedBeds": 135,
    "medicines": {
      "paracetamol": 85,
      "amoxicillin": 55,
      "metformin": 45,
      "ors": 110,
      "chloroquine": 9
    },
    "vaccines": {
      "covid": 65,
      "polio": 45,
      "hepatitisB": 28
    },
    "childrenNeedingVaccines": 22,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 61,
        "occupied": 51,
        "free": 10
      },
      "female": {
        "total": 61,
        "occupied": 51,
        "free": 10
      },
      "maternity": {
        "total": 38,
        "occupied": 33,
        "free": 5
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_011",
    "name": "Krishnanagar Nadia District Hospital",
    "type": "District Hospital",
    "category": "district",
    "district": "Nadia",
    "lat": 23.4042,
    "lng": 88.4984,
    "totalBeds": 200,
    "occupiedBeds": 155,
    "medicines": {
      "paracetamol": 145,
      "amoxicillin": 105,
      "metformin": 75,
      "ors": 225,
      "chloroquine": 60
    },
    "vaccines": {
      "covid": 80,
      "polio": 65,
      "hepatitisB": 45
    },
    "childrenNeedingVaccines": 19,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 76,
        "occupied": 59,
        "free": 17
      },
      "female": {
        "total": 76,
        "occupied": 59,
        "free": 17
      },
      "maternity": {
        "total": 48,
        "occupied": 37,
        "free": 11
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_012",
    "name": "Asansol District Hospital",
    "type": "District Hospital",
    "category": "district",
    "district": "Paschim Bardhaman",
    "lat": 23.6889,
    "lng": 86.9661,
    "totalBeds": 250,
    "occupiedBeds": 220,
    "medicines": {
      "paracetamol": 18,
      "amoxicillin": 72,
      "metformin": 90,
      "ors": 210,
      "chloroquine": 55
    },
    "vaccines": {
      "covid": 105,
      "polio": 80,
      "hepatitisB": 50
    },
    "childrenNeedingVaccines": 26,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 95,
        "occupied": 84,
        "free": 11
      },
      "female": {
        "total": 95,
        "occupied": 84,
        "free": 11
      },
      "maternity": {
        "total": 60,
        "occupied": 52,
        "free": 8
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_013",
    "name": "Burdwan Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Purba Bardhaman",
    "lat": 23.2425,
    "lng": 87.8631,
    "totalBeds": 290,
    "occupiedBeds": 260,
    "medicines": {
      "paracetamol": 180,
      "amoxicillin": 155,
      "metformin": 110,
      "ors": 350,
      "chloroquine": 90
    },
    "vaccines": {
      "covid": 160,
      "polio": 105,
      "hepatitisB": 80
    },
    "childrenNeedingVaccines": 14,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 110,
        "occupied": 99,
        "free": 11
      },
      "female": {
        "total": 110,
        "occupied": 99,
        "free": 11
      },
      "maternity": {
        "total": 70,
        "occupied": 62,
        "free": 8
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_014",
    "name": "Suri Sadar District Hospital",
    "type": "District Hospital",
    "category": "district",
    "district": "Birbhum",
    "lat": 23.9108,
    "lng": 87.5276,
    "totalBeds": 180,
    "occupiedBeds": 138,
    "medicines": {
      "paracetamol": 135,
      "amoxicillin": 78,
      "metformin": 62,
      "ors": 195,
      "chloroquine": 48
    },
    "vaccines": {
      "covid": 70,
      "polio": 55,
      "hepatitisB": 32
    },
    "childrenNeedingVaccines": 27,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 68,
        "occupied": 52,
        "free": 16
      },
      "female": {
        "total": 68,
        "occupied": 52,
        "free": 16
      },
      "maternity": {
        "total": 44,
        "occupied": 34,
        "free": 10
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_015",
    "name": "Balurghat District Hospital",
    "type": "District Hospital",
    "category": "district",
    "district": "Dakshin Dinajpur",
    "lat": 25.2216,
    "lng": 88.7667,
    "totalBeds": 190,
    "occupiedBeds": 165,
    "medicines": {
      "paracetamol": 105,
      "amoxicillin": 60,
      "metformin": 55,
      "ors": 160,
      "chloroquine": 8
    },
    "vaccines": {
      "covid": 75,
      "polio": 60,
      "hepatitisB": 38
    },
    "childrenNeedingVaccines": 25,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 72,
        "occupied": 63,
        "free": 9
      },
      "female": {
        "total": 72,
        "occupied": 63,
        "free": 9
      },
      "maternity": {
        "total": 46,
        "occupied": 39,
        "free": 7
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_016",
    "name": "Bankura Sammilani Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Bankura",
    "lat": 23.2323,
    "lng": 87.0715,
    "totalBeds": 250,
    "occupiedBeds": 222,
    "medicines": {
      "paracetamol": 165,
      "amoxicillin": 125,
      "metformin": 88,
      "ors": 270,
      "chloroquine": 68
    },
    "vaccines": {
      "covid": 110,
      "polio": 82,
      "hepatitisB": 50
    },
    "childrenNeedingVaccines": 21,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 95,
        "occupied": 84,
        "free": 11
      },
      "female": {
        "total": 95,
        "occupied": 84,
        "free": 11
      },
      "maternity": {
        "total": 60,
        "occupied": 54,
        "free": 6
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_017",
    "name": "Purulia Deben Mahata Government Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Purulia",
    "lat": 23.3322,
    "lng": 86.3652,
    "totalBeds": 190,
    "occupiedBeds": 162,
    "medicines": {
      "paracetamol": 140,
      "amoxicillin": 75,
      "metformin": 15,
      "ors": 175,
      "chloroquine": 42
    },
    "vaccines": {
      "covid": 72,
      "polio": 58,
      "hepatitisB": 36
    },
    "childrenNeedingVaccines": 33,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 72,
        "occupied": 61,
        "free": 11
      },
      "female": {
        "total": 72,
        "occupied": 61,
        "free": 11
      },
      "maternity": {
        "total": 46,
        "occupied": 40,
        "free": 6
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_018",
    "name": "Tamluk District Hospital",
    "type": "District Hospital",
    "category": "district",
    "district": "Midnapore East",
    "lat": 22.2982,
    "lng": 87.9254,
    "totalBeds": 170,
    "occupiedBeds": 128,
    "medicines": {
      "paracetamol": 125,
      "amoxicillin": 92,
      "metformin": 68,
      "ors": 180,
      "chloroquine": 52
    },
    "vaccines": {
      "covid": 65,
      "polio": 48,
      "hepatitisB": 28
    },
    "childrenNeedingVaccines": 23,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 65,
        "occupied": 49,
        "free": 16
      },
      "female": {
        "total": 65,
        "occupied": 49,
        "free": 16
      },
      "maternity": {
        "total": 40,
        "occupied": 30,
        "free": 10
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_019",
    "name": "Midnapore Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Midnapore West",
    "lat": 22.4257,
    "lng": 87.32,
    "totalBeds": 260,
    "occupiedBeds": 218,
    "medicines": {
      "paracetamol": 205,
      "amoxicillin": 145,
      "metformin": 95,
      "ors": 295,
      "chloroquine": 82
    },
    "vaccines": {
      "covid": 125,
      "polio": 88,
      "hepatitisB": 62
    },
    "childrenNeedingVaccines": 18,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 99,
        "occupied": 83,
        "free": 16
      },
      "female": {
        "total": 99,
        "occupied": 83,
        "free": 16
      },
      "maternity": {
        "total": 62,
        "occupied": 52,
        "free": 10
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_020",
    "name": "Chinsurah Imambara Sadar Hospital",
    "type": "District Hospital",
    "category": "district",
    "district": "Hooghly",
    "lat": 22.9004,
    "lng": 88.3965,
    "totalBeds": 210,
    "occupiedBeds": 176,
    "medicines": {
      "paracetamol": 160,
      "amoxicillin": 110,
      "metformin": 82,
      "ors": 215,
      "chloroquine": 58
    },
    "vaccines": {
      "covid": 88,
      "polio": 68,
      "hepatitisB": 42
    },
    "childrenNeedingVaccines": 16,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 80,
        "occupied": 67,
        "free": 13
      },
      "female": {
        "total": 80,
        "occupied": 67,
        "free": 13
      },
      "maternity": {
        "total": 50,
        "occupied": 42,
        "free": 8
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_021",
    "name": "Malda Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Malda",
    "lat": 25.0065,
    "lng": 88.1408,
    "totalBeds": 270,
    "occupiedBeds": 236,
    "medicines": {
      "paracetamol": 185,
      "amoxicillin": 120,
      "metformin": 78,
      "ors": 280,
      "chloroquine": 70
    },
    "vaccines": {
      "covid": 115,
      "polio": 90,
      "hepatitisB": 58
    },
    "childrenNeedingVaccines": 24,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 103,
        "occupied": 90,
        "free": 13
      },
      "female": {
        "total": 103,
        "occupied": 90,
        "free": 13
      },
      "maternity": {
        "total": 64,
        "occupied": 56,
        "free": 8
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_022",
    "name": "Raiganj Government Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Uttar Dinajpur",
    "lat": 25.6178,
    "lng": 88.1256,
    "totalBeds": 180,
    "occupiedBeds": 144,
    "medicines": {
      "paracetamol": 115,
      "amoxicillin": 68,
      "metformin": 52,
      "ors": 170,
      "chloroquine": 45
    },
    "vaccines": {
      "covid": 70,
      "polio": 52,
      "hepatitisB": 34
    },
    "childrenNeedingVaccines": 31,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 68,
        "occupied": 54,
        "free": 14
      },
      "female": {
        "total": 68,
        "occupied": 54,
        "free": 14
      },
      "maternity": {
        "total": 44,
        "occupied": 36,
        "free": 8
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_023",
    "name": "Jalpaiguri District Hospital",
    "type": "District Hospital",
    "category": "district",
    "district": "Jalpaiguri",
    "lat": 26.5414,
    "lng": 88.7196,
    "totalBeds": 200,
    "occupiedBeds": 172,
    "medicines": {
      "paracetamol": 148,
      "amoxicillin": 92,
      "metformin": 72,
      "ors": 205,
      "chloroquine": 14
    },
    "vaccines": {
      "covid": 84,
      "polio": 62,
      "hepatitisB": 42
    },
    "childrenNeedingVaccines": 28,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 76,
        "occupied": 65,
        "free": 11
      },
      "female": {
        "total": 76,
        "occupied": 65,
        "free": 11
      },
      "maternity": {
        "total": 48,
        "occupied": 42,
        "free": 6
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_024",
    "name": "Maharaja Jitendra Narayan Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Cooch Behar",
    "lat": 26.3242,
    "lng": 89.4449,
    "totalBeds": 250,
    "occupiedBeds": 216,
    "medicines": {
      "paracetamol": 170,
      "amoxicillin": 115,
      "metformin": 80,
      "ors": 240,
      "chloroquine": 62
    },
    "vaccines": {
      "covid": 95,
      "polio": 70,
      "hepatitisB": 45
    },
    "childrenNeedingVaccines": 26,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 95,
        "occupied": 82,
        "free": 13
      },
      "female": {
        "total": 95,
        "occupied": 82,
        "free": 13
      },
      "maternity": {
        "total": 60,
        "occupied": 52,
        "free": 8
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_025",
    "name": "Alipurduar District Hospital",
    "type": "District Hospital",
    "category": "district",
    "district": "Alipurduar",
    "lat": 26.4918,
    "lng": 89.5271,
    "totalBeds": 185,
    "occupiedBeds": 142,
    "medicines": {
      "paracetamol": 130,
      "amoxicillin": 88,
      "metformin": 64,
      "ors": 185,
      "chloroquine": 50
    },
    "vaccines": {
      "covid": 72,
      "polio": 54,
      "hepatitisB": 35
    },
    "childrenNeedingVaccines": 30,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 70,
        "occupied": 54,
        "free": 16
      },
      "female": {
        "total": 70,
        "occupied": 54,
        "free": 16
      },
      "maternity": {
        "total": 45,
        "occupied": 34,
        "free": 11
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_smc_001",
    "name": "IPGMER and SSKM Hospital (Apex Referral)",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Kolkata",
    "lat": 22.5398,
    "lng": 88.3426,
    "totalBeds": 450,
    "occupiedBeds": 418,
    "medicines": {
      "paracetamol": 420,
      "amoxicillin": 310,
      "metformin": 280,
      "ors": 600,
      "chloroquine": 120
    },
    "vaccines": {
      "covid": 350,
      "polio": 220,
      "hepatitisB": 180
    },
    "childrenNeedingVaccines": 12,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 171,
        "occupied": 159,
        "free": 12
      },
      "female": {
        "total": 171,
        "occupied": 159,
        "free": 12
      },
      "maternity": {
        "total": 108,
        "occupied": 100,
        "free": 8
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_smc_002",
    "name": "Nil Ratan Sircar (NRS) Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Kolkata",
    "lat": 22.5642,
    "lng": 88.3698,
    "totalBeds": 380,
    "occupiedBeds": 345,
    "medicines": {
      "paracetamol": 340,
      "amoxicillin": 240,
      "metformin": 210,
      "ors": 480,
      "chloroquine": 95
    },
    "vaccines": {
      "covid": 280,
      "polio": 190,
      "hepatitisB": 140
    },
    "childrenNeedingVaccines": 16,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 144,
        "occupied": 131,
        "free": 13
      },
      "female": {
        "total": 144,
        "occupied": 131,
        "free": 13
      },
      "maternity": {
        "total": 92,
        "occupied": 83,
        "free": 9
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_smc_003",
    "name": "R.G. Kar Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Kolkata",
    "lat": 22.6042,
    "lng": 88.3718,
    "totalBeds": 350,
    "occupiedBeds": 312,
    "medicines": {
      "paracetamol": 290,
      "amoxicillin": 210,
      "metformin": 180,
      "ors": 420,
      "chloroquine": 85
    },
    "vaccines": {
      "covid": 240,
      "polio": 170,
      "hepatitisB": 125
    },
    "childrenNeedingVaccines": 19,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 133,
        "occupied": 119,
        "free": 14
      },
      "female": {
        "total": 133,
        "occupied": 119,
        "free": 14
      },
      "maternity": {
        "total": 84,
        "occupied": 74,
        "free": 10
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_smc_004",
    "name": "Calcutta National Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Kolkata",
    "lat": 22.5401,
    "lng": 88.3712,
    "totalBeds": 320,
    "occupiedBeds": 285,
    "medicines": {
      "paracetamol": 260,
      "amoxicillin": 185,
      "metformin": 160,
      "ors": 390,
      "chloroquine": 75
    },
    "vaccines": {
      "covid": 210,
      "polio": 150,
      "hepatitisB": 110
    },
    "childrenNeedingVaccines": 22,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 122,
        "occupied": 109,
        "free": 13
      },
      "female": {
        "total": 122,
        "occupied": 109,
        "free": 13
      },
      "maternity": {
        "total": 76,
        "occupied": 67,
        "free": 9
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_smc_005",
    "name": "College of Medicine & Sagore Dutta Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "North 24 Parganas",
    "lat": 22.6683,
    "lng": 88.3756,
    "totalBeds": 260,
    "occupiedBeds": 228,
    "medicines": {
      "paracetamol": 210,
      "amoxicillin": 140,
      "metformin": 115,
      "ors": 320,
      "chloroquine": 60
    },
    "vaccines": {
      "covid": 160,
      "polio": 110,
      "hepatitisB": 85
    },
    "childrenNeedingVaccines": 18,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 99,
        "occupied": 87,
        "free": 12
      },
      "female": {
        "total": 99,
        "occupied": 87,
        "free": 12
      },
      "maternity": {
        "total": 62,
        "occupied": 54,
        "free": 8
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_smc_006",
    "name": "College of Medicine & JNM Hospital (Kalyani)",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Nadia",
    "lat": 22.9868,
    "lng": 88.4344,
    "totalBeds": 280,
    "occupiedBeds": 242,
    "medicines": {
      "paracetamol": 230,
      "amoxicillin": 165,
      "metformin": 130,
      "ors": 350,
      "chloroquine": 70
    },
    "vaccines": {
      "covid": 180,
      "polio": 125,
      "hepatitisB": 95
    },
    "childrenNeedingVaccines": 15,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 106,
        "occupied": 92,
        "free": 14
      },
      "female": {
        "total": 106,
        "occupied": 92,
        "free": 14
      },
      "maternity": {
        "total": 68,
        "occupied": 58,
        "free": 10
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_smc_007",
    "name": "Rampurhat Government Medical College & Hospital",
    "type": "State Medical College",
    "category": "medical_college",
    "district": "Birbhum",
    "lat": 24.1682,
    "lng": 87.7781,
    "totalBeds": 240,
    "occupiedBeds": 205,
    "medicines": {
      "paracetamol": 195,
      "amoxicillin": 135,
      "metformin": 90,
      "ors": 290,
      "chloroquine": 55
    },
    "vaccines": {
      "covid": 140,
      "polio": 95,
      "hepatitisB": 70
    },
    "childrenNeedingVaccines": 25,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 91,
        "occupied": 78,
        "free": 13
      },
      "female": {
        "total": 91,
        "occupied": 78,
        "free": 13
      },
      "maternity": {
        "total": 58,
        "occupied": 49,
        "free": 9
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_001",
    "name": "Singur Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Hooghly",
    "block": "Singur",
    "lat": 22.813,
    "lng": 88.2284,
    "totalBeds": 60,
    "occupiedBeds": 48,
    "medicines": {
      "paracetamol": 95,
      "amoxicillin": 55,
      "metformin": 40,
      "ors": 180,
      "chloroquine": 25
    },
    "vaccines": {
      "covid": 60,
      "polio": 45,
      "hepatitisB": 35
    },
    "childrenNeedingVaccines": 14,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 23,
        "occupied": 18,
        "free": 5
      },
      "female": {
        "total": 23,
        "occupied": 18,
        "free": 5
      },
      "maternity": {
        "total": 14,
        "occupied": 12,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_002",
    "name": "Tarakeswar Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Hooghly",
    "block": "Tarakeswar",
    "lat": 22.8804,
    "lng": 88.0258,
    "totalBeds": 60,
    "occupiedBeds": 52,
    "medicines": {
      "paracetamol": 110,
      "amoxicillin": 65,
      "metformin": 45,
      "ors": 200,
      "chloroquine": 30
    },
    "vaccines": {
      "covid": 65,
      "polio": 50,
      "hepatitisB": 40
    },
    "childrenNeedingVaccines": 18,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 23,
        "occupied": 20,
        "free": 3
      },
      "female": {
        "total": 23,
        "occupied": 20,
        "free": 3
      },
      "maternity": {
        "total": 14,
        "occupied": 12,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_003",
    "name": "Jangipara Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Hooghly",
    "block": "Jangipara",
    "lat": 22.7412,
    "lng": 88.0538,
    "totalBeds": 60,
    "occupiedBeds": 44,
    "medicines": {
      "paracetamol": 85,
      "amoxicillin": 45,
      "metformin": 35,
      "ors": 160,
      "chloroquine": 20
    },
    "vaccines": {
      "covid": 50,
      "polio": 40,
      "hepatitisB": 30
    },
    "childrenNeedingVaccines": 16,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 23,
        "occupied": 17,
        "free": 6
      },
      "female": {
        "total": 23,
        "occupied": 17,
        "free": 6
      },
      "maternity": {
        "total": 14,
        "occupied": 10,
        "free": 4
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_004",
    "name": "Chanditala Rural Hospital (Akuni)",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Hooghly",
    "block": "Chanditala II",
    "lat": 22.7042,
    "lng": 88.2561,
    "totalBeds": 30,
    "occupiedBeds": 24,
    "medicines": {
      "paracetamol": 60,
      "amoxicillin": 35,
      "metformin": 25,
      "ors": 120,
      "chloroquine": 15
    },
    "vaccines": {
      "covid": 35,
      "polio": 25,
      "hepatitisB": 20
    },
    "childrenNeedingVaccines": 12,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "female": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "maternity": {
        "total": 8,
        "occupied": 6,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_005",
    "name": "Dhaniakhali Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Hooghly",
    "block": "Dhaniakhali",
    "lat": 22.9664,
    "lng": 88.0934,
    "totalBeds": 60,
    "occupiedBeds": 50,
    "medicines": {
      "paracetamol": 105,
      "amoxicillin": 60,
      "metformin": 50,
      "ors": 190,
      "chloroquine": 35
    },
    "vaccines": {
      "covid": 55,
      "polio": 45,
      "hepatitisB": 30
    },
    "childrenNeedingVaccines": 20,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 23,
        "occupied": 19,
        "free": 4
      },
      "female": {
        "total": 23,
        "occupied": 19,
        "free": 4
      },
      "maternity": {
        "total": 14,
        "occupied": 12,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_006",
    "name": "Kamarpukur Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Hooghly",
    "block": "Goghat II",
    "lat": 22.8988,
    "lng": 87.6534,
    "totalBeds": 40,
    "occupiedBeds": 33,
    "medicines": {
      "paracetamol": 70,
      "amoxicillin": 40,
      "metformin": 30,
      "ors": 140,
      "chloroquine": 18
    },
    "vaccines": {
      "covid": 40,
      "polio": 30,
      "hepatitisB": 25
    },
    "childrenNeedingVaccines": 15,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 15,
        "occupied": 12,
        "free": 3
      },
      "female": {
        "total": 15,
        "occupied": 12,
        "free": 3
      },
      "maternity": {
        "total": 10,
        "occupied": 9,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_007",
    "name": "Bagnan Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Howrah",
    "block": "Bagnan I",
    "lat": 22.4673,
    "lng": 87.9712,
    "totalBeds": 50,
    "occupiedBeds": 42,
    "medicines": {
      "paracetamol": 95,
      "amoxicillin": 60,
      "metformin": 35,
      "ors": 210,
      "chloroquine": 20
    },
    "vaccines": {
      "covid": 40,
      "polio": 35,
      "hepatitisB": 25
    },
    "childrenNeedingVaccines": 19,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 19,
        "occupied": 16,
        "free": 3
      },
      "female": {
        "total": 19,
        "occupied": 16,
        "free": 3
      },
      "maternity": {
        "total": 12,
        "occupied": 10,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_008",
    "name": "B.B. Dhar Rural Hospital (Amta)",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Howrah",
    "block": "Amta II",
    "lat": 22.5855,
    "lng": 87.925,
    "totalBeds": 50,
    "occupiedBeds": 39,
    "medicines": {
      "paracetamol": 80,
      "amoxicillin": 45,
      "metformin": 30,
      "ors": 170,
      "chloroquine": 22
    },
    "vaccines": {
      "covid": 45,
      "polio": 30,
      "hepatitisB": 22
    },
    "childrenNeedingVaccines": 17,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 19,
        "occupied": 15,
        "free": 4
      },
      "female": {
        "total": 19,
        "occupied": 15,
        "free": 4
      },
      "maternity": {
        "total": 12,
        "occupied": 9,
        "free": 3
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_009",
    "name": "Kamalpur Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Howrah",
    "block": "Shyampur I",
    "lat": 22.335,
    "lng": 88.0315,
    "totalBeds": 30,
    "occupiedBeds": 25,
    "medicines": {
      "paracetamol": 55,
      "amoxicillin": 30,
      "metformin": 20,
      "ors": 110,
      "chloroquine": 12
    },
    "vaccines": {
      "covid": 30,
      "polio": 22,
      "hepatitisB": 18
    },
    "childrenNeedingVaccines": 14,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "female": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "maternity": {
        "total": 8,
        "occupied": 7,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_010",
    "name": "Kulai Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Howrah",
    "block": "Panchla",
    "lat": 22.5447,
    "lng": 88.1481,
    "totalBeds": 30,
    "occupiedBeds": 26,
    "medicines": {
      "paracetamol": 65,
      "amoxicillin": 38,
      "metformin": 28,
      "ors": 130,
      "chloroquine": 15
    },
    "vaccines": {
      "covid": 35,
      "polio": 25,
      "hepatitisB": 20
    },
    "childrenNeedingVaccines": 13,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 10,
        "free": 1
      },
      "female": {
        "total": 11,
        "occupied": 10,
        "free": 1
      },
      "maternity": {
        "total": 8,
        "occupied": 6,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_011",
    "name": "Domjur Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Howrah",
    "block": "Domjur",
    "lat": 22.6416,
    "lng": 88.2235,
    "totalBeds": 40,
    "occupiedBeds": 35,
    "medicines": {
      "paracetamol": 75,
      "amoxicillin": 50,
      "metformin": 32,
      "ors": 150,
      "chloroquine": 18
    },
    "vaccines": {
      "covid": 42,
      "polio": 32,
      "hepatitisB": 24
    },
    "childrenNeedingVaccines": 16,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 15,
        "occupied": 13,
        "free": 2
      },
      "female": {
        "total": 15,
        "occupied": 13,
        "free": 2
      },
      "maternity": {
        "total": 10,
        "occupied": 9,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_012",
    "name": "Udaynarayanpur State General Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Howrah",
    "block": "Udaynarayanpur",
    "lat": 22.7214,
    "lng": 87.9754,
    "totalBeds": 50,
    "occupiedBeds": 45,
    "medicines": {
      "paracetamol": 90,
      "amoxicillin": 55,
      "metformin": 38,
      "ors": 190,
      "chloroquine": 24
    },
    "vaccines": {
      "covid": 48,
      "polio": 36,
      "hepatitisB": 26
    },
    "childrenNeedingVaccines": 21,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 19,
        "occupied": 17,
        "free": 2
      },
      "female": {
        "total": 19,
        "occupied": 17,
        "free": 2
      },
      "maternity": {
        "total": 12,
        "occupied": 11,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_013",
    "name": "Chandpara Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "North 24 Parganas",
    "block": "Gaighata",
    "lat": 22.9515,
    "lng": 88.8078,
    "totalBeds": 30,
    "occupiedBeds": 23,
    "medicines": {
      "paracetamol": 50,
      "amoxicillin": 28,
      "metformin": 22,
      "ors": 115,
      "chloroquine": 14
    },
    "vaccines": {
      "covid": 30,
      "polio": 20,
      "hepatitisB": 15
    },
    "childrenNeedingVaccines": 15,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 8,
        "free": 3
      },
      "female": {
        "total": 11,
        "occupied": 8,
        "free": 3
      },
      "maternity": {
        "total": 8,
        "occupied": 7,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_014",
    "name": "Amdanga Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "North 24 Parganas",
    "block": "Amdanga",
    "lat": 22.8028,
    "lng": 88.5134,
    "totalBeds": 30,
    "occupiedBeds": 25,
    "medicines": {
      "paracetamol": 55,
      "amoxicillin": 32,
      "metformin": 25,
      "ors": 125,
      "chloroquine": 16
    },
    "vaccines": {
      "covid": 32,
      "polio": 24,
      "hepatitisB": 18
    },
    "childrenNeedingVaccines": 18,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "female": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "maternity": {
        "total": 8,
        "occupied": 7,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_015",
    "name": "Haroa Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "North 24 Parganas",
    "block": "Haroa",
    "lat": 22.6022,
    "lng": 88.6792,
    "totalBeds": 30,
    "occupiedBeds": 26,
    "medicines": {
      "paracetamol": 48,
      "amoxicillin": 26,
      "metformin": 20,
      "ors": 110,
      "chloroquine": 12
    },
    "vaccines": {
      "covid": 28,
      "polio": 22,
      "hepatitisB": 16
    },
    "childrenNeedingVaccines": 22,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 10,
        "free": 1
      },
      "female": {
        "total": 11,
        "occupied": 10,
        "free": 1
      },
      "maternity": {
        "total": 8,
        "occupied": 6,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_016",
    "name": "Sarapole Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "North 24 Parganas",
    "block": "Swarupnagar",
    "lat": 22.8361,
    "lng": 88.8683,
    "totalBeds": 30,
    "occupiedBeds": 27,
    "medicines": {
      "paracetamol": 52,
      "amoxicillin": 30,
      "metformin": 24,
      "ors": 120,
      "chloroquine": 15
    },
    "vaccines": {
      "covid": 30,
      "polio": 25,
      "hepatitisB": 18
    },
    "childrenNeedingVaccines": 19,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 10,
        "free": 1
      },
      "female": {
        "total": 11,
        "occupied": 10,
        "free": 1
      },
      "maternity": {
        "total": 8,
        "occupied": 7,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_017",
    "name": "Sandeshkhali Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "North 24 Parganas",
    "block": "Sandeshkhali II",
    "lat": 22.3653,
    "lng": 88.8872,
    "totalBeds": 40,
    "occupiedBeds": 36,
    "medicines": {
      "paracetamol": 65,
      "amoxicillin": 38,
      "metformin": 28,
      "ors": 140,
      "chloroquine": 22
    },
    "vaccines": {
      "covid": 38,
      "polio": 28,
      "hepatitisB": 20
    },
    "childrenNeedingVaccines": 26,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 15,
        "occupied": 14,
        "free": 1
      },
      "female": {
        "total": 15,
        "occupied": 14,
        "free": 1
      },
      "maternity": {
        "total": 10,
        "occupied": 8,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_018",
    "name": "Padmerhat Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "South 24 Parganas",
    "block": "Jaynagar I",
    "lat": 22.2475,
    "lng": 88.4464,
    "totalBeds": 30,
    "occupiedBeds": 24,
    "medicines": {
      "paracetamol": 58,
      "amoxicillin": 32,
      "metformin": 24,
      "ors": 130,
      "chloroquine": 14
    },
    "vaccines": {
      "covid": 32,
      "polio": 24,
      "hepatitisB": 18
    },
    "childrenNeedingVaccines": 16,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "female": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "maternity": {
        "total": 8,
        "occupied": 6,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_019",
    "name": "Amtala Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "South 24 Parganas",
    "block": "Bishnupur II",
    "lat": 22.3833,
    "lng": 88.2583,
    "totalBeds": 50,
    "occupiedBeds": 44,
    "medicines": {
      "paracetamol": 90,
      "amoxicillin": 55,
      "metformin": 36,
      "ors": 190,
      "chloroquine": 24
    },
    "vaccines": {
      "covid": 48,
      "polio": 36,
      "hepatitisB": 28
    },
    "childrenNeedingVaccines": 20,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 19,
        "occupied": 17,
        "free": 2
      },
      "female": {
        "total": 19,
        "occupied": 17,
        "free": 2
      },
      "maternity": {
        "total": 12,
        "occupied": 10,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_020",
    "name": "Mathurapur Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "South 24 Parganas",
    "block": "Mathurapur I",
    "lat": 22.122,
    "lng": 88.388,
    "totalBeds": 60,
    "occupiedBeds": 52,
    "medicines": {
      "paracetamol": 105,
      "amoxicillin": 62,
      "metformin": 42,
      "ors": 210,
      "chloroquine": 32
    },
    "vaccines": {
      "covid": 55,
      "polio": 42,
      "hepatitisB": 32
    },
    "childrenNeedingVaccines": 25,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 23,
        "occupied": 20,
        "free": 3
      },
      "female": {
        "total": 23,
        "occupied": 20,
        "free": 3
      },
      "maternity": {
        "total": 14,
        "occupied": 12,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_021",
    "name": "Nalmuri Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "South 24 Parganas",
    "block": "Bhangar I",
    "lat": 22.4935,
    "lng": 88.5831,
    "totalBeds": 30,
    "occupiedBeds": 25,
    "medicines": {
      "paracetamol": 60,
      "amoxicillin": 35,
      "metformin": 26,
      "ors": 135,
      "chloroquine": 16
    },
    "vaccines": {
      "covid": 34,
      "polio": 26,
      "hepatitisB": 20
    },
    "childrenNeedingVaccines": 18,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "female": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "maternity": {
        "total": 8,
        "occupied": 7,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_022",
    "name": "Sagar Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "South 24 Parganas",
    "block": "Sagar",
    "lat": 21.6517,
    "lng": 88.0772,
    "totalBeds": 40,
    "occupiedBeds": 34,
    "medicines": {
      "paracetamol": 70,
      "amoxicillin": 42,
      "metformin": 30,
      "ors": 160,
      "chloroquine": 25
    },
    "vaccines": {
      "covid": 42,
      "polio": 32,
      "hepatitisB": 24
    },
    "childrenNeedingVaccines": 22,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 15,
        "occupied": 13,
        "free": 2
      },
      "female": {
        "total": 15,
        "occupied": 13,
        "free": 2
      },
      "maternity": {
        "total": 10,
        "occupied": 8,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_023",
    "name": "Bethuadahari Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Nadia",
    "block": "Nakashipara",
    "lat": 23.6155,
    "lng": 88.3831,
    "totalBeds": 60,
    "occupiedBeds": 51,
    "medicines": {
      "paracetamol": 110,
      "amoxicillin": 75,
      "metformin": 45,
      "ors": 290,
      "chloroquine": 40
    },
    "vaccines": {
      "covid": 60,
      "polio": 50,
      "hepatitisB": 30
    },
    "childrenNeedingVaccines": 22,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 23,
        "occupied": 20,
        "free": 3
      },
      "female": {
        "total": 23,
        "occupied": 20,
        "free": 3
      },
      "maternity": {
        "total": 14,
        "occupied": 11,
        "free": 3
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_024",
    "name": "Bagula Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Nadia",
    "block": "Hanskhali",
    "lat": 23.3326,
    "lng": 88.6475,
    "totalBeds": 30,
    "occupiedBeds": 23,
    "medicines": {
      "paracetamol": 55,
      "amoxicillin": 30,
      "metformin": 24,
      "ors": 120,
      "chloroquine": 14
    },
    "vaccines": {
      "covid": 30,
      "polio": 22,
      "hepatitisB": 16
    },
    "childrenNeedingVaccines": 15,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 8,
        "free": 3
      },
      "female": {
        "total": 11,
        "occupied": 8,
        "free": 3
      },
      "maternity": {
        "total": 8,
        "occupied": 7,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_025",
    "name": "Dhubulia Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Nadia",
    "block": "Krishnanagar II",
    "lat": 23.4931,
    "lng": 88.4552,
    "totalBeds": 30,
    "occupiedBeds": 24,
    "medicines": {
      "paracetamol": 58,
      "amoxicillin": 34,
      "metformin": 26,
      "ors": 125,
      "chloroquine": 16
    },
    "vaccines": {
      "covid": 32,
      "polio": 24,
      "hepatitisB": 18
    },
    "childrenNeedingVaccines": 17,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "female": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "maternity": {
        "total": 8,
        "occupied": 6,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_026",
    "name": "Maheshganj Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Nadia",
    "block": "Nabadwip",
    "lat": 23.421,
    "lng": 88.3685,
    "totalBeds": 30,
    "occupiedBeds": 26,
    "medicines": {
      "paracetamol": 62,
      "amoxicillin": 36,
      "metformin": 28,
      "ors": 135,
      "chloroquine": 18
    },
    "vaccines": {
      "covid": 35,
      "polio": 26,
      "hepatitisB": 20
    },
    "childrenNeedingVaccines": 19,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 10,
        "free": 1
      },
      "female": {
        "total": 11,
        "occupied": 10,
        "free": 1
      },
      "maternity": {
        "total": 8,
        "occupied": 6,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_027",
    "name": "Amtala Rural Hospital (Naoda)",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Murshidabad",
    "block": "Naoda",
    "lat": 23.9322,
    "lng": 88.4475,
    "totalBeds": 50,
    "occupiedBeds": 43,
    "medicines": {
      "paracetamol": 85,
      "amoxicillin": 52,
      "metformin": 34,
      "ors": 180,
      "chloroquine": 24
    },
    "vaccines": {
      "covid": 45,
      "polio": 34,
      "hepatitisB": 26
    },
    "childrenNeedingVaccines": 23,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 19,
        "occupied": 16,
        "free": 3
      },
      "female": {
        "total": 19,
        "occupied": 16,
        "free": 3
      },
      "maternity": {
        "total": 12,
        "occupied": 11,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_028",
    "name": "Krishnapur Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Murshidabad",
    "block": "Lalgola",
    "lat": 24.417,
    "lng": 88.252,
    "totalBeds": 50,
    "occupiedBeds": 45,
    "medicines": {
      "paracetamol": 90,
      "amoxicillin": 58,
      "metformin": 38,
      "ors": 195,
      "chloroquine": 28
    },
    "vaccines": {
      "covid": 48,
      "polio": 36,
      "hepatitisB": 28
    },
    "childrenNeedingVaccines": 25,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 19,
        "occupied": 17,
        "free": 2
      },
      "female": {
        "total": 19,
        "occupied": 17,
        "free": 2
      },
      "maternity": {
        "total": 12,
        "occupied": 11,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_029",
    "name": "Burwan Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Murshidabad",
    "block": "Burwan",
    "lat": 23.9312,
    "lng": 87.9734,
    "totalBeds": 30,
    "occupiedBeds": 24,
    "medicines": {
      "paracetamol": 54,
      "amoxicillin": 30,
      "metformin": 22,
      "ors": 115,
      "chloroquine": 14
    },
    "vaccines": {
      "covid": 28,
      "polio": 22,
      "hepatitisB": 16
    },
    "childrenNeedingVaccines": 16,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "female": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "maternity": {
        "total": 8,
        "occupied": 6,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_030",
    "name": "Salar Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Murshidabad",
    "block": "Bharatpur II",
    "lat": 23.7785,
    "lng": 88.1092,
    "totalBeds": 30,
    "occupiedBeds": 25,
    "medicines": {
      "paracetamol": 56,
      "amoxicillin": 32,
      "metformin": 24,
      "ors": 120,
      "chloroquine": 15
    },
    "vaccines": {
      "covid": 30,
      "polio": 24,
      "hepatitisB": 18
    },
    "childrenNeedingVaccines": 18,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "female": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "maternity": {
        "total": 8,
        "occupied": 7,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_031",
    "name": "Bhatar Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Purba Bardhaman",
    "block": "Bhatar",
    "lat": 23.4011,
    "lng": 87.9368,
    "totalBeds": 60,
    "occupiedBeds": 49,
    "medicines": {
      "paracetamol": 100,
      "amoxicillin": 65,
      "metformin": 42,
      "ors": 200,
      "chloroquine": 30
    },
    "vaccines": {
      "covid": 55,
      "polio": 42,
      "hepatitisB": 32
    },
    "childrenNeedingVaccines": 20,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 23,
        "occupied": 19,
        "free": 4
      },
      "female": {
        "total": 23,
        "occupied": 19,
        "free": 4
      },
      "maternity": {
        "total": 14,
        "occupied": 11,
        "free": 3
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_032",
    "name": "Paharhati Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Purba Bardhaman",
    "block": "Memari II",
    "lat": 23.2356,
    "lng": 88.0815,
    "totalBeds": 30,
    "occupiedBeds": 24,
    "medicines": {
      "paracetamol": 55,
      "amoxicillin": 32,
      "metformin": 22,
      "ors": 120,
      "chloroquine": 14
    },
    "vaccines": {
      "covid": 30,
      "polio": 22,
      "hepatitisB": 18
    },
    "childrenNeedingVaccines": 14,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "female": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "maternity": {
        "total": 8,
        "occupied": 6,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_033",
    "name": "Bononabagram Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Purba Bardhaman",
    "block": "Ausgram I",
    "lat": 23.5186,
    "lng": 87.674,
    "totalBeds": 30,
    "occupiedBeds": 23,
    "medicines": {
      "paracetamol": 52,
      "amoxicillin": 30,
      "metformin": 20,
      "ors": 115,
      "chloroquine": 12
    },
    "vaccines": {
      "covid": 28,
      "polio": 20,
      "hepatitisB": 16
    },
    "childrenNeedingVaccines": 15,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 8,
        "free": 3
      },
      "female": {
        "total": 11,
        "occupied": 8,
        "free": 3
      },
      "maternity": {
        "total": 8,
        "occupied": 7,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_034",
    "name": "Onda Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Bankura",
    "block": "Onda",
    "lat": 23.142,
    "lng": 87.202,
    "totalBeds": 30,
    "occupiedBeds": 24,
    "medicines": {
      "paracetamol": 65,
      "amoxicillin": 40,
      "metformin": 25,
      "ors": 180,
      "chloroquine": 35
    },
    "vaccines": {
      "covid": 30,
      "polio": 25,
      "hepatitisB": 20
    },
    "childrenNeedingVaccines": 16,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "female": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "maternity": {
        "total": 8,
        "occupied": 6,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_035",
    "name": "Chhatna Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Bankura",
    "block": "Chhatna",
    "lat": 23.298,
    "lng": 86.9785,
    "totalBeds": 30,
    "occupiedBeds": 25,
    "medicines": {
      "paracetamol": 60,
      "amoxicillin": 35,
      "metformin": 26,
      "ors": 170,
      "chloroquine": 30
    },
    "vaccines": {
      "covid": 32,
      "polio": 24,
      "hepatitisB": 18
    },
    "childrenNeedingVaccines": 19,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "female": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "maternity": {
        "total": 8,
        "occupied": 7,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_036",
    "name": "Ranibandh Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Bankura",
    "block": "Ranibandh",
    "lat": 22.8685,
    "lng": 86.782,
    "totalBeds": 30,
    "occupiedBeds": 26,
    "medicines": {
      "paracetamol": 58,
      "amoxicillin": 32,
      "metformin": 22,
      "ors": 160,
      "chloroquine": 38
    },
    "vaccines": {
      "covid": 28,
      "polio": 22,
      "hepatitisB": 16
    },
    "childrenNeedingVaccines": 22,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 10,
        "free": 1
      },
      "female": {
        "total": 11,
        "occupied": 10,
        "free": 1
      },
      "maternity": {
        "total": 8,
        "occupied": 6,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_037",
    "name": "Debra Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Midnapore West",
    "block": "Debra",
    "lat": 22.3906,
    "lng": 87.5673,
    "totalBeds": 40,
    "occupiedBeds": 32,
    "medicines": {
      "paracetamol": 75,
      "amoxicillin": 45,
      "metformin": 32,
      "ors": 170,
      "chloroquine": 25
    },
    "vaccines": {
      "covid": 40,
      "polio": 30,
      "hepatitisB": 22
    },
    "childrenNeedingVaccines": 18,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 15,
        "occupied": 12,
        "free": 3
      },
      "female": {
        "total": 15,
        "occupied": 12,
        "free": 3
      },
      "maternity": {
        "total": 10,
        "occupied": 8,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_038",
    "name": "Garhbeta Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Midnapore West",
    "block": "Garhbeta I",
    "lat": 22.859,
    "lng": 87.356,
    "totalBeds": 60,
    "occupiedBeds": 48,
    "medicines": {
      "paracetamol": 105,
      "amoxicillin": 62,
      "metformin": 44,
      "ors": 210,
      "chloroquine": 35
    },
    "vaccines": {
      "covid": 55,
      "polio": 42,
      "hepatitisB": 32
    },
    "childrenNeedingVaccines": 24,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 23,
        "occupied": 18,
        "free": 5
      },
      "female": {
        "total": 23,
        "occupied": 18,
        "free": 5
      },
      "maternity": {
        "total": 14,
        "occupied": 12,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_039",
    "name": "Sabang Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Midnapore West",
    "block": "Sabang",
    "lat": 22.178,
    "lng": 87.6045,
    "totalBeds": 40,
    "occupiedBeds": 34,
    "medicines": {
      "paracetamol": 72,
      "amoxicillin": 42,
      "metformin": 30,
      "ors": 165,
      "chloroquine": 24
    },
    "vaccines": {
      "covid": 38,
      "polio": 28,
      "hepatitisB": 20
    },
    "childrenNeedingVaccines": 19,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 15,
        "occupied": 13,
        "free": 2
      },
      "female": {
        "total": 15,
        "occupied": 13,
        "free": 2
      },
      "maternity": {
        "total": 10,
        "occupied": 8,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_040",
    "name": "Reapara Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Midnapore East",
    "block": "Nandigram II",
    "lat": 22.025,
    "lng": 87.925,
    "totalBeds": 30,
    "occupiedBeds": 25,
    "medicines": {
      "paracetamol": 62,
      "amoxicillin": 36,
      "metformin": 26,
      "ors": 140,
      "chloroquine": 20
    },
    "vaccines": {
      "covid": 34,
      "polio": 24,
      "hepatitisB": 18
    },
    "childrenNeedingVaccines": 17,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "female": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "maternity": {
        "total": 8,
        "occupied": 7,
        "free": 1
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_041",
    "name": "Milki Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Malda",
    "block": "English Bazar",
    "lat": 25.0186,
    "lng": 87.9999,
    "totalBeds": 30,
    "occupiedBeds": 24,
    "medicines": {
      "paracetamol": 60,
      "amoxicillin": 35,
      "metformin": 24,
      "ors": 145,
      "chloroquine": 22
    },
    "vaccines": {
      "covid": 32,
      "polio": 24,
      "hepatitisB": 18
    },
    "childrenNeedingVaccines": 21,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "female": {
        "total": 11,
        "occupied": 9,
        "free": 2
      },
      "maternity": {
        "total": 8,
        "occupied": 6,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  },
  {
    "id": "hosp_rh_042",
    "name": "Naxalbari Rural Hospital",
    "type": "Rural Hospital",
    "category": "rural",
    "district": "Darjeeling",
    "block": "Naxalbari",
    "lat": 26.68,
    "lng": 88.2,
    "totalBeds": 50,
    "occupiedBeds": 38,
    "medicines": {
      "paracetamol": 140,
      "amoxicillin": 80,
      "metformin": 30,
      "ors": 190,
      "chloroquine": 55
    },
    "vaccines": {
      "covid": 45,
      "polio": 40,
      "hepatitisB": 28
    },
    "childrenNeedingVaccines": 25,
    "emergencyDeclared": false,
    "wards": {
      "male": {
        "total": 19,
        "occupied": 14,
        "free": 5
      },
      "female": {
        "total": 19,
        "occupied": 14,
        "free": 5
      },
      "maternity": {
        "total": 12,
        "occupied": 10,
        "free": 2
      }
    },
    "lastUpdated": "2026-09-29T08:15:12.385Z"
  }
];

export default HOSPITALS_DATA;
