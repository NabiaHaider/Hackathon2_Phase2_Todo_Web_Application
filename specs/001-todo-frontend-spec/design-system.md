# Design System for Todo Application Frontend

**Feature Branch**: `001-todo-application-specs`
**Created**: 2026-02-02

## Color Tokens

The following color tokens are defined in `frontend/app/globals.css` and are used across the application. They are based on the existing login/signup pages, ensuring a consistent dark-first UI.

### Light Mode Variables (`:root`)

```css
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--card: 0 0% 100%;
--card-foreground: 222.2 84% 4.9%;
--popover: 0 0% 100%;
--popover-foreground: 222.2 84% 4.9%;
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;
--accent: 210 40% 96.1%;
--accent-foreground: 222.2 47.4% 11.2%;
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 210 40% 98%;
--border: 214.3 31.8% 91.4%;
--input: 214.3 31.8% 91.4%;
--ring: 222.2 84% 4.9%;
--success: 120 70% 40%;
--success-foreground: 210 40% 98%;
--error: 0 80% 50%;
--error-foreground: 210 40% 98%;
--warning: 40 90% 50%;
--warning-foreground: 222.2 47.4% 11.2%;
--info: 200 80% 50%;
--info-foreground: 210 40% 98%;
--header-height: 56px;
--footer-height: 80px;
```

### Dark Mode Variables (`.dark`)

```css
--background: 222.2 84% 4.9%;
--foreground: 210 40% 98%;
--card: 222.2 84% 4.9%;
--card-foreground: 210 40% 98%;
--popover: 222.2 84% 4.9%;
--popover-foreground: 210 40% 98%;
--primary: 210 40% 98%;
--primary-foreground: 222.2 47.4% 11.2%;
--secondary: 217.2 32.6% 17.5%;
--secondary-foreground: 210 40% 98%;
--muted: 217.2 32.6% 17.5%;
--muted-foreground: 215 20.2% 65.1%;
--accent: 217.2 32.6% 17.5%;
--accent-foreground: 210 40% 98%;
--destructive: 0 62.8% 30.6%;
--destructive-foreground: 210 40% 98%;
--border: 217.2 32.6% 17.5%;
--input: 217.2 32.6% 17.5%;
--ring: 212.7 26.8% 83.9%;
--success: 120 70% 60%;
--success-foreground: 210 40% 98%;
--error: 0 80% 70%;
--error-foreground: 210 40% 98%;
--warning: 40 90% 70%;
--warning-foreground: 222.2 47.4% 11.2%;
--info: 200 80% 70%;
--info-foreground: 210 40% 98%;
```

## Typography Scale

The typography scale is derived from the `tailwind.config.ts` file and aims for readability and visual hierarchy, aligning with the existing login/signup pages. Sans-serif fonts are preferred.

```javascript
fontSize: {
  xs: ['0.75rem', { lineHeight: '1rem' }],    // 12px
  sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
  base: ['1rem', { lineHeight: '1.5rem' }],   // 16px
  lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
  xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
  '2xl': ['1.5rem', { lineHeight: '2rem' }],  // 24px
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
  '5xl': ['3rem', { lineHeight: '1' }],        // 48px
  '6xl': ['3.75rem', { lineHeight: '1' }],       // 60px
}
```

## Card Styles

Card styles are implemented using `shadcn/ui`'s `Card` component, customized to fit the dark theme.

### General Card Properties
- **Background**: Dark background, typically `hsl(var(--card))`
- **Corners**: Rounded corners, `var(--radius)`
- **Shadows**: Subtle shadows for depth.

### Auth Pages Cards (Login/Signup)
- **Specific Styling**: Cards on authentication pages (`/login`, `/signup`) feature a `bg-white` class with a custom `shadow-[0_10px_25px_rgba(255,192,203,0.5)]` for login and `shadow-[0_12px_30px_rgba(255,192,203,0.45)]` for signup. These are more pronounced for visual appeal. The inner form area often uses `bg-white` with an `shadow-inner`.

### Dashboard Cards (`/tasks`)
- **Specific Styling**: Cards on the dashboard (e.g., for `TaskStatsCard`) will use the default `--card` background with potentially softer shadows, blending more seamlessly with the overall dashboard layout.

The goal is to maintain a cohesive look while providing subtle distinctions where necessary.

## Button Variants

Buttons are implemented using `shadcn/ui`'s `Button` component, with the following variants mapped to the design system:

-   **Primary Button**:
    -   **Usage**: Main call to action.
    -   **Appearance**: `default` variant of `shadcn/ui` Button. Uses `hsl(var(--primary))` for background and `hsl(var(--primary-foreground))` for text.
    -   **Example**: "Get Started", "Login", "Create Task".

-   **Secondary Button**:
    -   **Usage**: Alternative actions, less emphasis than primary.
    -   **Appearance**: `secondary` variant of `shadcn/ui` Button. Uses `hsl(var(--secondary))` for background and `hsl(var(--secondary-foreground))` for text.
    -   **Example**: "Cancel", "Learn More".

-   **Ghost Button**:
    -   **Usage**: Low-emphasis actions, often used in toolbars or as text-based buttons.
    -   **Appearance**: `ghost` variant of `shadcn/ui` Button. Transparent background, uses `hsl(var(--foreground))` or `hsl(var(--muted-foreground))` for text.

-   **Destructive Button**:
    -   **Usage**: Actions that involve deleting or irreversible changes.
    -   **Appearance**: `destructive` variant of `shadcn/ui` Button. Uses `hsl(var(--destructive))` for background and `hsl(var(--destructive-foreground))` for text.
    -   **Example**: "Delete Task".

-   **Outline Button**:
    -   **Usage**: Used for actions that need to be distinct but not as prominent as primary buttons.
    -   **Appearance**: `outline` variant of `shadcn/ui` Button. Transparent background with a border using `hsl(var(--border))`.

-   **Link Button**:
    -   **Usage**: Renders a button that looks like a link.
    -   **Appearance**: `link` variant of `shadcn/ui` Button. No background or border, text color using `hsl(var(--primary))`.

All buttons also include hover states and focus states for improved user experience and accessibility.