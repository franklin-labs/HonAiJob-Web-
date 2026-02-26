Create a complete modern SaaS web application UI called "Honaijob" with the following features:

PRODUCT CONCEPT
- AI-powered job matching platform
- Users can upload and manage multiple CVs (Student Jobs, CDI, Freelance, Internship, etc.)
- Each CV has independent AI analysis and recommendations
- Clean, minimalist, intelligent UX
- Production-ready startup design (like Stripe / Notion / LinkedIn)

LOGIN / AUTHENTICATION
- Full-page login
- Prominent "Sign in with Google" button
- Optional email/password login below Google
- After login, redirect to Dashboard
- Minimalist, premium style
- Responsive: works on desktop, tablet, mobile

DASHBOARD (CV-FIRST WORKFLOW)
- Top header:
   • Active CV selector dropdown (shows currently selected CV)
   • Button: "Add a CV" (upload new CV)
   • Language toggle (FR / EN)
   • User profile dropdown
- If no CV exists → modal or empty state prompting user to upload first CV
- Main dashboard cards (max 3 visible):
   • CV Score
   • Recommended Jobs
   • Applications in Progress
- Section "AI Recommendations": 2–3 actionable suggestions for the active CV
- All content updates dynamically when CV is switched
- Responsive layout: cards stack vertically on mobile, grid on desktop

MY CVS PAGE
- List of CV cards:
   • CV name
   • Target type
   • Last analysis date
   • Matching score summary
   • Buttons: Analyze, Set Active, Edit, Delete
- Top "Upload New CV" button
- Responsive: 1-column on mobile, grid on tablet/desktop

JOB OFFERS PAGE
- Left filters: Location, Contract type, Experience level
- Right job cards:
   • Company logo
   • Job title
   • Company name
   • Location
   • Matching %
   • Apply button
- Click opens side drawer
- Responsive: filters collapse into expandable panel on mobile

AI MATCH PAGE
- Top: Job title + Matching %
- Left: Skills match visualization (progress bars)
- Right: Missing skills + AI recommendations
- Button: "Improve This CV"
- Simplified, no jargon
- Responsive: stacked layout on mobile, side-by-side on desktop

APPLICATIONS PAGE
- List of applied jobs linked to selected CV
- Each item: Company, Role, Date applied, Status badge
- Minimal and structured
- Responsive: list stacks vertically on mobile

SETTINGS PAGE
- Sections: Account, Notifications, Privacy, Language
- Language system: toggle FR / EN
- Automatic detection based on browser language
- Manual toggle always accessible in header
- Clean translations for all UI text

DESIGN SYSTEM
- Minimalist, clean, premium
- White / light gray background
- Primary: Soft Blue (#2563EB)
- Accent: Green for positive scores
- Neutral grays for text
- Rounded corners 12px
- Soft shadows
- Inter-style sans-serif typography
- 8px spacing grid
- Maximum 3 main elements per section
- Progressive disclosure for advanced options
- Subtle transitions

RESPONSIVE GUIDELINES
- Desktop: 3-column grid where appropriate, horizontal navigation
- Tablet: 2-column grid, condensed spacing
- Mobile: 1-column stacking, collapsible sidebar, hamburger menu
- Cards stack vertically, dropdowns remain accessible
- Maintain clear hierarchy and breathing space

INTERNATIONALIZATION (i18n)
- Full FR / EN support
- Automatic detection from browser
- Manual toggle in header
- Clean professional translations
- Maintain layout integrity in both languages

UX CONSTRAINTS
- Never overwhelm the user
- Cards-based layout
- Minimal text, max 3 main visual elements per section
- Clear call-to-actions
- Maintain a premium startup aesthetic

The final result should be a **fully responsive, bilingual SaaS interface** ready for production, clean, intelligent, scalable, and optimized for multi-CV workflow.