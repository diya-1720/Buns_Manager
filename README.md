# 🥯 BUNS MANAGER — Zero-Knowledge Personal Password Vault

<div align="center">

```
  ____  _   _ _   _ ____    __  __    _    _   _    _    ____ _____ ____  
 | __ )| | | | \ | / ___|  |  \/  |  / \  | \ | |  / \  / ___| ____|  _ \ 
 |  _ \| | | |  \| \___ \  | |\/| | / _ \ |  \| | / _ \| |  _|  _| | |_) |
 | |_) | |_| | |\  |___) | | |  | |/ ___ \| |\  |/ ___ \ |_| | |___|  _ < 
 |____/ \___/|_| \_|____/  |_|  |_/_/   \_\_| \_/_/   \_\____|_____|_| \_\
```

**A private, zero-knowledge personal credential manager crafted with a tactile Handwritten Paper & Neo-Brutalist aesthetic.**  
*Engineered with Light Sky Blue, Aesthetic Pastel Yellow, and Pablo Impallari's Caveat handwriting typography.*

<br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-FEF08A?style=for-the-badge&logoColor=111827&labelColor=111827)](LICENSE)
[![Security: Web Crypto AES-256-GCM](https://img.shields.io/badge/Encryption-AES--256--GCM-BAE6FD?style=for-the-badge&logoColor=111827&labelColor=111827)](#-zero-knowledge-security-architecture)
[![Key Derivation: PBKDF2](https://img.shields.io/badge/PBKDF2-100%2C000%20Rounds-FEF08A?style=for-the-badge&logoColor=111827&labelColor=111827)](#-cryptographic-workflow)
[![PWA: 100% Offline Capable](https://img.shields.io/badge/PWA-100%25%20Offline-BAE6FD?style=for-the-badge&logoColor=111827&labelColor=111827)](#-progressive-web-app--mobile-setup)
[![Runtime: Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20Runtime-FEF08A?style=for-the-badge&logoColor=111827&labelColor=111827)](#-prerequisites--local-setup)
[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-BAE6FD?style=for-the-badge&logoColor=111827&labelColor=111827)](#-deployment-guide)

<br/>

[Key Features](#-key-features) • [Security Architecture](#-zero-knowledge-security-architecture) • [Design System](#-design-system--aesthetic) • [Supported Services](#-supported-services--icons) • [Local Setup](#-quickstart--local-development) • [Deployment](#-deployment-guide) • [Mobile PWA](#-installing-as-a-mobile-app) • [FAQ](#-faq--privacy-guarantee)

---

</div>

## 📖 Overview

In an era of recurring subscription password managers, telemetry bloat, and high-profile cloud database breaches, **BUNS MANAGER** provides a lightweight, secure, and refreshing alternative.

Designed specifically for personal use across high-frequency platforms — including **multiple Gmail accounts**, **Instagram**, **Snapchat**, **GitHub**, **Discord**, **Spotify**, **Amazon**, and custom web logins — BUNS MANAGER operates with a strict **Zero-Knowledge Architecture**.

- **Zero Remote Cloud Storage**: Your plaintext passwords never travel over a network or touch a remote server.
- **Client-Side Cryptography**: All encryption, key derivation, and decryption occur strictly within your browser's native cryptographic engine using the W3C Web Crypto API (`SubtleCrypto`).
- **Tactile Neo-Brutalist & Paper Design**: Eliminates sterile, generic AI templates in favor of warm notebook paper grids, solid ink borders, tactile button presses, and Pablo Impallari's classic **Caveat** handwriting type family.
- **PWA Ready**: Works 100% offline. Install it as a native-feeling app on iPhone, iPad, Android, macOS, or Windows with zero app store overhead.

---

## ✨ Key Features

### 🛡️ 1. Zero-Knowledge Cryptography & Vault Security
- **AES-256-GCM Authenticated Encryption**: Standard-grade Galois/Counter Mode encryption guarantees both data confidentiality and cryptographic tamper resistance.
- **PBKDF2 Password Hashing**: Key derivation uses **100,000 iterations of SHA-256** combined with a cryptographically randomized 16-byte salt to prevent rainbow table and dictionary attacks.
- **Shoulder-Surfing Defense**: All passwords remain masked by default (`••••••••`). Revealing a password initiates a visual 10-second auto-mask timer.
- **Inactivity Auto-Lock**: Configurable security timeout locks the vault if left unattended on a desk or mobile device.
- **One-Click Clipboard Clearance**: Quick-copy credentials with automatic clipboard clearing recommendations and animated checkmark feedback.

### 📑 2. Multi-Account Management & Brand SVGs
- **Multiple Accounts Per Platform**: Easily store, search, and tag multiple credentials for the same service (e.g. `Personal Primary Gmail`, `Work / Client Consulting Gmail`, `Secondary Discord Alt`, `Creator Instagram`).
- **Integrated Brand SVG Icons**: High-contrast, scalable vector icons embedded directly for Gmail/Google, Instagram, Snapchat, GitHub, Discord, Spotify, Amazon, Twitter/X, and custom websites.
- **Real-Time Instant Search & Filter**: Filter instantly by keyword, username, notes, or specific platform category tabs without UI lag.

### 🎲 3. Customizable Password & Passphrase Generator
- **High-Entropy Password Engine**: Configurable length slider (8 to 64 characters) with granular toggles for uppercase, lowercase, numbers, and special symbols.
- **Ambiguity Filter**: Option to exclude easily confused characters (e.g., `0`, `O`, `1`, `l`, `I`, `|`).
- **Memorable Diceware-Style Passphrases**: Generate human-readable multi-word passphrases separated by hyphens (e.g., `summit-meadow-horizon-zenith`).
- **Live Password Strength Meter**: Dynamic entropy score calculation classifying passwords from Weak to Ultra Strong.

### 🎨 4. Retro Paper & Neo-Brutalist Aesthetic
- **Curated Paper Color Palette**:
  - **Graph Paper Canvas**: Light Sky Blue (`#E0F2FE`) with faint graph-line grids and classic double red margin guidelines.
  - **Index Cards & Modals**: Aesthetic Pastel Butter Yellow (`#FEF08A` / `#FEF9C3`) and fully opaque clean off-white paper (`#FAF8F5`).
  - **Solid Ink Elements**: Jet-black structural ink borders (`2px / 2.5px solid #111827`) and hard-offset drop shadows (`4px 4px 0px #111827`).
- **Handwriting Typography**:
  - Headers, tags, and annotations use **Caveat & Caveat Brush** (by Pablo Impallari) for an authentic notebook feel.
  - Sensitive credential fields use **JetBrains Mono** for unambiguous, clean character distinction.

### 📦 5. Data Sovereignty & Portability
- **JSON Vault Backup**: One-click encrypted or plaintext JSON export to preserve full control of your data.
- **CSV Spreadsheet Export**: Export to universal CSV for easy migration or physical printing.
- **Seamless JSON Restoration**: Safely import existing backups anytime without overwriting duplicate entries.

### 📱 6. Progressive Web App (PWA) & Offline First
- **Signature Bunny Face App Icon**: Custom neo-brutalist bunny face vector icon (`icon.svg` & `favicon.svg`) designed for mobile home screens, bookmarks, and browser tabs.
- Pre-caches core styles, scripts, and fonts using a **Network-First Service Worker**.
- Functions seamlessly when disconnected from Wi-Fi or cellular networks.
- Full-screen standalone display with custom home screen icons and theme matching.

---

## 🔒 Zero-Knowledge Security Architecture

### Cryptographic Workflow

```
[ Master Password ] ──┐
                      ▼
               [ Web Crypto API ]
                      │
   Generate 16-byte Cryptographic Salt (CSPRNG)
                      │
                      ▼
   PBKDF2-SHA-256 (100,000 Iterations)
                      │
                      ▼
         [ 256-bit AES-GCM Key ]
                      │
         ┌────────────┴────────────┐
         ▼                         ▼
  Vault Encryption          Vault Decryption
 (Unique 12-byte IV)       (Authenticated Auth Tag)
         │                         │
         ▼                         ▼
Encrypted Payload in     Decrypted Plaintext in
    localStorage             Browser Memory
```

### Threat Model & Mitigations

| Threat | Impact | BUNS MANAGER Defense |
| :--- | :--- | :--- |
| **Server-Side Data Breach** | Critical | **N/A**. No server database exists; data is stored strictly in your local device storage. |
| **Physical Shoulder Surfing**| High | Passwords masked by default; 10-second auto-mask timer; auto-lock on idle. |
| **Tampering / Bit-Flipping** | High | **AES-256-GCM** authenticated cipher detects any payload alteration and rejects decryption. |
| **Brute-Force Master Pass** | Moderate | **PBKDF2** with **100,000 iterations** drastically increases compute cost per guess. |
| **Third-Party Script Leaks** | High | **Zero runtime dependencies**. No external tracking, analytics, or third-party ad scripts. |

---

## 🎨 Design System & Aesthetic

BUNS MANAGER uses a cohesive design system defined in `css/design-tokens.css`:

```css
:root {
  /* Canvas & Grids */
  --sky-blue-50:    #F0F9FF;
  --sky-blue-100:   #E0F2FE; /* Primary Graph Canvas */
  --sky-blue-200:   #BAE6FD;
  
  /* Paper Cards & Accents */
  --yellow-100:     #FEF9C3; /* Warm Paper Card */
  --yellow-200:     #FEF08A; /* Aesthetic Pastel Yellow */
  --paper-offwhite: #FAF8F5; /* Opaque Modal Surface */
  
  /* Ledger Lines & Structural Ink */
  --ink-primary:    #111827; /* Solid Ink Border & Typography */
  --ledger-red:     rgba(239, 68, 68, 0.4); /* Left Margin Notebook Rule */
  
  /* Shadows & Radius */
  --shadow-solid:   4px 4px 0px #111827;
  --radius-paper:   6px;
}
```

---

## 🏷️ Supported Services & Icons

Native vector glyphs and dedicated color badges are pre-packaged for common consumer platforms:

| Service | Category | Built-in Features |
| :--- | :--- | :--- |
| **Gmail / Google** | Email & Workspace | Multi-account support (e.g. work, personal, school) |
| **Instagram** | Social Media | Handle and password storage with direct quick-links |
| **Snapchat** | Messaging | Dedicated yellow punch badge and credentials storage |
| **GitHub** | Developer Tools | Support for usernames, access tokens, and passwords |
| **Discord** | Gaming / Community | Distinguish multiple accounts or bot credentials |
| **Spotify** | Entertainment | Audio streaming credentials and email mapping |
| **Amazon** | E-Commerce | Shopping and AWS root/IAM account credentials |
| **Custom Websites** | General Web | Custom service name, URL, and category tags |

---

## 📁 Project Structure

```
Buns_Manager/
├── index.html              # Clean single-page application shell
├── favicon.svg             # Crisp 64x64 bunny face browser tab icon
├── icon.svg                # 512x512 neo-brutalist bunny face app icon for PWA & mobile
├── manifest.json           # W3C Web App Manifest (PWA metadata & theme)
├── sw.js                   # Network-First Service Worker for 100% offline use
├── server.mjs              # Zero-dependency Node.js HTTP dev server (auto-port fallback)
├── package.json            # Project configuration & npm execution scripts
├── LICENSE                 # Open-source MIT License
├── .gitignore              # Git ignore rules for node_modules and OS artifacts
├── README.md               # Complete architecture & deployment guide
├── css/
│   ├── design-tokens.css   # Color palette tokens, Caveat typography, borders
│   ├── base.css            # Retro graph paper grid background & mobile resets
│   ├── components.css      # Non-congested header, index cards, solid modals
│   └── animations.css      # Tactile 60fps micro-interactions
└── js/
    ├── crypto.js           # Web Crypto API (AES-256-GCM & PBKDF2 engine)
    ├── generator.js        # High-entropy random passwords & word passphrases
    ├── storage.js          # LocalStorage manager with encryption & clean slate
    ├── icons.js            # Scalable vector SVG icon repository
    ├── audit.js            # Password strength meter & entropy analyzer
    └── app.js              # Application controller, PWA lifecycle, and reactive DOM
```

---

## 🚀 Quickstart & Local Development

### Prerequisites
- Any modern web browser (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge).
- Optional: **Node.js** (v16+) for running the bundled development server.

### 1. Clone the Repository
```bash
git clone https://github.com/diya-1720/Buns_Manager.git
cd Buns_Manager
```

### 2. Start the Local Server

**Option A: Using Node.js & npm (Recommended)**
```bash
npm run dev
```
*The dev server automatically detects if port `3000` is in use and seamlessly falls back to `3001` or the next available port.*

**Option B: Using Python**
```bash
# Python 3
python -m http.server 3000
```

**Option C: Using VS Code Live Server**
- Open the project directory in VS Code.
- Right-click `index.html` and click **"Open with Live Server"**.

### 3. Access in Browser
Visit **`http://localhost:3000`** in your preferred browser.

---

## 🌐 Deployment Guide

Because **BUNS MANAGER** is built with modern vanilla web standards with zero compilation or bundler requirements, it can be hosted on any static hosting provider within minutes.

### ⚡ Deploy to Vercel (Recommended)

1. Fork or push this repository to your GitHub account: `https://github.com/diya-1720/Buns_Manager.git`.
2. Head over to **[vercel.com](https://vercel.com)** and log in with GitHub.
3. Click **"Add New..." > "Project"**.
4. Select the **`Buns_Manager`** repository.
5. In the configuration screen, keep all default settings:
   - **Framework Preset**: *Other*
   - **Root Directory**: `./`
   - **Build Command**: *None*
   - **Output Directory**: `./`
6. Click **Deploy**. Vercel will provision an instant, free global SSL URL (e.g. `https://buns-manager.vercel.app`).

### 🐙 Deploy to GitHub Pages

1. In your GitHub repository, navigate to **Settings > Pages**.
2. Under **Build and deployment > Source**, choose **Deploy from a branch**.
3. Select branch **`main`** and directory **`/ (root)`**.
4. Click **Save**. Your site will be published at `https://diya-1720.github.io/Buns_Manager/`.

### 🪣 Deploy to Netlify / Cloudflare Pages
- Drag and drop the project folder directly into the Netlify or Cloudflare Pages web console for instant hosting.

---

## 📲 Installing as a Mobile App

Once your vault is deployed to an HTTPS domain (such as Vercel or GitHub Pages), you can install it directly onto your smartphone as a standalone Progressive Web App.

### 🍏 On iOS (iPhone / iPad)
1. Open your published vault URL in **Safari**.
2. Tap the **Share** button (the square with an upward pointing arrow) in the bottom navigation bar.
3. Scroll down and tap **"Add to Home Screen"**.
4. Confirm the app title (*BUNS MANAGER*) and tap **Add**.
5. BUNS MANAGER is now accessible directly from your home screen with a full-screen app view.

### 🤖 On Android
1. Open your published vault URL in **Google Chrome**.
2. Tap the **"Install App"** prompt that appears, or tap the three vertical dots (**⋮**) in the top right.
3. Select **"Install app"** or **"Add to Home screen"**.
4. Confirm installation. The app will be added to your app drawer and home screen.

---

## ❓ FAQ & Privacy Guarantee

<details>
<summary><strong>Where are my passwords stored?</strong></summary>
<br/>
All passwords and metadata are stored exclusively inside your device's browser local storage (<code>localStorage</code>). No cloud servers, external databases, or third-party services are involved.
</details>

<details>
<summary><strong>What happens if I forget my Master Password?</strong></summary>
<br/>
Because BUNS MANAGER is strictly zero-knowledge, there is no "Forgot Password" or server recovery backdoor. If you lose your master password, nobody (including the developers) can decrypt your vault. We recommend keeping an offline JSON backup in a secure physical location.
</details>

<details>
<summary><strong>Can I use this offline without an internet connection?</strong></summary>
<br/>
Yes! Thanks to the embedded Service Worker (PWA), all HTML, CSS, fonts, and JavaScript assets are pre-cached. You can use BUNS MANAGER on airplanes, subways, or anywhere without an active network connection.
</details>

<details>
<summary><strong>Can I store multiple Gmail or Discord accounts?</strong></summary>
<br/>
Yes! You can add as many separate accounts as you need for any platform, using the account label/notes field to distinguish them (e.g., <code>Personal Gmail</code>, <code>Work Gmail</code>).
</details>

---

## 🤝 Contributing

Contributions, feature suggestions, and security reviews are welcome!

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'feat: add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">
  <sub>Crafted with care for private, secure personal credential management.</sub>
</div>
