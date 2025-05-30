interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizData {
  [key: string]: QuizQuestion[];
}

export const INSURANCE_QUIZZES: QuizData = {
  "Health Insurance": [
    {
      question: "What is a deductible in health insurance?",
      options: [
        "The monthly premium amount",
        "The amount you pay before insurance coverage begins",
        "The maximum coverage limit",
        "The copayment amount"
      ],
      correctAnswer: 1,
      explanation:
        "A deductible is the amount you must pay for covered health care services before your insurance plan starts to pay."
    },
    {
      question: "What is a pre-existing condition?",
      options: [
        "A condition that develops after getting insurance",
        "A health problem you had before coverage starts",
        "A condition that is not covered by insurance",
        "A temporary health condition"
      ],
      correctAnswer: 1,
      explanation:
        "A pre-existing condition is any health problem that existed before the start date of new health coverage."
    },
    {
      question: "What is a copayment?",
      options: [
        "The total cost of insurance",
        "A fixed amount you pay for a covered service",
        "The amount insurance pays",
        "The yearly premium"
      ],
      correctAnswer: 1,
      explanation:
        "A copayment is a fixed amount you pay for a covered healthcare service, usually when you receive the service."
    }
  ],
  "Vehicle Insurance": [
    {
      question: "What does comprehensive car insurance typically cover?",
      options: [
        "Only collision damage",
        "Only liability",
        "Damage from theft, weather, and non-collision events",
        "Only medical expenses"
      ],
      correctAnswer: 2,
      explanation:
        "Comprehensive coverage pays for damage to your car from causes other than collisions, such as theft, vandalism, or natural disasters."
    },
    {
      question: "What is collision coverage in auto insurance?",
      options: [
        "Coverage for damage to other vehicles",
        "Coverage for damage to your car from accidents",
        "Coverage for medical expenses",
        "Coverage for theft"
      ],
      correctAnswer: 1,
      explanation:
        "Collision coverage pays for damage to your car when you hit another vehicle or object."
    },
    {
      question: "What is liability coverage in auto insurance?",
      options: [
        "Coverage for your own medical expenses",
        "Coverage for damage to your car",
        "Coverage for damage/injury you cause to others",
        "Coverage for car theft"
      ],
      correctAnswer: 2,
      explanation:
        "Liability coverage pays for damage or injuries you cause to others in an accident."
    }
  ],
  "Life Insurance": [
    {
      question: "What is term life insurance?",
      options: [
        "Insurance that lasts your entire life",
        "Insurance that covers a specific period",
        "Insurance for your belongings",
        "Insurance for medical expenses"
      ],
      correctAnswer: 1,
      explanation:
        "Term life insurance provides coverage for a specific period or 'term' (like 10, 20, or 30 years)."
    },
    {
      question: "What is whole life insurance?",
      options: [
        "Insurance that expires after a term",
        "Insurance only for medical expenses",
        "Permanent life insurance with a savings component",
        "Insurance for property damage"
      ],
      correctAnswer: 2,
      explanation:
        "Whole life insurance provides lifelong coverage and includes a savings component that builds cash value over time."
    },
    {
      question: "What is a beneficiary in life insurance?",
      options: [
        "The insurance company",
        "The person who pays the premiums",
        "The person who receives the death benefit",
        "The insurance agent"
      ],
      correctAnswer: 2,
      explanation:
        "A beneficiary is the person or entity designated to receive the insurance payout upon the death of the insured."
    }
  ],
  "Property Insurance": [
    {
      question: "What is typically covered by homeowners insurance?",
      options: [
        "Only the building structure",
        "Only personal belongings",
        "Structure, belongings, liability, and additional living expenses",
        "Only natural disasters"
      ],
      correctAnswer: 2,
      explanation:
        "Homeowners insurance typically covers the structure, personal belongings, liability protection, and additional living expenses if needed."
    }
  ]
}; 