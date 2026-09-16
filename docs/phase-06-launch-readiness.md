# Phase 6: Launch-readiness record

## Automated checks completed

- ESLint passes for the web application.
- The production Next.js build and TypeScript validation pass.
- All public routes generate successfully.
- The test suite covers 25 assertions across navigation, forms, analytics, core pages, reduced-motion behavior and the one-session introduction.
- The homepage hero now uses `next/image` with an explicit responsive size and priority loading instead of an unoptimized CSS background request.
- Scroll-linked work is consolidated into one passive, requestAnimationFrame-throttled handler.
- Motion content is present in the server-rendered document and `prefers-reduced-motion` disables the introduction, sticky sequence, marquee, masks and transforms.

## Manual release checks still required

The following items require a rendered browser/device pass and are intentionally not marked complete in the main plan:

1. Verify layouts at 360, 390, 768, 1024, 1440 and 1920 pixels.
2. Traverse every interactive element with keyboard only; confirm visible focus, menu escape behavior and logical focus order.
3. Review landmarks, headings, form labels and validation announcements with NVDA or VoiceOver.
4. Run Lighthouse against a production server and record LCP, CLS, INP and accessibility results.
5. Verify current Chrome, Edge, Firefox and Safari, including reduced-motion mode.
6. Capture approved baseline screenshots before enabling visual-regression enforcement.

## Release commands

```powershell
npm.cmd run lint --workspace=@ampar/web
npm.cmd run test --workspace=@ampar/web -- --run
npm.cmd run build --workspace=@ampar/web
```
