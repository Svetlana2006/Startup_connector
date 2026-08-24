---
name: Maharashtra Digital Procurement Framework
colors:
  surface: '#f7fafc'
  surface-dim: '#d7dadc'
  surface-bright: '#f7fafc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f6'
  surface-container: '#ebeef0'
  surface-container-high: '#e5e9eb'
  surface-container-highest: '#e0e3e5'
  on-surface: '#181c1e'
  on-surface-variant: '#43474e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f3'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#455f88'
  primary: '#002045'
  on-primary: '#ffffff'
  primary-container: '#1a365d'
  on-primary-container: '#86a0cd'
  inverse-primary: '#adc7f7'
  secondary: '#875200'
  on-secondary: '#ffffff'
  secondary-container: '#ffb55c'
  on-secondary-container: '#744600'
  tertiary: '#172131'
  on-tertiary: '#ffffff'
  tertiary-container: '#2c3647'
  on-tertiary-container: '#959fb3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#adc7f7'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#2d476f'
  secondary-fixed: '#ffddba'
  secondary-fixed-dim: '#ffb866'
  on-secondary-fixed: '#2b1700'
  on-secondary-fixed-variant: '#673d00'
  tertiary-fixed: '#d9e3f9'
  tertiary-fixed-dim: '#bdc7dc'
  on-tertiary-fixed: '#121c2c'
  on-tertiary-fixed-variant: '#3d4759'
  background: '#f7fafc'
  on-background: '#181c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
The design system is engineered for a high-stakes government environment, balancing the weight of official authority with the agility of a modern startup ecosystem. The visual language is rooted in **Corporate Modernism**, prioritizing clarity, accessibility, and trust.

The interface utilizes a structured, card-based layout to organize complex procurement data into digestible modules. High whitespace ratios and a disciplined grid ensure that critical administrative information—such as GFR waivers and milestone tracking—is never obscured by visual clutter. The emotional response should be one of "institutional reliability"; the platform must feel like a stable foundation upon which commerce and innovation can occur safely.

## Colors
The palette is dominated by **Government Blue**, representing stability and legal authority. **Saffron Gold** is used sparingly as a high-contrast accent for primary calls-to-action and to highlight "Innovative Startup" status indicators.

- **Primary (#1a365d):** Used for navigation bars, headers, and primary buttons.
- **Secondary (#f6ad55):** Reserved for highlights, active states, and specific "Startup India" related certifications.
- **Backgrounds:** Use the neutral soft gray (#f7fafc) for page backgrounds to reduce eye strain, while pure white (#ffffff) is reserved for interactive surface cards.
- **Semantic Colors:** Success Green is specifically mapped to GFR 173(i) waiver approvals; Warning Amber is dedicated to pending milestones and compliance deadlines.

## Typography
This design system employs **Public Sans** for its institutional clarity and high legibility in dense data environments. It is a typeface designed for government use, conveying a neutral yet authoritative tone.

**Inter** is utilized for labels, data tables, and micro-copy to ensure maximum readability at small sizes. 
- **Headlines:** Use Bold (700) or SemiBold (600) weights to establish clear hierarchy.
- **Body:** Standardized at 16px for optimal reading of legal text and procurement specifications.
- **Data Labels:** Use the label-sm/md tokens for table headers and metadata to distinguish them from prose.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid Grid**. For desktop, content is contained within a 1280px central container using a 12-column grid. 

- **Gutter & Margins:** A 24px gutter provides ample breathing room between dashboard cards.
- **Rhythm:** All spacing is based on a 4px baseline shift. Use 16px (md) for internal card padding and 24px (lg) for vertical section spacing.
- **Responsive Behavior:** 
  - **Desktop (1024px+):** 12 columns, 24px margins.
  - **Tablet (768px - 1023px):** 6 columns, 16px margins.
  - **Mobile (<767px):** 2 columns, 16px margins; cards stack vertically.

## Elevation & Depth
This design system uses **Tonal Layering** combined with **Ambient Shadows** to create a sense of organized depth without appearing overly decorative.

- **Level 0 (Surface):** Neutral gray background (#f7fafc).
- **Level 1 (Cards):** Pure white cards with a subtle 1px border (#e2e8f0) and a soft, diffused shadow (0px 2px 4px rgba(26, 54, 93, 0.06)).
- **Level 2 (Hover/Active):** Slightly deeper shadow (0px 10px 15px rgba(26, 54, 93, 0.1)) to indicate interactivity.
- **Modals:** High elevation with a 20% opacity backdrop blur to keep the user focused on the procurement task at hand.

## Shapes
The shape language is disciplined and consistent. A **Rounded (8px)** corner radius is applied to all primary containers, buttons, and input fields. This softens the "institutional" feel, making the platform more approachable for startup founders, while maintaining enough structure to appear professional.

- **Buttons & Inputs:** 8px (rounded-md)
- **Dashboard Cards:** 12px (rounded-lg)
- **Status Badges/Chips:** 100px (Pill-shaped) to distinguish them from interactive buttons.

## Components
- **Primary Buttons:** Solid "Government Blue" with white text. High-emphasis actions like "Submit Bid" use this.
- **Secondary Buttons:** "Saffron Gold" with deep blue text, used for "Apply for Waiver" or "Start Application."
- **Status Chips:** 
  - *Success (GFR Waiver):* Green background with dark green text + leading check icon.
  - *Warning (Pending):* Amber background with dark brown text + leading clock icon.
- **Input Fields:** 1px solid border (#cbd5e0) with an 8px radius. Active state uses a 2px Government Blue border.
- **Data Tables:** High-density, no borders between columns, subtle dividers between rows. Header row is Government Blue at 10% opacity with bold labels.
- **Dashboard Cards:** Must include a "Header" section with a 1px bottom divider, keeping the title distinct from the data visualization or list content below.