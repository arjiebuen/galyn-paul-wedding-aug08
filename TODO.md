# TODO — Daily RSVP Summary Email to Owner (Galyn)

## Steps
- [x] Explore repo & understand RSVP flow (Supabase + Resend email)
- [x] Add daily summary route `/api/rsvp/summary` that computes totals
- [x] Add `sendRSVPSummaryEmail` in `lib/email.ts` with totals + duplicate + status-change detection
- [x] Prevent duplicate RSVPs by email (unique constraint + update existing)
- [x] Configure Vercel Cron (vercel.json) to run daily at 8:00 AM
- [x] Upgrade Next.js to v15 to support `next.config.ts`
- [x] Verify TypeScript compiles (TSC_EXIT=0)
- [x] Verify build succeeds (summary route built)
- [ ] Commit changes to git
- [ ] Push to remote to trigger Vercel deployment
