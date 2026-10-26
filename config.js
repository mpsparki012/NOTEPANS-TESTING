/* ============================================================
   NOTEPANS tester site — the ONE file you edit for links & numbers.
   Everything marked REPLACE-... must be changed before you go live.
   (A yellow "Setup needed" bar shows on the site until they're all filled in.)
   ============================================================ */
window.SITE = {
  /* --- App identity (already filled in from your code) --- */
  appName: "NOTEPANS",
  fullName: "Personal Archive of Notes & Schedules",
  packageId: "com.mpsparki012.snap",   // your Play applicationId
  developer: "mpsparki012",

  /* --- Contact (shown on every page + privacy policy) --- */
  contactEmail: "REPLACE-WITH-YOUR-EMAIL@gmail.com",

  /* --- Tester signup --------------------------------------
     Option A (Google Group): paste the group link below.
       Testers join the group, then opt in on Play.
     Option B (email list in Play Console): leave groupUrl as ""
       (empty quotes). Step 1 then becomes "Send me your Gmail"
       and the email arrives in your inbox for you to add.
  ---------------------------------------------------------- */
  groupUrl: "https://groups.google.com/g/REPLACE-WITH-YOUR-GROUP-NAME",

  /* These two are built from packageId. Only change them if Play gives you
     a different opt-in link (Play Console → Testing → Closed testing → Testers → Copy link). */
  optInUrl:  "https://play.google.com/apps/testing/com.mpsparki012.snap",
  playUrl:   "https://play.google.com/store/apps/details?id=com.mpsparki012.snap",

  /* --- Test requirements (Google's rule for new personal accounts) --- */
  testersNeeded: 12,
  daysNeeded: 14,

  /* --- Status badge on the home page ---
     "testing"  -> "Now in closed testing on Google Play"
     "live"     -> "Available on Google Play" (the buttons switch to the Play link)
  */
  status: "testing",

  /* --- Optional: real screenshots ---------------------------------
     By default the phone pictures are drawn from your app's own colors.
     To use real screenshots, put the image files in /assets and write
     their file names here, e.g. home: "assets/shot-home.webp"
     (phone-shaped images, about 1080×2340, work best). Leave "" to keep the drawing.
  ---------------------------------------------------------------- */
  screenshots: {
    home: "",
    projects: "",
    notes: "",
    vault: ""
  },

  /* --- Optional: launch video. Paste a YouTube link (watch or share link). Leave "" for none. */
  videoUrl: "",

  /* --- Legal pages: dates shown on the privacy policy & terms --- */
  policyEffective: "28 September 2026",
  policyUpdated: "26 October 2026"
};
