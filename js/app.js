/**
 * Papier Vault — Main Application Controller
 * Aesthetic Paper & Neo-Brutalist Personal Password Manager
 * Light Sky Blue & Aesthetic Pastel Yellow Exclusive Palette
 * Mobile-First & PWA Installable
 */

import { ICONS, getServiceIcon } from './icons.js';
import { PasswordGenerator } from './generator.js';
import { VaultStorage } from './storage.js';

class PapierVaultApp {
  constructor() {
    this.storage = new VaultStorage();
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.sortBy = 'recent';
    this.visiblePasswords = new Set();
    this.hideTimers = new Map();
    this.inactivityTimeout = null;
    this.INACTIVITY_LIMIT_MS = 15 * 60 * 1000;
    this.deferredPrompt = null;

    this.init();
  }

  async init() {
    this.registerServiceWorker();
    this.bindIcons();
    this.bindEvents();
    this.setupInactivityTracker();
    this.setupPWAInstall();
    await this.checkLockStatusAndRender();
  }

  /**
   * Register Service Worker for offline PWA support
   */
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(() => console.log('Papier Vault Service Worker Registered'))
          .catch(err => console.log('SW registration note:', err));
      });
    }
  }

  /**
   * PWA Install Prompt Listener
   */
  setupPWAInstall() {
    const installBtn = document.getElementById('btnInstallApp');

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.deferredPrompt = e;
      if (installBtn) {
        installBtn.classList.remove('hidden');
      }
    });

    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        if (!this.deferredPrompt) {
          this.showToast('To install: tap "Share" or "Menu" in browser and choose "Add to Home Screen"');
          return;
        }
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          installBtn.classList.add('hidden');
          this.showToast('App installed successfully!', 'success');
        }
        this.deferredPrompt = null;
      });
    }
  }

  /**
   * Inject vector icons into static DOM elements
   */
  bindIcons() {
    document.getElementById('brandLogoIcon').innerHTML = ICONS.shield;
    document.getElementById('searchIconWrap').innerHTML = ICONS.search;
    document.getElementById('keyIconSpan').innerHTML = ICONS.key;
    document.getElementById('settingsIconSpan').innerHTML = ICONS.download;
    document.getElementById('lockStatusIconSpan').innerHTML = ICONS.lock;
    document.getElementById('plusIconSpan').innerHTML = ICONS.plus;
    document.getElementById('emptyStateIcon').innerHTML = ICONS.key;
    document.getElementById('lockHaloIcon').innerHTML = ICONS.lock;
    document.getElementById('exportJsonIcon').innerHTML = ICONS.download;
    document.getElementById('exportCsvIcon').innerHTML = ICONS.download;
    document.getElementById('importIconSpan').innerHTML = ICONS.upload;

    // Inject icons into quick pick modal buttons
    document.querySelectorAll('.service-pick-icon').forEach(span => {
      const iconKey = span.getAttribute('data-icon');
      if (ICONS[iconKey]) {
        span.innerHTML = ICONS[iconKey];
      }
    });
  }

  /**
   * Check if vault is locked or unlocked, then update UI
   */
  async checkLockStatusAndRender() {
    const lockScreen = document.getElementById('lockScreen');
    const lockBtnText = document.getElementById('lockBtnText');

    if (this.storage.hasMasterPassword()) {
      lockBtnText.textContent = 'Lock Vault';
      if (!this.storage.isUnlocked()) {
        lockScreen.classList.remove('hidden');
        document.getElementById('inputUnlockPassword').focus();
        return;
      }
    } else {
      lockBtnText.textContent = 'Set Lock';
    }

    lockScreen.classList.add('hidden');
    await this.refreshVault();
  }

  /**
   * Refresh accounts data and render grid
   */
  async refreshVault() {
    try {
      const items = await this.storage.getItems();
      this.renderFilterBadges(items);
      this.renderGrid(items);
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  /**
   * Render badge counts on filter pills
   */
  renderFilterBadges(items) {
    const isApp = (i, name) => (i.service && i.service.toLowerCase().includes(name)) || i.category === name;

    const countGmail = items.filter(i => isApp(i, 'gmail') || isApp(i, 'google')).length;
    const countInsta = items.filter(i => isApp(i, 'instagram') || isApp(i, 'insta')).length;
    const countSnap = items.filter(i => isApp(i, 'snapchat') || isApp(i, 'snap')).length;
    const countGit = items.filter(i => isApp(i, 'github') || isApp(i, 'git')).length;
    const countDiscord = items.filter(i => isApp(i, 'discord')).length;
    const countWebsites = items.filter(i => !['gmail', 'google', 'instagram', 'snapchat', 'github', 'discord'].some(s => (i.service || '').toLowerCase().includes(s))).length;

    document.getElementById('badgeAll').textContent = items.length;
    document.getElementById('badgeGmail').textContent = countGmail;
    document.getElementById('badgeInstagram').textContent = countInsta;
    document.getElementById('badgeSnapchat').textContent = countSnap;
    document.getElementById('badgeGitHub').textContent = countGit;
    document.getElementById('badgeDiscord').textContent = countDiscord;
    document.getElementById('badgeWebsites').textContent = countWebsites;
  }

  /**
   * Filter and sort items based on active state
   */
  filterAndSortItems(items) {
    let filtered = [...items];

    // Search query filter
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      filtered = filtered.filter(item => {
        return (
          (item.service && item.service.toLowerCase().includes(q)) ||
          (item.label && item.label.toLowerCase().includes(q)) ||
          (item.username && item.username.toLowerCase().includes(q)) ||
          (item.notes && item.notes.toLowerCase().includes(q)) ||
          (item.url && item.url.toLowerCase().includes(q))
        );
      });
    }

    // Category filter
    if (this.currentFilter !== 'all') {
      const f = this.currentFilter.toLowerCase();
      if (f === 'websites') {
        filtered = filtered.filter(i => !['gmail', 'google', 'instagram', 'snapchat', 'github', 'discord'].some(s => (i.service || '').toLowerCase().includes(s)));
      } else {
        filtered = filtered.filter(i => (i.service && i.service.toLowerCase().includes(f)) || i.category === f);
      }
    }

    // Sorting
    filtered.sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }
      if (this.sortBy === 'service-asc') {
        return a.service.localeCompare(b.service);
      } else if (this.sortBy === 'label-asc') {
        return (a.label || '').localeCompare(b.label || '');
      } else {
        return (b.updatedAt || 0) - (a.updatedAt || 0);
      }
    });

    return filtered;
  }

  /**
   * Render vault cards grid (Aesthetic Pastel Yellow and Sky Blue)
   */
  renderGrid(items) {
    const grid = document.getElementById('vaultGrid');
    const emptyState = document.getElementById('emptyVaultState');
    const filtered = this.filterAndSortItems(items);

    if (filtered.length === 0) {
      grid.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');

    grid.innerHTML = filtered.map(item => {
      const isVisible = this.visiblePasswords.has(item.id);
      const strength = PasswordGenerator.evaluateStrength(item.password);
      const iconSvg = getServiceIcon(item.service);
      const isPinned = item.pinned;

      return `
        <article class="vault-card ${isPinned ? 'pinned' : ''}" data-id="${item.id}">
          <!-- Card Header -->
          <div class="card-header">
            <div class="card-service-info">
              <div class="service-icon-box" title="${this.escapeHtml(item.service)}">
                ${iconSvg}
              </div>
              <div class="card-titles">
                <span class="service-title">${this.escapeHtml(item.service)}</span>
                <span class="service-label-tag">
                  ${this.escapeHtml(item.label || 'Account')}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="card-actions-menu">
              <button type="button" class="action-icon-btn btn-toggle-pin ${isPinned ? 'pin-active' : ''}" data-id="${item.id}" title="${isPinned ? 'Unpin' : 'Pin to top'}">
                ${isPinned ? ICONS.starFilled : ICONS.star}
              </button>
              <button type="button" class="action-icon-btn btn-edit-account" data-id="${item.id}" title="Edit Credential">
                ${ICONS.edit}
              </button>
              <button type="button" class="action-icon-btn btn-delete-account" data-id="${item.id}" title="Delete Account">
                ${ICONS.trash}
              </button>
            </div>
          </div>

          <!-- Credentials Body -->
          <div class="card-fields">
            <!-- Username / Email -->
            <div class="credential-field">
              <div class="field-label-group">
                <span class="field-micro-label">Username / Email</span>
                <span class="field-value">${this.escapeHtml(item.username)}</span>
              </div>
              <div class="field-tools">
                <button type="button" class="field-tool-btn btn-copy-username" data-text="${this.escapeHtml(item.username)}" title="Copy Username">
                  ${ICONS.copy} Copy
                </button>
              </div>
            </div>

            <!-- Password -->
            <div class="credential-field">
              <div class="field-label-group">
                <span class="field-micro-label">Password</span>
                <span class="field-value mono">
                  ${isVisible ? this.escapeHtml(item.password) : '••••••••••••••••'}
                </span>
              </div>
              <div class="field-tools">
                <button type="button" class="field-tool-btn btn-toggle-password" data-id="${item.id}" title="${isVisible ? 'Hide Password' : 'Show Password (10s)'}">
                  ${isVisible ? ICONS.eyeOff : ICONS.eye}
                </button>
                <button type="button" class="field-tool-btn btn-copy-password" data-text="${this.escapeHtml(item.password)}" title="Copy Password">
                  ${ICONS.copy} Copy
                </button>
              </div>
            </div>

            ${item.notes ? `
              <div style="background-color: var(--yellow-200); border: var(--border-neo-thin); border-radius: 4px; padding: 0.5rem 0.65rem; font-size: 0.82rem; color: var(--ink-solid); font-weight: 700; box-shadow: 1px 1px 0px var(--ink-solid);">
                <span style="font-weight: 800; text-transform: uppercase; font-size: 0.68rem; color: var(--ink-muted);">Note: </span>
                ${this.escapeHtml(item.notes)}
              </div>
            ` : ''}
          </div>

          <!-- Card Footer -->
          <div class="card-footer">
            <span class="strength-badge ${strength.color}">
              ${strength.label}
            </span>

            ${item.url ? `
              <a href="${this.escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="card-site-link" title="Open Login Page">
                <span>Login Link</span>
                ${ICONS.externalLink}
              </a>
            ` : ''}
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Set up all UI event listeners
   */
  bindEvents() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    const searchClearBtn = document.getElementById('searchClearBtn');

    searchInput.addEventListener('input', e => {
      this.searchQuery = e.target.value;
      searchClearBtn.classList.toggle('hidden', !this.searchQuery.length);
      this.refreshVault();
    });

    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      this.searchQuery = '';
      searchClearBtn.classList.add('hidden');
      this.refreshVault();
      searchInput.focus();
    });

    // Keyboard shortcut '/'
    window.addEventListener('keydown', e => {
      if (e.key === '/' && document.activeElement !== searchInput && !['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) {
        e.preventDefault();
        searchInput.focus();
      }
    });

    // Filter pills
    document.getElementById('filterPillsContainer').addEventListener('click', e => {
      const btn = e.target.closest('.pill-btn');
      if (!btn) return;

      document.querySelectorAll('#filterPillsContainer .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      this.currentFilter = btn.getAttribute('data-filter');
      this.refreshVault();
    });

    // Sort select
    document.getElementById('sortSelector').addEventListener('change', e => {
      this.sortBy = e.target.value;
      this.refreshVault();
    });

    // Top action buttons
    document.getElementById('btnOpenAddAccount').addEventListener('click', () => this.openAddAccountModal());
    document.getElementById('btnEmptyAdd').addEventListener('click', () => this.openAddAccountModal());
    document.getElementById('btnOpenGenerator').addEventListener('click', () => this.openGeneratorModal());
    document.getElementById('btnOpenSettings').addEventListener('click', () => this.openSettingsModal());
    document.getElementById('btnLockVault').addEventListener('click', () => this.handleLockVaultAction());

    // Modal Close buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', e => {
        const modal = e.target.closest('.modal-overlay');
        if (modal) modal.classList.add('hidden');
      });
    });

    // Close on Escape
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => {
          if (m.id !== 'lockScreen') m.classList.add('hidden');
        });
      }
    });

    // Backdrop click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target === modal && modal.id !== 'lockScreen') {
          modal.classList.add('hidden');
        }
      });
    });

    // Grid Event Delegation
    document.getElementById('vaultGrid').addEventListener('click', async e => {
      // Pin
      const pinBtn = e.target.closest('.btn-toggle-pin');
      if (pinBtn) {
        const id = pinBtn.getAttribute('data-id');
        await this.storage.togglePin(id);
        this.refreshVault();
        return;
      }

      // Copy Username
      const copyUserBtn = e.target.closest('.btn-copy-username');
      if (copyUserBtn) {
        const text = copyUserBtn.getAttribute('data-text');
        this.copyToClipboard(text, 'Username copied!');
        this.flashCopyBtn(copyUserBtn);
        return;
      }

      // Copy Password
      const copyPassBtn = e.target.closest('.btn-copy-password');
      if (copyPassBtn) {
        const text = copyPassBtn.getAttribute('data-text');
        this.copyToClipboard(text, 'Password copied!');
        this.flashCopyBtn(copyPassBtn);
        return;
      }

      // Toggle Password Visibility
      const togglePassBtn = e.target.closest('.btn-toggle-password');
      if (togglePassBtn) {
        const id = togglePassBtn.getAttribute('data-id');
        this.togglePasswordVisibility(id);
        return;
      }

      // Edit Account
      const editBtn = e.target.closest('.btn-edit-account');
      if (editBtn) {
        const id = editBtn.getAttribute('data-id');
        this.openEditAccountModal(id);
        return;
      }

      // Delete Account
      const deleteBtn = e.target.closest('.btn-delete-account');
      if (deleteBtn) {
        const id = deleteBtn.getAttribute('data-id');
        if (confirm('Delete this account from your vault?')) {
          await this.storage.deleteItem(id);
          this.refreshVault();
          this.showToast('Account deleted', 'info');
        }
        return;
      }
    });

    // Service Quick Pick in modal
    document.getElementById('serviceQuickPick').addEventListener('click', e => {
      const btn = e.target.closest('.service-pick-btn');
      if (!btn) return;

      document.querySelectorAll('#serviceQuickPick .service-pick-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const service = btn.getAttribute('data-service');
      const url = btn.getAttribute('data-url');
      const customGroup = document.getElementById('customServiceNameGroup');
      const inputService = document.getElementById('inputServiceName');

      if (service === 'Custom') {
        customGroup.style.display = 'flex';
        inputService.value = '';
        inputService.focus();
        document.getElementById('inputUrl').value = 'https://';
      } else {
        customGroup.style.display = 'none';
        inputService.value = service;
        document.getElementById('inputUrl').value = url || '';
      }
    });

    // Inline generator inside form
    document.getElementById('btnInlineGenerate').addEventListener('click', () => {
      const pwd = PasswordGenerator.generatePassword({ length: 18, uppercase: true, lowercase: true, numbers: true, symbols: true });
      document.getElementById('inputPassword').value = pwd;
      document.getElementById('inputPassword').type = 'text';
      this.showToast('Generated strong password', 'success');
    });

    // Form password visibility toggle
    document.getElementById('btnToggleFormPasswordVis').addEventListener('click', () => {
      const pwdInput = document.getElementById('inputPassword');
      pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
    });

    // Account Form Submission
    document.getElementById('accountForm').addEventListener('submit', async e => {
      e.preventDefault();
      await this.handleAccountFormSubmit();
    });

    // Standalone Generator Controls
    this.bindGeneratorControls();

    // Settings Handlers
    this.bindSettingsHandlers();

    // Lock screen submit
    document.getElementById('unlockForm').addEventListener('submit', async e => {
      e.preventDefault();
      const pwd = document.getElementById('inputUnlockPassword').value;
      try {
        await this.storage.unlock(pwd);
        document.getElementById('inputUnlockPassword').value = '';
        document.getElementById('lockScreen').classList.add('hidden');
        this.showToast('Vault unlocked', 'success');
        await this.refreshVault();
      } catch (err) {
        this.showToast('Incorrect password', 'error');
      }
    });
  }

  /**
   * Password Generator Controls
   */
  bindGeneratorControls() {
    const slider = document.getElementById('sliderLength');
    const valBadge = document.getElementById('sliderLengthVal');
    const display = document.getElementById('genPasswordDisplay');

    const updateGenerated = () => {
      const length = parseInt(slider.value, 10);
      valBadge.textContent = length;

      const uppercase = document.getElementById('checkUpper').checked;
      const lowercase = document.getElementById('checkLower').checked;
      const numbers = document.getElementById('checkNumbers').checked;
      const symbols = document.getElementById('checkSymbols').checked;
      const avoidAmbiguous = document.getElementById('checkAvoidAmbiguous').checked;

      const pwd = PasswordGenerator.generatePassword({
        length, uppercase, lowercase, numbers, symbols, avoidAmbiguous
      });
      display.textContent = pwd;
    };

    slider.addEventListener('input', updateGenerated);
    ['checkUpper', 'checkLower', 'checkNumbers', 'checkSymbols', 'checkAvoidAmbiguous'].forEach(id => {
      document.getElementById(id).addEventListener('change', updateGenerated);
    });

    document.getElementById('btnGenRegenerate').addEventListener('click', updateGenerated);

    document.getElementById('btnGenCopy').addEventListener('click', () => {
      this.copyToClipboard(display.textContent, 'Generated password copied!');
    });

    document.getElementById('btnGenPassphrase').addEventListener('click', () => {
      const phrase = PasswordGenerator.generatePassphrase(4, '-');
      display.textContent = phrase;
      this.showToast('Generated word passphrase', 'success');
    });
  }

  /**
   * Settings & Backup Handlers
   */
  bindSettingsHandlers() {
    // Save master password
    document.getElementById('btnSaveMasterPassword').addEventListener('click', async () => {
      const input = document.getElementById('inputMasterPasswordSet');
      const val = input.value.trim();
      if (!val || val.length < 4) {
        this.showToast('Password must be at least 4 characters', 'error');
        return;
      }
      try {
        await this.storage.setMasterPassword(val);
        input.value = '';
        this.showToast('Master lock saved!', 'success');
        document.getElementById('modalSettings').classList.add('hidden');
        document.getElementById('lockBtnText').textContent = 'Lock Vault';
      } catch (err) {
        this.showToast(err.message, 'error');
      }
    });

    // Export JSON
    document.getElementById('btnExportJSON').addEventListener('click', async () => {
      const dataStr = await this.storage.exportJSON(false);
      this.downloadFile(dataStr, 'papier-vault-backup.json', 'application/json');
      this.showToast('Exported backup file', 'success');
    });

    // Export CSV
    document.getElementById('btnExportCSV').addEventListener('click', async () => {
      const csvStr = await this.storage.exportCSV();
      this.downloadFile(csvStr, 'papier-vault-passwords.csv', 'text/csv');
      this.showToast('Exported CSV file', 'success');
    });

    // Import file
    const fileInput = document.getElementById('inputImportFile');
    document.getElementById('btnTriggerImport').addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async event => {
        try {
          const content = event.target.result;
          const count = await this.storage.importBackup(content);
          this.showToast(`Imported ${count} accounts!`, 'success');
          document.getElementById('modalSettings').classList.add('hidden');
          this.refreshVault();
        } catch (err) {
          this.showToast('Import failed: ' + err.message, 'error');
        }
      };
      reader.readAsText(file);
      fileInput.value = '';
    });

    // Clear Vault
    document.getElementById('btnClearVault').addEventListener('click', async () => {
      if (confirm('Are you sure you want to clear all stored passwords?')) {
        await this.storage.clearAll();
        document.getElementById('modalSettings').classList.add('hidden');
        this.refreshVault();
        this.showToast('All passwords cleared', 'info');
      }
    });
  }

  /**
   * Handle locking vault
   */
  handleLockVaultAction() {
    if (!this.storage.hasMasterPassword()) {
      this.openSettingsModal();
      this.showToast('Please set a Master Password first', 'info');
      document.getElementById('inputMasterPasswordSet').focus();
      return;
    }

    this.storage.lock();
    this.visiblePasswords.clear();
    document.getElementById('lockScreen').classList.remove('hidden');
    document.getElementById('inputUnlockPassword').value = '';
    document.getElementById('inputUnlockPassword').focus();
    this.showToast('Vault locked', 'info');
  }

  /**
   * Temporary password reveal with 10-second auto-hide
   */
  togglePasswordVisibility(id) {
    if (this.visiblePasswords.has(id)) {
      this.visiblePasswords.delete(id);
      if (this.hideTimers.has(id)) {
        clearTimeout(this.hideTimers.get(id));
        this.hideTimers.delete(id);
      }
    } else {
      this.visiblePasswords.add(id);
      const timer = setTimeout(() => {
        this.visiblePasswords.delete(id);
        this.hideTimers.delete(id);
        this.refreshVault();
      }, 10000);
      this.hideTimers.set(id, timer);
    }
    this.refreshVault();
  }

  /**
   * Open modal to create a new account
   */
  openAddAccountModal() {
    document.getElementById('modalAccountTitle').textContent = 'Add Account';
    document.getElementById('accountEditId').value = '';
    document.getElementById('accountForm').reset();
    document.getElementById('inputServiceName').value = 'Gmail';
    document.getElementById('inputUrl').value = 'https://mail.google.com';
    document.getElementById('customServiceNameGroup').style.display = 'none';

    document.querySelectorAll('#serviceQuickPick .service-pick-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-service') === 'Gmail');
    });

    document.getElementById('modalAccount').classList.remove('hidden');
    document.getElementById('inputAccountLabel').focus();
  }

  /**
   * Open modal to edit an existing account
   */
  async openEditAccountModal(id) {
    const items = await this.storage.getItems();
    const item = items.find(i => i.id === id);
    if (!item) return;

    document.getElementById('modalAccountTitle').textContent = 'Edit Account';
    document.getElementById('accountEditId').value = item.id;
    document.getElementById('inputServiceName').value = item.service;
    document.getElementById('inputAccountLabel').value = item.label || '';
    document.getElementById('inputUsername').value = item.username || '';
    document.getElementById('inputPassword').value = item.password || '';
    document.getElementById('inputUrl').value = item.url || '';
    document.getElementById('inputNotes').value = item.notes || '';

    const matchingBtn = Array.from(document.querySelectorAll('#serviceQuickPick .service-pick-btn'))
      .find(b => b.getAttribute('data-service').toLowerCase() === item.service.toLowerCase());

    const customGroup = document.getElementById('customServiceNameGroup');
    if (matchingBtn) {
      document.querySelectorAll('#serviceQuickPick .service-pick-btn').forEach(b => b.classList.remove('active'));
      matchingBtn.classList.add('active');
      customGroup.style.display = 'none';
    } else {
      document.querySelectorAll('#serviceQuickPick .service-pick-btn').forEach(b => b.classList.remove('active'));
      const customBtn = document.querySelector('[data-service="Custom"]');
      if (customBtn) customBtn.classList.add('active');
      customGroup.style.display = 'flex';
    }

    document.getElementById('modalAccount').classList.remove('hidden');
    document.getElementById('inputAccountLabel').focus();
  }

  /**
   * Open Password Generator modal
   */
  openGeneratorModal() {
    document.getElementById('modalGenerator').classList.remove('hidden');
    const slider = document.getElementById('sliderLength');
    slider.dispatchEvent(new Event('input'));
  }

  /**
   * Open Settings modal
   */
  openSettingsModal() {
    document.getElementById('modalSettings').classList.remove('hidden');
  }

  /**
   * Handle form submit
   */
  async handleAccountFormSubmit() {
    const editId = document.getElementById('accountEditId').value;
    const service = document.getElementById('inputServiceName').value.trim() || 'Custom';
    const label = document.getElementById('inputAccountLabel').value.trim() || 'Personal';
    const username = document.getElementById('inputUsername').value.trim();
    const password = document.getElementById('inputPassword').value.trim();
    const url = document.getElementById('inputUrl').value.trim();
    const notes = document.getElementById('inputNotes').value.trim();

    if (!username || !password) {
      this.showToast('Username and password are required', 'error');
      return;
    }

    try {
      if (editId) {
        await this.storage.updateItem(editId, {
          service, label, username, password, url, notes
        });
        this.showToast(`Updated "${service} — ${label}"`, 'success');
      } else {
        await this.storage.addItem({
          service, label, username, password, url, notes, pinned: false
        });
        this.showToast(`Saved "${service}" to vault`, 'success');
      }

      document.getElementById('modalAccount').classList.add('hidden');
      await this.refreshVault();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  /**
   * Clipboard helper
   */
  async copyToClipboard(text, successMessage = 'Copied to clipboard!') {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast(successMessage, 'success');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showToast(successMessage, 'success');
    }
  }

  /**
   * Visual flash for copy buttons
   */
  flashCopyBtn(btn) {
    const originalHtml = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = `${ICONS.check} Copied!`;
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = originalHtml;
    }, 1400);
  }

  /**
   * Toast notification
   */
  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconHtml = ICONS.check;
    if (type === 'error') iconHtml = ICONS.close;
    if (type === 'info') iconHtml = ICONS.shield;

    toast.innerHTML = `
      <span>${iconHtml}</span>
      <span>${this.escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 2400);
  }

  /**
   * Download file helper
   */
  downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Inactivity auto-lock
   */
  setupInactivityTracker() {
    const resetTimer = () => {
      if (this.inactivityTimeout) clearTimeout(this.inactivityTimeout);
      if (this.storage.hasMasterPassword() && this.storage.isUnlocked()) {
        this.inactivityTimeout = setTimeout(() => {
          this.handleLockVaultAction();
          this.showToast('Vault auto-locked due to inactivity', 'info');
        }, this.INACTIVITY_LIMIT_MS);
      }
    };

    ['mousemove', 'keydown', 'click'].forEach(evt => {
      window.addEventListener(evt, resetTimer, { passive: true });
    });

    resetTimer();
  }

  /**
   * Escape HTML
   */
  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PapierVaultApp();
});
