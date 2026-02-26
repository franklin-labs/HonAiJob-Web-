
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AppShell } from "./app-shell";
import { createMemoryRouter, RouterProvider } from "react-router";
import { I18nProvider } from "~/i18n/i18n";
import { CvProvider } from "~/context/cv-context";

// Mock resize observer for layout
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: query === "(min-width: 1024px)", // Default to desktop
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const router = createMemoryRouter([
    {
      path: "/",
      element: children,
    },
  ]);
  return (
    <I18nProvider>
      <CvProvider>
        <RouterProvider router={router} />
      </CvProvider>
    </I18nProvider>
  );
};

describe("AppShell", () => {
  it("renders children content", () => {
    render(
      <Wrapper>
        <AppShell>
          <div data-testid="content">Main Content</div>
        </AppShell>
      </Wrapper>
    );
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("toggles sidebar on desktop", () => {
    render(
      <Wrapper>
        <AppShell>
          <div>Content</div>
        </AppShell>
      </Wrapper>
    );

    // Find the desktop toggle button (hidden on mobile, visible on lg)
    // We can find it by icon or class, but better by role/label if added.
    // In our code: <Button ... onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
    // It has a Menu/PanelLeft icon.
    // Since we don't have aria-label on that button specifically (only sr-only on mobile menu),
    // we might need to add one to target it easily.
    
    // Let's assume we can find it by the icon or similar.
    // Actually, let's add aria-label to the button in the code first for better a11y and testing.
  });
});
