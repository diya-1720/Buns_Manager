/**
 * Swiss Minimalist SVG Icon Repository
 * Clean, pixel-perfect vector icons for major services & UI interactions.
 */

export const ICONS = {
  // Brand Icons
  gmail: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.5 4H3.5C2.67 4 2 4.67 2 5.5V18.5C2 19.33 2.67 20 3.5 20H20.5C21.33 20 22 19.33 22 18.5V5.5C22 4.67 21.33 4 20.5 4Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.2"/>
      <path d="M2 5.5L12 13L22 5.5" stroke="#EA4335" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 18.5V7L7 11V19" stroke="#4285F4" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M22 18.5V7L17 11V19" stroke="#34A853" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M6 19H18" stroke="#FBBC05" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `,

  instagram: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig-grad)" stroke-width="2"/>
      <circle cx="12" cy="12" r="4.2" stroke="url(#ig-grad)" stroke-width="2"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="#E1306C"/>
      <defs>
        <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FD5949"/>
          <stop offset="0.5" stop-color="#D6249F"/>
          <stop offset="1" stop-color="#285AEB"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  snapchat: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#FFFC00"/>
      <path d="M12 4.5C9.8 4.5 8.2 6.1 8.2 8.3C8.2 8.7 8.2 9.2 8.3 9.6C7.6 9.8 6.9 10.4 6.9 11.2C6.9 11.9 7.4 12.5 8.1 12.6C8 13.1 7.6 13.5 6.8 13.7C6.3 13.8 5.8 14.1 5.8 14.6C5.8 15.2 6.5 15.6 7.7 15.8C8 16.3 8.8 16.8 10 16.9C10.7 17.5 11.4 17.8 12 17.8C12.6 17.8 13.3 17.5 14 16.9C15.2 16.8 16 16.3 16.3 15.8C17.5 15.6 18.2 15.2 18.2 14.6C18.2 14.1 17.7 13.8 17.2 13.7C16.4 13.5 16 13.1 15.9 12.6C16.6 12.5 17.1 11.9 17.1 11.2C17.1 10.4 16.4 9.8 15.7 9.6C15.8 9.2 15.8 8.7 15.8 8.3C15.8 6.1 14.2 4.5 12 4.5Z" fill="#000000" stroke="#000000" stroke-width="0.8" stroke-linejoin="round"/>
    </svg>
  `,

  github: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017C2 16.442 4.87 20.193 8.84 21.522C9.34 21.614 9.52 21.305 9.52 21.04C9.52 20.803 9.51 20.174 9.51 19.339C6.73 19.943 6.14 17.998 6.14 17.998C5.68 16.837 5.03 16.529 5.03 16.529C4.12 15.908 5.1 15.921 5.1 15.921C6.1 15.992 6.63 16.945 6.63 16.945C7.52 18.471 8.97 18.031 9.54 17.777C9.63 17.129 9.89 16.688 10.17 16.442C7.95 16.189 5.62 15.331 5.62 11.503C5.62 10.411 6.01 9.518 6.65 8.82C6.55 8.568 6.2 7.551 6.75 6.186C6.75 6.186 7.59 5.917 9.5 7.21C10.3 6.988 11.15 6.877 12 6.873C12.85 6.877 13.7 6.988 14.5 7.21C16.41 5.917 17.25 6.186 17.25 6.186C17.8 7.551 17.45 8.568 17.35 8.82C17.99 9.518 18.38 10.411 18.38 11.503C18.38 15.341 16.04 16.186 13.81 16.434C14.17 16.744 14.49 17.355 14.49 18.288C14.49 19.637 14.48 20.725 14.48 21.04C14.48 21.308 14.66 21.621 15.17 21.52C19.14 20.188 22 16.44 22 12.017C22 6.484 17.522 2 12 2Z" fill="#0F172A"/>
    </svg>
  `,

  discord: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.3 5.4C17.9 4.7 16.3 4.2 14.7 4C14.5 4.4 14.3 4.9 14.1 5.3C12.4 5 10.7 5 9 5.3C8.8 4.9 8.6 4.4 8.4 4C6.8 4.2 5.2 4.7 3.8 5.4C1 9.6 0.2 13.7 0.6 17.7C2.4 19.1 4.2 19.9 6 20.5C6.4 19.9 6.8 19.3 7.1 18.6C6.5 18.4 5.9 18.1 5.3 17.7C5.4 17.6 5.6 17.5 5.7 17.4C9.3 19.1 13.8 19.1 17.4 17.4C17.5 17.5 17.7 17.6 17.8 17.7C17.2 18.1 16.6 18.4 16 18.6C16.3 19.3 16.7 19.9 17.1 20.5C18.9 19.9 20.7 19.1 22.5 17.7C23 13.1 21.8 9 19.3 5.4ZM8 14.8C6.9 14.8 6.1 13.8 6.1 12.6C6.1 11.4 7 10.4 8 10.4C9.1 10.4 9.9 11.4 9.9 12.6C9.9 13.8 9.1 14.8 8 14.8ZM15.1 14.8C14 14.8 13.2 13.8 13.2 12.6C13.2 11.4 14.1 10.4 15.1 10.4C16.2 10.4 17 11.4 17 12.6C17 13.8 16.2 14.8 15.1 14.8Z" fill="#5865F2"/>
    </svg>
  `,

  apple: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.7 17.6C17.8 19 16.8 20.3 15.3 20.3C13.8 20.3 13.3 19.4 11.6 19.4C9.9 19.4 9.3 20.3 7.9 20.3C6.4 20.3 5.3 18.9 4.4 17.6C2.6 15 1.2 10.8 2.7 8.3C3.5 7 4.9 6.1 6.5 6.1C8 6.1 9 7 10.1 7C11.1 7 11.9 6.1 13.6 6.1C15 6.1 16.3 6.8 17.2 7.9C13.6 10 14.2 15.2 18.7 17.6ZM14.8 4.2C15.4 3.4 15.9 2.3 15.7 1.2C14.7 1.2 13.5 1.8 12.9 2.6C12.3 3.3 11.8 4.4 12 5.5C13.1 5.6 14.2 4.9 14.8 4.2Z" fill="#1E293B"/>
    </svg>
  `,

  twitter: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#0F172A"/>
    </svg>
  `,

  spotify: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#1DB954"/>
      <path d="M16.5 15.8C16.3 16.1 15.9 16.2 15.6 16C12.8 14.3 9.5 13.9 5.6 14.8C5.2 14.9 4.9 14.6 4.8 14.3C4.7 13.9 5 13.6 5.3 13.5C9.6 12.5 13.3 13 16.3 14.9C16.6 15 16.7 15.4 16.5 15.8ZM17.9 12.8C17.6 13.2 17.1 13.3 16.7 13.1C13.7 11.2 9 10.7 5.4 11.8C4.9 11.9 4.5 11.7 4.3 11.2C4.2 10.8 4.4 10.3 4.9 10.2C9 9 14.2 9.5 17.6 11.6C18 11.8 18.1 12.4 17.9 12.8ZM18 9.7C14.4 7.5 8.3 7.3 4.8 8.4C4.3 8.5 3.7 8.2 3.5 7.7C3.4 7.1 3.7 6.6 4.2 6.4C8.3 5.2 15 5.4 19.1 7.9C19.6 8.2 19.8 8.8 19.5 9.3C19.2 9.7 18.5 9.9 18 9.7Z" fill="#FFFFFF"/>
    </svg>
  `,

  amazon: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.9 14.4C13.9 14.4 12.6 15.4 11.1 15.4C9.5 15.4 8.7 14.3 8.7 12.8C8.7 10.6 10.6 9.8 12.6 9.8V9.5C12.6 8.5 12.1 7.8 10.9 7.8C9.9 7.8 8.9 8.3 8.3 8.7L7.7 7.3C8.5 6.7 9.8 6.2 11.3 6.2C13.4 6.2 14.4 7.4 14.4 9.6V13.8C14.4 14.7 14.7 15.3 15.1 15.3L14.7 16.3C14.2 16.3 13.9 15.5 13.9 14.4ZM12.6 11.1C11.5 11.1 10.5 11.5 10.5 12.7C10.5 13.6 11 14.2 11.9 14.2C12.9 14.2 13.5 13.6 13.7 12.9V11.2C13.3 11.1 12.9 11.1 12.6 11.1Z" fill="#111827"/>
      <path d="M18.8 17.5C15.2 20.2 10.2 20.7 5.2 18.2C4.8 18 5.2 17.5 5.5 17.7C9.9 20 14.3 19.5 17.6 17C17.9 16.8 18.3 17.1 18.8 17.5Z" fill="#FF9900"/>
      <path d="M19.5 16.2C19.3 16.4 18.1 16.8 17.7 16.9C17.5 17 17.5 16.8 17.7 16.6C18.4 15.9 19.3 14.4 19.3 14.4C19.3 14.4 19.7 15.6 19.5 16.2Z" fill="#FF9900"/>
    </svg>
  `,

  globe: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  `,

  // UI Icons
  lock: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  `,

  unlock: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
    </svg>
  `,

  key: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 2l-2 2m-1.5 1.5L14 9a5 5 0 1 0 3 3l5-5-2-2-2 2z"></path>
    </svg>
  `,

  shield: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  `,

  shieldAlert: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  `,

  plus: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  `,

  search: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,

  copy: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  `,

  check: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `,

  eye: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `,

  eyeOff: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  `,

  star: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  `,

  starFilled: `
    <svg viewBox="0 0 24 24" fill="#FACC15" stroke="#EAB308" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  `,

  edit: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  `,

  trash: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  `,

  refresh: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  `,

  externalLink: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  `,

  settings: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  `,

  download: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `,

  upload: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  `,

  close: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `
};

/**
 * Returns the matching SVG icon for a service name or domain
 */
export function getServiceIcon(serviceName = '') {
  const norm = serviceName.trim().toLowerCase();
  if (norm.includes('gmail') || norm.includes('google')) return ICONS.gmail;
  if (norm.includes('instagram') || norm.includes('insta')) return ICONS.instagram;
  if (norm.includes('snapchat') || norm.includes('snap')) return ICONS.snapchat;
  if (norm.includes('github') || norm.includes('git')) return ICONS.github;
  if (norm.includes('discord')) return ICONS.discord;
  if (norm.includes('apple') || norm.includes('icloud')) return ICONS.apple;
  if (norm.includes('twitter') || norm === 'x' || norm.includes('x.com')) return ICONS.twitter;
  if (norm.includes('spotify')) return ICONS.spotify;
  if (norm.includes('amazon')) return ICONS.amazon;
  return ICONS.globe;
}
