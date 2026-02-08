# Implementation Plan: Todo Application Frontend UI

**Feature Branch**: `001-todo-application-specs`
**Created**: 2026-01-31
**Status**: Draft

---

## 1. Frontend Architecture Overview

-   **Next.js App Router Usage**: The application will leverage the Next.js App Router for routing, data fetching, and layout management.
-   **Server vs Client Components Strategy**:
    -   **Server Components (default)**: Used for all static content, data fetching, and non-interactive UI elements to maximize performance and minimize client-side JavaScript. This will be the default for all new components and pages unless interactivity is explicitly required.
    -   **Client Components**: Opted into only for interactive UI elements such as form inputs, buttons with event handlers, state management, and lifecycle effects. These will be marked with `"use client"`.
-   **Layout Nesting Approach**:
    -   A root `layout.tsx` will define the global structure (e.g., HTML, Body, ThemeProvider).
    -   Nested layouts will be used for logical grouping, such as `(auth)` for login/signup and `(main)` or directly under `app/tasks` for the dashboard, allowing shared UI elements (e.g., Header for dashboard pages) and data fetching for specific routes.
-   **Providers Hierarchy**:
    -   `ThemeProvider` (from `next-themes`): Located in the root `layout.tsx` to provide dark/light mode functionality across the entire application.
    -   Other UI/global providers (e.g., context for user session, task management state) will be placed as high as necessary in the component tree to provide context to consuming components, typically within client components if they manage interactive state.
-   **Routing Philosophy**:
    -   File-system based routing via the App Router.
    -   Grouped layouts (e.g., `(auth)`, `(main)`) for shared UI and logic.
    -   Dynamic routes where necessary (e.g., for task details, though not explicitly in scope for v1).

## 2. Folder & File Structure (TODO-based)

The project will adhere to the following structure, specifically tailored for the Todo application:

-   `app/`
    -   `page.tsx` (Landing page - `/`)
    -   `login/` (Page for user login)
    -   `signup/` (Page for user registration)
    -   `tasks/` (Main dashboard for tasks)
        -   `page.tsx` (Task Dashboard entry point)
        -   `layout.tsx` (Dashboard-specific layout, e.g., including Header)
    -   `layout.tsx` (Root layout)
    -   `globals.css` (Global styles)
-   `components/`
    -   `layout/`
        -   `Header.tsx` (Application-wide header, for dashboard)
        -   `DashboardLayout.tsx` (Layout wrapper for the /tasks route)
    -   `task/`
        -   `TaskCard.tsx` (Displays a single task item)
        -   `TaskList.tsx` (Manages and displays a list of TaskCards)
        -   `TaskStatsCard.tsx` (Displays a single task statistic)
        -   `FilterTabs.tsx` (For filtering tasks by All, Pending, Completed)
    -   `common/`
        -   `AuthForm.tsx` (Reusable form for login/signup)
        -   `EmptyState.tsx` (Component for empty list/data states)
        -   `PrimaryButton.tsx`, `SecondaryButton.tsx` (Semantic button components)
    -   `ui/` (shadcn/ui components, generated via CLI)
-   `lib/`
    -   `utils.ts` (Utility functions)
    -   `hooks.ts` (Custom React hooks)
    -   `stores.ts` (State management if client-side global state is needed, e.g., for UI preferences)
-   `styles/` (Only if custom, non-Tailwind CSS is absolutely necessary for specific overrides)

**STRICTLY FORBIDDEN:**
❌ `products`
❌ `cart`
❌ `checkout`
❌ `admin`
❌ `shop`

## 3. Styling Initialization Plan (CRITICAL)

This section ensures a robust and maintainable styling setup:

1.  **Tailwind CSS Setup**:
    -   Ensure `tailwind.config.ts`, `postcss.config.js`, and `globals.css` are correctly configured as per Next.js and Tailwind documentation.
    -   Verify `npm install -D tailwindcss postcss autoprefixer` has been run.
2.  **Correct `tailwind.config.ts` Content Paths**:
    -   The `content` array in `tailwind.config.ts` MUST include all paths where Tailwind classes are used (e.g., `./app/**/*.{js,ts,jsx,tsx,mdx}`, `./components/**/*.{js,ts,jsx,tsx,mdx}`).
    -   Ensure it's configured for `shadcn/ui` by including `../../packages/ui/**/*.{js,ts,jsx,tsx}` or similar path if `shadcn/ui` is installed as a package, or local path if copied.
3.  **`globals.css` Setup**:
    -   The `app/globals.css` file MUST contain the Tailwind base, components, and utilities directives:
        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```
    -   Any custom global styles will be added here, ensuring they integrate correctly with Tailwind.
4.  **Root Layout CSS Import**:
    -   `app/layout.tsx` MUST import `globals.css`: `import './globals.css';`
5.  **`shadcn/ui` Initialization**:
    -   Ensure `shadcn/ui` components are correctly initialized via `npx shadcn-ui@latest add <component-name>` for each required component. This process modifies `tailwind.config.ts`, `components.json`, and adds components to `components/ui`.
    -   Verify `utils.ts` in `lib/` for `cn` function is present.
6.  **`next-themes` Setup**:
    -   Install `next-themes`: `npm install next-themes`.
    -   Implement `ThemeProvider` in `app/layout.tsx` to wrap `children`, configured with `attribute="class"` and `defaultTheme="dark"` (for dark-first UI).
    -   Create a client component `components/common/ThemeToggle.tsx` (or similar) to allow users to switch themes, if desired (optional for initial implementation, but framework for it should be present).
7.  **Visual Verification Steps**:
    -   Run `npm run dev` and visually inspect pages (`/`, `/login`, `/signup`, `/tasks`) to confirm Tailwind and `shadcn/ui` styles are applied.
    -   Check for dark mode consistency.
8.  **Clear Troubleshooting Steps**:
    -   If styles are not applying:
        -   Check browser developer tools for CSS errors or missing styles.
        -   Verify `tailwind.config.ts` `content` paths cover the affected files.
        -   Ensure `globals.css` is imported in `layout.tsx`.
        -   Re-run `npm install` and `npm run dev`.

## 4. Design System

-   **Colors**: The color palette will directly match the existing Login / Signup pages. This implies a dark background with complementary accents for text, primary actions, and interactive elements. No new colors will be introduced. Emphasis on a high-contrast, professional dark theme.
-   **Typography Scale**:
    -   Based on the existing Next.js/Tailwind defaults, with adjustments if needed to match the login/signup pages.
    -   Clear hierarchy for headings (h1, h2, h3), body text, and smaller labels. Sans-serif fonts for readability.
-   **Buttons**:
    -   Defined through `shadcn/ui`'s `Button` component, with variants (e.g., `default`, `secondary`, `outline`, `ghost`, `link`, `destructive`) adhering to the established color scheme.
    -   Primary CTA button will use a prominent accent color from the theme.
-   **Cards**:
    -   Styled using `shadcn/ui`'s `Card` component, featuring dark backgrounds, rounded corners, and subtle shadows for depth.
    -   Used for `TaskStatsCard` and individual `TaskCard` elements.
-   **Inputs**:
    -   Standardized `shadcn/ui` `Input` and `Textarea` components, styled to fit the dark theme with clear focus states.
-   **Modals / Dialogs**:
    -   Leveraging `shadcn/ui`'s `Dialog` component for task creation, editing, and confirmation prompts, ensuring a consistent overlay and interaction pattern.
-   **Icon Usage**:
    -   **Lucide Icons**: All icons will be sourced from Lucide Icons to maintain visual consistency and ensure easy integration with React components. Icons will be used for `TaskStatsCard`, `EmptyState`, and task actions (edit, delete).

## 5. Page-by-Page UI Plan

### `/` Landing Page

-   **Layout Structure**:
    -   Full-width hero section.
    -   Vertically centered content (headline, subtitle, CTAs).
    -   Optional static stats section below the hero.
-   **Components Used**:
    -   `Header` (potentially a simplified version or none, depending on design)
    -   `h1` for bold headline, `p` for subtitle.
    -   `PrimaryButton` (for "Get Started").
    -   `SecondaryButton` (for optional future feature).
    -   `TaskStatsCard` (static, hardcoded data for visual appeal, not functional).
-   **UI States**:
    -   **Populated**: Displays hero content and static stats.

### `/login`

-   **Layout Structure**:
    -   Centered form within the viewport.
    -   Minimal surrounding UI, consistent with existing login page.
-   **Components Used**:
    -   `AuthForm` (mode: "login").
-   **UI States**:
    -   **Populated**: Displays the login form.

### `/signup`

-   **Layout Structure**:
    -   Centered form within the viewport.
    -   Minimal surrounding UI, consistent with existing signup page.
-   **Components Used**:
    -   `AuthForm` (mode: "signup").
-   **UI States**:
    -   **Populated**: Displays the signup form.

### `/tasks` Dashboard

-   **Layout Structure**:
    -   Full-width `DashboardLayout` component.
    -   `Header` at the top.
    -   Main content area below the header, divided into:
        -   Welcome Section.
        -   Horizontal row of `TaskStatsCard` components.
        -   Main panel for `TaskList` and `FilterTabs`.
-   **Components Used**:
    -   `Header`.
    -   `TaskStatsCard` (3 instances: Total, Completed, Pending).
    -   `FilterTabs`.
    -   `TaskList` (which internally uses `TaskCard` and `EmptyState`).
    -   `PrimaryButton` ("New Task").
-   **UI States**:
    -   **Loading**: Skeleton loaders or spinner for `TaskStatsCard` and `TaskList` while data is fetched.
    -   **Empty**: `EmptyState` component displayed within `TaskList` if no tasks are present for the current filter.
    -   **Populated**: Displays `TaskStatsCard` with counts and `TaskList` with `TaskCard` items.

## 6. Task Dashboard Behavior (UI ONLY)

This section describes UI interactions without backend logic:

-   **Add Task**: Clicking "New Task" button triggers a `Dialog` (modal) to appear, containing an input field and a submit button. UI for invalid input (e.g., empty title) should be present.
-   **Edit Task**: Clicking an "Edit" icon/button on a `TaskCard` triggers a `Dialog` (modal) to appear, pre-populated with the task's current details.
-   **Delete Task**: Clicking a "Delete" icon/button on a `TaskCard` triggers a confirmation `Dialog` (modal) asking "Are you sure?".
-   **Mark Complete**: Clicking the checkbox on a `TaskCard` visually updates the task (e.g., strikethrough, dimming) to indicate completion, *without* waiting for a backend response initially (optimistic UI update).
-   **Filters**: Clicking on "All", "Pending", or "Completed" `FilterTabs` visually changes the active tab and instantly re-renders the `TaskList` to show only tasks matching the selected filter.
-   **Empty State UI**: When the `TaskList` is empty for the current filter, the `EmptyState` component is shown with a relevant message and a "Create Task" button.
-   **Visual Distinction for Completed Tasks**: Completed `TaskCard` items will have strikethrough text for their title and be visually subdued (e.g., lower opacity, different text color) compared to pending tasks.

## 7. Responsiveness Strategy

-   **Mobile-first Approach**: All UI components and layouts will be designed and implemented with mobile screens as the primary target, using Tailwind CSS utilities (e.g., `sm:`, `md:`, `lg:`) to progressively enhance for larger screens.
-   **Tablet Adaptations**: Adjustments for tablet breakpoints (`md:`) will focus on optimizing content density and layout for a wider screen, potentially introducing multi-column layouts where appropriate (e.g., stats cards arranged in a grid).
-   **Desktop Layout**: The full desktop layout (`lg:`, `xl:`) will maximize screen real estate, ensuring comfortable viewing of the task list and dashboard elements.
-   **Dashboard Behavior on Small Screens**:
    -   Stats cards might stack vertically.
    -   Task cards will fill the width, potentially with action buttons becoming a dropdown menu if space is constrained.
    -   Header elements (logo, user name, logout) will adapt to a compact layout.

## 8. Accessibility & UX

-   **Keyboard Navigation**: All interactive elements (buttons, inputs, checkboxes, filter tabs) will be keyboard navigable, ensuring users can operate the application without a mouse.
-   **Focus States**: Clear visual focus indicators (e.g., outline rings) will be provided for all interactive elements to aid keyboard and assistive technology users.
-   **ARIA Considerations**: Appropriate ARIA attributes (e.g., `aria-label`, `aria-describedby`, `role`) will be used for complex widgets and dynamic content updates to convey meaning and state to screen readers.
-   **Color Contrast**: All text and interactive elements will meet WCAG AA color contrast guidelines against their backgrounds, adhering to the dark-first theme.
-   **Empty State UX**: The `EmptyState` will provide clear guidance and a call to action, preventing user confusion when lists are empty.

## 9. Testing & Visual QA

-   **Manual UI Checklist**:
    -   Verify all specified pages (`/`, `/login`, `/signup`, `/tasks`) load correctly.
    -   Check responsiveness across mobile, tablet, and desktop viewports.
    -   Confirm dark theme consistency across all elements.
    -   Validate interactive elements (buttons, checkboxes, filters) respond correctly.
    -   Ensure keyboard navigation and focus states are functional.
    -   Verify empty states and populated states for the task list.
    -   Check visual distinction for completed tasks.
-   **Theme Consistency Verification**: Visual inspection and potentially automated screenshot testing to ensure the color palette from login/signup is consistently applied everywhere.
-   **Responsive Behavior Checks**: Use browser developer tools to simulate different screen sizes and orientations, verifying correct layout and component adaptations.
-   **Confirmation that no default Next.js page exists**: Ensure that the default Next.js welcome page is replaced by the custom landing page (`app/page.tsx`).

## 10. Final Verification Checklist

-   [X] This plan describes a TODO application frontend.
-   [X] No e-commerce language or structure exists within this plan.
-   [X] The Landing page (`/`) layout matches the defined hero layout (dark gradient background, bold headline, subtitle, primary/secondary CTAs, small static stats).
-   [X] The Dashboard (`/tasks`) layout matches the defined productivity dashboard layout (Header, Welcome, Stats, Task List Panel, Filters, Empty State, visually distinct completed tasks).
-   [X] Color theme is consistent across all pages, reusing the palette from the existing login/signup pages.
-   [X] UI is designed to be production-ready (considering responsiveness, accessibility).
-   [X] All required sections of the plan template have been completed.