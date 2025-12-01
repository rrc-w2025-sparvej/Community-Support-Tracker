# Community Support Tracker - Style Guide

## Introduction
This style guide outlines the design principles, color schemes, typography, and component styles to be used in the Community Support Tracker project. Adhering to this guide will ensure a consistent and professional appearance across all components of the application.

## Color Palette
- Primary Color: #2D3E50 (Dark Blue)
- Secondary Color: #A4C8FF  (Light Blue)
- Accent Color: #8ED1B2 (Mint Green)
- Background Color: #FAFAF7 (Creamy White)
- Card Background: #FFFFFF (White)
- Text Color: #333333 (Dark Gray)
- Borders: #E0E6ED (Light Gray)

## Aethetics
-Colors are intentionally soft and gentle — no harsh contrast.
-Meant to feel calming and positive .

## Typography
We use two paired Google Fonts for personality and readability.

### Primary Font
Primary Font
Poppins
Used for:
- Page titles
- Section headers
- Navigation links

### Secondary Font
Open Sans or Inter 
Used for:
- Body text
- Form labels
- Table text

### Font Weights
Poppins: 600 for titles, 500 for tabs
Open Sans: 400 for normal text, 600 for table headings

### Font Sizes

Title (h1): 28–32px desktop, 22–24px mobile
Section headers (h2): 20–22px
Body text: 16px
Labels: 14–16px

### Layout structure
All pages follow the same general layout:

[ HEADER ]
[ NAVIGATION ]

<main>
   [ PAGE TITLE ]
   [ FORM CARD ]
   [ TABLE CARD ]
   [ SUMMARY CARD ]
</main>

[ FOOTER ]

- Spacing

- 24–32px padding around main content
- 16–24px margin between sections
- Generous white space to keep everything breathable

-Cards

Every content section (form, table, summaries) uses:

- White background
- Soft 10px rounded corners
- Subtle drop shadow: 0 2px 6px rgba(0, 0, 0, 0.08)
- 20–24px internal padding

## Navigation Bar

- Horizontal tab-style navigation
- Items spaced evenly

Active tab:
- Teal underline bar
- Bold text

Inactive tabs:

- Medium gray text
- Darken slightly on hover

Mobile Navigation

- Collapses into a hamburger menu
- Menu slides down vertically

## Form Components
Input Style
- Full-width
- Light gray border: 1px solid #D4D4D4
- Rounded corners: 6px
- Padding: 10px
- On focus:
   Border color becomes teal: #2F6F8F

Buttons
- Teal background
- White text
- Slight drop shadow
- Rounded corners
- On hover:
   Darken background slightly

## Table Components
- Full width
- Light border (#E0E6ED)
- Header row: light blue tint
- Body rows: simple zebra stripes
- Cell padding: 12–16px
- Delete button: small icon button
Mobile View
- Convert each row into a stacked card
- Labels above values

### Summary Boxes

- Used for totals or counts.
- Light mint green tint
- Rounded corners
- Simple text (heading + number)

### Responsive Rules
- Everything stacks in one column on mobile
- Tables become cards
- Navigation folds into hamburger menu
- Fonts slightly smaller on small screens