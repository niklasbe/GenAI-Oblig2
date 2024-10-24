#import "@preview/charged-ieee:0.1.2": ieee

#show: ieee.with(
  title: "AIrbnb: Exploring AI-Generated Virtual Properties in Digital Marketplaces",
  abstract: [
    This paper presents AIrbnb, a proof-of-concept platform that leverages large language models to generate immersive virtual property listings. We explore the intersection of artificial intelligence and digital marketplaces, demonstrating how AI can create engaging, fictional yet plausible travel destinations. Our implementation combines React for the frontend, Bun for the backend, and the OpenAI API for content generation, showcasing the potential of AI in creative content generation for e-commerce platforms.
  ],
  authors: (
    (
      name: "Niklas Berby",
      organization: [Høgskolen i Østfold],
      email: "niklab@hiof.no"
    ),
  ),
  bibliography: bibliography("references.bib"),
)

= Introduction
#par()[
  The rise of artificial intelligence has opened new possibilities in digital content creation and e-commerce. While platforms like Airbnb revolutionized the travel industry by connecting property owners with travelers, we explore the next frontier: AI-generated virtual properties. This paper presents AIrbnb, a prototype platform that demonstrates how large language models can create engaging, fictional yet plausible travel destinations.
]

== Motivation
#par()[
  - Growing interest in virtual and augmented reality experiences
  - Potential applications in gaming, virtual tourism, and property visualization
  - Educational value in exploring AI capabilities in creative content generation
]

== Contributions
#par()[
  This paper makes the following contributions:
  - A novel approach to generating virtual property listings using LLMs
  - An open-source implementation combining modern web technologies
  - Insights into prompt engineering for structured content generation
  - Analysis of user engagement with AI-generated content
]

= Related Work

== Virtual Property Platforms
#par()[
  Discussion of existing virtual property platforms, metaverse implementations, and digital twin technologies.
]

== AI in Content Generation
#par()[
  Review of related work in AI-generated content, focusing on:
  - Text generation for e-commerce
  - Virtual property description
  - Image generation for real estate
]

= System Design

== Architecture
#par()[
  Detailed description of the system architecture, including:
  - Frontend implementation using React
  - Backend services using Bun
  - Integration with OpenAI API
  - Static asset management
]

== Property Generation
#par()[
  Analysis of the prompt engineering approach:
  - Structured prompt design
  - Consistency in generated content
  - Balance between creativity and plausibility
]

== User Interface
#par()[
  Discussion of the user interface design:
  - Responsive layout considerations
  - Loading state management
  - Image presentation
  - Interactive elements
]

= Implementation

== Frontend Development
#par()[
  Technical details of the React implementation:
  - Component architecture
  - State management
  - Performance optimizations
  - Responsive design
]

== Backend Services
#par()[
  Details of the Bun server implementation:
  - API endpoints
  - Static file serving
  - Error handling
  - Security considerations
]

== AI Integration
#par()[
  Discussion of the OpenAI API integration:
  - Model selection and configuration
  - Response processing
  - Error handling
  - Cost optimization
]

= Evaluation

== Performance Metrics
#par()[
  Analysis of system performance:
  - Response times
  - Generation quality
  - Resource utilization
]

== User Experience
#par()[
  Assessment of user interaction:
  - Interface usability
  - Content engagement
  - Feature effectiveness
]

== Limitations
#par()[
  Discussion of current limitations:
  - Generation constraints
  - Technical boundaries
  - Scaling considerations
]

= Future Work
#par()[
  Potential areas for future development:
  - Integration with image generation models
  - Virtual reality experiences
  - Interactive property customization
  - Social features and user-generated content
]

= Conclusion
#par()[
  Summary of contributions and findings:
  - Key achievements
  - Lessons learned
  - Broader implications for AI in digital marketplaces
]