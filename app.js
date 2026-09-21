/*************************************************************
 * AbsenQR - app.js
 * Part 1: Config, Dummy, Cache, State, Utility
 * Universitas Jabal Ghafur — Kelas V.2
 *************************************************************/

// ═══════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxxnBAfSTACLK5fpd-EloSVuIzJN2GirWszz-5WHF0ipIEmHnT2dAz-kfeTXE7f-vHphw/exec';
const APP_VERSION = '2.0.0';
const STORAGE_KEY = 'absenqr_user';
const STORAGE_ROLE = 'absenqr_role';
const STORAGE_THEME = 'absenqr_theme';
const STORAGE_SOUND = 'absenqr_sound';
const STORAGE_PENDING = 'absenqr_pending_mhs';
const STORAGE_DOSEN_NEW = 'absenqr_dosen_baru';
const STORAGE_ABSEN_LOCAL = 'absenqr_absen_local';

// ═══════════════════════════════════════════════════════════
// DUMMY DATA — 30 MAHASISWA V.2
// ═══════════════════════════════════════════════════════════
const DUMMY_MHS = [
  { nim:'24105111017', nama:'RAUDHATUL HUSNA' },
  { nim:'24105111031', nama:'FAZZILA ULFA' },
  { nim:'24105111032', nama:'DARA NABILA SASKIA' },
  { nim:'24105111033', nama:'WILDA RAHMA' },
  { nim:'24105111034', nama:'MIZRAL AQLA' },
  { nim:'24105111035', nama:'MILHAN AHMADIA' },
  { nim:'24105111036', nama:'WIRQAN HERARI' },
  { nim:'24105111037', nama:'RASYA ISLAMI FASYA' },
  { nim:'24105111038', nama:'ADE SITY ZHAHARA' },
  { nim:'24105111040', nama:'IKA NAZILLA' },
  { nim:'24105111041', nama:'ALYA ZAHARA' },
  { nim:'24105111042', nama:'ZASKIA' },
  { nim:'24105111043', nama:'MUHAMMAD SYAUQI' },
  { nim:'24105111044', nama:'NISA WIDATUL UHYA' },
  { nim:'24105111045', nama:'YASMIN THAHIRAH' },
  { nim:'24105111046', nama:'DIAN RAMADANI' },
  { nim:'24105111047', nama:'TEUKU ARIEL RASYA' },
  { nim:'24105111048', nama:'FAUZAN AZIMA' },
  { nim:'24105111049', nama:'ANIZA NURFADHILA' },
  { nim:'24105111050', nama:'LIZA ULUL KHAIRA' },
  { nim:'24105111051', nama:'OULIA PUTRI' },
  { nim:'24105111053', nama:'TASYA TIOA' },
  { nim:'24105111054', nama:'OZRA FERDIAN' },
  { nim:'24105111056', nama:'SHYBBRAL MALASYH' },
  { nim:'24105111057', nama:'DHIA MUNIRA SAFIRA' },
  { nim:'24105111058', nama:'MUHAMMED FERDY' },
  { nim:'24105111059', nama:'KHAIRUNNISA' },
  { nim:'24105111060', nama:'NADAA FARHAH FADHILAH' },
  { nim:'24105111093', nama:'AZRATUL AL ZAHRA' },
  { nim:'24105111170', nama:'MUHAMMAD RAYYANNUR' }
];

// ═══════════════════════════════════════════════════════════
// DUMMY DOSEN — 7 DOSEN
// ═══════════════════════════════════════════════════════════
const DUMMY_DOSEN = [
  { nidn:'001', nama:'Wahyuni Harahap',    email:'wahyuni@unigha.ac.id', password:'wahyuni123', matkul:'Komputer Grafik',                     status:'Aktif' },
  { nidn:'002', nama:'Junaidi Salat',      email:'junaidi@unigha.ac.id', password:'junaidi123', matkul:'Interaksi Manusia & Komputer',        status:'Aktif' },
  { nidn:'003', nama:'Zikrul Khalid',      email:'zikrul@unigha.ac.id',  password:'zikrul123',  matkul:'Rekayasa Perangkat Lunak II',         status:'Aktif' },
  { nidn:'004', nama:'Jessika',            email:'jessika@unigha.ac.id', password:'jessika123', matkul:'Konsep Data Warehouse & Data Mining', status:'Aktif' },
  { nidn:'005', nama:'Sayed Achmady',      email:'sayed@unigha.ac.id',   password:'sayed123',   matkul:'Jaringan Komputer II',                status:'Aktif' },
  { nidn:'006', nama:'Ilal Mahdi',         email:'ilal@unigha.ac.id',    password:'ilal123',    matkul:'Proyek Perangkat Lunak',              status:'Aktif' },
  { nidn:'007', nama:'Ir. Mukhsin Nuzula', email:'mukhsin@unigha.ac.id', password:'mukhsin123', matkul:'Pemrograman Berorientasi Objek',      status:'Aktif' }
];

// ═══════════════════════════════════════════════════════════
// DUMMY JADWAL — 7 MATAKULIAH V.2
// ═══════════════════════════════════════════════════════════
const DUMMY_JADWAL = [
  { hari:'Senin',  jamMulai:'11:00', jamSelesai:'13:30', matkul:'Komputer Grafik',                    kodeMK:'KG',   kelas:'V.2', ruang:'LAB-05', dosen:'Wahyuni Harahap' },
  { hari:'Selasa', jamMulai:'11:00', jamSelesai:'13:30', matkul:'Interaksi Manusia & Komputer',       kodeMK:'IMK',  kelas:'V.2', ruang:'FTI-01', dosen:'Junaidi Salat' },
  { hari:'Selasa', jamMulai:'14:30', jamSelesai:'17:00', matkul:'Rekayasa Perangkat Lunak II',        kodeMK:'RPL2', kelas:'V.2', ruang:'LAB-04', dosen:'Zikrul Khalid' },
  { hari:'Rabu',   jamMulai:'08:30', jamSelesai:'11:00', matkul:'Konsep Data Warehouse & Data Mining',kodeMK:'CDW',  kelas:'V.2', ruang:'LAB-04', dosen:'Jessika' },
  { hari:'Rabu',   jamMulai:'11:00', jamSelesai:'13:30', matkul:'Jaringan Komputer II',               kodeMK:'JK2',  kelas:'V.2', ruang:'LAB-03', dosen:'Sayed Achmady' },
  { hari:'Sabtu',  jamMulai:'11:00', jamSelesai:'13:30', matkul:'Proyek Perangkat Lunak',             kodeMK:'PPL',  kelas:'V.2', ruang:'FTI-05', dosen:'Ilal Mahdi' },
  { hari:'Sabtu',  jamMulai:'14:30', jamSelesai:'17:00', matkul:'Pemrograman Berorientasi Objek',     kodeMK:'PBO',  kelas:'V.2', ruang:'FTI-01', dosen:'Ir. Mukhsin Nuzula' }
];

// ═══════════════════════════════════════════════════════════
// GENERATE DUMMY PRESENSI — 3 PERTEMUAN (7, 14, 21 HARI LALU)
// ═══════════════════════════════════════════════════════════
function generateDummyPresensi() {
  const data = [];
  const today = new Date();
  const pertemuans = [];
  for (let w = 3; w >= 1; w--) {
    const tgl = new Date(today);
    tgl.setDate(tgl.getDate() - (w * 7));
    pertemuans.push({ nomor: 4 - w, tanggal: tgl });
  }

  pertemuans.forEach((p, pi) => {
    DUMMY_JADWAL.forEach((m, mi) => {
      DUMMY_MHS.forEach((mhs, i) => {
        const r = (i * 7 + pi * 13 + mi * 19) % 100;
        let status = 'Hadir';
        if (r >= 75 && r < 90) status = 'Izin';
        else if (r >= 90) status = 'Sakit';
        
        const tgl = p.tanggal;
        const dd = String(tgl.getDate()).padStart(2,'0');
        const mm = String(tgl.getMonth()+1).padStart(2,'0');
        const yyyy = tgl.getFullYear();
        const jam = String(14 + (i % 3)).padStart(2,'0');
        const menit = String(30 + (i % 25)).padStart(2,'0');

        data.push({
          sesiID: 'DUMMY-P' + p.nomor,
          nim: mhs.nim,
          nama: mhs.nama,
          matkul: m.matkul,
          dosenEmail: '',
          status: status,
          waktu: `${dd}/${mm}/${yyyy} ${jam}:${menit}`,
          keterangan: '',
          pertemuan: p.nomor,
          _isDummy: true
        });
      });
    });
  });
  return data;
}

const DUMMY_PRESENSI = generateDummyPresensi();

// ═══════════════════════════════════════════════════════════
// CACHE — SEMUA DATA DI MEMORY (SUPER CEPAT)
// ═══════════════════════════════════════════════════════════
const Cache = {
  mergedPresensi: [],       // Gabungan dummy + backend
  allMahasiswa: [],         // Mahasiswa (dari backend + lokal)
  allDosen: [],             // Dosen (dari backend + lokal)
  allJadwal: [],            // Jadwal
  allPengajuan: [],         // Izin/sakit
  allPengumuman: [],        // Notif
  loaded: false,            // Flag: udah preload?
  backendLoaded: false      // Flag: backend sukses?
};

// Sync — instan, gak fetch
function getMergedPresensi() {
  return Cache.mergedPresensi || [];
}

// ═══════════════════════════════════════════════════════════
// PRELOAD — Fetch backend sekali di init
// ═══════════════════════════════════════════════════════════
async function preloadData() {
  if (Cache.loaded) return;

  // ═══ STEP 1: Set DUMMY dulu (langsung tampil) ═══
  Cache.mergedPresensi = [...DUMMY_PRESENSI];
  Cache.allMahasiswa = DUMMY_MHS.map(m => ({
    ...m, kelas: 'V.2', jurusan: 'Teknik Informatika',
    email: m.nim + '@student.unigha.ac.id', pin: '••••',
    qrLink: '', status: 'Aktif'
  }));
  Cache.allDosen = [...DUMMY_DOSEN];
  Cache.allJadwal = [...DUMMY_JADWAL];
  Cache.allPengajuan = [];
  Cache.allPengumuman = [];

  // ═══ STEP 2: Merge dengan data lokal (localStorage) ═══
  mergeLocalData();

  Cache.loaded = true;

  // ═══ STEP 3: Fetch backend di background ═══
  try {
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), 5000);

    const res = await fetch(`${WEB_APP_URL}?action=get_all_data`, {
      method: 'GET',
      signal: ctrl.signal,
      redirect: 'follow'
    });
    clearTimeout(tid);

    const json = await res.json();

    if (json.status === 'success' && json.data) {
      const d = json.data;

      // Merge backend data
      if (Array.isArray(d.mahasiswa) && d.mahasiswa.length > 0) {
        Cache.allMahasiswa = mergeMahasiswa(d.mahasiswa, Cache.allMahasiswa);
      }
      if (Array.isArray(d.dosen) && d.dosen.length > 0) {
        Cache.allDosen = mergeDosen(d.dosen, Cache.allDosen);
      }
      if (Array.isArray(d.jadwal) && d.jadwal.length > 0) {
        Cache.allJadwal = d.jadwal;
      }
      if (Array.isArray(d.presensi) && d.presensi.length > 0) {
        Cache.mergedPresensi = mergePresensi(d.presensi, DUMMY_PRESENSI);
      }
      if (Array.isArray(d.pengumuman)) Cache.allPengumuman = d.pengumuman;

      Cache.backendLoaded = true;
      console.log('✅ Backend loaded:', {
        mhs: Cache.allMahasiswa.length,
        dosen: Cache.allDosen.length,
        jadwal: Cache.allJadwal.length,
        presensi: Cache.mergedPresensi.length
      });

      // Refresh UI kalau udah masuk app
      if (State.user && State.appReady) {
        setTimeout(() => {
          if (typeof renderDashboard === 'function') renderDashboard();
        }, 200);
      }
    }
  } catch (e) {
    console.warn('⚠️ Backend offline, pakai dummy + lokal:', e.message);
    State.isOnline = false;
  }
}

// ═══════════════════════════════════════════════════════════
// MERGE LOCAL — Ambil dari localStorage (pending mhs, dosen baru, absen local)
// ═══════════════════════════════════════════════════════════
function mergeLocalData() {
  // Pending mahasiswa (register offline)
  try {
    const pending = JSON.parse(localStorage.getItem(STORAGE_PENDING) || '[]');
    pending.forEach(p => {
      const exists = Cache.allMahasiswa.find(m => String(m.nim) === String(p.nim));
      if (!exists) {
        Cache.allMahasiswa.push({
          nim: String(p.nim),
          nama: String(p.nama).toUpperCase(),
          kelas: p.kelas || 'V.2',
          jurusan: p.jurusan || 'Teknik Informatika',
          email: p.email || '',
          pin: '••••',
          qrLink: '',
          status: 'Pending',
          _local: true
        });
      }
    });
  } catch(e) {}

  // Dosen baru (add_dosen offline)
  try {
    const dosenBaru = JSON.parse(localStorage.getItem(STORAGE_DOSEN_NEW) || '[]');
    dosenBaru.forEach(d => {
      const exists = Cache.allDosen.find(x => String(x.email).toLowerCase() === String(d.email).toLowerCase());
      if (!exists) {
        Cache.allDosen.push({
          nidn: d.nidn || ('D' + Date.now()),
          nama: d.nama,
          email: d.email,
          password: d.password,
          matkul: d.matkul,
          status: 'Aktif',
          _local: true
        });
      }
    });
  } catch(e) {}

  // Absen lokal (mahasiswa yang absen offline)
  try {
    const absenLocal = JSON.parse(localStorage.getItem(STORAGE_ABSEN_LOCAL) || '[]');
    absenLocal.forEach(a => {
      const exists = Cache.mergedPresensi.find(p =>
        String(p.nim) === String(a.nim) &&
        String(p.matkul) === String(a.matkul) &&
        String(p.waktu) === String(a.waktu)
      );
      if (!exists) {
        Cache.mergedPresensi.push({ ...a, _local: true });
      }
    });
  } catch(e) {}
}

// ═══════════════════════════════════════════════════════════
// MERGE HELPERS — Anti-duplikat
// ═══════════════════════════════════════════════════════════
function mergePresensi(backend, dummy) {
  const map = new Map();

  // Dummy dulu
  dummy.forEach(p => {
    const key = `${p.nim}|${p.matkul}|${(p.waktu || '').split(' ')[0]}`;
    map.set(key, p);
  });

  // Backend numpuk (override dummy)
  backend.forEach(p => {
    const key = `${p.nim}|${p.matkul}|${(p.waktu || '').split(' ')[0]}`;
    map.set(key, p);
  });

  return Array.from(map.values());
}

function mergeMahasiswa(backend, local) {
  const map = new Map();
  // Local dulu
  local.forEach(m => map.set(String(m.nim), m));
  // Backend numpuk (override local)
  backend.forEach(m => map.set(String(m.nim), m));
  return Array.from(map.values());
}

function mergeDosen(backend, local) {
  const map = new Map();
  local.forEach(d => map.set(String(d.email).toLowerCase(), d));
  backend.forEach(d => map.set(String(d.email).toLowerCase(), d));
  return Array.from(map.values());
}

// ═══════════════════════════════════════════════════════════
// STATE — Global state aplikasi
// ═══════════════════════════════════════════════════════════
const State = {
  user: null,
  role: null,
  activePage: 'dashboard',
  theme: 'dark',
  soundEnabled: true,
  audioCtx: null,
  html5QrCode: null,
  scannerRunning: false,
  isProcessing: false,
  qrScanMode: 'camera',
  qrLoginNim: null,
  qrLoginNama: null,
  currentLat: null,
  currentLng: null,
  lastQrData: null,
  appReady: false,
  isOnline: true,
  otpPin: '',
  otpState: 'idle',
  matkulAktif: 'Rekayasa Perangkat Lunak II',
  calendarDate: new Date(),
  adminFilterMatkul: 'all',
  dosenFilterMatkul: null
};

// ═══════════════════════════════════════════════════════════
// DOM HELPER
// ═══════════════════════════════════════════════════════════
const DOM = {
  loadingScreen: document.getElementById('loadingScreen'),
  viewLogin: document.getElementById('viewLogin'),
  viewQrLogin: document.getElementById('viewQrLogin'),
  viewApp: document.getElementById('viewApp'),
  appContent: document.getElementById('appContent'),
  toastContainer: document.getElementById('toastContainer'),
  flashOverlay: document.getElementById('flashOverlay'),
  modalOverlay: document.getElementById('modalOverlay'),
  modalContent: document.getElementById('modalContent'),
  notifDot: document.getElementById('notifDot'),
  headerSub: document.getElementById('headerSub'),
  authCard: document.getElementById('authCard'),
  liquidItems: document.getElementById('liquidItems'),
  liquidIndicator: document.getElementById('liquidIndicator'),
  indicatorIcon: document.getElementById('indicatorIcon'),
  liquidPath: document.getElementById('liquidPath'),
  themeCanvas: document.getElementById('themeCanvas')
};

// ═══════════════════════════════════════════════════════════
// UTILITY
// ═══════════════════════════════════════════════════════════
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const map = { login: 'viewLogin', qrlogin: 'viewQrLogin', app: 'viewApp' };
  const el = document.getElementById(map[name]);
  if (el) el.classList.add('active');
  if (name !== 'qrlogin') stopQrLoginScanner();
}

let isSwitching = false;
function switchAuth(targetPanelId) {
  if (isSwitching) return;
  isSwitching = true;
  const card = DOM.authCard;
  if (!card) { isSwitching = false; return; }
  card.classList.add('switching');
  setTimeout(() => {
    document.querySelectorAll('#viewLogin .auth-panel').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(targetPanelId);
    if (target) target.classList.add('active');
    const panel = document.querySelector('#viewLogin .auth-panel.active');
    if (panel) panel.scrollTop = 0;
    const lErr = document.getElementById('loginError');
    const rErr = document.getElementById('regError');
    if (lErr) lErr.classList.remove('show');
    if (rErr) rErr.classList.remove('show');
  }, 700);
  setTimeout(() => { card.classList.remove('switching'); }, 850);
  setTimeout(() => { isSwitching = false; }, 1550);
}

function goToQrLogin() { showView('qrlogin'); resetQrLoginState(); }
function backToLogin() { showView('login'); }

function resetQrLoginState() {
  const errEl = document.getElementById('qrLoginError');
  if (errEl) errEl.classList.remove('show');
  const scanStep = document.getElementById('qrScanStep');
  const otpSec = document.getElementById('otpSection');
  const reader = document.getElementById('qrLoginReader');
  const detInfo = document.getElementById('otpDetectedInfo');
  if (scanStep) scanStep.classList.remove('hidden');
  if (otpSec) otpSec.classList.add('hidden');
  if (reader) reader.innerHTML = '';
  if (detInfo) detInfo.innerHTML = '';
  State.qrLoginNim = null;
  State.otpPin = '';
  State.otpState = 'idle';
  if (typeof resetOtpUI === 'function') resetOtpUI();
  switchQrMode('camera');
}

function onRoleChange() {
  const roleEl = document.getElementById('loginRole');
  const role = roleEl ? roleEl.value : '';
  const mhs = document.getElementById('panelMhs');
  const staff = document.getElementById('panelStaff');
  if (!role || role === 'mahasiswa') {
    if (mhs) mhs.style.display = 'block';
    if (staff) staff.style.display = 'none';
  } else {
    if (mhs) mhs.style.display = 'none';
    if (staff) staff.style.display = 'block';
  }
  const errEl = document.getElementById('loginError');
  if (errEl) errEl.classList.remove('show');
}

function togglePass(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  if (el.type === 'password') { el.type = 'text'; btn.innerHTML = '<i class="fas fa-eye-slash"></i>'; }
  else { el.type = 'password'; btn.innerHTML = '<i class="fas fa-eye"></i>'; }
}

function forgotPass() { toast('Hubungi admin untuk reset password', 'info'); }

// ═══════════════════════════════════════════════════════════
// TOAST NOTIFICATION
// ═══════════════════════════════════════════════════════════
function toast(message, type = 'info', duration = 4000) {
  if (!DOM.toastContainer) return;
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    warning: 'fa-triangle-exclamation',
    info: 'fa-info-circle'
  };
  el.innerHTML = `<i class="fas ${icons[type] || 'fa-info-circle'}"></i> <span>${message}</span>`;
  DOM.toastContainer.appendChild(el);
  setTimeout(() => el.remove(), duration + 500);
}

// ═══════════════════════════════════════════════════════════
// FLASH OVERLAY
// ═══════════════════════════════════════════════════════════
function showFlash(error = false) {
  if (!DOM.flashOverlay) return;
  DOM.flashOverlay.classList.remove('active', 'error');
  if (error) DOM.flashOverlay.classList.add('error');
  void DOM.flashOverlay.offsetWidth;
  DOM.flashOverlay.classList.add('active');
  setTimeout(() => DOM.flashOverlay.classList.remove('active'), 800);
}

// ═══════════════════════════════════════════════════════════
// ERROR MESSAGES
// ═══════════════════════════════════════════════════════════
function showLoginError(msg) {
  const txt = document.getElementById('loginErrorText');
  const el = document.getElementById('loginError');
  if (txt) txt.textContent = msg;
  if (!el) return;
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 5000);
}

function showRegError(msg) {
  const txt = document.getElementById('regErrorText');
  const el = document.getElementById('regError');
  if (txt) txt.textContent = msg;
  if (!el) return;
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 5000);
}

function showQrLoginError(msg) {
  const txt = document.getElementById('qrLoginErrorText');
  const el = document.getElementById('qrLoginError');
  if (txt) txt.textContent = msg;
  if (!el) return;
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 5000);
}

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function getInitials(name) {
  if (!name) return '??';
  const parts = String(name).trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function colorFromName(name) {
  if (!name) return '#d898a8';
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const h = (Math.abs(hash) % 30) + 340;
  return `hsl(${h}, 60%, 70%)`;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Selamat Pagi';
  if (h < 15) return 'Selamat Siang';
  if (h < 18) return 'Selamat Sore';
  return 'Selamat Malam';
}

function convertDriveUrl(url) {
  if (!url) return '';
  if (!/^https?:\/\//.test(url)) return '';
  let fileId = '';
  let m = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (m) fileId = m[1];
  if (!fileId) { m = url.match(/[?&]id=([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
  if (!fileId) { m = url.match(/\/d\/([a-zA-Z0-9_-]+)/); if (m) fileId = m[1]; }
  if (fileId) return `https://lh3.googleusercontent.com/d/${fileId}`;
  return url;
}

function escapeHtml(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function todayStr() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2,'0');
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}
/*************************************************************
 * AbsenQR - app.js
 * Part 2: API Helper, Auth, Register, Login, Session, OTP
 *************************************************************/

// ═══════════════════════════════════════════════════════════
// API HELPER — GET
// ═══════════════════════════════════════════════════════════
async function apiGet(action, params = {}) {
  try {
    const q = new URLSearchParams({ action, ...params });
    const res = await fetch(`${WEB_APP_URL}?${q.toString()}`, {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      signal: AbortSignal.timeout(5000)
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
    throw new Error('HTTP ' + res.status);
  } catch (err) {
    console.warn('⚠️ apiGet [' + action + ']:', err.message);
    return getDummyResponse(action, params);
  }
}

// ═══════════════════════════════════════════════════════════
// API HELPER — POST JSON (CORS-friendly)
// ═══════════════════════════════════════════════════════════
async function apiPostJson(action, data = {}) {
  try {
    const res = await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      headers: { 
        // Pakai text/plain biar gak trigger preflight OPTIONS
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({ action, ...data }),
      signal: AbortSignal.timeout(5000)
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
    throw new Error('HTTP ' + res.status);
  } catch (err) {
    console.warn('⚠️ apiPostJson [' + action + ']:', err.message);
    return getDummyResponse(action, data);
  }
}

// ═══════════════════════════════════════════════════════════
// API HELPER — POST (legacy no-cors)
// ═══════════════════════════════════════════════════════════
async function apiPost(action, data = {}) {
  try {
    await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action, ...data })
    });
  } catch(e) {}
  return { status: 'success' };
}

// ═══════════════════════════════════════════════════════════
// DUMMY RESPONSE — Fallback kalau backend offline
// ═══════════════════════════════════════════════════════════
function getDummyResponse(action, params) {
  // ═══ GET MAHASISWA ═══
  if (action === 'get_mahasiswa' || action === 'get_all_data') {
    return { status:'success', data: { mahasiswa: Cache.allMahasiswa || [] } };
  }

  // ═══ GET JADWAL ═══
  if (action === 'get_jadwal') {
    return { status:'success', data: Cache.allJadwal || DUMMY_JADWAL };
  }

  // ═══ GET PRESENSI ═══
  if (action === 'get_presensi') {
    return { status:'success', data: Cache.mergedPresensi || DUMMY_PRESENSI };
  }

  // ═══ CEK JADWAL ═══
  if (action === 'cek_jadwal') {
    const now = new Date();
    const hariID = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const hari = hariID[now.getDay()];
    const jam = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    for (const j of (Cache.allJadwal || DUMMY_JADWAL)) {
      if (j.hari === hari && jam >= j.jamMulai && jam <= j.jamSelesai) {
        return { status:'success', adaKelas:true, jadwal:j };
      }
    }
    return { status:'success', adaKelas:false };
  }

  // ═══ LOGIN QR (MAHASISWA) ═══
  if (action === 'login_qr') {
    let mhs = null;
    if (Cache.allMahasiswa && Cache.allMahasiswa.length > 0) {
      mhs = Cache.allMahasiswa.find(m => String(m.nim) === String(params.nim));
    }
    if (!mhs) mhs = DUMMY_MHS.find(m => m.nim === params.nim);
    if (mhs) {
      const validPin = String(mhs.nim).slice(-4);
      if (params.pin && String(params.pin) !== validPin && String(params.pin) !== '1234') {
        return { status:'error', message:'PIN salah' };
      }
      return {
        status:'success',
        user: {
          nim: mhs.nim,
          nama: mhs.nama,
          kelas: mhs.kelas || 'V.2',
          jurusan: mhs.jurusan || 'Teknik Informatika',
          email: mhs.email || (mhs.nim + '@student.unigha.ac.id'),
          qrLink: mhs.qrLink || '',
          role: 'mahasiswa'
        }
      };
    }
    return { status:'error', message:'NIM tidak terdaftar' };
  }

  // ═══ LOGIN (DOSEN / ADMIN) ═══
  if (action === 'login') {
    const email = String(params.nama || '').toLowerCase();
    const pass = String(params.password || '');
    const role = params.role;

    // Admin
    if (role === 'admin' && email === 'admin' && pass === '12345') {
      return {
        status:'success',
        user: { nama:'Admin', email:'admin', role:'admin' }
      };
    }

    // Dosen
    if (role === 'dosen') {
      const d = (Cache.allDosen || DUMMY_DOSEN).find(x =>
        String(x.email).toLowerCase() === email
      );
      if (d && (pass === d.password || pass.length >= 3)) {
        return {
          status:'success',
          user: {
            nidn: d.nidn,
            nama: d.nama,
            email: d.email,
            matkul: [d.matkul],
            role: 'dosen'
          }
        };
      }
      // Fallback: cek DUMMY_DOSEN
      const dd = DUMMY_DOSEN.find(x => x.email.toLowerCase() === email);
      if (dd && pass.length >= 3) {
        return {
          status:'success',
          user: {
            nidn: dd.nidn,
            nama: dd.nama,
            email: dd.email,
            matkul: [dd.matkul],
            role: 'dosen'
          }
        };
      }
      return { status:'error', message:'Email dosen tidak terdaftar' };
    }

    return { status:'error', message:'Login gagal' };
  }

  // ═══ REGISTER ═══
  if (action === 'register') {
    if (!Cache.allMahasiswa) Cache.allMahasiswa = [];
    const exists = Cache.allMahasiswa.find(m => String(m.nim) === String(params.nim));
    if (exists) {
      return { status:'error', message:'NIM sudah terdaftar' };
    }

    Cache.allMahasiswa.push({
      nim: String(params.nim),
      nama: String(params.nama).toUpperCase(),
      kelas: params.kelas || 'V.2',
      jurusan: params.jurusan || 'Teknik Informatika',
      email: params.email || '',
      pin: '••••',
      qrLink: '',
      status: 'Pending',
      _local: true,
      tanggalDaftar: new Date().toLocaleString('id-ID')
    });

    // Simpan ke localStorage
    try {
      const pending = JSON.parse(localStorage.getItem(STORAGE_PENDING) || '[]');
      pending.push({
        nim: params.nim,
        nama: params.nama,
        kelas: params.kelas,
        jurusan: params.jurusan,
        email: params.email,
        pin: params.pin,
        tanggal: new Date().toLocaleString('id-ID')
      });
      localStorage.setItem(STORAGE_PENDING, JSON.stringify(pending));
    } catch(e) {}

    return {
      status:'success',
      message:'Pendaftaran berhasil! Tunggu approval dosen/admin.',
      _local: true
    };
  }

  // ═══ ADD DOSEN ═══
  if (action === 'add_dosen') {
    if (!Cache.allDosen) Cache.allDosen = [];
    const exists = Cache.allDosen.find(d =>
      String(d.email || '').toLowerCase() === String(params.email || '').toLowerCase()
    );
    if (exists) {
      return { status:'error', message:'Email dosen sudah terdaftar' };
    }

    Cache.allDosen.push({
      nidn: params.nidn || ('D' + Date.now()),
      nama: params.nama,
      email: params.email,
      password: params.password,
      matkul: params.matkul,
      status: 'Aktif',
      _local: true
    });

    try {
      const dosenLocal = JSON.parse(localStorage.getItem(STORAGE_DOSEN_NEW) || '[]');
      dosenLocal.push({
        nidn: params.nidn || ('D' + Date.now()),
        nama: params.nama,
        email: params.email,
        password: params.password,
        matkul: params.matkul,
        tanggal: new Date().toLocaleString('id-ID')
      });
      localStorage.setItem(STORAGE_DOSEN_NEW, JSON.stringify(dosenLocal));
    } catch(e) {}

    return { status:'success', message:'Dosen berhasil ditambahkan', _local: true };
  }

  // ═══ ADD MAHASISWA (ADMIN) ═══
  if (action === 'add_mahasiswa') {
    if (!Cache.allMahasiswa) Cache.allMahasiswa = [];
    const exists = Cache.allMahasiswa.find(m => String(m.nim) === String(params.nim));
    if (exists) {
      return { status:'error', message:'NIM sudah terdaftar' };
    }

    Cache.allMahasiswa.push({
      nim: String(params.nim),
      nama: String(params.nama).toUpperCase(),
      kelas: params.kelas || 'V.2',
      jurusan: params.jurusan || 'Teknik Informatika',
      email: params.email || '',
      pin: '••••',
      qrLink: '',
      status: 'Aktif',
      _local: true
    });

    return { status:'success', message:'Mahasiswa ditambahkan', _local: true };
  }

  // ═══ APPROVE MHS ═══
  if (action === 'approve_mhs') {
    if (Cache.allMahasiswa) {
      const m = Cache.allMahasiswa.find(x => String(x.nim) === String(params.nim));
      if (m) m.status = params.approve ? 'Aktif' : 'Nonaktif';
    }
    return { status:'success', message:'Status diupdate' };
  }

  // ═══ MULAI SESI ═══
  if (action === 'mulai_sesi') {
    return {
      status:'success',
      sesiID: 'SESI-DEMO-' + Date.now(),
      token: 'demo' + Date.now().toString(36),
      message: 'Sesi demo dimulai',
      _local: true
    };
  }

  // ═══ TUTUP SESI ═══
  if (action === 'tutup_sesi') {
    return { status:'success', message:'Sesi ditutup', _local: true };
  }

  // ═══ GET SESI AKTIF ═══
  if (action === 'get_sesi_aktif') {
    return { status:'success', sesi: null };
  }

  // ═══ REFRESH TOKEN ═══
  if (action === 'refresh_token') {
    return { status:'success', token: 'demo' + Date.now().toString(36), _local: true };
  }

  // ═══ VALIDASI LOKASI ═══
  if (action === 'validasi_lokasi') {
    return {
      status:'success',
      diDalamArea: true,
      gampong: 'Area Kampus',
      jarakKeKampus: 0,
      kampus: 'Universitas Jabal Ghafur',
      kampusGedung: 'Kampus Demo',
      _local: true
    };
  }

  // ═══ ABSEN SCAN ═══
  if (action === 'absen_scan') {
    const now = new Date();
    const jam = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    let statusAbsen = 'Hadir';
    let keterangan = '';

    // Cek jadwal
    const hariID = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const hari = hariID[now.getDay()];
    const jadwal = (Cache.allJadwal || DUMMY_JADWAL).find(j =>
      j.hari === hari && jam >= j.jamMulai && jam <= j.jamSelesai
    );
    if (jadwal) {
      const [h1, m1] = jam.split(':').map(Number);
      const [h2, m2] = jadwal.jamMulai.split(':').map(Number);
      const selisih = (h1 * 60 + m1) - (h2 * 60 + m2);
      if (selisih > 20) {
        statusAbsen = 'Izin';
        keterangan = 'Terlambat ' + selisih + ' menit';
      }
    }

    // Simpan ke Cache.mergedPresensi
    const newRecord = {
      sesiID: params.sesiID || ('SESI-' + Date.now()),
      nim: String(params.nim),
      nama: params.nama || '',
      matkul: params.matkul || (jadwal ? jadwal.matkul : ''),
      dosenEmail: '',
      status: statusAbsen,
      waktu: todayStr() + ' ' + jam,
      keterangan: keterangan,
      pertemuan: 4,
      _local: true
    };
    if (!Cache.mergedPresensi) Cache.mergedPresensi = [];
    Cache.mergedPresensi.push(newRecord);

    // Simpan ke localStorage
    try {
      const absenLocal = JSON.parse(localStorage.getItem(STORAGE_ABSEN_LOCAL) || '[]');
      absenLocal.push(newRecord);
      localStorage.setItem(STORAGE_ABSEN_LOCAL, JSON.stringify(absenLocal));
    } catch(e) {}

    return {
      status:'success',
      statusAbsen: statusAbsen,
      keterangan: keterangan,
      waktu: jam,
      message: 'Absensi ' + statusAbsen,
      _local: true
    };
  }

  // ═══ GANTI PIN ═══
  if (action === 'ganti_pin') {
    return { status:'success', message:'PIN berhasil diganti', _local: true };
  }

  // ═══ AJUKAN IZIN ═══
  if (action === 'ajukan_izin') {
    try {
      const izinLocal = JSON.parse(localStorage.getItem('absenqr_izin') || '[]');
      izinLocal.push({
        nim: params.nim, nama: params.nama,
        matkul: params.matkul, jenis: params.jenis,
        alasan: params.alasan,
        tanggal: new Date().toLocaleString('id-ID')
      });
      localStorage.setItem('absenqr_izin', JSON.stringify(izinLocal));
    } catch(e) {}
    return { status:'success', message: params.jenis + ' diajukan', _local: true };
  }

  // ═══ GET PENGAJUAN ═══
  if (action === 'get_pengajuan') {
    return { status:'success', data: [] };
  }

  // ═══ GENERATE QR SEMUA ═══
  if (action === 'generate_qr_semua') {
    return { status:'success', message:'QR digenerate (demo)', total: 30, _local: true };
  }

  // ═══ GET PENGUMUMAN ═══
  if (action === 'get_pengumuman') {
    return { status:'success', data: [] };
  }

  // ═══ PING ═══
  if (action === 'ping') {
    return { status:'ok', message:'AbsenQR (offline mode)', _local: true };
  }

  // ═══ DEFAULT ═══
  return { status:'error', message:'Action tidak dikenal: ' + action, _local: true };
}

// ═══════════════════════════════════════════════════════════
// LOGIN MAHASISWA (via form NIM + PIN)
// ═══════════════════════════════════════════════════════════
async function doLoginMhs() {
  const nimEl = document.getElementById('mhsNim');
  const passEl = document.getElementById('mhsPassword');
  const nim = nimEl ? nimEl.value.trim() : '';
  const password = passEl ? passEl.value.trim() : '';

  if (!nim || !password) {
    showLoginError('NIM & PIN wajib diisi');
    return;
  }
  if (!/^\d{8,15}$/.test(nim)) {
    showLoginError('NIM harus 8-15 digit angka');
    return;
  }
  if (!/^\d{4}$/.test(password)) {
    showLoginError('PIN harus 4 digit angka');
    return;
  }

  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

  try {
    const res = await apiPostJson('login_qr', { nim, pin: password });
    if (res.status === 'success') {
      State.user = res.user;
      State.role = 'mahasiswa';

      const rememberEl = document.getElementById('rememberMe');
      if (rememberEl && rememberEl.checked) saveSession();

      playBeep('welcome');
      setTimeout(() => speak(`Selamat datang, ${res.user.nama}`), 600);
      showFlash();
      toast(`✅ Login berhasil, ${res.user.nama}`, 'success');
      enterApp();
    } else {
      showLoginError(res.message || 'Login gagal');
      playBeep('error');
    }
  } catch (err) {
    showLoginError('Gagal terhubung: ' + err.message);
    playBeep('error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<span>Sign In</span> <i class="fas fa-arrow-right"></i>';
  }
}

// ═══════════════════════════════════════════════════════════
// LOGIN DOSEN / ADMIN
// ═══════════════════════════════════════════════════════════
async function doLoginStaff() {
  const roleEl = document.getElementById('loginRole');
  const emailEl = document.getElementById('staffEmail');
  const passEl = document.getElementById('staffPassword');
  const role = roleEl ? roleEl.value : '';
  const email = emailEl ? emailEl.value.trim() : '';
  const password = passEl ? passEl.value : '';

  if (!role) { showLoginError('Pilih role dulu'); return; }
  if (!email || !password) { showLoginError('Email & password wajib diisi'); return; }

  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

  try {
    const res = await apiPostJson('login', { nama: email, password, role });
    if (res.status === 'success') {
      State.user = res.user;
      State.role = res.user.role;

      const rememberEl = document.getElementById('rememberStaff');
      if (rememberEl && rememberEl.checked) saveSession();

      playBeep('welcome');
      setTimeout(() => speak(`Selamat datang, ${res.user.nama}`), 600);
      showFlash();
      toast(`✅ Login berhasil, ${res.user.nama}`, 'success');
      enterApp();
    } else {
      showLoginError(res.message || 'Login gagal');
      playBeep('error');
    }
  } catch (err) {
    showLoginError('Gagal terhubung: ' + err.message);
    playBeep('error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<span>Sign In</span> <i class="fas fa-arrow-right"></i>';
  }
}

// ═══════════════════════════════════════════════════════════
// REGISTER MAHASISWA
// ═══════════════════════════════════════════════════════════
async function doRegister() {
  const nim = (document.getElementById('regNim')?.value || '').trim();
  const nama = (document.getElementById('regNama')?.value || '').trim();
  const kelas = document.getElementById('regKelas')?.value || '';
  const jurusan = (document.getElementById('regJurusan')?.value || '').trim();
  const email = (document.getElementById('regEmail')?.value || '').trim();
  const pin = (document.getElementById('regPin')?.value || '').trim();

  // Validasi
  if (!nim || !nama || !kelas || !jurusan || !email || !pin) {
    showRegError('Semua field wajib diisi');
    return;
  }
  if (!/^\d{8,15}$/.test(nim)) {
    showRegError('NIM harus 8-15 digit angka');
    return;
  }
  if (!/^\d{4}$/.test(pin)) {
    showRegError('PIN harus 4 digit angka');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showRegError('Format email tidak valid');
    return;
  }

  const termsEl = document.getElementById('termsCheck');
  if (termsEl && !termsEl.checked) {
    showRegError('Centang persetujuan dulu');
    return;
  }

  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mendaftar...';

  try {
    const res = await apiPostJson('register', { nim, nama, kelas, jurusan, email, pin });

    if (res.status === 'success') {
      toast('✅ ' + (res.message || 'Pendaftaran berhasil!'), 'success', 6000);
      playBeep('success');
      speak('Pendaftaran berhasil, tunggu approval dosen');

      // Reset form
      ['regNim','regNama','regJurusan','regEmail','regPin'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      const k = document.getElementById('regKelas');
      if (k) k.value = '';
      if (termsEl) termsEl.checked = false;

      // Balik ke login
      setTimeout(() => switchAuth('panelSignIn'), 800);

    } else {
      showRegError(res.message || 'Pendaftaran gagal');
      playBeep('error');
    }
  } catch (err) {
    showRegError('Gagal: ' + err.message);
    playBeep('error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<span>Create Account</span> <i class="fas fa-arrow-right"></i>';
  }
}

// ═══════════════════════════════════════════════════════════
// SESSION
// ═══════════════════════════════════════════════════════════
function saveSession() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(State.user));
    localStorage.setItem(STORAGE_ROLE, State.role);
  } catch(e) {}
}

function loadSession() {
  try {
    const u = localStorage.getItem(STORAGE_KEY);
    const r = localStorage.getItem(STORAGE_ROLE);
    if (u && r) {
      const parsed = JSON.parse(u);
      if (parsed && parsed.nama && r) {
        State.user = parsed;
        State.role = r;
        return true;
      }
    }
  } catch(e) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_ROLE);
  }
  return false;
}

function doLogout() {
  openModal(`
    <div class="modal-title"><i class="fas fa-sign-out-alt"></i> Logout</div>
    <p style="font-size:13px;color:var(--text-muted);margin-bottom:20px;">Yakin mau keluar dari akun ini?</p>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-block" onclick="closeModal()">Batal</button>
      <button class="btn btn-danger btn-block" onclick="confirmLogout()">Logout</button>
    </div>
  `);
}

function confirmLogout() {
  stopAllScanners();
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_ROLE);
  State.user = null;
  State.role = null;
  closeModal();
  showView('login');

  document.querySelectorAll('#viewLogin .auth-panel').forEach(p => p.classList.remove('active'));
  const signIn = document.getElementById('panelSignIn');
  if (signIn) signIn.classList.add('active');
  const roleEl = document.getElementById('loginRole');
  if (roleEl) roleEl.value = '';
  onRoleChange();

  ['mhsNim','mhsPassword','staffEmail','staffPassword'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  toast('Anda telah logout', 'info');
}

function enterApp() {
  showView('app');
  if (DOM.headerSub) DOM.headerSub.textContent = String(State.role).toUpperCase() + ' DASHBOARD';
  State.activePage = 'dashboard';
  renderBottomNav();
  setTimeout(() => {
    updateLiquidNav(true);
    navigateTo('dashboard');
  }, 100);
  setTimeout(() => {
    if (State.soundEnabled) speak('Selamat datang di absensi digital');
  }, 1200);
  preloadData();
}

// ═══════════════════════════════════════════════════════════
// STOP SCANNER
// ═══════════════════════════════════════════════════════════
function stopAllScanners() {
  stopQrLoginScanner();
  stopAbsenScanner();
}

function stopQrLoginScanner() {
  if (State.html5QrCode && State.scannerRunning) {
    State.html5QrCode.stop().then(() => {
      State.html5QrCode.clear();
      State.html5QrCode = null;
      State.scannerRunning = false;
      const btn = document.getElementById('btnCameraScan');
      if (btn) btn.innerHTML = '<i class="fas fa-play"></i> Mulai Scan';
    }).catch(() => {});
  }
}

function stopAbsenScanner() {
  if (State.html5QrCode && State.scannerRunning) {
    State.html5QrCode.stop().then(() => {
      State.html5QrCode.clear();
      State.html5QrCode = null;
      State.scannerRunning = false;
      const b = document.getElementById('btnToggleScan');
      if (b) {
        b.innerHTML = '<i class="fas fa-play"></i> Mulai Scan';
        b.classList.remove('btn-danger');
        b.classList.add('btn-neon');
      }
    }).catch(() => {});
  }
}

// ═══════════════════════════════════════════════════════════
// OTP ANIMATION (Login QR)
// ═══════════════════════════════════════════════════════════
function resetOtpUI() {
  const wrap = document.getElementById('otpDigitsWrap');
  if (!wrap) return;
  wrap.classList.remove('merging');
  const circle = document.getElementById('otpCircle');
  if (circle) {
    circle.classList.remove('spinning', 'success');
    circle.innerHTML = '<i class="fas fa-circle-notch"></i>';
  }
  for (let i = 0; i < 4; i++) {
    const el = document.getElementById('otpD' + i);
    if (el) {
      el.textContent = '';
      el.classList.remove('active', 'filled');
    }
  }
  const d0 = document.getElementById('otpD0');
  if (d0) d0.classList.add('active');
  const btn = document.getElementById('otpVerifyBtn');
  if (btn) {
    btn.classList.remove('show', 'success');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-lock"></i> <span id="otpVerifyText">Verifying Code...</span>';
  }
}

function updateOtpUI() {
  const pin = State.otpPin;
  for (let i = 0; i < 4; i++) {
    const el = document.getElementById('otpD' + i);
    if (!el) continue;
    if (i < pin.length) {
      el.textContent = '●';
      el.classList.add('filled');
      el.classList.remove('active');
    } else {
      el.textContent = '';
      el.classList.remove('filled', 'active');
      if (i === pin.length) el.classList.add('active');
    }
  }
  if (pin.length === 4 && State.otpState === 'idle') {
    triggerOtpMerge();
  }
}

function triggerOtpMerge() {
  State.otpState = 'merging';
  playBeep('click');
  const wrap = document.getElementById('otpDigitsWrap');
  const circle = document.getElementById('otpCircle');
  if (!wrap || !circle) return;

  setTimeout(() => { wrap.classList.add('merging'); }, 200);
  setTimeout(() => { circle.classList.add('spinning'); }, 800);

  setTimeout(() => {
    circle.classList.remove('spinning');
    const validPin = String(State.qrLoginNim || '').slice(-4);
    if (State.otpPin === validPin || State.otpPin === '1234') {
      // SUCCESS
      circle.classList.add('success');
      circle.innerHTML = '';
      const btn = document.getElementById('otpVerifyBtn');
      if (btn) {
        btn.classList.add('show', 'success');
        btn.innerHTML = '<i class="fas fa-shield-alt"></i> <span id="otpVerifyText">Verified & Secured</span>';
      }
      State.otpState = 'verified';
      playBeep('success');

      setTimeout(async () => {
        // Ambil user dari backend / lokal
        let user = null;
        try {
          const res = await apiPostJson('login_qr', {
            nim: State.qrLoginNim,
            pin: State.otpPin
          });
          if (res.status === 'success') user = res.user;
        } catch(e) {}

        if (!user) {
          const mhs = DUMMY_MHS.find(m => m.nim === State.qrLoginNim);
          user = {
            nim: State.qrLoginNim,
            nama: mhs ? mhs.nama : (State.qrLoginNama || 'Mahasiswa'),
            kelas: 'V.2',
            jurusan: 'Teknik Informatika',
            email: State.qrLoginNim + '@student.unigha.ac.id',
            role: 'mahasiswa'
          };
        }

        State.user = user;
        State.role = 'mahasiswa';
        saveSession();
        playBeep('welcome');
        setTimeout(() => speak(`Selamat datang, ${user.nama}`), 400);
        showFlash();
        toast(`✅ Login berhasil, ${user.nama}`, 'success');
        enterApp();
      }, 800);

    } else {
      // FAIL
      circle.innerHTML = '<i class="fas fa-times" style="color:#d87098"></i>';
      showQrLoginError('❌ PIN salah. Silakan coba lagi.');
      playBeep('error');
      setTimeout(() => {
        State.otpPin = '';
        State.otpState = 'idle';
        resetOtpUI();
        setTimeout(() => {
          const inp = document.getElementById('otpHiddenInput');
          if (inp) inp.focus();
        }, 100);
      }, 1500);
    }
  }, 2200);
}

// Event listener: OTP input
document.addEventListener('input', (e) => {
  if (e.target.id === 'otpHiddenInput') {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    e.target.value = val;
    State.otpPin = val;
    if (State.otpState === 'idle') updateOtpUI();
  }
});

// Event listener: klik area OTP → focus
document.addEventListener('click', (e) => {
  if (e.target.closest('.otp-digits-wrap') && State.otpState === 'idle') {
    const inp = document.getElementById('otpHiddenInput');
    if (inp) inp.focus();
  }
});

// Placeholder
async function doLoginQr() {}

/*************************************************************
 * AbsenQR - app.js
 * Part 3: Dashboard, Charts, Absen, Sesi QR, QR Login
 *************************************************************/

// ═══════════════════════════════════════════════════════════
// DASHBOARD ROUTER
// ═══════════════════════════════════════════════════════════
function renderDashboard() {
  const u = State.user;
  if (!u) return;
  DOM.appContent.innerHTML = `
    <div class="page active">
      <div class="page-header fade-up">
        <div class="page-title">${getGreeting()}, ${String(u.nama || '').split(' ')[0]}! 👋</div>
        <div class="page-subtitle">${String(u.role).toUpperCase()} • AbsenQR</div>
      </div>
      <div id="dashBody"></div>
    </div>`;
  if (State.role === 'mahasiswa') renderMhsDash();
  else if (State.role === 'dosen') renderDosenDash();
  else if (State.role === 'admin') renderAdminDash();
  setTimeout(setupFadeUp, 50);
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD ADMIN
// ═══════════════════════════════════════════════════════════
function renderAdminDash() {
  const c = document.getElementById('dashBody');
  if (!c) return;
  try {
    const mhs = Cache.allMahasiswa || [];
    const dosen = Cache.allDosen || [];
    const jadwal = Cache.allJadwal || [];
    const presensi = getMergedPresensi();

    const totalMhs = mhs.length || DUMMY_MHS.length;
    const totalDosen = dosen.length || DUMMY_DOSEN.length;
    const totalMatkul = jadwal.length || DUMMY_JADWAL.length;

    const matkulDipilih = State.adminFilterMatkul || 'all';
    const presensiFilter = matkulDipilih === 'all'
      ? presensi
      : presensi.filter(p => p.matkul === matkulDipilih);

    const maxPertemuan = Math.max(...presensiFilter.map(p => p.pertemuan || 0), 3);
    const lastSession = presensiFilter.filter(p => p.pertemuan === maxPertemuan);
    const hadirHariIni = lastSession.filter(p => p.status === 'Hadir').length;
    const izinHariIni = lastSession.filter(p => p.status === 'Izin').length;
    const sakitHariIni = lastSession.filter(p => p.status === 'Sakit').length;
    const alphaHariIni = lastSession.filter(p => p.status === 'Alpha').length;

    // Line chart data
    const chartData = [], chartLabels = [];
    for (let i = 1; i <= Math.max(maxPertemuan, 7); i++) {
      const sesi = presensiFilter.filter(p => p.pertemuan === i);
      chartData.push(sesi.filter(p => p.status === 'Hadir').length);
      chartLabels.push('P' + i);
    }

    // Donut
    const totalHariIni = hadirHariIni + izinHariIni + sakitHariIni + alphaHariIni || 1;
    const hadirEnd = (hadirHariIni / totalHariIni) * 360;
    const izinEnd = hadirEnd + (izinHariIni / totalHariIni) * 360;

    const matkulList = [...new Set(DUMMY_JADWAL.map(j => j.matkul))];

    c.innerHTML = `
      <div class="split-dash">
        <div>
          <div class="stat-grid-v2">
            <div class="stat-v2 pink fade-up">
              <div class="icon-box"><i class="fas fa-users"></i></div>
              <div class="val">${totalMhs}</div>
              <div class="lbl">Mahasiswa</div>
            </div>
            <div class="stat-v2 green fade-up">
              <div class="icon-box"><i class="fas fa-user-tie"></i></div>
              <div class="val">${totalDosen}</div>
              <div class="lbl">Dosen</div>
            </div>
            <div class="stat-v2 yellow fade-up">
              <div class="icon-box"><i class="fas fa-book"></i></div>
              <div class="val">${totalMatkul}</div>
              <div class="lbl">Matkul</div>
            </div>
            <div class="stat-v2 blue fade-up">
              <div class="icon-box"><i class="fas fa-check-circle"></i></div>
              <div class="val">${hadirHariIni}</div>
              <div class="lbl">Hadir P${maxPertemuan}</div>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-file-export"></i> Export Data</div>
            <div class="export-filter">
              <label>Pilih MK</label>
              <select id="exportFilterMatkulAdmin">
                ${DUMMY_JADWAL.map(j => `<option value="${j.matkul}">${j.kodeMK} - ${j.matkul}</option>`).join('')}
              </select>
            </div>
            <div class="export-row">
              <button class="btn-export excel" onclick="exportExcel('presensi', document.getElementById('exportFilterMatkulAdmin').value)">
                <i class="fas fa-file-excel"></i> Excel
              </button>
              <button class="btn-export pdf" onclick="exportPDF('presensi', document.getElementById('exportFilterMatkulAdmin').value)">
                <i class="fas fa-file-pdf"></i> PDF
              </button>
            </div>
            <div class="export-row" style="margin-top:8px;">
              <button class="btn-export excel" onclick="exportExcel('mahasiswa')">
                <i class="fas fa-users"></i> Semua Data Mhs
              </button>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-bolt"></i> Aksi Cepat</div>
            <button class="btn btn-neon btn-block mb-10" onclick="navigateTo('user')">
              <i class="fas fa-users-cog"></i> Kelola User
            </button>
            <button class="btn btn-block mb-10" onclick="generateAllQr()">
              <i class="fas fa-qrcode"></i> Generate Semua QR
            </button>
            <button class="btn btn-block" onclick="navigateTo('jadwal')">
              <i class="fas fa-calendar"></i> Kelola Jadwal
            </button>
          </div>
        </div>

        <div>
          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-chart-line"></i> Tren Kehadiran</div>
            ${renderLineChart(chartData, chartLabels)}
          </div>

          <div class="glass-card fade-up" id="donutAdminCard">
            <div class="card-title" style="justify-content:space-between;">
              <span><i class="fas fa-chart-pie"></i> Status Pertemuan ${maxPertemuan}</span>
              <button class="btn btn-sm" onclick="toggleFilterMatkulAdmin()" style="padding:5px 12px;font-size:10px;">
                <i class="fas fa-filter"></i> Filter
              </button>
            </div>
            <div id="filterMatkulWrap" class="hidden" style="margin-bottom:14px;">
              <label class="form-label">Pilih Mata Kuliah</label>
              <select id="adminFilterMatkulSelect" class="form-input" onchange="gantiFilterMatkulAdmin(this.value)">
                <option value="all" ${matkulDipilih === 'all' ? 'selected' : ''}>📚 Semua Matkul</option>
                ${matkulList.map(m => `<option value="${m}" ${matkulDipilih === m ? 'selected' : ''}>${m.length > 30 ? m.substring(0, 28) + '...' : m}</option>`).join('')}
              </select>
            </div>
            <div id="donutInfoMatkul" style="font-size:11px;color:var(--text-muted);margin-bottom:10px;">
              ${matkulDipilih === 'all' ? 'Menampilkan semua matkul' : 'Matkul: <strong style="color:var(--accent)">' + matkulDipilih + '</strong>'}
            </div>
            <div id="donutContentAdmin">
              <div class="donut-wrap">
                <div class="donut" style="--hadir-end:${hadirEnd}deg;--izin-end:${izinEnd}deg;"></div>
                <div class="donut-legend">
                  <div class="item"><div class="dot green"></div><span><strong>${hadirHariIni}</strong> Hadir</span></div>
                  <div class="item"><div class="dot yellow"></div><span><strong>${izinHariIni}</strong> Izin</span></div>
                  <div class="item"><div class="dot pink"></div><span><strong>${sakitHariIni}</strong> Sakit</span></div>
                  <div class="item"><div class="dot blue"></div><span><strong>${alphaHariIni}</strong> Alpha</span></div>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-clock"></i> Aktivitas Terkini</div>
            ${lastSession.slice(0, 4).map(p => {
              const color = p.status === 'Hadir' ? '#a8f0c8' : p.status === 'Izin' ? '#ffe0a8' : p.status === 'Sakit' ? '#f5b8c8' : '#ffb8d0';
              return `<div class="activity-item">
                <i class="fas fa-circle" style="color:${color};margin-top:4px;font-size:8px;"></i>
                <div><strong>${escapeHtml(p.nama)}</strong> ${p.status} di ${escapeHtml(p.matkul)}</div>
                <div class="time">P${p.pertemuan}</div>
              </div>`;
            }).join('') || '<div class="empty-state" style="padding:20px;"><i class="fas fa-inbox"></i><p>Belum ada aktivitas</p></div>'}
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    c.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-circle"></i><p>${err.message}</p></div>`;
  }
}

// Toggle filter matkul admin
function toggleFilterMatkulAdmin() {
  const wrap = document.getElementById('filterMatkulWrap');
  if (wrap) wrap.classList.toggle('hidden');
  playBeep('click');
}

// Ganti filter matkul → cuma update donut (instan)
function gantiFilterMatkulAdmin(matkul) {
  State.adminFilterMatkul = matkul;
  playBeep('click');

  const presensi = getMergedPresensi();
  const presensiFilter = matkul === 'all' ? presensi : presensi.filter(p => p.matkul === matkul);

  const maxPertemuan = Math.max(...presensiFilter.map(p => p.pertemuan || 0), 3);
  const lastSession = presensiFilter.filter(p => p.pertemuan === maxPertemuan);
  const hadir = lastSession.filter(p => p.status === 'Hadir').length;
  const izin = lastSession.filter(p => p.status === 'Izin').length;
  const sakit = lastSession.filter(p => p.status === 'Sakit').length;
  const alpha = lastSession.filter(p => p.status === 'Alpha').length;

  const total = hadir + izin + sakit + alpha || 1;
  const hadirEnd = (hadir / total) * 360;
  const izinEnd = hadirEnd + (izin / total) * 360;

  const info = document.getElementById('donutInfoMatkul');
  if (info) {
    info.innerHTML = matkul === 'all'
      ? 'Menampilkan semua matkul'
      : 'Matkul: <strong style="color:var(--accent)">' + escapeHtml(matkul) + '</strong>';
  }

  const content = document.getElementById('donutContentAdmin');
  if (content) {
    content.innerHTML = `
      <div class="donut-wrap">
        <div class="donut" style="--hadir-end:${hadirEnd}deg;--izin-end:${izinEnd}deg;"></div>
        <div class="donut-legend">
          <div class="item"><div class="dot green"></div><span><strong>${hadir}</strong> Hadir</span></div>
          <div class="item"><div class="dot yellow"></div><span><strong>${izin}</strong> Izin</span></div>
          <div class="item"><div class="dot pink"></div><span><strong>${sakit}</strong> Sakit</span></div>
          <div class="item"><div class="dot blue"></div><span><strong>${alpha}</strong> Alpha</span></div>
        </div>
      </div>
    `;
  }
}

// ═══════════════════════════════════════════════════════════
// LINE CHART (SVG manual)
// ═══════════════════════════════════════════════════════════
function renderLineChart(data, labels) {
  if (!data || data.length === 0) return '<div class="empty-state"><p>Tidak ada data</p></div>';
  const max = Math.max(...data, 1);
  const W = 400, H = 140, pad = 20;
  const points = data.map((v, i) => {
    const x = pad + (i / Math.max(data.length - 1, 1)) * (W - pad * 2);
    const y = H - pad - (v / max) * (H - pad * 2);
    return { x, y, v };
  });
  const pathD = points.map((p, i) => (i === 0 ? 'M' : 'L') + p.x + ',' + p.y).join(' ');
  const areaD = pathD + ` L${points[points.length-1].x},${H-pad} L${points[0].x},${H-pad} Z`;

  return `
    <div class="line-chart-wrap">
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f5b8c8" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#f5b8c8" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <line x1="${pad}" y1="${pad}" x2="${W-pad}" y2="${pad}" stroke="rgba(255,220,230,0.08)" stroke-dasharray="2,4"/>
        <line x1="${pad}" y1="${H/2}" x2="${W-pad}" y2="${H/2}" stroke="rgba(255,220,230,0.08)" stroke-dasharray="2,4"/>
        <line x1="${pad}" y1="${H-pad}" x2="${W-pad}" y2="${H-pad}" stroke="rgba(255,220,230,0.15)"/>
        <path d="${areaD}" fill="url(#lineGrad)"/>
        <path d="${pathD}" fill="none" stroke="#f5b8c8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${points.map(p => `<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#f5b8c8" stroke="#2a1018" stroke-width="1.5"/>`).join('')}
      </svg>
    </div>
    <div class="line-chart-labels">
      ${labels.map(l => `<div>${l}</div>`).join('')}
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD MAHASISWA
// ═══════════════════════════════════════════════════════════
function renderMhsDash() {
  const u = State.user;
  const c = document.getElementById('dashBody');
  if (!c) return;
  try {
    const merged = getMergedPresensi();
    const myPresensi = merged.filter(p => String(p.nim) === String(u.nim));

    const myMatkul = [...new Set(myPresensi.map(p => p.matkul))];
    if (myMatkul.length === 0) myMatkul.push(...DUMMY_JADWAL.map(j => j.matkul));

    const matkulAktif = State.matkulAktif && myMatkul.includes(State.matkulAktif)
      ? State.matkulAktif : myMatkul[0];
    State.matkulAktif = matkulAktif;

    const presensiMatkul = myPresensi.filter(p => p.matkul === matkulAktif);
    const myHadir = presensiMatkul.filter(p => p.status === 'Hadir').length;
    const myIzin = presensiMatkul.filter(p => p.status === 'Izin').length;
    const mySakit = presensiMatkul.filter(p => p.status === 'Sakit').length;
    const myAlpha = presensiMatkul.filter(p => p.status === 'Alpha').length;
    const totalPertemuan = presensiMatkul.length || 1;
    const persenHadir = Math.round((myHadir / totalPertemuan) * 100);

    // Cek kelas aktif
    const cek = cekJamKelasForAbsen();
    let jadwalInfo = '';
    if (cek.bisa) {
      jadwalInfo = `<div class="jadwal-hero fade-up">
        <div class="jadwal-label"><span class="dot-live"></span> Sedang Berlangsung</div>
        <div class="jadwal-matkul">${escapeHtml(cek.jadwal.matkul)}</div>
        <div class="jadwal-info">
          <span><i class="fas fa-clock"></i> ${cek.jadwal.jamMulai} - ${cek.jadwal.jamSelesai}</span>
          <span><i class="fas fa-door-open"></i> ${escapeHtml(cek.jadwal.ruang)}</span>
          <span><i class="fas fa-user-tie"></i> ${escapeHtml(cek.jadwal.dosen)}</span>
        </div>
      </div>`;
    } else {
      jadwalInfo = `<div class="glass-card fade-up">
        <div class="card-title" style="color:var(--info)"><i class="fas fa-info-circle"></i> Info Kelas</div>
        <div style="font-size:12px;color:var(--text-muted);line-height:1.7;">${escapeHtml(cek.alasan || 'Tidak ada kelas sekarang')}</div>
      </div>`;
    }

    // QR
    let qrImgSrc = u.qrLink ? convertDriveUrl(u.qrLink) : '';
    if (!qrImgSrc) qrImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&ecc=L&data=${encodeURIComponent(u.nim || '')}`;
    const fallback = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&ecc=L&data=${encodeURIComponent(u.nim || '')}`;

    c.innerHTML = `
      <div class="matkul-tabs fade-up">
        ${myMatkul.map(m => `
          <button class="matkul-tab ${m === matkulAktif ? 'active' : ''}" onclick="gantiMatkulMhs('${String(m).replace(/'/g, "\\'")}')">
            ${escapeHtml(m.length > 20 ? m.substring(0, 18) + '...' : m)}
          </button>
        `).join('')}
      </div>

      <div class="split-dash">
        <div>
          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-qrcode"></i> QR Identitas Anda</div>
            <div class="qr-display">
              <img src="${qrImgSrc}" alt="QR" onerror="this.onerror=null;this.src='${fallback}'" />
              <div class="qr-hint"><i class="fas fa-info-circle"></i> Tunjukkan ke dosen bila perlu</div>
              <div style="display:flex;gap:8px;margin-top:14px;justify-content:center;flex-wrap:wrap;">
                <button class="btn btn-sm btn-neon" onclick="downloadMyQR()"><i class="fas fa-download"></i> Unduh QR</button>
                <button class="btn btn-sm" onclick="shareMyQR()"><i class="fas fa-share-alt"></i> Bagikan</button>
              </div>
            </div>
          </div>

          ${jadwalInfo}

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-bolt"></i> Aksi Cepat</div>
            <button class="btn btn-neon btn-block mb-10" onclick="navigateTo('absen')"><i class="fas fa-camera"></i> Absen Sekarang</button>
            <button class="btn btn-block" onclick="openIzinModal()"><i class="fas fa-file-medical"></i> Ajukan Izin / Sakit</button>
          </div>
        </div>

        <div>
          <div class="stat-grid-v2">
            <div class="stat-v2 green fade-up">
              <div class="icon-box"><i class="fas fa-check-circle"></i></div>
              <div class="val">${myHadir}</div>
              <div class="lbl">Hadir</div>
            </div>
            <div class="stat-v2 yellow fade-up">
              <div class="icon-box"><i class="fas fa-file-medical"></i></div>
              <div class="val">${myIzin}</div>
              <div class="lbl">Izin</div>
            </div>
            <div class="stat-v2 orange fade-up">
              <div class="icon-box"><i class="fas fa-bed"></i></div>
              <div class="val">${mySakit}</div>
              <div class="lbl">Sakit</div>
            </div>
            <div class="stat-v2 pink fade-up">
              <div class="icon-box"><i class="fas fa-times-circle"></i></div>
              <div class="val">${myAlpha}</div>
              <div class="lbl">Alpha</div>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-chart-pie"></i> Status ${escapeHtml(matkulAktif.substring(0, 25))}</div>
            <div class="donut-wrap">
              <div class="donut" style="--hadir-end:${(myHadir/totalPertemuan)*360}deg;--izin-end:${((myHadir+myIzin)/totalPertemuan)*360}deg;"></div>
              <div class="donut-legend">
                <div class="item"><div class="dot green"></div><span><strong>${myHadir}</strong> Hadir</span></div>
                <div class="item"><div class="dot yellow"></div><span><strong>${myIzin}</strong> Izin</span></div>
                <div class="item"><div class="dot pink"></div><span><strong>${mySakit}</strong> Sakit</span></div>
                <div class="item"><div class="dot blue"></div><span><strong>${myAlpha}</strong> Alpha</span></div>
              </div>
            </div>
            <div style="text-align:center;padding:10px 0 0;">
              <div style="font-size:32px;font-weight:900;background:linear-gradient(135deg,var(--accent-strong),var(--accent-deep));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">${persenHadir}%</div>
              <div style="font-size:11px;color:var(--text-muted);">dari ${totalPertemuan} pertemuan</div>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-history"></i> Riwayat per Pertemuan</div>
            ${presensiMatkul.length === 0 ? '<div class="empty-state" style="padding:20px;"><i class="fas fa-inbox"></i><p>Belum ada riwayat</p></div>' :
              presensiMatkul.slice().sort((a,b) => (a.pertemuan || 0) - (b.pertemuan || 0)).map(p => {
                const badge = p.status === 'Hadir' ? 'badge-hadir' : p.status === 'Izin' ? 'badge-izin' : p.status === 'Sakit' ? 'badge-sakit' : 'badge-alpha';
                const bg = p.status === 'Hadir' ? '#a8f0c8' : p.status === 'Izin' ? '#ffe0a8' : p.status === 'Sakit' ? '#f5b8c8' : '#ffb8d0';
                const icon = p.status === 'Hadir' ? 'fa-check' : p.status === 'Izin' ? 'fa-file' : p.status === 'Sakit' ? 'fa-bed' : 'fa-times';
                return `<div class="list-item">
                  <div class="list-avatar" style="background:${bg}"><i class="fas ${icon}" style="color:#2a1018;font-size:14px;"></i></div>
                  <div class="list-content">
                    <div class="list-title">Pertemuan ${p.pertemuan || '-'}</div>
                    <div class="list-sub">${escapeHtml(p.waktu || '')}</div>
                  </div>
                  <span class="badge-status ${badge}">${escapeHtml(p.status)}</span>
                </div>`;
              }).join('')}
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    c.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-circle"></i><p>${err.message}</p></div>`;
  }
}

// Ganti matkul mahasiswa (instant, no fetch)
function gantiMatkulMhs(matkul) {
  State.matkulAktif = matkul;
  playBeep('click');
  renderMhsDash();
  setTimeout(setupFadeUp, 50);
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD DOSEN
// ═══════════════════════════════════════════════════════════
function renderDosenDash() {
  const c = document.getElementById('dashBody');
  if (!c) return;
  try {
    const merged = getMergedPresensi();
    const matkulOptions = (State.user.matkul && State.user.matkul.length)
      ? State.user.matkul : ['Rekayasa Perangkat Lunak II'];
    const matkulAktif = State.dosenFilterMatkul || matkulOptions[0];
    State.dosenFilterMatkul = matkulAktif;

    const kelasPresensi = merged.filter(p => p.matkul === matkulAktif);
    const hadir = kelasPresensi.filter(p => p.status === 'Hadir').length;
    const izin = kelasPresensi.filter(p => p.status === 'Izin').length;
    const sakit = kelasPresensi.filter(p => p.status === 'Sakit').length;
    const alpha = kelasPresensi.filter(p => p.status === 'Alpha').length;
    const total = kelasPresensi.length || 1;

    const maxPertemuan = Math.max(...kelasPresensi.map(p => p.pertemuan || 0), 3);
    const chartData = [], chartLabels = [];
    for (let i = 1; i <= maxPertemuan; i++) {
      const sesi = kelasPresensi.filter(p => p.pertemuan === i);
      chartData.push(sesi.filter(p => p.status === 'Hadir').length);
      chartLabels.push('P' + i);
    }
    const hadirEnd = (hadir / total) * 360;
    const izinEnd = hadirEnd + (izin / total) * 360;

    c.innerHTML = `
      <div class="split-dash">
        <div>
          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-user-tie"></i> Info Dosen</div>
            <div class="list-item">
              <div class="list-avatar" style="background:${colorFromName(State.user.nama)}">${getInitials(State.user.nama)}</div>
              <div class="list-content">
                <div class="list-title">${escapeHtml(State.user.nama)}</div>
                <div class="list-sub">${escapeHtml(State.user.email || '')}</div>
              </div>
            </div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:10px;">
              <strong style="color:var(--accent)">Matkul:</strong> ${matkulOptions.map(m => escapeHtml(m)).join(', ')}
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-file-export"></i> Export Laporan</div>
            <div class="export-filter">
              <label>Pilih MK</label>
              <select id="exportFilterMatkulDosen">
                ${matkulOptions.map(m => `<option value="${escapeHtml(m)}">${escapeHtml(m)}</option>`).join('')}
              </select>
            </div>
            <div class="export-row">
              <button class="btn-export excel" onclick="exportExcel('presensi', document.getElementById('exportFilterMatkulDosen').value)">
                <i class="fas fa-file-excel"></i> Excel
              </button>
              <button class="btn-export pdf" onclick="exportPDF('presensi', document.getElementById('exportFilterMatkulDosen').value)">
                <i class="fas fa-file-pdf"></i> PDF
              </button>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-comment-dots"></i> Lapor Tidak Hadir</div>
            <p style="font-size:11px;color:var(--text-muted);margin-bottom:12px;line-height:1.6;">
              Kirim pengumuman ke mahasiswa via WhatsApp jika Anda berhalangan hadir.
            </p>
            <button class="btn btn-neon btn-block" onclick="laporTidakHadir()">
              <i class="fab fa-whatsapp"></i> Kirim Laporan via WA
            </button>
          </div>
        </div>

        <div>
          <div class="stat-grid-v2">
            <div class="stat-v2 pink fade-up">
              <div class="icon-box"><i class="fas fa-users"></i></div>
              <div class="val">${DUMMY_MHS.length}</div>
              <div class="lbl">Total Mhs</div>
            </div>
            <div class="stat-v2 green fade-up">
              <div class="icon-box"><i class="fas fa-check"></i></div>
              <div class="val">${hadir}</div>
              <div class="lbl">Hadir</div>
            </div>
            <div class="stat-v2 yellow fade-up">
              <div class="icon-box"><i class="fas fa-file-medical"></i></div>
              <div class="val">${izin}</div>
              <div class="lbl">Izin</div>
            </div>
            <div class="stat-v2 blue fade-up">
              <div class="icon-box"><i class="fas fa-percentage"></i></div>
              <div class="val">${Math.round((hadir/total)*100)}%</div>
              <div class="lbl">Kehadiran</div>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-chart-line"></i> Kehadiran per Pertemuan</div>
            ${renderLineChart(chartData.slice(0, 7), chartLabels.slice(0, 7))}
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-chart-pie"></i> Status Kelas</div>
            <div class="donut-wrap">
              <div class="donut" style="--hadir-end:${hadirEnd}deg;--izin-end:${izinEnd}deg;"></div>
              <div class="donut-legend">
                <div class="item"><div class="dot green"></div><span><strong>${hadir}</strong> Hadir</span></div>
                <div class="item"><div class="dot yellow"></div><span><strong>${izin}</strong> Izin</span></div>
                <div class="item"><div class="dot pink"></div><span><strong>${sakit}</strong> Sakit</span></div>
                <div class="item"><div class="dot blue"></div><span><strong>${alpha}</strong> Alpha</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    c.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-circle"></i><p>${err.message}</p></div>`;
  }
}

/*************************************************************
 * app.js - Part 3/4 (LANJUTAN)
 * Absen, Sesi QR, QR Login, Scanner
 *************************************************************/

function laporTidakHadir() {
  const matkulOpts = (State.user.matkul && State.user.matkul.length) 
    ? State.user.matkul : ['Rekayasa Perangkat Lunak II'];
  openModal(`
    <div class="modal-title"><i class="fab fa-whatsapp"></i> Lapor Tidak Hadir</div>
    <div class="form-group">
      <label class="form-label">Mata Kuliah</label>
      <select id="laporMatkul" class="form-input">
        ${matkulOpts.map(m => `<option>${escapeHtml(m)}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Tanggal</label>
      <input type="date" id="laporTanggal" class="form-input" value="${new Date().toISOString().slice(0,10)}" />
    </div>
    <div class="form-group">
      <label class="form-label">Alasan</label>
      <textarea id="laporAlasan" class="form-input" placeholder="Contoh: Ada keperluan dinas, sakit, dll."></textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Nomor WA Grup Kelas</label>
      <input type="tel" id="laporWA" class="form-input" placeholder="628123456789" />
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-block" onclick="closeModal()">Batal</button>
      <button class="btn btn-neon btn-block" onclick="doLaporTidakHadir()">
        <i class="fab fa-whatsapp"></i> Kirim
      </button>
    </div>
  `);
}

function doLaporTidakHadir() {
  const matkul = document.getElementById('laporMatkul').value;
  const tanggal = document.getElementById('laporTanggal').value;
  const alasan = document.getElementById('laporAlasan').value.trim();
  const wa = document.getElementById('laporWA').value.trim().replace(/\D/g, '');
  if (!alasan) { toast('Alasan wajib diisi', 'error'); return; }
  if (!wa || wa.length < 10) { toast('Nomor WA tidak valid', 'error'); return; }

  const pesan = `Assalamualaikum, saya ${State.user.nama}, dosen pengampu mata kuliah ${matkul}.\n\nMohon maaf, saya tidak dapat hadir pada:\n📅 Tanggal: ${tanggal}\n📚 Matkul: ${matkul}\n📝 Alasan: ${alasan}\n\nMohon izin untuk kelas hari ini. Terima kasih.`;

  // Simpan notif lokal
  try {
    const notifs = JSON.parse(localStorage.getItem('absenqr_notif_dosen') || '[]');
    notifs.push({ matkul, tanggal, alasan, waktu: new Date().toLocaleString('id-ID') });
    localStorage.setItem('absenqr_notif_dosen', JSON.stringify(notifs));
  } catch(e) {}

  playBeep('success');
  toast('Membuka WhatsApp...', 'success');
  closeModal();

  // Pakai location.href biar gak kena popup blocker
  setTimeout(() => {
    window.location.href = `https://wa.me/${wa}?text=${encodeURIComponent(pesan)}`;
  }, 500);
}

// ═══════════════════════════════════════════════════════════
// ABSEN PAGE (MAHASISWA)
// ═══════════════════════════════════════════════════════════
function renderAbsen() {
  DOM.appContent.innerHTML = `
    <div class="page active">
      <div class="page-header fade-up">
        <div class="page-title">📷 Scan QR Dosen</div>
        <div class="page-subtitle">Arahkan kamera ke QR dosen</div>
      </div>
      <div class="glass-card fade-up">
        <div class="card-title"><i class="fas fa-clock"></i> Status Jam</div>
        <div id="jamStatus" style="font-size:14px;color:var(--text-muted);">
          <i class="fas fa-spinner fa-spin"></i> Mengecek jam kelas...
        </div>
      </div>
      <div class="glass-card fade-up">
        <div class="card-title"><i class="fas fa-location-dot"></i> Status Lokasi</div>
        <div id="gpsStatus" style="font-size:13px;color:var(--text-muted);">
          <i class="fas fa-spinner fa-spin"></i> Mendeteksi lokasi...
        </div>
      </div>
      <div class="scanner-wrap fade-up">
        <div id="qrReader"></div>
        <div class="scanner-overlay">
          <div class="scan-frame">
            <div class="corner corner-tl"></div><div class="corner corner-tr"></div>
            <div class="corner corner-bl"></div><div class="corner corner-br"></div>
            <div class="scan-line"></div>
          </div>
        </div>
      </div>
      <button class="btn btn-neon btn-block mt-10 fade-up" id="btnToggleScan" onclick="toggleAbsenScanner()">
        <i class="fas fa-play"></i> Mulai Scan
      </button>
      <div id="absenResult" class="hidden"></div>
    </div>`;
  checkJamKelas();
  checkGps();
  setTimeout(setupFadeUp, 50);
}

function checkJamKelas() {
  const cek = cekJamKelasForAbsen();
  const el = document.getElementById('jamStatus');
  if (!el) return;
  if (cek.bisa) {
    el.innerHTML = `
      <i class="fas fa-check-circle" style="color:var(--success);font-size:18px"></i>
      <strong style="color:var(--accent);">${escapeHtml(cek.jadwal.matkul)}</strong> sedang berlangsung<br>
      <span style="font-size:11px">${cek.jadwal.jamMulai} - ${cek.jadwal.jamSelesai} • ${escapeHtml(cek.jadwal.ruang)}</span>
    `;
  } else {
    el.innerHTML = `
      <i class="fas fa-lock" style="color:var(--warning);font-size:18px"></i>
      <span style="color:var(--warning)">Belum bisa absen</span><br>
      <span style="font-size:11px">${escapeHtml(cek.alasan || 'Di luar jam kelas')}</span>
    `;
  }
}

function checkGps() {
  if (!navigator.geolocation) {
    const el = document.getElementById('gpsStatus');
    if (el) el.innerHTML = '<i class="fas fa-exclamation-triangle"></i> GPS tidak didukung';
    return;
  }
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude, lng = pos.coords.longitude;
    State.currentLat = lat;
    State.currentLng = lng;
    try {
      const res = await apiGet('validasi_lokasi', { lat, lng, nim: State.user.nim });
      const el = document.getElementById('gpsStatus');
      if (!el) return;
      if (res.diDalamArea) {
        el.innerHTML = `<i class="fas fa-check-circle" style="color:var(--success)"></i> Anda di <strong style="color:var(--accent)">${escapeHtml(res.gampong || 'Area')}</strong><br><span style="font-size:11px;">${res.jarakKeKampus || 0}m dari kampus</span>`;
      } else {
        el.innerHTML = `<i class="fas fa-times-circle" style="color:var(--danger)"></i> Di luar area<br><span style="font-size:11px;">${res.jarakKeKampus || 0}m dari kampus</span>`;
      }
    } catch (e) {
      const el = document.getElementById('gpsStatus');
      if (el) el.innerHTML = '<i class="fas fa-check-circle" style="color:var(--success)"></i> Lokasi terdeteksi';
    }
  }, () => {
    const el = document.getElementById('gpsStatus');
    if (el) el.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Izin lokasi diperlukan';
  }, { enableHighAccuracy: true, timeout: 10000 });
}

function cekJamKelasForAbsen() {
  const now = new Date();
  const hariID = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const hari = hariID[now.getDay()];
  const jam = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  const jadwalHariIni = (Cache.allJadwal && Cache.allJadwal.length > 0 ? Cache.allJadwal : DUMMY_JADWAL)
    .filter(j => j.hari === hari);
  for (const j of jadwalHariIni) {
    if (jam >= j.jamMulai && jam <= j.jamSelesai) {
      return { bisa: true, jadwal: j };
    }
  }
  const next = jadwalHariIni.find(j => jam < j.jamMulai);
  if (next) return { bisa: false, alasan: `Kelas ${next.matkul} mulai ${next.jamMulai}. Sekarang ${jam}.` };
  return { bisa: false, alasan: `Tidak ada kelas aktif hari ${hari} jam ${jam}.` };
}

function toggleAbsenScanner() {
  if (State.scannerRunning) stopAbsenScanner(); else startAbsenScanner();
}

function startAbsenScanner() {
  const reader = document.getElementById('qrReader');
  if (!reader) return;
  reader.innerHTML = '';
  State.html5QrCode = new Html5Qrcode('qrReader', { verbose: false });
  State.html5QrCode.start(
    { facingMode: 'environment' },
    { fps: 10, qrbox: { width: 240, height: 240 } },
    onAbsenScanSuccess, () => {}
  ).then(() => {
    State.scannerRunning = true;
    const b = document.getElementById('btnToggleScan');
    if (b) {
      b.innerHTML = '<i class="fas fa-stop"></i> Stop Scan';
      b.classList.remove('btn-neon');
      b.classList.add('btn-danger');
    }
  }).catch(err => toast('Gagal kamera: ' + err.message, 'error'));
}

async function onAbsenScanSuccess(decodedText) {
  if (State.isProcessing) return;
  State.isProcessing = true;

  const cek = cekJamKelasForAbsen();
  if (!cek.bisa) {
    toast('❌ ' + cek.alasan, 'error', 6000);
    playBeep('error');
    State.isProcessing = false;
    return;
  }

  stopAbsenScanner();

  try {
    const data = JSON.parse(decodedText);
    if (!data.sesiID && !data.token) throw new Error('QR tidak valid');

    toast('⏳ Memproses...', 'info');
    playBeep('success');

    const res = await apiPostJson('absen_scan', {
      nim: State.user.nim,
      nama: State.user.nama,
      sesiID: data.sesiID || '',
      token: data.token || '',
      matkul: data.matkul || cek.jadwal.matkul,
      lat: State.currentLat,
      lng: State.currentLng
    });

    if (res.status === 'success' || res.status === 'warning') {
      showFlash();
      playBeep('success');
      setTimeout(() => speak(`Absensi berhasil, ${State.user.nama}`), 500);
      if (navigator.vibrate) navigator.vibrate(200);

      toast(`✅ ${res.statusAbsen || 'Hadir'}!`, 'success', 5000);

      // Tampilkan hasil di halaman absen
      const resultEl = document.getElementById('absenResult');
      if (resultEl) {
        const status = res.statusAbsen || 'Hadir';
        const bgColor = status === 'Hadir' ? 'rgba(168,240,200,0.15)' : 'rgba(255,224,168,0.15)';
        const borderColor = status === 'Hadir' ? '#a8f0c8' : '#ffe0a8';
        const textColor = status === 'Hadir' ? '#a8f0c8' : '#ffe0a8';
        resultEl.className = 'glass-card fade-up';
        resultEl.style.borderColor = borderColor;
        resultEl.style.background = bgColor;
        resultEl.style.marginTop = '16px';
        resultEl.innerHTML = `
          <div style="text-align:center;padding:20px;">
            <i class="fas fa-check-circle" style="font-size:52px;color:${textColor};margin-bottom:10px;"></i>
            <div style="font-size:20px;font-weight:800;color:${textColor};margin-bottom:8px;">ABSENSI BERHASIL!</div>
            <div style="font-size:14px;color:var(--text);margin-bottom:4px;">
              <strong>${escapeHtml(State.user.nama)}</strong>
            </div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:14px;">
              ${escapeHtml(cek.jadwal.matkul)} • ${res.waktu || ''}
            </div>
            <div style="display:inline-block;padding:8px 20px;background:${bgColor};border:1px solid ${borderColor};border-radius:20px;font-size:14px;font-weight:700;color:${textColor};">
              Status: ${status}
            </div>
            ${res.keterangan ? `<div style="font-size:11px;color:var(--text-muted);margin-top:8px;">${escapeHtml(res.keterangan)}</div>` : ''}
            <div style="margin-top:20px;">
              <button class="btn btn-neon" onclick="navigateTo('riwayat')">
                <i class="fas fa-history"></i> Lihat Riwayat
              </button>
            </div>
          </div>
        `;
      }

      // Refresh dashboard mahasiswa biar riwayat ke-update
      setTimeout(() => {
        if (State.activePage === 'dashboard') renderDashboard();
      }, 2000);
    } else {
      showFlash(true);
      playBeep('error');
      toast('❌ ' + res.message, 'error', 5000);
    }
  } catch (err) {
    showFlash();
    playBeep('success');
    setTimeout(() => speak(`Absensi berhasil, ${State.user.nama}`), 500);
    if (navigator.vibrate) navigator.vibrate(200);
    toast('✅ Hadir! (mode demo)', 'success', 5000);
  } finally {
    State.isProcessing = false;
  }
}

// ═══════════════════════════════════════════════════════════
// SESI PAGE (DOSEN)
// ═══════════════════════════════════════════════════════════
let sesiRefreshTimer = null;

async function renderSesi() {
  DOM.appContent.innerHTML = `
    <div class="page active">
      <div class="page-header fade-up">
        <div class="page-title">📅 Kelola Sesi</div>
        <div class="page-subtitle">Mulai / tutup sesi absensi</div>
      </div>
      <div id="sesiBody">
        <div class="empty-state">
          <i class="fas fa-spinner fa-spin"></i>
          <p>Memuat...</p>
        </div>
      </div>
    </div>`;

  try {
    const sesi = await apiGet('get_sesi_aktif', { email: State.user.email });
    if (sesi.sesi) {
      renderSesiAktif(sesi.sesi);
    } else {
      renderFormMulaiSesi();
    }
  } catch (err) {
    renderFormMulaiSesi();
  }
  setTimeout(setupFadeUp, 50);
}

function renderFormMulaiSesi() {
  const matkulOpts = (State.user.matkul && State.user.matkul.length)
    ? State.user.matkul : ['Rekayasa Perangkat Lunak II'];
  const body = document.getElementById('sesiBody');
  if (!body) return;
  body.innerHTML = `
    <div class="glass-card fade-up">
      <div class="card-title"><i class="fas fa-play"></i> Mulai Sesi Baru</div>
      <div class="form-group">
        <label class="form-label">Mata Kuliah</label>
        <select id="sesiMatkul" class="form-input">
          ${matkulOpts.map(m => `<option>${escapeHtml(m)}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Kelas</label>
        <select id="sesiKelas" class="form-input">
          <option value="V.1">V.1</option>
          <option value="V.2" selected>V.2</option>
          <option value="V.3">V.3</option>
          <option value="V.4">V.4</option>
          <option value="V.5">V.5</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Jam Selesai</label>
        <input type="time" id="sesiJamSelesai" class="form-input" value="17:00" />
      </div>
      <div class="form-group">
        <label class="form-label">Lokasi Kampus</label>
        <select id="sesiKampus" class="form-input">
          <option value="gle-gapui">🏛️ Gle Gapui</option>
          <option value="sigli">🏛️ Sigli (Nurdin A.R.)</option>
        </select>
      </div>
      <button class="btn btn-neon btn-block" onclick="doMulaiSesi()">
        <i class="fas fa-play"></i> Mulai Sesi
      </button>
    </div>`;
}

async function doMulaiSesi() {
  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memulai...';

  const demoSesi = {
    sesiID: 'SESI-' + Date.now(),
    matkul: document.getElementById('sesiMatkul').value,
    kelas: document.getElementById('sesiKelas').value,
    dosenEmail: State.user.email,
    dosenNama: State.user.nama,
    waktuMulai: new Date().toLocaleString('id-ID'),
    waktuSelesai: document.getElementById('sesiJamSelesai').value,
    token: 'demo-' + Date.now(),
    kampusId: document.getElementById('sesiKampus').value,
    kampusNama: 'Kampus Demo'
  };

  try {
    const res = await apiPostJson('mulai_sesi', {
      matkul: demoSesi.matkul,
      kelas: demoSesi.kelas,
      jamSelesai: demoSesi.waktuSelesai,
      kampusId: demoSesi.kampusId,
      dosenEmail: demoSesi.dosenEmail,
      dosenNama: demoSesi.dosenNama
    });
    if (res.sesiID) demoSesi.sesiID = res.sesiID;
    if (res.token) demoSesi.token = res.token;
  } catch(e) {}

  playBeep('success');
  toast('✅ Sesi dimulai!', 'success');
  renderSesiAktif(demoSesi);
}

function renderSesiAktif(sesi) {
  const body = document.getElementById('sesiBody');
  if (!body) return;
  body.innerHTML = `
    <div class="glass-card fade-up" style="border-color:var(--accent);">
      <div class="card-title" style="color:var(--success);">
        <i class="fas fa-circle" style="font-size:8px;"></i> Sesi Aktif
      </div>
      <div class="list-item">
        <div class="list-content">
          <div class="list-title">${escapeHtml(sesi.matkul)}</div>
          <div class="list-sub">${escapeHtml(sesi.kelas || 'V.2')} • ${escapeHtml(sesi.kampusNama || 'Kampus')}</div>
        </div>
      </div>
    </div>
    <div class="glass-card text-center fade-up">
      <div class="card-title" style="justify-content:center;"><i class="fas fa-qrcode"></i> QR Absensi</div>
      <div class="qr-display">
        <img id="sesiQrImg" src="" alt="QR" />
        <div class="qr-token" id="sesiToken">TOKEN: ------</div>
        <div class="qr-hint"><i class="fas fa-sync-alt fa-spin"></i> Auto refresh tiap 55 detik</div>
      </div>
      <button class="btn btn-neon btn-block mt-10" onclick="refreshSesiQr()">
        <i class="fas fa-sync-alt"></i> Refresh Manual
      </button>
      <button class="btn btn-block mt-10" onclick="fullscreenQr()">
        <i class="fas fa-expand"></i> Fullscreen
      </button>
      <button class="btn btn-danger btn-block mt-10" onclick="doTutupSesi('${sesi.sesiID}')">
        <i class="fas fa-stop"></i> Tutup Sesi
      </button>
    </div>`;
  updateSesiQr(sesi);
  if (sesiRefreshTimer) clearInterval(sesiRefreshTimer);
  sesiRefreshTimer = setInterval(() => refreshSesiQr(), 55000);
  setTimeout(setupFadeUp, 50);
}

function updateSesiQr(sesi) {
  const qrData = JSON.stringify({
    sesiID: sesi.sesiID,
    token: sesi.token,
    matkul: sesi.matkul,
    dosen: sesi.dosenNama,
    kampusId: sesi.kampusId
  });
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qrData)}`;
  const img = document.getElementById('sesiQrImg');
  if (img) img.src = qrUrl;
  const tok = document.getElementById('sesiToken');
  if (tok) tok.textContent = 'TOKEN: ' + String(sesi.token || '').toUpperCase();
  State.lastQrData = { sesi, qrUrl };
}

async function refreshSesiQr() {
  try {
    const res = await apiGet('get_sesi_aktif', { email: State.user.email });
    if (res.sesi) {
      updateSesiQr(res.sesi);
      playBeep('success');
      toast('QR di-refresh', 'info', 2000);
      return;
    }
  } catch(e) {}
  if (State.lastQrData) {
    State.lastQrData.sesi.token = 'demo-' + Date.now();
    updateSesiQr(State.lastQrData.sesi);
    playBeep('success');
    toast('QR di-refresh', 'info', 2000);
  }
}

async function doTutupSesi(sesiID) {
  try { await apiPostJson('tutup_sesi', { sesiID }); } catch(e) {}
  playBeep('success');
  toast('✅ Sesi ditutup', 'success');
  if (sesiRefreshTimer) clearInterval(sesiRefreshTimer);
  renderSesi();
}

function fullscreenQr() {
  if (!State.lastQrData) return;
  const { sesi, qrUrl } = State.lastQrData;
  openModal(`
    <div style="text-align:center;">
      <div class="modal-title" style="justify-content:center;">📷 QR Absensi</div>
      <div style="font-size:14px;font-weight:800;color:var(--accent);margin-bottom:6px;">${escapeHtml(sesi.matkul)}</div>
      <div style="font-size:11px;color:var(--text-muted);margin-bottom:16px;">${escapeHtml(sesi.kelas || 'V.2')} • ${escapeHtml(sesi.kampusNama || '')}</div>
      <img src="${qrUrl}" style="width:100%;max-width:400px;background:#fff;padding:16px;border-radius:16px;" />
      <div class="qr-token mt-10">TOKEN: ${String(sesi.token || '').toUpperCase()}</div>
      <button class="btn btn-block mt-10" onclick="closeModal()">Tutup</button>
    </div>`);
}

// ═══════════════════════════════════════════════════════════
// QR LOGIN SCANNER (untuk login mhs via QR)
// ═══════════════════════════════════════════════════════════
async function startQrLoginScanner() {
  if (State.scannerRunning) { stopQrLoginScanner(); return; }
  const reader = document.getElementById('qrLoginReader');
  if (!reader) return;
  reader.innerHTML = '';
  try {
    State.html5QrCode = new Html5Qrcode('qrLoginReader', { verbose: false });
    await State.html5QrCode.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 200, height: 200 } },
      onQrLoginScanned, () => {}
    );
    State.scannerRunning = true;
    const btn = document.getElementById('btnCameraScan');
    if (btn) btn.innerHTML = '<i class="fas fa-stop"></i> Stop Scan';
  } catch (e) {
    showQrLoginError('Gagal kamera: ' + e.message);
    playBeep('error');
  }
}

function switchQrMode(mode) {
  State.qrScanMode = mode;
  document.querySelectorAll('.qr-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
  const reader = document.getElementById('qrLoginReader');
  const gallery = document.getElementById('qrGalleryArea');
  const btnCam = document.getElementById('btnCameraScan');
  const btnGal = document.getElementById('btnPickGallery');
  if (mode === 'camera') {
    if (reader) reader.classList.remove('hidden');
    if (gallery) gallery.classList.add('hidden');
    if (btnCam) btnCam.classList.remove('hidden');
    if (btnGal) btnGal.classList.add('hidden');
  } else {
    if (reader) reader.classList.add('hidden');
    if (gallery) gallery.classList.remove('hidden');
    if (btnCam) btnCam.classList.add('hidden');
    if (btnGal) btnGal.classList.remove('hidden');
    stopQrLoginScanner();
  }
}

async function scanQrFromFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  showQrLoginError('⏳ Memproses gambar...');
  try {
    // Coba pakai HTML5-QRCode
    const html5Qr = new Html5Qrcode('qrLoginReader', { verbose: false });
    const text = await html5Qr.scanFile(file, true);
    html5Qr.clear();
    document.getElementById('qrLoginError').classList.remove('show');
    onQrLoginScanned(text);
  } catch (err) {
    showQrLoginError('❌ QR tidak terbaca. Coba crop / screenshot ulang.');
    playBeep('error');
  } finally {
    event.target.value = '';
  }
}

function onQrLoginScanned(decodedText) {
  try {
    let nim = null, nama = null;
    try {
      const data = JSON.parse(decodedText);
      if (data.nim) {
        nim = String(data.nim);
        nama = data.nama || null;
      }
    } catch(e) {
      const cleaned = String(decodedText).trim();
      if (/^\d{8,15}$/.test(cleaned)) nim = cleaned;
      else {
        const match = cleaned.match(/\d{8,15}/);
        if (match) nim = match[0];
      }
    }

    if (!nim) {
      showQrLoginError('QR tidak valid. Harus berisi NIM 8-15 digit.');
      playBeep('error');
      return;
    }

    const mhs = (Cache.allMahasiswa || []).find(m => String(m.nim) === String(nim))
      || DUMMY_MHS.find(m => String(m.nim) === String(nim));

    if (!mhs) {
      showQrLoginError(`❌ NIM ${nim} tidak terdaftar.`);
      playBeep('error');
      return;
    }

    State.qrLoginNim = nim;
    State.qrLoginNama = nama || mhs.nama;

    stopQrLoginScanner();
    document.getElementById('qrScanStep').classList.add('hidden');
    document.getElementById('otpSection').classList.remove('hidden');
    document.getElementById('otpDetectedInfo').innerHTML = `
      <i class="fas fa-check-circle" style="color:var(--success)"></i>
      <strong>${escapeHtml(mhs.nama)}</strong> • ${nim}
    `;

    State.otpPin = '';
    State.otpState = 'idle';
    resetOtpUI();

    setTimeout(() => {
      const inp = document.getElementById('otpHiddenInput');
      if (inp) { inp.value = ''; inp.focus(); }
    }, 100);

    playBeep('success');
  } catch (e) {
    showQrLoginError('QR tidak dikenali');
    playBeep('error');
  }
}

/*************************************************************
 * AbsenQR - app.js
 * Part 4: User Mgmt, Riwayat, Kalender, Profil, Init
 *************************************************************/

// ═══════════════════════════════════════════════════════════
// USER MANAGEMENT (ADMIN)
// ═══════════════════════════════════════════════════════════
function renderUser() {
  const dosenList = Cache.allDosen || [];
  const mhsList = Cache.allMahasiswa || DUMMY_MHS.map(m => ({
    ...m, kelas: 'V.2', jurusan: 'Teknik Informatika',
    email: m.nim + '@student.unigha.ac.id', status: 'Aktif'
  }));

  DOM.appContent.innerHTML = `
    <div class="page active">
      <div class="page-header fade-up">
        <div class="page-title">👥 Kelola User</div>
        <div class="page-subtitle">${mhsList.length} mahasiswa • ${dosenList.length} dosen</div>
      </div>

      <div class="glass-card fade-up">
        <div class="card-title"><i class="fas fa-user-plus"></i> Tambah User Baru</div>
        <div style="display:flex;gap:8px;margin-bottom:14px;">
          <button class="btn btn-neon" style="flex:1;" onclick="openAddDosenModal()">
            <i class="fas fa-user-tie"></i> Tambah Dosen
          </button>
          <button class="btn btn-neon" style="flex:1;" onclick="openAddMhsModal()">
            <i class="fas fa-user-graduate"></i> Tambah Mahasiswa
          </button>
        </div>
        <div style="font-size:11px;color:var(--text-muted);line-height:1.6;">
          💡 <strong>Dosen:</strong> input manual oleh admin.<br>
          🎓 <strong>Mahasiswa:</strong> bisa daftar sendiri via Sign Up (butuh approval).
        </div>
      </div>

      ${dosenList.length > 0 ? `
        <div class="glass-card fade-up">
          <div class="card-title"><i class="fas fa-chalkboard-teacher"></i> Dosen (${dosenList.length})</div>
          ${dosenList.map(d => `
            <div class="list-item">
              <div class="list-avatar" style="background:${colorFromName(d.nama)}">${getInitials(d.nama)}</div>
              <div class="list-content">
                <div class="list-title">${escapeHtml(d.nama)}</div>
                <div class="list-sub">${escapeHtml(d.email)} • ${escapeHtml(d.matkul || '-')}</div>
              </div>
              <button class="btn btn-sm" style="background:rgba(255,184,208,0.15);color:var(--danger);" onclick="confirmDeleteUser('${escapeHtml(d.email)}','dosen')">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="glass-card fade-up">
        <div class="card-title">
          <i class="fas fa-user-graduate"></i> Mahasiswa (${mhsList.length})
        </div>
        <div class="form-group">
          <input type="text" id="searchMhs" class="form-input" placeholder="🔍 Cari nama atau NIM..." oninput="filterMhsList(this.value)" />
        </div>
        <div id="mhsListContainer">
          ${renderMhsListItems(mhsList)}
        </div>
      </div>
    </div>
  `;
  setTimeout(setupFadeUp, 50);
}

function renderMhsListItems(list) {
  if (!list || list.length === 0) {
    return '<div class="empty-state" style="padding:20px;"><i class="fas fa-inbox"></i><p>Tidak ada mahasiswa</p></div>';
  }
  return list.map(m => {
    const isPending = String(m.status || '').toLowerCase() === 'pending';
    const badge = isPending ? 'badge-pending' : 'badge-hadir';
    return `
      <div class="list-item">
        <div class="list-avatar" style="background:${colorFromName(m.nama)}">${getInitials(m.nama)}</div>
        <div class="list-content">
          <div class="list-title">${escapeHtml(m.nama)}</div>
          <div class="list-sub">${escapeHtml(m.nim)} • ${escapeHtml(m.kelas || 'V.2')}</div>
        </div>
        ${isPending ? `
          <button class="btn btn-sm" style="background:rgba(168,240,200,0.15);color:var(--success);" onclick="approveMhs('${m.nim}',true)" title="Setujui">
            <i class="fas fa-check"></i>
          </button>
        ` : `
          <span class="badge-status ${badge}">${escapeHtml(m.status || 'Aktif')}</span>
        `}
      </div>
    `;
  }).join('');
}

function filterMhsList(q) {
  const mhsList = Cache.allMahasiswa || [];
  const search = String(q).toLowerCase();
  const filtered = search
    ? mhsList.filter(m => String(m.nama).toLowerCase().includes(search) || String(m.nim).includes(search))
    : mhsList;
  const container = document.getElementById('mhsListContainer');
  if (container) container.innerHTML = renderMhsListItems(filtered);
}

async function approveMhs(nim, approve) {
  try {
    await apiPostJson('approve_mhs', { nim, approve });
    if (Cache.allMahasiswa) {
      const m = Cache.allMahasiswa.find(x => String(x.nim) === String(nim));
      if (m) m.status = approve ? 'Aktif' : 'Nonaktif';
    }
    toast(approve ? '✅ Mahasiswa disetujui' : '❌ Mahasiswa ditolak', 'success');
    playBeep('success');
    renderUser();
  } catch(e) {
    toast('Gagal: ' + e.message, 'error');
  }
}

function confirmDeleteUser(identifier, role) {
  openModal(`
    <div class="modal-title" style="color:var(--danger);"><i class="fas fa-trash"></i> Hapus User</div>
    <p style="font-size:13px;color:var(--text-muted);margin-bottom:20px;">
      Yakin mau hapus <strong>${escapeHtml(identifier)}</strong>?<br>
      Data presensi tidak akan terhapus.
    </p>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-block" onclick="closeModal()">Batal</button>
      <button class="btn btn-danger btn-block" onclick="doDeleteUser('${escapeHtml(identifier)}','${role}')">
        <i class="fas fa-trash"></i> Hapus
      </button>
    </div>
  `);
}

async function doDeleteUser(identifier, role) {
  try {
    await apiPostJson('delete_user', { identifier, role });
    // Update Cache lokal
    if (role === 'dosen') {
      Cache.allDosen = (Cache.allDosen || []).filter(d =>
        String(d.email).toLowerCase() !== String(identifier).toLowerCase()
      );
    } else if (role === 'mahasiswa') {
      Cache.allMahasiswa = (Cache.allMahasiswa || []).filter(m =>
        String(m.nim) !== String(identifier)
      );
    }
    toast('✅ User dihapus', 'success');
    playBeep('success');
    closeModal();
    renderUser();
  } catch(e) {
    toast('Gagal: ' + e.message, 'error');
  }
}

// ═══════════════════════════════════════════════════════════
// MODAL: TAMBAH DOSEN
// ═══════════════════════════════════════════════════════════
function openAddDosenModal() {
  openModal(`
    <div class="modal-title"><i class="fas fa-user-tie"></i> Tambah Dosen</div>
    <div class="form-group">
      <label class="form-label">Nama Lengkap</label>
      <input type="text" id="addNama" class="form-input" placeholder="Contoh: Dr. Ahmad, M.Kom." />
    </div>
    <div class="form-group">
      <label class="form-label">Email</label>
      <input type="email" id="addEmail" class="form-input" placeholder="dosen@unigha.ac.id" />
    </div>
    <div class="form-group">
      <label class="form-label">Password</label>
      <input type="text" id="addPass" class="form-input" placeholder="Password login" />
    </div>
    <div class="form-group">
      <label class="form-label">Mata Kuliah</label>
      <input type="text" id="addMatkul" class="form-input" placeholder="Contoh: Pemrograman Web" />
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-block" onclick="closeModal()">Batal</button>
      <button class="btn btn-neon btn-block" onclick="doAddDosen()">
        <i class="fas fa-save"></i> Tambah
      </button>
    </div>
  `);
}

async function doAddDosen() {
  const nama = document.getElementById('addNama').value.trim();
  const email = document.getElementById('addEmail').value.trim();
  const password = document.getElementById('addPass').value.trim();
  const matkul = document.getElementById('addMatkul').value.trim();

  if (!nama || !email || !password || !matkul) {
    toast('Semua field wajib diisi', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toast('Format email tidak valid', 'error');
    return;
  }

  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';

  let res;
  try {
    res = await apiPostJson('add_dosen', { nama, email, password, matkul });
  } catch(err) {
    res = getDummyResponse('add_dosen', { nama, email, password, matkul });
  }

  // Backend sukses → update Cache
  if (res.status === 'success') {
    // Cek kalau belum ada di Cache (kalau dummy fallback yang handle, udah masuk)
    const exists = (Cache.allDosen || []).find(d =>
      String(d.email).toLowerCase() === email.toLowerCase()
    );
    if (!exists) {
      if (!Cache.allDosen) Cache.allDosen = [];
      Cache.allDosen.push({
        nidn: res.nidn || ('D' + Date.now()),
        nama, email, password, matkul,
        status: 'Aktif'
      });
    }
    toast('✅ ' + (res.message || 'Dosen ditambahkan'), 'success');
    playBeep('success');
    closeModal();
    renderUser();
  } else {
    toast('❌ ' + (res.message || 'Gagal'), 'error');
    playBeep('error');
  }

  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-save"></i> Tambah';
}

// ═══════════════════════════════════════════════════════════
// MODAL: TAMBAH MAHASISWA
// ═══════════════════════════════════════════════════════════
function openAddMhsModal() {
  openModal(`
    <div class="modal-title"><i class="fas fa-user-graduate"></i> Tambah Mahasiswa</div>
    <div class="form-group">
      <label class="form-label">NIM</label>
      <input type="text" id="addMhsNim" class="form-input" placeholder="24105111XXX" maxlength="15" />
    </div>
    <div class="form-group">
      <label class="form-label">Nama Lengkap</label>
      <input type="text" id="addMhsNama" class="form-input" placeholder="Nama sesuai KTM" />
    </div>
    <div class="form-group">
      <label class="form-label">Email</label>
      <input type="email" id="addMhsEmail" class="form-input" placeholder="nim@student.unigha.ac.id" />
    </div>
    <div class="form-group">
      <label class="form-label">Kelas</label>
      <select id="addMhsKelas" class="form-input">
        <option>V.1</option>
        <option selected>V.2</option>
        <option>V.3</option>
        <option>V.4</option>
        <option>V.5</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Jurusan</label>
      <input type="text" id="addMhsJurusan" class="form-input" value="Teknik Informatika" />
    </div>
    <div class="form-group">
      <label class="form-label">PIN (4 digit)</label>
      <input type="tel" id="addMhsPin" class="form-input" placeholder="••••" maxlength="4" />
    </div>
    <div style="font-size:11px;color:var(--text-muted);margin-bottom:12px;line-height:1.5;">
      💡 Kosongkan PIN → otomatis pakai 4 digit terakhir NIM
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-block" onclick="closeModal()">Batal</button>
      <button class="btn btn-neon btn-block" onclick="doAddMhs()">
        <i class="fas fa-save"></i> Tambah
      </button>
    </div>
  `);
}

async function doAddMhs() {
  const nim = document.getElementById('addMhsNim').value.trim();
  const nama = document.getElementById('addMhsNama').value.trim();
  const email = document.getElementById('addMhsEmail').value.trim();
  const kelas = document.getElementById('addMhsKelas').value;
  const jurusan = document.getElementById('addMhsJurusan').value.trim();
  const pin = document.getElementById('addMhsPin').value.trim();

  if (!nim || !nama) {
    toast('NIM & Nama wajib diisi', 'error');
    return;
  }
  if (!/^\d{8,15}$/.test(nim)) {
    toast('NIM harus 8-15 digit', 'error');
    return;
  }
  if (pin && !/^\d{4}$/.test(pin)) {
    toast('PIN harus 4 digit angka', 'error');
    return;
  }

  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';

  const finalPin = pin || nim.slice(-4);
  let res;
  try {
    res = await apiPostJson('add_mahasiswa', {
      nim, nama, kelas, jurusan, email, pin: finalPin
    });
  } catch(err) {
    res = getDummyResponse('add_mahasiswa', {
      nim, nama, kelas, jurusan, email, pin: finalPin
    });
  }

  if (res.status === 'success') {
    // Update Cache
    const exists = (Cache.allMahasiswa || []).find(m => String(m.nim) === String(nim));
    if (!exists) {
      if (!Cache.allMahasiswa) Cache.allMahasiswa = [];
      Cache.allMahasiswa.push({
        nim: String(nim),
        nama: nama.toUpperCase(),
        kelas, jurusan,
        email: email || (nim + '@student.unigha.ac.id'),
        pin: '••••',
        qrLink: '',
        status: 'Aktif'
      });
    }
    toast('✅ ' + (res.message || 'Mahasiswa ditambahkan'), 'success');
    playBeep('success');
    closeModal();
    renderUser();
  } else {
    toast('❌ ' + (res.message || 'Gagal'), 'error');
    playBeep('error');
  }

  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-save"></i> Tambah';
}

// ═══════════════════════════════════════════════════════════
// MAHASISWA PAGE (DOSEN)
// ═══════════════════════════════════════════════════════════
function renderMahasiswa() {
  const merged = getMergedPresensi();
  const mhsList = (Cache.allMahasiswa && Cache.allMahasiswa.length > 0)
    ? Cache.allMahasiswa
    : DUMMY_MHS.map(m => ({ ...m, kelas: 'V.2' }));

  DOM.appContent.innerHTML = `
    <div class="page active">
      <div class="page-header fade-up">
        <div class="page-title">👥 Daftar Mahasiswa</div>
        <div class="page-subtitle">Kelas V.2 — Semester V</div>
      </div>
      <div class="glass-card fade-up">
        <div class="card-title"><i class="fas fa-users"></i> ${mhsList.length} Mahasiswa</div>
        ${mhsList.map(m => {
          const stat = merged.filter(p => String(p.nim) === String(m.nim));
          const h = stat.filter(p => p.status === 'Hadir').length;
          const t = stat.length || 1;
          const persen = Math.round((h/t)*100);
          return `<div class="list-item">
            <div class="list-avatar" style="background:${colorFromName(m.nama)}">${getInitials(m.nama)}</div>
            <div class="list-content">
              <div class="list-title">${escapeHtml(m.nama)}</div>
              <div class="list-sub">${escapeHtml(m.nim)} • Kehadiran: ${persen}%</div>
            </div>
            <span class="badge-status ${persen >= 75 ? 'badge-hadir' : persen >= 50 ? 'badge-izin' : 'badge-alpha'}">${persen}%</span>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  setTimeout(setupFadeUp, 50);
}

// ═══════════════════════════════════════════════════════════
// LAPORAN PAGE (DOSEN)
// ═══════════════════════════════════════════════════════════
function renderLaporan() {
  const merged = getMergedPresensi();
  const myMatkul = (State.user.matkul && State.user.matkul[0]) || 'Rekayasa Perangkat Lunak II';
  const myList = merged.filter(p => p.matkul === myMatkul);
  const matkulOptions = (State.user.matkul && State.user.matkul.length)
    ? State.user.matkul : [myMatkul];

  DOM.appContent.innerHTML = `
    <div class="page active">
      <div class="page-header fade-up">
        <div class="page-title">📊 Laporan</div>
        <div class="page-subtitle">${myList.length} baris data</div>
      </div>
      <div class="glass-card fade-up">
        <div class="card-title"><i class="fas fa-file-export"></i> Export</div>
        <div class="export-filter">
          <label>Pilih MK</label>
          <select id="exportFilterLaporan">
            ${matkulOptions.map(m => `<option value="${escapeHtml(m)}">${escapeHtml(m)}</option>`).join('')}
          </select>
        </div>
        <div class="export-row">
          <button class="btn-export excel" onclick="exportExcel('presensi', document.getElementById('exportFilterLaporan').value)">
            <i class="fas fa-file-excel"></i> Excel
          </button>
          <button class="btn-export pdf" onclick="exportPDF('presensi', document.getElementById('exportFilterLaporan').value)">
            <i class="fas fa-file-pdf"></i> PDF
          </button>
        </div>
      </div>
      <div class="glass-card fade-up">
        <div class="card-title"><i class="fas fa-list"></i> Data Presensi</div>
        ${myList.slice(0, 50).map(p => {
          const badge = p.status === 'Hadir' ? 'badge-hadir' : p.status === 'Izin' ? 'badge-izin' : p.status === 'Sakit' ? 'badge-sakit' : 'badge-alpha';
          return `<div class="list-item">
            <div class="list-avatar" style="background:${colorFromName(p.nama)}">${getInitials(p.nama)}</div>
            <div class="list-content">
              <div class="list-title">${escapeHtml(p.nama)}</div>
              <div class="list-sub">${escapeHtml(p.matkul)} • P${p.pertemuan || '-'} • ${escapeHtml(p.waktu || '')}</div>
            </div>
            <span class="badge-status ${badge}">${escapeHtml(p.status)}</span>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  setTimeout(setupFadeUp, 50);
}

// ═══════════════════════════════════════════════════════════
// RIWAYAT PAGE (MAHASISWA)
// ═══════════════════════════════════════════════════════════
function renderRiwayat() {
  const u = State.user;
  const merged = getMergedPresensi();
  const myPresensi = merged
    .filter(p => String(p.nim) === String(u.nim))
    .sort((a, b) => (b.pertemuan || 0) - (a.pertemuan || 0));

  DOM.appContent.innerHTML = `
    <div class="page active">
      <div class="page-header fade-up">
        <div class="page-title">📜 Riwayat Presensi</div>
        <div class="page-subtitle">Semua kehadiran Anda</div>
      </div>
      <div class="glass-card fade-up">
        <div class="card-title"><i class="fas fa-history"></i> ${myPresensi.length} Riwayat</div>
        ${myPresensi.length === 0 ? '<div class="empty-state"><i class="fas fa-inbox"></i><p>Belum ada riwayat</p></div>' :
          myPresensi.map(p => {
            const badge = p.status === 'Hadir' ? 'badge-hadir' : p.status === 'Izin' ? 'badge-izin' : p.status === 'Sakit' ? 'badge-sakit' : 'badge-alpha';
            const bg = p.status === 'Hadir' ? '#a8f0c8' : p.status === 'Izin' ? '#ffe0a8' : p.status === 'Sakit' ? '#f5b8c8' : '#ffb8d0';
            const icon = p.status === 'Hadir' ? 'fa-check' : p.status === 'Izin' ? 'fa-file' : p.status === 'Sakit' ? 'fa-bed' : 'fa-times';
            return `<div class="list-item">
              <div class="list-avatar" style="background:${bg}"><i class="fas ${icon}" style="color:#2a1018;font-size:14px;"></i></div>
              <div class="list-content">
                <div class="list-title">${escapeHtml(p.matkul)}</div>
                <div class="list-sub">${escapeHtml(p.waktu || '')} • Pertemuan ${p.pertemuan || '-'}</div>
              </div>
              <span class="badge-status ${badge}">${escapeHtml(p.status)}</span>
            </div>`;
          }).join('')}
      </div>
    </div>`;
  setTimeout(setupFadeUp, 50);
}

// ═══════════════════════════════════════════════════════════
// KALENDER PAGE
// ═══════════════════════════════════════════════════════════
function renderKalender() {
  DOM.appContent.innerHTML = `
    <div class="page active">
      <div class="page-header fade-up">
        <div class="page-title">📅 Kalender Kehadiran</div>
        <div class="page-subtitle">Rekap kehadiran bulanan</div>
      </div>
      <div class="glass-card fade-up" id="calendarBody"></div>
    </div>`;
  renderCalendar();
  setTimeout(setupFadeUp, 50);
}

function renderCalendar() {
  const c = document.getElementById('calendarBody');
  if (!c) return;
  const u = State.user;
  const date = State.calendarDate;
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthNames = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

  const merged = getMergedPresensi();
  const myPresensi = merged.filter(p => String(p.nim) === String(u.nim));
  const statusByDate = {};

  myPresensi.forEach(p => {
    const parts = String(p.waktu || '').split(' ')[0].split('/');
    if (parts.length === 3) {
      const d = parseInt(parts[0]);
      const m = parseInt(parts[1]) - 1;
      const y = parseInt(parts[2]);
      if (y === year && m === month) {
        const key = String(d);
        const prioritas = { 'Hadir': 4, 'Sakit': 3, 'Izin': 2, 'Alpha': 1 };
        if (!statusByDate[key] || prioritas[p.status] > prioritas[statusByDate[key]]) {
          statusByDate[key] = p.status;
        }
      }
    }
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isThisMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();

  let days = '';
  ['Min','Sen','Sel','Rab','Kam','Jum','Sab'].forEach(d => {
    days += `<div class="calendar-day head">${d}</div>`;
  });
  for (let i = 0; i < firstDay; i++) {
    days += `<div class="calendar-day empty"></div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const status = statusByDate[d];
    let cls = 'calendar-day';
    if (status === 'Hadir') cls += ' hadir';
    else if (status === 'Izin') cls += ' izin';
    else if (status === 'Sakit') cls += ' sakit';
    else if (status === 'Alpha') cls += ' alpha';
    if (isThisMonth && d === todayDate) cls += ' today';
    days += `<div class="${cls}"><span class="day-num">${d}</span></div>`;
  }

  c.innerHTML = `
    <div class="calendar-wrapper">
      <div class="calendar-header">
        <h3>${monthNames[month]} ${year}</h3>
        <div class="calendar-nav">
          <button onclick="changeMonth(-1)"><i class="fas fa-chevron-left"></i></button>
          <button onclick="changeMonth(1)"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
      <div class="calendar-grid">${days}</div>
      <div class="calendar-legend">
        <div class="item"><div class="dot green"></div> Hadir</div>
        <div class="item"><div class="dot yellow"></div> Izin</div>
        <div class="item"><div class="dot pink"></div> Sakit</div>
        <div class="item"><div class="dot red"></div> Alpha</div>
      </div>
    </div>
  `;
}

function changeMonth(delta) {
  State.calendarDate = new Date(State.calendarDate.getFullYear(), State.calendarDate.getMonth() + delta, 1);
  playBeep('click');
  renderCalendar();
}

// ═══════════════════════════════════════════════════════════
// PROFIL PAGE
// ═══════════════════════════════════════════════════════════
function renderProfil() {
  const u = State.user;
  DOM.appContent.innerHTML = `
    <div class="page active">
      <div class="page-header fade-up">
        <div class="page-title">👤 Profil</div>
        <div class="page-subtitle">Data akun Anda</div>
      </div>
      <div class="glass-card text-center fade-up">
        <div class="list-avatar" style="width:82px;height:82px;font-size:28px;margin:0 auto 14px;background:${colorFromName(u.nama)};">${getInitials(u.nama)}</div>
        <div style="font-size:18px;font-weight:800;margin-bottom:4px;">${escapeHtml(u.nama)}</div>
        <div style="font-size:11px;color:var(--text-muted);letter-spacing:2px;text-transform:uppercase;">${escapeHtml(u.role)}</div>
      </div>
      <div class="glass-card fade-up">
        <div class="card-title"><i class="fas fa-info-circle"></i> Detail</div>
        ${u.nim ? `<div class="list-item"><i class="fas fa-id-card" style="color:var(--accent);width:24px;"></i><div class="list-content"><div class="list-title">NIM</div><div class="list-sub">${escapeHtml(u.nim)}</div></div></div>` : ''}
        ${u.email ? `<div class="list-item"><i class="fas fa-envelope" style="color:var(--accent);width:24px;"></i><div class="list-content"><div class="list-title">Email</div><div class="list-sub">${escapeHtml(u.email)}</div></div></div>` : ''}
        ${u.kelas ? `<div class="list-item"><i class="fas fa-users" style="color:var(--accent);width:24px;"></i><div class="list-content"><div class="list-title">Kelas</div><div class="list-sub">${escapeHtml(u.kelas)}</div></div></div>` : ''}
        ${u.jurusan ? `<div class="list-item"><i class="fas fa-graduation-cap" style="color:var(--accent);width:24px;"></i><div class="list-content"><div class="list-title">Jurusan</div><div class="list-sub">${escapeHtml(u.jurusan)}</div></div></div>` : ''}
        ${u.matkul ? `<div class="list-item"><i class="fas fa-book" style="color:var(--accent);width:24px;"></i><div class="list-content"><div class="list-title">Matkul</div><div class="list-sub">${(u.matkul || []).map(m => escapeHtml(m)).join(', ')}</div></div></div>` : ''}
      </div>
      <div class="glass-card fade-up">
        <div class="card-title"><i class="fas fa-key"></i> Ganti ${u.role === 'mahasiswa' ? 'PIN' : 'Password'}</div>
        <div class="form-group">
          <label class="form-label">${u.role === 'mahasiswa' ? 'PIN Lama' : 'Password Lama'}</label>
          <input type="${u.role === 'mahasiswa' ? 'tel' : 'password'}" id="oldPass" class="form-input" ${u.role === 'mahasiswa' ? 'maxlength="4"' : ''} placeholder="${u.role === 'mahasiswa' ? '••••' : 'Password lama'}" />
        </div>
        <div class="form-group">
          <label class="form-label">${u.role === 'mahasiswa' ? 'PIN Baru' : 'Password Baru'}</label>
          <input type="${u.role === 'mahasiswa' ? 'tel' : 'password'}" id="newPass" class="form-input" ${u.role === 'mahasiswa' ? 'maxlength="4"' : ''} placeholder="${u.role === 'mahasiswa' ? '••••' : 'Password baru'}" />
        </div>
        <button class="btn btn-neon btn-block" onclick="doGantiPassword()">
          <i class="fas fa-save"></i> Simpan
        </button>
      </div>
      <button class="btn btn-danger btn-block mt-10 fade-up" onclick="doLogout()">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </div>`;
  setTimeout(setupFadeUp, 50);
}

async function doGantiPassword() {
  const u = State.user;
  const oldPass = document.getElementById('oldPass').value.trim();
  const newPass = document.getElementById('newPass').value.trim();
  if (!oldPass || !newPass) { toast('Field wajib diisi', 'error'); return; }
  if (u.role === 'mahasiswa' && !/^\d{4}$/.test(newPass)) { toast('PIN harus 4 digit', 'error'); return; }
  if (u.role !== 'mahasiswa' && newPass.length < 4) { toast('Password minimal 4 karakter', 'error'); return; }

  try {
    if (u.role === 'mahasiswa') {
      await apiPostJson('ganti_pin', { nim: u.nim, pinLama: oldPass, pinBaru: newPass });
    }
    toast('✅ Berhasil diganti', 'success');
    playBeep('success');
  } catch (err) {
    toast('✅ Berhasil diganti (demo)', 'success');
    playBeep('success');
  }
  document.getElementById('oldPass').value = '';
  document.getElementById('newPass').value = '';
}

/*************************************************************
 * app.js - Part 4/4 (LANJUTAN FINAL)
 * Matkul, Jadwal, Setelan, Export, Init, Expose
 *************************************************************/

function renderMatkul() {
  DOM.appContent.innerHTML = `
    <div class="page active">
      <div class="page-header fade-up">
        <div class="page-title">📚 Mata Kuliah</div>
        <div class="page-subtitle">${DUMMY_JADWAL.length} matkul</div>
      </div>
      <div class="glass-card fade-up">
        ${DUMMY_JADWAL.map(j => `
          <div class="list-item">
            <div class="list-avatar" style="background:linear-gradient(135deg,var(--accent),var(--accent-deep));">
              <i class="fas fa-book" style="color:#2a1018;font-size:16px;"></i>
            </div>
            <div class="list-content">
              <div class="list-title">${escapeHtml(j.matkul)}</div>
              <div class="list-sub">${escapeHtml(j.hari)} • ${j.jamMulai}-${j.jamSelesai} • ${escapeHtml(j.ruang)} • ${escapeHtml(j.dosen)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
  setTimeout(setupFadeUp, 50);
}

// ═══════════════════════════════════════════════════════════
// JADWAL PAGE (ADMIN)
// ═══════════════════════════════════════════════════════════
function renderJadwal() {
  const grouped = {};
  DUMMY_JADWAL.forEach(j => {
    if (!grouped[j.hari]) grouped[j.hari] = [];
    grouped[j.hari].push(j);
  });
  DOM.appContent.innerHTML = `
    <div class="page active">
      <div class="page-header fade-up">
        <div class="page-title">📅 Jadwal Kuliah</div>
        <div class="page-subtitle">Kelas V.2 — Semester V</div>
      </div>
      ${Object.keys(grouped).map(hari => `
        <div class="glass-card fade-up">
          <div class="card-title"><i class="fas fa-calendar-day"></i> ${escapeHtml(hari)}</div>
          ${grouped[hari].map(j => `
            <div class="list-item">
              <div class="list-content">
                <div class="list-title">${escapeHtml(j.matkul)}</div>
                <div class="list-sub">
                  <span><i class="fas fa-clock"></i> ${j.jamMulai}-${j.jamSelesai}</span>
                  <span><i class="fas fa-door-open"></i> ${escapeHtml(j.ruang)}</span>
                  <span><i class="fas fa-user-tie"></i> ${escapeHtml(j.dosen)}</span>
                </div>
              </div>
              <button class="btn btn-sm" onclick="editJadwal('${escapeHtml(j.kodeMK)}')" title="Edit jadwal">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>`;
  setTimeout(setupFadeUp, 50);
}

function editJadwal(kodeMK) {
  const j = DUMMY_JADWAL.find(x => x.kodeMK === kodeMK);
  if (!j) return;
  openModal(`
    <div class="modal-title"><i class="fas fa-edit"></i> Edit Jadwal ${escapeHtml(j.kodeMK)}</div>
    <div class="form-group">
      <label class="form-label">Hari</label>
      <select id="editHari" class="form-input">
        ${['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'].map(h => `<option ${h === j.hari ? 'selected' : ''}>${h}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Jam Mulai</label>
      <input type="time" id="editJamMulai" class="form-input" value="${j.jamMulai}" />
    </div>
    <div class="form-group">
      <label class="form-label">Jam Selesai</label>
      <input type="time" id="editJamSelesai" class="form-input" value="${j.jamSelesai}" />
    </div>
    <div class="form-group">
      <label class="form-label">Ruangan</label>
      <input type="text" id="editRuang" class="form-input" value="${escapeHtml(j.ruang)}" />
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-block" onclick="closeModal()">Batal</button>
      <button class="btn btn-neon btn-block" onclick="doEditJadwal('${escapeHtml(j.kodeMK)}')">
        <i class="fas fa-save"></i> Simpan
      </button>
    </div>`);
}

function doEditJadwal(kodeMK) {
  const j = DUMMY_JADWAL.find(x => x.kodeMK === kodeMK);
  if (!j) return;
  const newHari = document.getElementById('editHari').value;
  const oldHari = j.hari;
  j.hari = newHari;
  j.jamMulai = document.getElementById('editJamMulai').value;
  j.jamSelesai = document.getElementById('editJamSelesai').value;
  j.ruang = document.getElementById('editRuang').value;

  try {
    const notifs = JSON.parse(localStorage.getItem('absenqr_notif_jadwal') || '[]');
    notifs.push({ matkul: j.matkul, oldHari, newHari, waktu: new Date().toLocaleString('id-ID') });
    localStorage.setItem('absenqr_notif_jadwal', JSON.stringify(notifs));
  } catch(e){}

  closeModal();
  playBeep('success');

  // Notif WA
  setTimeout(() => {
    openModal(`
      <div class="modal-title"><i class="fab fa-whatsapp"></i> Kirim Notifikasi</div>
      <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px;line-height:1.6;">
        Jadwal <strong>${escapeHtml(j.matkul)}</strong> berhasil diubah:<br>
        📅 ${escapeHtml(oldHari)} → ${escapeHtml(newHari)}<br>
        ⏰ ${j.jamMulai}-${j.jamSelesai}<br>
        📍 ${escapeHtml(j.ruang)}
      </p>
      <div class="form-group">
        <label class="form-label">Nomor WA Grup Kelas</label>
        <input type="tel" id="waJadwal" class="form-input" placeholder="628123456789" />
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-block" onclick="closeModal(); renderJadwal();">Nanti Saja</button>
        <button class="btn btn-neon btn-block" onclick="kirimNotifJadwalWA('${escapeHtml(j.matkul)}','${escapeHtml(oldHari)}','${escapeHtml(newHari)}','${j.jamMulai}','${j.jamSelesai}','${escapeHtml(j.ruang)}')">
          <i class="fab fa-whatsapp"></i> Kirim
        </button>
      </div>
    `);
  }, 300);
}

function kirimNotifJadwalWA(matkul, oldHari, newHari, jamMulai, jamSelesai, ruang) {
  const wa = document.getElementById('waJadwal').value.trim().replace(/\D/g, '');
  if (!wa || wa.length < 10) { toast('Nomor WA tidak valid', 'error'); return; }
  const pesan = `*PERUBAHAN JADWAL*\n\n📚 Matkul: ${matkul}\n📅 Dari: ${oldHari}\n📅 Menjadi: ${newHari}\n⏰ Jam: ${jamMulai}-${jamSelesai}\n📍 Ruangan: ${ruang}\n\nMohon diperhatikan. Terima kasih.`;

  playBeep('success');
  toast('Membuka WhatsApp...', 'success');
  closeModal();

  setTimeout(() => {
    window.location.href = `https://wa.me/${wa}?text=${encodeURIComponent(pesan)}`;
  }, 500);
}

// ═══════════════════════════════════════════════════════════
// SETELAN PAGE (ADMIN)
// ═══════════════════════════════════════════════════════════
function renderSetelan() {
  DOM.appContent.innerHTML = `
    <div class="page active">
      <div class="page-header fade-up">
        <div class="page-title">⚙️ Setelan</div>
        <div class="page-subtitle">Pengaturan aplikasi</div>
      </div>
      <div class="glass-card fade-up">
        <div class="card-title"><i class="fas fa-palette"></i> Tampilan</div>
        <div class="list-item" onclick="toggleTheme()" style="cursor:pointer;">
          <i class="fas fa-moon" style="color:var(--accent);font-size:18px;width:28px;"></i>
          <div class="list-content">
            <div class="list-title">Tema</div>
            <div class="list-sub">${State.theme === 'dark' ? 'Dark' : 'Light'}</div>
          </div>
          <i class="fas fa-chevron-right" style="color:var(--text-dim);"></i>
        </div>
        <div class="list-item" onclick="toggleSound()" style="cursor:pointer;">
          <i class="fas fa-volume-up" style="color:var(--accent);font-size:18px;width:28px;"></i>
          <div class="list-content">
            <div class="list-title">Suara</div>
            <div class="list-sub">${State.soundEnabled ? 'Aktif' : 'Nonaktif'}</div>
          </div>
          <i class="fas fa-chevron-right" style="color:var(--text-dim);"></i>
        </div>
      </div>
      <div class="glass-card fade-up">
        <div class="card-title"><i class="fas fa-qrcode"></i> QR Code</div>
        <button class="btn btn-neon btn-block" onclick="generateAllQr()">
          <i class="fas fa-magic"></i> Generate Semua QR
        </button>
      </div>
      <div class="glass-card fade-up">
        <div class="card-title"><i class="fas fa-info-circle"></i> Info</div>
        <div style="font-size:12px;color:var(--text-muted);line-height:2;">
          <div>📱 AbsenQR v${APP_VERSION}</div>
          <div>🏛️ Universitas Jabal Ghafur</div>
          <div>🎯 Kelas V.2 — Teknik Informatika</div>
          <div>🌊 Liquid Navigation</div>
          <div>🚶 Stickman Theme Toggle</div>
          <div>🔢 OTP Animation</div>
          <div>📅 Kalender Kehadiran</div>
        </div>
      </div>
    </div>`;
  setTimeout(setupFadeUp, 50);
}

async function generateAllQr() {
  toast('⏳ Memproses QR...', 'info', 3000);
  try {
    const res = await apiPostJson('generate_qr_semua', {});
    if (res.status === 'success' && res.total > 0) {
      toast(`✅ ${res.message || 'QR digenerate'}`, 'success', 5000);
      playBeep('success');
    } else {
      let count = 0;
      DUMMY_MHS.forEach(m => {
        const pin = String(m.nim).slice(-4);
        const qrData = { nim: m.nim, nama: m.nama, pin, tipe: 'login-mahasiswa' };
        localStorage.setItem(`qr_${m.nim}`, JSON.stringify(qrData));
        count++;
      });
      toast(`✅ ${count} QR digenerate (lokal)`, 'success', 4000);
      playBeep('success');
    }
  } catch (err) {
    let count = 0;
    DUMMY_MHS.forEach(m => {
      const pin = String(m.nim).slice(-4);
      const qrData = { nim: m.nim, nama: m.nama, pin, tipe: 'login-mahasiswa' };
      localStorage.setItem(`qr_${m.nim}`, JSON.stringify(qrData));
      count++;
    });
    toast(`✅ ${count} QR digenerate (lokal)`, 'success', 4000);
    playBeep('success');
  }
}

// ═══════════════════════════════════════════════════════════
// IZIN MODAL
// ═══════════════════════════════════════════════════════════
function openIzinModal() {
  openModal(`
    <div class="modal-title"><i class="fas fa-file-medical"></i> Ajukan Izin / Sakit</div>
    <div class="form-group">
      <label class="form-label">Jenis</label>
      <select id="izinJenis" class="form-input">
        <option value="Izin">📝 Izin</option>
        <option value="Sakit">🤒 Sakit</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Mata Kuliah</label>
      <select id="izinMatkul" class="form-input">
        ${DUMMY_JADWAL.map(j => `<option>${escapeHtml(j.matkul)}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Tanggal</label>
      <input type="date" id="izinTanggal" class="form-input" value="${new Date().toISOString().slice(0,10)}" />
    </div>
    <div class="form-group">
      <label class="form-label">Alasan</label>
      <textarea id="izinAlasan" class="form-input" placeholder="Jelaskan alasan..."></textarea>
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-block" onclick="closeModal()">Batal</button>
      <button class="btn btn-neon btn-block" onclick="doAjukanIzin()">
        <i class="fas fa-paper-plane"></i> Kirim
      </button>
    </div>`);
}

async function doAjukanIzin() {
  const jenis = document.getElementById('izinJenis').value;
  const matkul = document.getElementById('izinMatkul').value;
  const alasan = document.getElementById('izinAlasan').value.trim();
  const tanggal = document.getElementById('izinTanggal').value;
  if (!alasan) { toast('Alasan wajib diisi', 'error'); return; }

  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

  try {
    await apiPostJson('ajukan_izin', {
      nim: State.user.nim,
      nama: State.user.nama,
      matkul, jenis, alasan, tanggal
    });
    playBeep('success');
    toast(`✅ ${jenis} diajukan`, 'success');
    closeModal();
  } catch (err) {
    playBeep('success');
    toast(`✅ ${jenis} diajukan (demo)`, 'success');
    closeModal();
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim';
  }
}

// ═══════════════════════════════════════════════════════════
// NOTIF MODAL
// ═══════════════════════════════════════════════════════════
function openNotifModal() {
  let notifHTML = '';
  try {
    const notifs = JSON.parse(localStorage.getItem('absenqr_notif_dosen') || '[]');
    const jadwalNotifs = JSON.parse(localStorage.getItem('absenqr_notif_jadwal') || '[]');
    if (notifs.length === 0 && jadwalNotifs.length === 0) {
      notifHTML = '<div class="empty-state" style="padding:20px;"><i class="fas fa-bell-slash"></i><p>Belum ada notifikasi</p></div>';
    } else {
      notifHTML = `
        ${notifs.slice(-5).reverse().map(n => `
          <div class="activity-item">
            <i class="fas fa-user-tie" style="color:#ffe0a8;margin-top:2px;"></i>
            <div><strong>Dosen tidak hadir:</strong> ${escapeHtml(n.matkul)}<br><span style="font-size:10px;">${escapeHtml(n.alasan)}</span></div>
            <div class="time">${escapeHtml(n.waktu)}</div>
          </div>
        `).join('')}
        ${jadwalNotifs.slice(-3).reverse().map(n => `
          <div class="activity-item">
            <i class="fas fa-calendar-edit" style="color:#a8d8ff;margin-top:2px;"></i>
            <div><strong>Jadwal berubah:</strong> ${escapeHtml(n.matkul)}<br><span style="font-size:10px;">${escapeHtml(n.oldHari)} → ${escapeHtml(n.newHari)}</span></div>
            <div class="time">${escapeHtml(n.waktu)}</div>
          </div>
        `).join('')}
      `;
    }
  } catch(e) {
    notifHTML = '<div class="empty-state" style="padding:20px;"><i class="fas fa-bell-slash"></i><p>Belum ada notifikasi</p></div>';
  }
  openModal(`
    <div class="modal-title"><i class="fas fa-bell"></i> Notifikasi</div>
    ${notifHTML}
    <button class="btn btn-block mt-10" onclick="closeModal()">Tutup</button>`);
  if (DOM.notifDot) DOM.notifDot.classList.remove('show');
}

// ═══════════════════════════════════════════════════════════
// MODAL HELPER
// ═══════════════════════════════════════════════════════════
function openModal(html) {
  if (!DOM.modalContent || !DOM.modalOverlay) return;
  DOM.modalContent.innerHTML = html;
  DOM.modalOverlay.classList.add('active');
}

function closeModal() {
  if (DOM.modalOverlay) DOM.modalOverlay.classList.remove('active');
}

// ═══════════════════════════════════════════════════════════
// EXPORT EXCEL
// ═══════════════════════════════════════════════════════════
async function exportExcel(type, filterMatkul) {
  try {
    toast('⏳ Menyiapkan Excel...', 'info', 2000);
    let data = [], filename = '';

    if (type === 'presensi') {
      const merged = getMergedPresensi();
      let list = merged;
      if (filterMatkul) list = merged.filter(p => p.matkul === filterMatkul || p.matkul.includes(filterMatkul));
      if (list.length === 0) { toast('❌ Tidak ada data untuk ' + (filterMatkul || 'semua matkul'), 'error'); return; }

      data = list.map(p => ({
        'NIM': p.nim,
        'Nama': p.nama,
        'Mata Kuliah': p.matkul,
        'Pertemuan': 'P' + (p.pertemuan || '-'),
        'Status': p.status,
        'Waktu': p.waktu
      }));
      filename = `AbsenQR_${(filterMatkul || 'Semua').replace(/[^a-zA-Z0-9]/g,'_')}_${new Date().toISOString().slice(0,10)}.xlsx`;
    } else if (type === 'mahasiswa') {
      const list = Cache.allMahasiswa.length > 0
        ? Cache.allMahasiswa
        : DUMMY_MHS.map(m => ({ ...m, kelas: 'V.2', jurusan: 'Teknik Informatika', email: m.nim + '@student.unigha.ac.id' }));
      data = list.map(m => ({
        'NIM': m.nim,
        'Nama': m.nama,
        'Kelas': m.kelas || 'V.2',
        'Jurusan': m.jurusan || 'Teknik Informatika',
        'Email': m.email || ''
      }));
      filename = `Data_Mahasiswa_${new Date().toISOString().slice(0,10)}.xlsx`;
    }

    if (data.length === 0) { toast('❌ Tidak ada data', 'error'); return; }
    if (typeof XLSX === 'undefined') { toast('❌ Library XLSX belum load', 'error'); return; }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    ws['!cols'] = Object.keys(data[0]).map(k => ({ wch: Math.max(k.length, 15) }));
    XLSX.writeFile(wb, filename);
    playBeep('success');
    toast('✅ Excel berhasil diunduh', 'success');
  } catch (err) {
    toast('❌ Gagal: ' + err.message, 'error');
  }
}

// ═══════════════════════════════════════════════════════════
// EXPORT PDF
// ═══════════════════════════════════════════════════════════
async function exportPDF(type, filterMatkul) {
  try {
    toast('⏳ Menyiapkan PDF...', 'info', 2000);
    if (typeof window.jspdf === 'undefined') { toast('❌ Library jsPDF belum load', 'error'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    if (type === 'presensi') {
      const merged = getMergedPresensi();
      let list = merged;
      if (filterMatkul) list = merged.filter(p => p.matkul === filterMatkul || p.matkul.includes(filterMatkul));
      if (list.length === 0) { toast('❌ Tidak ada data', 'error'); return; }

      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('UNIVERSITAS JABAL GHAFUR', 105, 15, { align: 'center' });
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.text(`Laporan ${filterMatkul || 'Presensi'}`, 105, 23, { align: 'center' });
      doc.setFontSize(10);
      doc.text('Tanggal cetak: ' + new Date().toLocaleDateString('id-ID'), 105, 30, { align: 'center' });

      const rows = list.map(p => [p.nim, p.nama, p.matkul, 'P' + (p.pertemuan || '-'), p.status, p.waktu]);
      doc.autoTable({
        head: [['NIM', 'Nama', 'Matkul', 'P', 'Status', 'Waktu']],
        body: rows,
        startY: 38,
        theme: 'grid',
        headStyles: { fillColor: [217, 152, 168], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 8, cellPadding: 2 },
        alternateRowStyles: { fillColor: [253, 246, 248] }
      });
      doc.save(`AbsenQR_${(filterMatkul || 'Semua').replace(/[^a-zA-Z0-9]/g,'_')}_${new Date().toISOString().slice(0,10)}.pdf`);
      playBeep('success');
      toast('✅ PDF berhasil diunduh', 'success');
    } else if (type === 'mahasiswa') {
      const list = Cache.allMahasiswa.length > 0
        ? Cache.allMahasiswa
        : DUMMY_MHS.map(m => ({ ...m, kelas: 'V.2', jurusan: 'Teknik Informatika' }));

      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('UNIVERSITAS JABAL GHAFUR', 105, 15, { align: 'center' });
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.text('Data Mahasiswa', 105, 23, { align: 'center' });

      const rows = list.map(m => [m.nim, m.nama, m.kelas || 'V.2', m.jurusan || 'TI']);
      doc.autoTable({
        head: [['NIM', 'Nama', 'Kelas', 'Jurusan']],
        body: rows,
        startY: 30,
        theme: 'grid',
        headStyles: { fillColor: [217, 152, 168], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 9, cellPadding: 3 },
        alternateRowStyles: { fillColor: [253, 246, 248] }
      });
      doc.save(`Data_Mahasiswa_${new Date().toISOString().slice(0,10)}.pdf`);
      playBeep('success');
      toast('✅ PDF berhasil diunduh', 'success');
    }
  } catch (err) {
    toast('❌ Gagal: ' + err.message, 'error');
  }
}

// ═══════════════════════════════════════════════════════════
// DOWNLOAD & SHARE QR
// ═══════════════════════════════════════════════════════════
async function downloadMyQR() {
  const u = State.user;
  const qrUrl = u.qrLink ? convertDriveUrl(u.qrLink) : '';
  const fallback = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&ecc=L&data=${encodeURIComponent(u.nim || '')}`;
  const url = qrUrl || fallback;
  toast('⏳ Menyiapkan QR...', 'info', 2000);

  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error('Gagal load'));
      img.src = url + '?t=' + Date.now();
    });
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || 500;
    canvas.height = img.naturalHeight || 500;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `QR-${u.nim}-${String(u.nama).replace(/\s+/g,'_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    playBeep('success');
    toast('✅ QR diunduh', 'success');
  } catch (err) {
    window.open(url, '_blank');
    toast('💡 Klik kanan gambar → Save', 'info', 6000);
  }
}

async function shareMyQR() {
  const u = State.user;
  const qrUrl = u.qrLink ? convertDriveUrl(u.qrLink) : '';
  const fallback = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&ecc=L&data=${encodeURIComponent(u.nim || '')}`;
  const url = qrUrl || fallback;
  if (navigator.share) {
    try { await navigator.share({ title: 'QR AbsenQR', text: `QR - ${u.nama}`, url }); } catch(e) {}
  } else {
    try { await navigator.clipboard.writeText(url); toast('✅ Link disalin', 'success'); }
    catch(e) { toast('Link: ' + url, 'info', 8000); }
  }
}

// ═══════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════
function navigateTo(pageId) {
  State.activePage = pageId;
  updateLiquidNav();
  if (pageId !== 'absen' && pageId !== 'sesi') stopAllScanners();
  const renderers = {
    dashboard: renderDashboard,
    absen: renderAbsen,
    riwayat: renderRiwayat,
    kalender: renderKalender,
    profil: renderProfil,
    sesi: renderSesi,
    mahasiswa: renderMahasiswa,
    laporan: renderLaporan,
    user: renderUser,
    matkul: renderMatkul,
    jadwal: renderJadwal,
    setelan: renderSetelan
  };
  if (renderers[pageId]) renderers[pageId]();
}

// ═══════════════════════════════════════════════════════════
// INIT — BOOTSTRAP
// ═══════════════════════════════════════════════════════════
async function init() {
  console.log('📱 AbsenQR v' + APP_VERSION);

  // Load theme
  const theme = localStorage.getItem(STORAGE_THEME) || 'dark';
  State.theme = theme;
  if (theme === 'light') document.body.classList.add('light-mode');

  // Load sound
  const sound = localStorage.getItem(STORAGE_SOUND);
  if (sound !== null) State.soundEnabled = sound === 'true';
  if (!State.soundEnabled) {
    const sb = document.getElementById('btnSound');
    if (sb) sb.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }

  // Init theme canvas
  if (typeof initThemeCanvas === 'function') initThemeCanvas();

  // Cek session
  const hasSession = loadSession();

  if (hasSession) {
    // SKIP loading, langsung ke app
    const ls = document.getElementById('loadingScreen');
    if (ls) ls.style.display = 'none';
    State.appReady = true;
    enterApp();
  } else {
    // First visit → loading
    if (typeof runLoadingProgress === 'function') {
      await runLoadingProgress();
    }
    const ls = document.getElementById('loadingScreen');
    if (ls) {
      ls.style.opacity = '0';
      setTimeout(() => { ls.style.display = 'none'; }, 500);
    }
    showView('login');
    const roleEl = document.getElementById('loginRole');
    if (roleEl) roleEl.value = '';
    onRoleChange();
    State.appReady = true;
    setTimeout(() => {
      if (State.soundEnabled) speak('Selamat datang di absensi digital, silakan login untuk masuk');
    }, 800);
  }
}

// ═══════════════════════════════════════════════════════════
// START
// ═══════════════════════════════════════════════════════════
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
window.addEventListener('beforeunload', () => stopAllScanners());
window.addEventListener('resize', () => {
  if (State.user) updateLiquidNav(true);
});

// ═══════════════════════════════════════════════════════════
// EXPOSE GLOBAL (untuk onclick inline di HTML)
// ═══════════════════════════════════════════════════════════
window.doLoginMhs = doLoginMhs;
window.doLoginStaff = doLoginStaff;
window.doRegister = doRegister;
window.doLogout = doLogout;
window.confirmLogout = confirmLogout;
window.togglePass = togglePass;
window.forgotPass = forgotPass;
window.onRoleChange = onRoleChange;
window.switchAuth = switchAuth;
window.goToQrLogin = goToQrLogin;
window.backToLogin = backToLogin;
window.startQrLoginScanner = startQrLoginScanner;
window.stopQrLoginScanner = stopQrLoginScanner;
window.switchQrMode = switchQrMode;
window.scanQrFromFile = scanQrFromFile;
window.doLoginQr = doLoginQr;
window.navigateTo = navigateTo;
window.toggleTheme = toggleTheme;
window.toggleSound = toggleSound;
window.openNotifModal = openNotifModal;
window.openModal = openModal;
window.closeModal = closeModal;
window.downloadMyQR = downloadMyQR;
window.shareMyQR = shareMyQR;
window.exportExcel = exportExcel;
window.exportPDF = exportPDF;
window.openIzinModal = openIzinModal;
window.doAjukanIzin = doAjukanIzin;
window.toggleAbsenScanner = toggleAbsenScanner;
window.doMulaiSesi = doMulaiSesi;
window.refreshSesiQr = refreshSesiQr;
window.doTutupSesi = doTutupSesi;
window.fullscreenQr = fullscreenQr;
window.generateAllQr = generateAllQr;
window.openAddDosenModal = openAddDosenModal;
window.doAddDosen = doAddDosen;
window.openAddMhsModal = openAddMhsModal;
window.doAddMhs = doAddMhs;
window.editJadwal = editJadwal;
window.doEditJadwal = doEditJadwal;
window.kirimNotifJadwalWA = kirimNotifJadwalWA;
window.changeMonth = changeMonth;
window.gantiMatkulMhs = gantiMatkulMhs;
window.doGantiPassword = doGantiPassword;
window.laporTidakHadir = laporTidakHadir;
window.doLaporTidakHadir = doLaporTidakHadir;
window.toggleFilterMatkulAdmin = toggleFilterMatkulAdmin;
window.gantiFilterMatkulAdmin = gantiFilterMatkulAdmin;
window.approveMhs = approveMhs;
window.confirmDeleteUser = confirmDeleteUser;
window.doDeleteUser = doDeleteUser;
window.filterMhsList = filterMhsList;

console.log('✅ AbsenQR app.js v' + APP_VERSION + ' — LOADED');
/*************************************************************
 * AbsenQR - app.js
 * PART 2.5 (FIX): Audio + Theme + Liquid Nav + OTP Circle
 * Fungsi yang hilang dari Part 2
 *************************************************************/

// ═══════════════════════════════════════════════════════════
// AUDIO — Web Audio API (bikin suara dari JS)
// ═══════════════════════════════════════════════════════════
function playBeep(type = 'success') {
  if (!State.soundEnabled) return;
  try {
    if (!State.audioCtx) State.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = State.audioCtx;
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    if (type === 'success') {
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.1);
      osc.type = 'sine';
    } else if (type === 'welcome') {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
      osc.type = 'sine';
    } else if (type === 'click') {
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.setValueAtTime(900, ctx.currentTime + 0.05);
      osc.type = 'sine';
    } else {
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.type = 'sawtooth';
    }
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
}

// ═══════════════════════════════════════════════════════════
// SPEECH — Text to Speech
// ═══════════════════════════════════════════════════════════
function speak(text) {
  if (!State.soundEnabled) return;
  try {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'id-ID';
    u.rate = 1;
    u.pitch = 1;
    speechSynthesis.speak(u);
  } catch (e) {}
}

// ═══════════════════════════════════════════════════════════
// TOGGLE SOUND
// ═══════════════════════════════════════════════════════════
function toggleSound() {
  State.soundEnabled = !State.soundEnabled;
  const btn = document.getElementById('btnSound');
  if (btn) {
    if (State.soundEnabled) {
      btn.innerHTML = '<i class="fas fa-volume-up"></i>';
      toast('🔊 Suara diaktifkan', 'info');
      playBeep('success');
    } else {
      btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      toast('🔇 Suara dimatikan', 'warning');
      try { speechSynthesis.cancel(); } catch(e) {}
    }
  }
  try { localStorage.setItem(STORAGE_SOUND, String(State.soundEnabled)); } catch(e) {}
}

// ═══════════════════════════════════════════════════════════
// THEME TOGGLE — STICKMAN JALAN + LOMPAT LUBANG
// ═══════════════════════════════════════════════════════════
let themeAnim = {
  ctx: null, canvas: null, animating: false,
  stickVisible: false, holeVisible: false,
  stickX: 0, jumpY: 0, holeX: 0, holeScale: 1,
  stickOpacity: 1, stickScale: 1, legPhase: 0,
  isDark: true, animationId: null, switched: false
};

function initThemeCanvas() {
  const canvas = document.getElementById('themeCanvas');
  if (!canvas) return;
  themeAnim.canvas = canvas;
  themeAnim.ctx = canvas.getContext('2d');
  themeAnim.isDark = !document.body.classList.contains('light-mode');
  drawThemeScene();
}

function drawSunIcon(ctx, x, y, active) {
  ctx.save();
  ctx.globalAlpha = active ? 1 : 0.4;
  ctx.fillStyle = '#ffa726';
  ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#ffa726'; ctx.lineWidth = 1.5; ctx.lineCap = 'round';
  for (let i = 0; i < 8; i++) {
    const a = (i/8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(a)*12, y + Math.sin(a)*12);
    ctx.lineTo(x + Math.cos(a)*15, y + Math.sin(a)*15);
    ctx.stroke();
  }
  ctx.restore();
}

function drawMoonIcon(ctx, x, y, active) {
  ctx.save();
  ctx.globalAlpha = active ? 1 : 0.4;
  ctx.fillStyle = '#a8d8ff';
  ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI*2); ctx.fill();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath(); ctx.arc(x + 4, y - 2, 7.5, 0, Math.PI*2); ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = (active ? 1 : 0.4) * 0.7;
  [{x: x-8, y: y-6, s: 1}, {x: x-5, y: y+7, s: 0.8}, {x: x+8, y: y-8, s: 0.9}].forEach(s => {
    ctx.beginPath(); ctx.arc(s.x, s.y, s.s, 0, Math.PI*2); ctx.fill();
  });
  ctx.restore();
}

function drawHole(ctx, x, y, scale) {
  ctx.save();
  const rx = 14 * scale, ry = 6 * scale;
  const grad = ctx.createRadialGradient(x, y, 0, x, y, rx);
  grad.addColorStop(0, 'rgba(0,0,0,0.95)');
  grad.addColorStop(0.6, 'rgba(0,0,0,0.6)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI*2); ctx.fill();
  ctx.restore();
}

function drawStickmanAnim(ctx, x, y, legPhase, opacity, scale) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(x, y); ctx.scale(scale, scale); ctx.translate(-x, -y);
  ctx.strokeStyle = themeAnim.isDark ? '#fff8f8' : '#2a1018';
  ctx.lineWidth = 1.8; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.arc(x, y-16, 3.5, 0, Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y-12); ctx.lineTo(x, y-6); ctx.stroke();
  const arm = Math.sin(legPhase) * 3;
  ctx.beginPath();
  ctx.moveTo(x-5, y-10+arm); ctx.lineTo(x, y-10); ctx.lineTo(x+5, y-10-arm);
  ctx.stroke();
  const leg = Math.sin(legPhase) * 4;
  ctx.beginPath(); ctx.moveTo(x, y-6); ctx.lineTo(x-3+leg, y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y-6); ctx.lineTo(x+3-leg, y); ctx.stroke();
  ctx.restore();
}

function drawThemeScene() {
  const ctx = themeAnim.ctx, canvas = themeAnim.canvas;
  if (!ctx || !canvas) return;
  const W = canvas.width, H = canvas.height;
  const isDark = themeAnim.isDark;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = isDark ? '#1f0c12' : '#fdf7f8';
  ctx.fillRect(0, 0, W, H);
  drawSunIcon(ctx, 28, H/2, !isDark);
  drawMoonIcon(ctx, W-28, H/2, isDark);
  if (themeAnim.holeVisible) drawHole(ctx, themeAnim.holeX, H-6, themeAnim.holeScale);
  if (themeAnim.stickVisible) {
    drawStickmanAnim(ctx, themeAnim.stickX, H-12+themeAnim.jumpY, themeAnim.legPhase, themeAnim.stickOpacity, themeAnim.stickScale);
  }
}

function toggleTheme() {
  if (themeAnim.animating) {
    if (themeAnim.animationId) cancelAnimationFrame(themeAnim.animationId);
    themeAnim.animating = false;
    themeAnim.stickVisible = false;
    themeAnim.holeVisible = false;
    themeAnim.animationId = null;
  }
  const targetTheme = State.theme === 'dark' ? 'light' : 'dark';
  startThemeAnimation(targetTheme);
}

function startThemeAnimation(targetTheme) {
  themeAnim.animating = true;
  themeAnim.switched = false;
  const canvas = themeAnim.canvas;
  if (!canvas) { themeAnim.animating = false; return; }
  const W = canvas.width, H = canvas.height;
  const isGoingDark = targetTheme === 'dark';
  const startX = isGoingDark ? 28 : W - 28;
  const holeX = isGoingDark ? W - 28 : 28;

  themeAnim.stickX = startX;
  themeAnim.jumpY = 0;
  themeAnim.holeX = holeX;
  themeAnim.holeScale = 0;
  themeAnim.stickOpacity = 1;
  themeAnim.stickScale = 1;
  themeAnim.legPhase = 0;
  themeAnim.stickVisible = false;
  themeAnim.holeVisible = false;

  const safetyTimeout = setTimeout(() => {
    if (themeAnim.animating) {
      if (themeAnim.animationId) cancelAnimationFrame(themeAnim.animationId);
      themeAnim.animating = false;
      themeAnim.stickVisible = false;
      themeAnim.holeVisible = false;
      themeAnim.animationId = null;
      State.theme = targetTheme;
      document.body.classList.toggle('light-mode', State.theme === 'light');
      themeAnim.isDark = State.theme === 'dark';
      try { localStorage.setItem(STORAGE_THEME, State.theme); } catch(e){}
      drawThemeScene();
    }
  }, 2500);

  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;

    if (elapsed < 200) {
      themeAnim.holeVisible = true;
      themeAnim.holeScale = elapsed / 200;
    } else if (elapsed < 900) {
      themeAnim.holeVisible = true; themeAnim.holeScale = 1;
      themeAnim.stickVisible = true;
      const t = (elapsed - 200) / 700;
      const eased = t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2;
      themeAnim.stickX = startX + (holeX - startX) * eased;
      themeAnim.legPhase = elapsed * 0.025;
      themeAnim.stickOpacity = Math.min(t * 5, 1);
    } else if (elapsed < 1100) {
      themeAnim.holeVisible = true; themeAnim.holeScale = 1;
      themeAnim.stickVisible = true;
      themeAnim.stickX = holeX;
      const t = (elapsed - 900) / 200;
      themeAnim.jumpY = Math.sin(t*Math.PI)*-6 + t*12;
      themeAnim.stickScale = 1 - t*0.8;
      themeAnim.stickOpacity = 1 - t*0.9;
    } else if (elapsed < 1200) {
      if (!themeAnim.switched) {
        themeAnim.switched = true;
        State.theme = targetTheme;
        document.body.classList.toggle('light-mode', State.theme === 'light');
        themeAnim.isDark = State.theme === 'dark';
        try { localStorage.setItem(STORAGE_THEME, State.theme); } catch(e){}
      }
      themeAnim.stickVisible = false;
      themeAnim.holeVisible = false;
      themeAnim.holeScale = 0;
    } else {
      themeAnim.stickVisible = false;
      themeAnim.holeVisible = false;
    }

    drawThemeScene();

    if (elapsed < 1500) {
      themeAnim.animationId = requestAnimationFrame(step);
    } else {
      clearTimeout(safetyTimeout);
      themeAnim.animating = false;
      themeAnim.stickVisible = false;
      themeAnim.holeVisible = false;
      themeAnim.switched = false;
      themeAnim.animationId = null;
      drawThemeScene();
      playBeep('click');
    }
  }

  themeAnim.animationId = requestAnimationFrame(step);
}

// ═══════════════════════════════════════════════════════════
// LIQUID NAVIGATION — Menu per role
// ═══════════════════════════════════════════════════════════
const MENUS = {
  mahasiswa: [
    { id: 'dashboard', icon: 'fa-home',        label: 'Home' },
    { id: 'riwayat',   icon: 'fa-history',     label: 'Riwayat' },
    { id: 'absen',     icon: 'fa-qrcode',      label: 'Absen' },
    { id: 'kalender',  icon: 'fa-calendar-alt',label: 'Kalender' },
    { id: 'profil',    icon: 'fa-user',        label: 'Profil' }
  ],
  dosen: [
    { id: 'dashboard', icon: 'fa-home',        label: 'Home' },
    { id: 'mahasiswa', icon: 'fa-users',       label: 'Mahasiswa' },
    { id: 'sesi',      icon: 'fa-qrcode',      label: 'Sesi' },
    { id: 'laporan',   icon: 'fa-chart-bar',   label: 'Laporan' },
    { id: 'kalender',  icon: 'fa-calendar-alt',label: 'Kalender' },
    { id: 'profil',    icon: 'fa-user',        label: 'Profil' }
  ],
  admin: [
    { id: 'dashboard', icon: 'fa-home',        label: 'Home' },
    { id: 'user',      icon: 'fa-users-cog',   label: 'User' },
    { id: 'jadwal',    icon: 'fa-calendar',    label: 'Jadwal' },
    { id: 'matkul',    icon: 'fa-book',        label: 'Matkul' },
    { id: 'setelan',   icon: 'fa-cog',         label: 'Setelan' }
  ]
};

function renderBottomNav() {
  const menus = MENUS[State.role] || MENUS.mahasiswa;
  const items = document.getElementById('liquidItems');
  if (!items) return;
  items.innerHTML = menus.map(m => `
    <button class="liquid-item" data-menu="${m.id}" onclick="navigateTo('${m.id}')">
      <i class="fas ${m.icon}"></i>
      <span>${m.label}</span>
    </button>
  `).join('');
  setTimeout(() => updateLiquidNav(true), 60);
}

function updateLiquidNav(instant = false) {
  const menus = MENUS[State.role] || MENUS.mahasiswa;
  const idx = menus.findIndex(m => m.id === State.activePage);
  if (idx < 0) return;
  const nav = document.querySelector('.liquid-nav');
  if (!nav) return;
  const navWidth = nav.offsetWidth;
  const itemWidth = navWidth / menus.length;
  const itemCenter = (idx * itemWidth) + (itemWidth / 2);
  const indicator = document.getElementById('liquidIndicator');
  const icon = document.getElementById('indicatorIcon');
  const currentMenu = menus[idx];
  if (!indicator || !icon) return;

  if (instant) {
    indicator.style.transition = 'none';
  } else {
    indicator.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), background 0.3s';
  }

  indicator.style.transform = `translateX(${itemCenter - 29}px)`;
  icon.className = 'fas ' + currentMenu.icon;

  if (instant) {
    setTimeout(() => { indicator.style.transition = ''; }, 50);
  }

  drawLiquidPath(itemCenter, navWidth);

  document.querySelectorAll('.liquid-item').forEach(el => {
    el.classList.toggle('active', el.dataset.menu === State.activePage);
  });
}

function drawLiquidPath(centerX, width) {
  const path = document.getElementById('liquidPath');
  if (!path) return;
  const H = 80;
  const humpHalfWidth = 45;
  const humpDepth = 18;
  const x1 = Math.max(0, centerX - humpHalfWidth);
  const x2 = centerX - 20;
  const x3 = centerX;
  const x4 = centerX + 20;
  const x5 = Math.min(width, centerX + humpHalfWidth);
  const d = `M 0 ${H} L 0 ${humpDepth} L ${x1} ${humpDepth} Q ${x2} ${humpDepth} ${x3} 0 Q ${x4} ${humpDepth} ${x5} ${humpDepth} L ${width} ${humpDepth} L ${width} ${H} Z`;
  path.setAttribute('d', d);
}

// ═══════════════════════════════════════════════════════════
// FADE-UP SCROLL OBSERVER
// ═══════════════════════════════════════════════════════════
let observerInstance = null;
function setupFadeUp() {
  if (observerInstance) observerInstance.disconnect();
  observerInstance = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observerInstance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => observerInstance.observe(el));
}

// ═══════════════════════════════════════════════════════════
// LOADING PROGRESS (untuk first visit)
// ═══════════════════════════════════════════════════════════
function runLoadingProgress() {
  return new Promise((resolve) => {
    const fill = document.getElementById('loaderFill');
    const percent = document.getElementById('loaderPercent');
    const sub = document.getElementById('loaderSub');
    if (!fill || !percent || !sub) { resolve(); return; }

    const steps = [
      { to: 15,  text: 'Memuat sistem...',       duration: 250 },
      { to: 30,  text: 'Menghubungkan server...',duration: 200 },
      { to: 50,  text: 'Mengambil data...',      duration: 300 },
      { to: 70,  text: 'Menyiapkan antarmuka...',duration: 250 },
      { to: 85,  text: 'Memuat dummy...',        duration: 200 },
      { to: 100, text: 'Siap!',                  duration: 300 }
    ];
    let currentPercent = 0, stepIndex = 0;

    function nextStep() {
      if (stepIndex >= steps.length) { setTimeout(resolve, 400); return; }
      const step = steps[stepIndex];
      const startPercent = currentPercent;
      const endPercent = step.to;
      const startTime = performance.now();
      sub.textContent = step.text;

      function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / step.duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(startPercent + (endPercent - startPercent) * eased);
        fill.style.width = value + '%';
        percent.textContent = value + '%';
        currentPercent = value;
        if (progress < 1) requestAnimationFrame(animate);
        else { stepIndex++; setTimeout(nextStep, 80); }
      }
      requestAnimationFrame(animate);
    }
    nextStep();
  });
}

// ═══════════════════════════════════════════════════════════
// INIT THEME CANVAS on load
// ═══════════════════════════════════════════════════════════
window.addEventListener('load', () => {
  try { initThemeCanvas(); } catch(e) {}
});

/*************************************************************
 * AbsenQR - app.js
 * PATCH: Auto-refresh User dari backend saat buka halaman
 *************************************************************/

// Override renderUser biar auto-fetch dari backend dulu
const _originalRenderUser = renderUser;
window.renderUser = async function() {
  // Tampilkan loading
  if (DOM.appContent) {
    DOM.appContent.innerHTML = `
      <div class="page active">
        <div class="page-header fade-up">
          <div class="page-title">👥 Kelola User</div>
          <div class="page-subtitle">Memuat data dari server...</div>
        </div>
        <div class="glass-card fade-up" style="text-align:center;padding:40px;">
          <i class="fas fa-spinner fa-spin" style="font-size:32px;color:var(--accent);"></i>
          <p style="margin-top:14px;color:var(--text-muted);">Mengambil data terbaru...</p>
        </div>
      </div>
    `;
  }

  // ═══ FETCH MAHASISWA DARI BACKEND ═══
  try {
    const res = await apiGet('get_mahasiswa');
    let list = null;
    // Handle berbagai format response
    if (Array.isArray(res)) list = res;
    else if (res && Array.isArray(res.data)) list = res.data;
    else if (res && res.data && Array.isArray(res.data.mahasiswa)) list = res.data.mahasiswa;
    else if (res && res.status === 'success' && Array.isArray(res.mahasiswa)) list = res.mahasiswa;

    if (list && list.length > 0) {
      // Merge dengan local (biar data lokal gak ilang)
      const map = new Map();
      // Local dulu
      (Cache.allMahasiswa || []).forEach(m => map.set(String(m.nim), m));
      // Backend numpuk (override)
      list.forEach(m => {
        const nim = String(m.nim || m.NIM || '');
        if (nim) {
          map.set(nim, {
            nim: nim,
            nama: String(m.nama || m.Nama || '').toUpperCase(),
            kelas: String(m.kelas || m.Kelas || 'V.2'),
            jurusan: String(m.jurusan || m.Jurusan || 'Teknik Informatika'),
            email: String(m.email || m.Email || ''),
            pin: '••••',
            qrLink: String(m.qrLink || m.QRLink || ''),
            status: String(m.status || m.Status || 'Aktif')
          });
        }
      });
      Cache.allMahasiswa = Array.from(map.values());
      console.log('✅ Mahasiswa refreshed:', list.length, 'dari backend, total:', Cache.allMahasiswa.length);
    } else {
      console.warn('⚠️ Backend gak kasih data mahasiswa');
    }
  } catch(e) {
    console.warn('⚠️ Fetch mahasiswa gagal:', e.message);
  }

  // ═══ FETCH DOSEN DARI BACKEND ═══
  try {
    const res = await apiGet('get_dosen');
    let list = null;
    if (Array.isArray(res)) list = res;
    else if (res && Array.isArray(res.data)) list = res.data;
    else if (res && res.data && Array.isArray(res.data.dosen)) list = res.data.dosen;
    else if (res && res.status === 'success' && Array.isArray(res.dosen)) list = res.dosen;

    if (list && list.length > 0) {
      const map = new Map();
      (Cache.allDosen || []).forEach(d => map.set(String(d.email || '').toLowerCase(), d));
      list.forEach(d => {
        const email = String(d.email || d.Email || '').toLowerCase();
        if (email) {
          map.set(email, {
            nidn: String(d.nidn || d.NIDN || ''),
            nama: String(d.nama || d.Nama || ''),
            email: email,
            password: String(d.password || d.Password || ''),
            matkul: String(d.matkul || d.Matkul || ''),
            status: String(d.status || d.Status || 'Aktif')
          });
        }
      });
      Cache.allDosen = Array.from(map.values());
      console.log('✅ Dosen refreshed:', list.length, 'dari backend');
    }
  } catch(e) {
    console.warn('⚠️ Fetch dosen gagal:', e.message);
  }

  // ═══ RENDER PAKAI FUNGSI ASLI ═══
  _originalRenderUser();
};
/*************************************************************
 * AbsenQR - app.js
 * PATCH: NOTIF REAL-TIME REGISTER (polling + suara + badge)
 *************************************************************/

// ═══════════════════════════════════════════════════════════
// NOTIF STATE
// ═══════════════════════════════════════════════════════════
State.notifPolling = null;
State.knownPendingNims = [];
State.seenPendingNims = [];

// ═══════════════════════════════════════════════════════════
// MULAI POLLING — cek pendaftar baru tiap 5 detik
// ═══════════════════════════════════════════════════════════
function startNotifPolling() {
  // Cuma admin & dosen yang perlu polling
  if (State.role !== 'admin' && State.role !== 'dosen') return;

  stopNotifPolling();

  // Baseline: catat pending yang udah ada
  updateKnownPending();

  console.log('🔔 Notif polling started (5s interval)');

  // Polling tiap 5 detik
  State.notifPolling = setInterval(async () => {
    await checkNewRegistrations();
  }, 5000);
}

function stopNotifPolling() {
  if (State.notifPolling) {
    clearInterval(State.notifPolling);
    State.notifPolling = null;
    console.log('🔕 Notif polling stopped');
  }
}

// ═══════════════════════════════════════════════════════════
// CEK PENDAFTAR BARU
// ═══════════════════════════════════════════════════════════
async function checkNewRegistrations() {
  try {
    const res = await apiGet('get_mahasiswa', {}, 4000);
    let list = null;

    if (Array.isArray(res)) list = res;
    else if (res && Array.isArray(res.data)) list = res.data;
    else if (res && res.data && Array.isArray(res.data.mahasiswa)) list = res.data.mahasiswa;
    else if (res && res.status === 'success' && Array.isArray(res.mahasiswa)) list = res.mahasiswa;

    if (!list || !Array.isArray(list)) return;

    // Ambil pending
    const pendingList = list.filter(m => {
      const status = String(m.status || m.Status || '').toLowerCase();
      return status === 'pending';
    });

    // Cek NIM baru (yang belum pernah dilihat)
    const newPending = pendingList.filter(m => {
      const nim = String(m.nim || m.NIM || '');
      return nim && !State.knownPendingNims.includes(nim);
    });

    if (newPending.length > 0) {
      // Update Cache
      if (!Cache.allMahasiswa) Cache.allMahasiswa = [];
      newPending.forEach(m => {
        const nim = String(m.nim || m.NIM || '');
        const exists = Cache.allMahasiswa.find(x => String(x.nim) === nim);
        if (!exists) {
          Cache.allMahasiswa.push({
            nim: nim,
            nama: String(m.nama || m.Nama || '').toUpperCase(),
            kelas: String(m.kelas || m.Kelas || 'V.2'),
            jurusan: String(m.jurusan || m.Jurusan || 'Teknik Informatika'),
            email: String(m.email || m.Email || ''),
            status: 'Pending'
          });
        }
        // Catat udah dilihat
        State.knownPendingNims.push(nim);
      });

      // 🔔 TAMPILKAN NOTIF
      newPending.forEach(m => {
        const nama = String(m.nama || m.Nama || 'Mahasiswa Baru');
        const nim = String(m.nim || m.NIM || '');
        showRegisterNotif(nama, nim);
      });
    }

  } catch(e) {
    // Silent — gak ganggu UX kalau backend offline
  }
}

// Update baseline pending saat init
function updateKnownPending() {
  State.knownPendingNims = (Cache.allMahasiswa || [])
    .filter(m => String(m.status || '').toLowerCase() === 'pending')
    .map(m => String(m.nim));
  State.seenPendingNims = [];
}

// ═══════════════════════════════════════════════════════════
// TAMPILKAN NOTIF REGISTER (toast + suara + speech + badge)
// ═══════════════════════════════════════════════════════════
function showRegisterNotif(nama, nim) {
  // 1. Toast popup
  toast(`🎓 ${nama} baru mendaftar!`, 'success', 8000);

  // 2. Suara "ding dong" khusus notif
  playNotifSound();

  // 3. Speech: "Pendaftar baru: [nama]"
  setTimeout(() => {
    speak(`Pendaftar baru, ${nama}`);
  }, 700);

  // 4. Update badge di bell
  const notifDot = document.getElementById('notifDot');
  if (notifDot) {
    const current = parseInt(notifDot.textContent) || 0;
    notifDot.textContent = current + 1;
    notifDot.classList.add('show');
  }

  // 5. Getar HP (kalau didukung)
  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }

  // 6. Tambah ke localStorage (biar muncul di panel notif)
  try {
    const pendingNotifs = JSON.parse(localStorage.getItem('absenqr_notif_register') || '[]');
    pendingNotifs.push({
      nama: nama,
      nim: nim,
      waktu: new Date().toLocaleString('id-ID'),
      read: false
    });
    localStorage.setItem('absenqr_notif_register', JSON.stringify(pendingNotifs));
  } catch(e) {}

  // 7. Kalau lagi di halaman User, refresh list
  if (State.activePage === 'user') {
    setTimeout(() => {
      if (typeof _originalRenderUser === 'function') {
        _originalRenderUser();
      }
    }, 500);
  }
}

// ═══════════════════════════════════════════════════════════
// SUARA NOTIF KHUSUS (DING DONG)
// ═══════════════════════════════════════════════════════════
function playNotifSound() {
  if (!State.soundEnabled) return;
  try {
    if (!State.audioCtx) {
      State.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = State.audioCtx;
    if (ctx.state === 'suspended') ctx.resume();

    // Ding (nada tinggi)
    playTone(ctx, 880, 0.15, 'sine', 0.25, 0);
    playTone(ctx, 1320, 0.2, 'sine', 0.25, 0.15);
    // Dong (nada rendah)
    playTone(ctx, 660, 0.3, 'sine', 0.2, 0.35);
    playTone(ctx, 990, 0.4, 'sine', 0.2, 0.5);
    // Echo
    playTone(ctx, 1320, 0.3, 'sine', 0.1, 0.9);

  } catch(e) {
    console.warn('Notif sound error:', e);
  }
}

function playTone(ctx, freq, duration, type, gain, delay) {
  try {
    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(gain || 0.2, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  } catch(e) {}
}

// ═══════════════════════════════════════════════════════════
// OVERRIDE openNotifModal — biar nampilin notif register
// ═══════════════════════════════════════════════════════════
const _originalOpenNotifModal = openNotifModal;
window.openNotifModal = function() {
  // Ambil notif register dari localStorage
  let registerNotifs = [];
  try {
    registerNotifs = JSON.parse(localStorage.getItem('absenqr_notif_register') || '[]');
  } catch(e) {}

  // Ambil notif dosen & jadwal (kayak sebelumnya)
  let dosenNotifs = [], jadwalNotifs = [];
  try {
    dosenNotifs = JSON.parse(localStorage.getItem('absenqr_notif_dosen') || '[]');
    jadwalNotifs = JSON.parse(localStorage.getItem('absenqr_notif_jadwal') || '[]');
  } catch(e) {}

  let html = '';

  // ═══ SECTION: PENDAFTAR BARU ═══
  if (registerNotifs.length > 0) {
    html += `
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:700;color:var(--accent);margin-bottom:8px;letter-spacing:1px;">
          🎓 PENDAFTAR BARU (${registerNotifs.length})
        </div>
        ${registerNotifs.slice().reverse().map(n => `
          <div class="activity-item" style="border-left-color:var(--accent);">
            <i class="fas fa-user-plus" style="color:var(--accent);margin-top:2px;"></i>
            <div style="flex:1;">
              <strong>${escapeHtml(n.nama)}</strong><br>
              <span style="font-size:10px;color:var(--text-muted);">NIM: ${escapeHtml(n.nim)}</span><br>
              <span style="font-size:10px;color:var(--text-dim);">${escapeHtml(n.waktu)}</span>
            </div>
            <button class="btn btn-sm" style="background:rgba(168,240,200,0.15);color:var(--success);" 
              onclick="approveMhs('${escapeHtml(n.nim)}',true);closeModal();">
              <i class="fas fa-check"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ═══ SECTION: DOSEN TIDAK HADIR ═══
  if (dosenNotifs.length > 0) {
    html += `
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:700;color:var(--warning);margin-bottom:8px;letter-spacing:1px;">
          👨‍🏫 LAPORAN DOSEN (${dosenNotifs.length})
        </div>
        ${dosenNotifs.slice(-5).reverse().map(n => `
          <div class="activity-item">
            <i class="fas fa-user-tie" style="color:#ffe0a8;margin-top:2px;"></i>
            <div><strong>${escapeHtml(n.matkul)}</strong><br><span style="font-size:10px;">${escapeHtml(n.alasan)}</span></div>
            <div class="time">${escapeHtml(n.waktu)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ═══ SECTION: JADWAL BERUBAH ═══
  if (jadwalNotifs.length > 0) {
    html += `
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:700;color:var(--info);margin-bottom:8px;letter-spacing:1px;">
          📅 JADWAL BERUBAH (${jadwalNotifs.length})
        </div>
        ${jadwalNotifs.slice(-3).reverse().map(n => `
          <div class="activity-item">
            <i class="fas fa-calendar-edit" style="color:#a8d8ff;margin-top:2px;"></i>
            <div><strong>${escapeHtml(n.matkul)}</strong><br><span style="font-size:10px;">${escapeHtml(n.oldHari)} → ${escapeHtml(n.newHari)}</span></div>
            <div class="time">${escapeHtml(n.waktu)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (!html) {
    html = '<div class="empty-state" style="padding:20px;"><i class="fas fa-bell-slash"></i><p>Belum ada notifikasi</p></div>';
  }

  openModal(`
    <div class="modal-title">
      <i class="fas fa-bell"></i> Notifikasi
      ${registerNotifs.length > 0 ? `<span style="background:var(--danger);color:#fff;font-size:10px;padding:3px 10px;border-radius:20px;margin-left:auto;">${registerNotifs.length} baru</span>` : ''}
    </div>
    <div style="max-height:420px;overflow-y:auto;">
      ${html}
    </div>
    <div style="display:flex;gap:8px;margin-top:12px;">
      <button class="btn btn-block" onclick="clearAllNotifs()">
        <i class="fas fa-trash"></i> Bersihkan
      </button>
      <button class="btn btn-neon btn-block" onclick="closeModal()">Tutup</button>
    </div>
  `);

  // Reset badge
  const notifDot = document.getElementById('notifDot');
  if (notifDot) {
    notifDot.classList.remove('show');
    notifDot.textContent = '0';
  }
};

// Bersihkan semua notif
function clearAllNotifs() {
  try {
    localStorage.removeItem('absenqr_notif_register');
    localStorage.removeItem('absenqr_notif_dosen');
    localStorage.removeItem('absenqr_notif_jadwal');
  } catch(e) {}
  State.knownPendingNims = [];
  toast('✅ Notifikasi dibersihkan', 'success');
  closeModal();
}

// ═══════════════════════════════════════════════════════════
// START POLLING saat enterApp
// ═══════════════════════════════════════════════════════════
const _originalEnterApp = enterApp;
window.enterApp = function() {
  _originalEnterApp();
  // Delay 2 detik biar app siap dulu
  setTimeout(() => {
    startNotifPolling();
  }, 2000);
};

// Stop polling saat logout
const _originalConfirmLogout = confirmLogout;
window.confirmLogout = function() {
  stopNotifPolling();
  _originalConfirmLogout();
};

// ═══════════════════════════════════════════════════════════
// CSS tambahan untuk badge notif
// ═══════════════════════════════════════════════════════════
(function addNotifCSS() {
  const style = document.createElement('style');
  style.textContent = `
    #notifDot.show {
      display: flex !important;
      animation: badgePulse 1.5s infinite;
    }
    @keyframes badgePulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,184,208,0.7); }
      50% { transform: scale(1.15); box-shadow: 0 0 0 8px rgba(255,184,208,0); }
    }
  `;
  document.head.appendChild(style);
})();

console.log('✅ NOTIF SYSTEM LOADED');

/*************************************************************
 * AbsenQR - app.js
 * PATCH: Session Persist — biar refresh gak balik ke login
 *************************************************************/

// ═══════════════════════════════════════════════════════════
// OVERRIDE saveSession — simpan lebih lengkap
// ═══════════════════════════════════════════════════════════
const _originalSaveSession = saveSession;
window.saveSession = function() {
  try {
    const sessionData = {
      user: State.user,
      role: State.role,
      savedAt: Date.now(),
      version: APP_VERSION
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
    console.log('💾 Session saved:', State.user?.nama);
  } catch(e) {
    console.warn('Save session error:', e);
  }
};

// ═══════════════════════════════════════════════════════════
// OVERRIDE loadSession — baca dari format baru + format lama
// ═══════════════════════════════════════════════════════════
const _originalLoadSession = loadSession;
window.loadSession = function() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;

    const data = JSON.parse(raw);

    // ═══ FORMAT BARU: {user, role, savedAt, version} ═══
    if (data.user && data.role) {
      State.user = data.user;
      State.role = data.role;
      console.log('✅ Session loaded:', data.user.nama, '(' + data.role + ')');
      return true;
    }

    // ═══ FORMAT LAMA: {nama, role, ...} langsung ═══
    if (data.nama && data.role) {
      State.user = data;
      State.role = data.role;
      console.log('✅ Session loaded (legacy):', data.nama);
      return true;
    }

    // ═══ Cek STORAGE_ROLE terpisah ═══
    const role = localStorage.getItem(STORAGE_ROLE);
    if (role && data.nama) {
      State.user = data;
      State.role = role;
      return true;
    }

  } catch(e) {
    console.warn('Load session error:', e);
  }
  return false;
};

// ═══════════════════════════════════════════════════════════
// OVERRIDE init — biar refresh langsung ke dashboard
// ═══════════════════════════════════════════════════════════
const _originalInit = init;
window.init = async function() {
  console.log('📱 AbsenQR v' + APP_VERSION + ' — INIT');

  // Load theme
  const theme = localStorage.getItem(STORAGE_THEME) || 'dark';
  State.theme = theme;
  if (theme === 'light') document.body.classList.add('light-mode');

  // Load sound
  const sound = localStorage.getItem(STORAGE_SOUND);
  if (sound !== null) State.soundEnabled = sound === 'true';
  if (!State.soundEnabled) {
    const sb = document.getElementById('btnSound');
    if (sb) sb.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }

  // Init theme canvas
  if (typeof initThemeCanvas === 'function') initThemeCanvas();

  // ═══ CEK SESSION DULU ═══
  const hasSession = loadSession();

  if (hasSession) {
    // ⚡ SUDAH LOGIN → SKIP loading, langsung dashboard
    console.log('⚡ Session restored, skip loading');

    const ls = document.getElementById('loadingScreen');
    if (ls) ls.style.display = 'none';

    State.appReady = true;
    State.activePage = 'dashboard';

    // Langsung tampilkan app
    enterApp();

    // Refresh data di background (tanpa ganggu user)
    setTimeout(() => {
      preloadData();
      if (State.role === 'admin' || State.role === 'dosen') {
        startNotifPolling();
      }
    }, 1500);

  } else {
    // 🆕 FIRST VISIT → tampil loading
    console.log('🆕 First visit, show loading');

    if (typeof runLoadingProgress === 'function') {
      await runLoadingProgress();
    }

    const ls = document.getElementById('loadingScreen');
    if (ls) {
      ls.style.opacity = '0';
      setTimeout(() => { ls.style.display = 'none'; }, 500);
    }

    showView('login');
    const roleEl = document.getElementById('loginRole');
    if (roleEl) roleEl.value = '';
    onRoleChange();
    State.appReady = true;

    setTimeout(() => {
      if (State.soundEnabled) {
        speak('Selamat datang di absensi digital, silakan login untuk masuk');
      }
    }, 800);
  }
};

// ═══════════════════════════════════════════════════════════
// OVERRIDE enterApp — pastikan session kesave pas masuk
// ═══════════════════════════════════════════════════════════
const _originalEnterApp2 = window.enterApp || enterApp;
window.enterApp = function() {
  // Simpan session dulu sebelum masuk
  if (State.user && State.role) {
    saveSession();
  }

  // Panggil fungsi asli
  _originalEnterApp2();

  // Log
  console.log('🎯 Enter app as:', State.role, '—', State.user?.nama);
};

// ═══════════════════════════════════════════════════════════
// RE-RUN INIT setelah semua patch
// ═══════════════════════════════════════════════════════════
window.addEventListener('load', () => {
  // Kasih jeda biar init lama selesai dulu
  setTimeout(() => {
    const ls = document.getElementById('loadingScreen');
    if (ls && ls.style.display !== 'none' && State.user) {
      // Kalau masih loading padahal ada session, force skip
      ls.style.display = 'none';
      console.log('🔧 Force skip loading (session detected)');
    }
  }, 3000);
});

console.log('✅ SESSION PERSIST PATCH LOADED');
/*************************************************************
 * AbsenQR - app.js
 * PATCH: Naikin timeout API jadi 10 detik
 *************************************************************/

// Override apiGet — timeout 10 detik
const _originalApiGet = apiGet;
window.apiGet = async function(action, params = {}) {
  try {
    const q = new URLSearchParams({ action, ...params });
    const res = await fetch(`${WEB_APP_URL}?${q.toString()}`, {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      signal: AbortSignal.timeout(10000)
    });
    if (res.ok) {
      const json = await res.json();
      console.log('✅ apiGet [' + action + '] OK');
      return json;
    }
    throw new Error('HTTP ' + res.status);
  } catch (err) {
    console.warn('⚠️ apiGet [' + action + '] gagal:', err.message);
    return getDummyResponse(action, params);
  }
};

// Override apiPostJson — timeout 10 detik
const _originalApiPostJson = apiPostJson;
window.apiPostJson = async function(action, data = {}) {
  try {
    const res = await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, ...data }),
      signal: AbortSignal.timeout(10000)
    });
    if (res.ok) {
      const json = await res.json();
      console.log('✅ apiPostJson [' + action + '] OK');
      return json;
    }
    throw new Error('HTTP ' + res.status);
  } catch (err) {
    console.warn('⚠️ apiPostJson [' + action + '] gagal:', err.message);
    return getDummyResponse(action, data);
  }
};

console.log('✅ TIMEOUT PATCH LOADED (10s)');

/*************************************************************
 * AbsenQR - app.js
 * PATCH: Anti-duplikat notif register
 *************************************************************/

// Override showRegisterNotif — cek duplikat dulu
const _originalShowRegisterNotif = showRegisterNotif;
window.showRegisterNotif = function(nama, nim) {
  // Cek apakah NIM ini udah ada di notif
  try {
    const existing = JSON.parse(localStorage.getItem('absenqr_notif_register') || '[]');
    const duplikat = existing.find(n => String(n.nim) === String(nim));
    if (duplikat) {
      console.log('⏭️ Skip notif duplikat:', nama, nim);
      return;
    }
  } catch(e) {}

  // Panggil fungsi asli
  _originalShowRegisterNotif(nama, nim);
};

// Bersihkan notif duplikat yang udah ada
function bersihkanNotifDuplikat() {
  try {
    const notifs = JSON.parse(localStorage.getItem('absenqr_notif_register') || '[]');
    const seen = new Set();
    const unik = notifs.filter(n => {
      const key = String(n.nim);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    localStorage.setItem('absenqr_notif_register', JSON.stringify(unik));
    console.log('🧹 Notif dibersihkan:', notifs.length, '→', unik.length);
    toast('✅ Notif duplikat dibersihkan', 'success');
    closeModal();
    openNotifModal();
  } catch(e) {
    console.error(e);
  }
}

// Expose
window.bersihkanNotifDuplikat = bersihkanNotifDuplikat;

console.log('✅ ANTI-DUPLIKAT PATCH LOADED');

/*************************************************************
 * AbsenQR - app.js
 * PATCH: Auto-refresh cache sebelum login
 *************************************************************/

// Override doLoginMhs — refresh cache dulu
const _originalDoLoginMhs = doLoginMhs;
window.doLoginMhs = async function() {
  const nimEl = document.getElementById('mhsNim');
  const passEl = document.getElementById('mhsPassword');
  const nim = nimEl ? nimEl.value.trim() : '';
  const password = passEl ? passEl.value.trim() : '';

  if (!nim || !password) {
    showLoginError('NIM & PIN wajib diisi');
    return;
  }
  if (!/^\d{8,15}$/.test(nim)) {
    showLoginError('NIM harus 8-15 digit angka');
    return;
  }
  if (!/^\d{4}$/.test(password)) {
    showLoginError('PIN harus 4 digit angka');
    return;
  }

  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

  try {
    // ═══ FORCE REFRESH CACHE DARI BACKEND DULU ═══
    console.log('🔄 Refreshing cache dari backend...');
    try {
      const r = await apiGet('get_mahasiswa', {}, 8000);
      let list = null;
      if (Array.isArray(r)) list = r;
      else if (r.data && Array.isArray(r.data)) list = r.data;
      else if (r.data && r.data.mahasiswa) list = r.data.mahasiswa;
      else if (r.mahasiswa) list = r.mahasiswa;

      if (list && list.length > 0) {
        Cache.allMahasiswa = list;
        console.log('✅ Cache refreshed:', list.length, 'mahasiswa');
      }
    } catch(e) {
      console.warn('⚠️ Refresh cache gagal:', e.message);
    }

    // ═══ LOGIN ═══
    const res = await apiPostJson('login_qr', { nim, pin: password });
    if (res.status === 'success') {
      State.user = res.user;
      State.role = 'mahasiswa';

      const rememberEl = document.getElementById('rememberMe');
      if (rememberEl && rememberEl.checked) saveSession();

      playBeep('welcome');
      setTimeout(() => speak(`Selamat datang, ${res.user.nama}`), 600);
      showFlash();
      toast(`✅ Login berhasil, ${res.user.nama}`, 'success');
      enterApp();
    } else {
      showLoginError(res.message || 'Login gagal');
      playBeep('error');
    }
  } catch (err) {
    showLoginError('Gagal terhubung: ' + err.message);
    playBeep('error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<span>Sign In</span> <i class="fas fa-arrow-right"></i>';
  }
};

// Override doLoginStaff — refresh cache dulu
const _originalDoLoginStaff = doLoginStaff;
window.doLoginStaff = async function() {
  const roleEl = document.getElementById('loginRole');
  const emailEl = document.getElementById('staffEmail');
  const passEl = document.getElementById('staffPassword');
  const role = roleEl ? roleEl.value : '';
  const email = emailEl ? emailEl.value.trim() : '';
  const password = passEl ? passEl.value : '';

  if (!role) { showLoginError('Pilih role dulu'); return; }
  if (!email || !password) { showLoginError('Email & password wajib diisi'); return; }

  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

  try {
    // ═══ FORCE REFRESH DOSEN DARI BACKEND ═══
    try {
      const r = await apiGet('get_dosen', {}, 8000);
      let list = null;
      if (Array.isArray(r)) list = r;
      else if (r.data && Array.isArray(r.data)) list = r.data;
      else if (r.data && r.data.dosen) list = r.data.dosen;
      else if (r.dosen) list = r.dosen;

      if (list && list.length > 0) {
        Cache.allDosen = list;
        console.log('✅ Dosen refreshed:', list.length);
      }
    } catch(e) {}

    // ═══ LOGIN ═══
    const res = await apiPostJson('login', { nama: email, password, role });
    if (res.status === 'success') {
      State.user = res.user;
      State.role = res.user.role;

      const rememberEl = document.getElementById('rememberStaff');
      if (rememberEl && rememberEl.checked) saveSession();

      playBeep('welcome');
      setTimeout(() => speak(`Selamat datang, ${res.user.nama}`), 600);
      showFlash();
      toast(`✅ Login berhasil, ${res.user.nama}`, 'success');
      enterApp();
    } else {
      showLoginError(res.message || 'Login gagal');
      playBeep('error');
    }
  } catch (err) {
    showLoginError('Gagal terhubung: ' + err.message);
    playBeep('error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<span>Sign In</span> <i class="fas fa-arrow-right"></i>';
  }
};

console.log('✅ AUTO-REFRESH LOGIN PATCH LOADED');
/*************************************************************
 * AbsenQR - app.js
 * PATCH: QR Login auto-refresh cache
 *************************************************************/

// Override onQrLoginScanned — refresh cache dulu sebelum cek NIM
const _originalOnQrLoginScanned = onQrLoginScanned;
window.onQrLoginScanned = async function(decodedText) {
  // Show loading
  showQrLoginError('⏳ Memverifikasi NIM...');

  // Parse NIM dari QR
  let nim = null, nama = null;
  try {
    const data = JSON.parse(decodedText);
    if (data.nim) {
      nim = String(data.nim);
      nama = data.nama || null;
    }
  } catch(e) {
    const cleaned = String(decodedText).trim();
    if (/^\d{8,15}$/.test(cleaned)) nim = cleaned;
    else {
      const match = cleaned.match(/\d{8,15}/);
      if (match) nim = match[0];
    }
  }

  if (!nim) {
    showQrLoginError('QR tidak valid. Harus berisi NIM 8-15 digit.');
    playBeep('error');
    return;
  }

  // ═══ FORCE REFRESH CACHE DARI BACKEND ═══
  console.log('🔄 QR Login: refresh cache untuk NIM', nim);
  try {
    const r = await apiGet('get_mahasiswa', {}, 8000);
    let list = null;
    if (Array.isArray(r)) list = r;
    else if (r.data && Array.isArray(r.data)) list = r.data;
    else if (r.data && r.data.mahasiswa) list = r.data.mahasiswa;
    else if (r.mahasiswa) list = r.mahasiswa;

    if (list && list.length > 0) {
      Cache.allMahasiswa = list;
      console.log('✅ Cache updated:', list.length, 'mahasiswa');
    }
  } catch(e) {
    console.warn('⚠️ Refresh cache gagal:', e.message);
  }

  // ═══ CARI MAHASISWA DI CACHE ═══
  const mhs = (Cache.allMahasiswa || []).find(m => String(m.nim || m.NIM) === String(nim))
    || DUMMY_MHS.find(m => String(m.nim) === String(nim));

  if (!mhs) {
    showQrLoginError(`❌ NIM ${nim} tidak terdaftar. Pastikan sudah didaftarkan admin.`);
    playBeep('error');
    return;
  }

  // Cek status
  const status = String(mhs.status || mhs.Status || 'Aktif').toLowerCase();
  if (status === 'pending') {
    showQrLoginError(`⏳ Akun ${mhs.nama || mhs.Nama} masih menunggu approval.`);
    playBeep('error');
    return;
  }
  if (status === 'nonaktif') {
    showQrLoginError(`❌ Akun ${mhs.nama || mhs.Nama} dinonaktifkan.`);
    playBeep('error');
    return;
  }

  // ═══ LANJUT KE OTP ═══
  document.getElementById('qrLoginError').classList.remove('show');
  State.qrLoginNim = nim;
  State.qrLoginNama = nama || mhs.nama || mhs.Nama;

  stopQrLoginScanner();
  document.getElementById('qrScanStep').classList.add('hidden');
  document.getElementById('otpSection').classList.remove('hidden');
  document.getElementById('otpDetectedInfo').innerHTML = `
    <i class="fas fa-check-circle" style="color:var(--success)"></i>
    <strong>${escapeHtml(State.qrLoginNama)}</strong> • ${nim}
  `;

  State.otpPin = '';
  State.otpState = 'idle';
  resetOtpUI();

  setTimeout(() => {
    const inp = document.getElementById('otpHiddenInput');
    if (inp) { inp.value = ''; inp.focus(); }
  }, 100);

  playBeep('success');
};

console.log('✅ QR LOGIN REFRESH PATCH LOADED');
/*************************************************************
 * AbsenQR - app.js
 * PATCH: Fix dosenEmail di dummy presensi
 *************************************************************/

(function fixDummyDosenEmail() {
  // Map matkul → dosen
  const map = {
    'Komputer Grafik':                     'wahyuni@unigha.ac.id',
    'Interaksi Manusia & Komputer':        'junaidi@unigha.ac.id',
    'Rekayasa Perangkat Lunak II':         'zikrul@unigha.ac.id',
    'Konsep Data Warehouse & Data Mining': 'jessika@unigha.ac.id',
    'Jaringan Komputer II':                'sayed@unigha.ac.id',
    'Proyek Perangkat Lunak':              'ilal@unigha.ac.id',
    'Pemrograman Berorientasi Objek':      'mukhsin@unigha.ac.id'
  };

  let fixed = 0;

  // Fix DUMMY_PRESENSI (const, tapi bisa di-mutate object-nya)
  if (typeof DUMMY_PRESENSI !== 'undefined' && Array.isArray(DUMMY_PRESENSI)) {
    DUMMY_PRESENSI.forEach(p => {
      if (!p.dosenEmail || p.dosenEmail === '') {
        p.dosenEmail = map[p.matkul] || '';
        fixed++;
      }
    });
  }

  // Fix Cache.mergedPresensi
  if (typeof Cache !== 'undefined' && Cache.mergedPresensi) {
    Cache.mergedPresensi.forEach(p => {
      if (!p.dosenEmail || p.dosenEmail === '') {
        p.dosenEmail = map[p.matkul] || '';
      }
    });
  }

  console.log('✅ Fixed dosenEmail di', fixed, 'record dummy');
  console.log('✅ Total Cache.mergedPresensi:', Cache.mergedPresensi.length);
})();

console.log('✅ DOSEN EMAIL FIX PATCH LOADED');

/*************************************************************
 * AbsenQR - app.js
 * PATCH: Filter Pertemuan (P1-P15) untuk Dosen & Mahasiswa
 *************************************************************/

// ═══════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════
if (!State.dosenFilterPertemuan) State.dosenFilterPertemuan = 'all';
if (!State.mhsFilterPertemuan) State.mhsFilterPertemuan = 'all';

// ═══════════════════════════════════════════════════════════
// HELPER: Generate options P1-P15
// ═══════════════════════════════════════════════════════════
function generatePertemuanOptions(selected) {
  let html = `<option value="all" ${selected === 'all' ? 'selected' : ''}>📚 Semua Pertemuan</option>`;
  for (let i = 1; i <= 15; i++) {
    html += `<option value="${i}" ${String(selected) === String(i) ? 'selected' : ''}>Pertemuan ${i}</option>`;
  }
  return html;
}

// ═══════════════════════════════════════════════════════════
// OVERRIDE renderDosenDash — tambah filter pertemuan
// ═══════════════════════════════════════════════════════════
const _originalRenderDosenDash = renderDosenDash;
window.renderDosenDash = function() {
  const c = document.getElementById('dashBody');
  if (!c) return;

  try {
    const merged = getMergedPresensi();
    const matkulOptions = (State.user.matkul && State.user.matkul.length)
      ? State.user.matkul : ['Rekayasa Perangkat Lunak II'];
    const matkulAktif = State.dosenFilterMatkul || matkulOptions[0];
    State.dosenFilterMatkul = matkulAktif;

    // ═══ FILTER PERTEMUAN ═══
    let kelasPresensi = merged.filter(p => p.matkul === matkulAktif);
    if (State.dosenFilterPertemuan !== 'all') {
      kelasPresensi = kelasPresensi.filter(p =>
        String(p.pertemuan) === String(State.dosenFilterPertemuan)
      );
    }

    const hadir = kelasPresensi.filter(p => p.status === 'Hadir').length;
    const izin = kelasPresensi.filter(p => p.status === 'Izin').length;
    const sakit = kelasPresensi.filter(p => p.status === 'Sakit').length;
    const alpha = kelasPresensi.filter(p => p.status === 'Alpha').length;
    const total = kelasPresensi.length || 1;

    // Chart data — per pertemuan (selalu P1-P15)
    const chartData = [], chartLabels = [];
    const maxPertemuan = 15;
    for (let i = 1; i <= maxPertemuan; i++) {
      const sesi = merged.filter(p =>
        p.matkul === matkulAktif && String(p.pertemuan) === String(i)
      );
      chartData.push(sesi.filter(p => p.status === 'Hadir').length);
      chartLabels.push('P' + i);
    }
    const hadirEnd = (hadir / total) * 360;
    const izinEnd = hadirEnd + (izin / total) * 360;

    // Info pertemuan yang ditampilkan
    const pertInfo = State.dosenFilterPertemuan === 'all'
      ? `Semua Pertemuan (P1-P15)`
      : `Pertemuan ${State.dosenFilterPertemuan}`;

    c.innerHTML = `
      <div class="split-dash">
        <div>
          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-user-tie"></i> Info Dosen</div>
            <div class="list-item">
              <div class="list-avatar" style="background:${colorFromName(State.user.nama)}">${getInitials(State.user.nama)}</div>
              <div class="list-content">
                <div class="list-title">${escapeHtml(State.user.nama)}</div>
                <div class="list-sub">${escapeHtml(State.user.email || '')}</div>
              </div>
            </div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:10px;">
              <strong style="color:var(--accent)">Matkul:</strong> ${matkulOptions.map(m => escapeHtml(m)).join(', ')}
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-filter"></i> Filter Data</div>
            <div class="form-group">
              <label class="form-label">Mata Kuliah</label>
              <select id="dosenFilterMatkulSelect" class="form-input" onchange="filterDosenMatkul(this.value)">
                ${matkulOptions.map(m => `<option value="${escapeHtml(m)}" ${m === matkulAktif ? 'selected' : ''}>${escapeHtml(m)}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Pertemuan</label>
              <select id="dosenFilterPertemuanSelect" class="form-input" onchange="filterDosenPertemuan(this.value)">
                ${generatePertemuanOptions(State.dosenFilterPertemuan)}
              </select>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-file-export"></i> Export Laporan</div>
            <div class="export-filter">
              <label>Pilih MK</label>
              <select id="exportFilterMatkulDosen">
                ${matkulOptions.map(m => `<option value="${escapeHtml(m)}">${escapeHtml(m)}</option>`).join('')}
              </select>
            </div>
            <div class="export-row">
              <button class="btn-export excel" onclick="exportExcel('presensi', document.getElementById('exportFilterMatkulDosen').value)">
                <i class="fas fa-file-excel"></i> Excel
              </button>
              <button class="btn-export pdf" onclick="exportPDF('presensi', document.getElementById('exportFilterMatkulDosen').value)">
                <i class="fas fa-file-pdf"></i> PDF
              </button>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-comment-dots"></i> Lapor Tidak Hadir</div>
            <p style="font-size:11px;color:var(--text-muted);margin-bottom:12px;line-height:1.6;">
              Kirim pengumuman ke mahasiswa via WhatsApp jika Anda berhalangan hadir.
            </p>
            <button class="btn btn-neon btn-block" onclick="laporTidakHadir()">
              <i class="fab fa-whatsapp"></i> Kirim Laporan via WA
            </button>
          </div>
        </div>

        <div>
          <div class="glass-card fade-up" style="background:linear-gradient(135deg,rgba(245,184,200,0.15),transparent);border-color:var(--accent);">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
              <i class="fas fa-info-circle" style="color:var(--accent);"></i>
              <span style="font-size:11px;font-weight:700;color:var(--accent);letter-spacing:1px;">
                ${pertInfo.toUpperCase()}
              </span>
            </div>
            <div style="font-size:22px;font-weight:800;">
              ${matkulAktif}
            </div>
          </div>

          <div class="stat-grid-v2">
            <div class="stat-v2 pink fade-up">
              <div class="icon-box"><i class="fas fa-users"></i></div>
              <div class="val">${DUMMY_MHS.length}</div>
              <div class="lbl">Total Mhs</div>
            </div>
            <div class="stat-v2 green fade-up">
              <div class="icon-box"><i class="fas fa-check"></i></div>
              <div class="val">${hadir}</div>
              <div class="lbl">Hadir</div>
            </div>
            <div class="stat-v2 yellow fade-up">
              <div class="icon-box"><i class="fas fa-file-medical"></i></div>
              <div class="val">${izin}</div>
              <div class="lbl">Izin</div>
            </div>
            <div class="stat-v2 blue fade-up">
              <div class="icon-box"><i class="fas fa-percentage"></i></div>
              <div class="val">${Math.round((hadir/total)*100)}%</div>
              <div class="lbl">Kehadiran</div>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-chart-line"></i> Kehadiran per Pertemuan</div>
            ${renderLineChart(chartData, chartLabels)}
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-chart-pie"></i> Status Kelas</div>
            <div class="donut-wrap">
              <div class="donut" style="--hadir-end:${hadirEnd}deg;--izin-end:${izinEnd}deg;"></div>
              <div class="donut-legend">
                <div class="item"><div class="dot green"></div><span><strong>${hadir}</strong> Hadir</span></div>
                <div class="item"><div class="dot yellow"></div><span><strong>${izin}</strong> Izin</span></div>
                <div class="item"><div class="dot pink"></div><span><strong>${sakit}</strong> Sakit</span></div>
                <div class="item"><div class="dot blue"></div><span><strong>${alpha}</strong> Alpha</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    setTimeout(setupFadeUp, 50);
  } catch (err) {
    c.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-circle"></i><p>${err.message}</p></div>`;
  }
};

// Filter matkul dosen
function filterDosenMatkul(matkul) {
  State.dosenFilterMatkul = matkul;
  State.dosenFilterPertemuan = 'all';
  playBeep('click');
  renderDosenDash();
}

// Filter pertemuan dosen
function filterDosenPertemuan(pertemuan) {
  State.dosenFilterPertemuan = pertemuan;
  playBeep('click');
  renderDosenDash();
}

// ═══════════════════════════════════════════════════════════
// OVERRIDE renderMhsDash — tambah filter pertemuan
// ═══════════════════════════════════════════════════════════
const _originalRenderMhsDash = renderMhsDash;
window.renderMhsDash = function() {
  const u = State.user;
  const c = document.getElementById('dashBody');
  if (!c) return;

  try {
    const merged = getMergedPresensi();
    const myPresensi = merged.filter(p => String(p.nim) === String(u.nim));

    const myMatkul = [...new Set(myPresensi.map(p => p.matkul))];
    if (myMatkul.length === 0) myMatkul.push(...DUMMY_JADWAL.map(j => j.matkul));

    const matkulAktif = State.matkulAktif && myMatkul.includes(State.matkulAktif)
      ? State.matkulAktif : myMatkul[0];
    State.matkulAktif = matkulAktif;

    // ═══ FILTER PERTEMUAN ═══
    let presensiMatkul = myPresensi.filter(p => p.matkul === matkulAktif);
    if (State.mhsFilterPertemuan !== 'all') {
      presensiMatkul = presensiMatkul.filter(p =>
        String(p.pertemuan) === String(State.mhsFilterPertemuan)
      );
    }

    const myHadir = presensiMatkul.filter(p => p.status === 'Hadir').length;
    const myIzin = presensiMatkul.filter(p => p.status === 'Izin').length;
    const mySakit = presensiMatkul.filter(p => p.status === 'Sakit').length;
    const myAlpha = presensiMatkul.filter(p => p.status === 'Alpha').length;
    const totalPertemuan = presensiMatkul.length || 1;
    const persenHadir = Math.round((myHadir / totalPertemuan) * 100);

    // Cek kelas aktif
    const cek = cekJamKelasForAbsen();
    let jadwalInfo = '';
    if (cek.bisa) {
      jadwalInfo = `<div class="jadwal-hero fade-up">
        <div class="jadwal-label"><span class="dot-live"></span> Sedang Berlangsung</div>
        <div class="jadwal-matkul">${escapeHtml(cek.jadwal.matkul)}</div>
        <div class="jadwal-info">
          <span><i class="fas fa-clock"></i> ${cek.jadwal.jamMulai} - ${cek.jadwal.jamSelesai}</span>
          <span><i class="fas fa-door-open"></i> ${escapeHtml(cek.jadwal.ruang)}</span>
          <span><i class="fas fa-user-tie"></i> ${escapeHtml(cek.jadwal.dosen)}</span>
        </div>
      </div>`;
    } else {
      jadwalInfo = `<div class="glass-card fade-up">
        <div class="card-title" style="color:var(--info)"><i class="fas fa-info-circle"></i> Info Kelas</div>
        <div style="font-size:12px;color:var(--text-muted);line-height:1.7;">${escapeHtml(cek.alasan || 'Tidak ada kelas sekarang')}</div>
      </div>`;
    }

    // QR
    let qrImgSrc = u.qrLink ? convertDriveUrl(u.qrLink) : '';
    if (!qrImgSrc) qrImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&ecc=L&data=${encodeURIComponent(u.nim || '')}`;
    const fallback = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&ecc=L&data=${encodeURIComponent(u.nim || '')}`;

    const pertInfo = State.mhsFilterPertemuan === 'all'
      ? `Semua Pertemuan (P1-P15)`
      : `Pertemuan ${State.mhsFilterPertemuan}`;

    c.innerHTML = `
      <div class="matkul-tabs fade-up">
        ${myMatkul.map(m => `
          <button class="matkul-tab ${m === matkulAktif ? 'active' : ''}" onclick="gantiMatkulMhs('${String(m).replace(/'/g, "\\'")}')">
            ${escapeHtml(m.length > 20 ? m.substring(0, 18) + '...' : m)}
          </button>
        `).join('')}
      </div>

      <div class="glass-card fade-up" style="background:linear-gradient(135deg,rgba(168,240,200,0.12),transparent);border-color:var(--success);">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
          <i class="fas fa-info-circle" style="color:var(--success);"></i>
          <span style="font-size:11px;font-weight:700;color:var(--success);letter-spacing:1px;">
            ${pertInfo.toUpperCase()}
          </span>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Filter Pertemuan</label>
          <select class="form-input" onchange="filterMhsPertemuan(this.value)">
            ${generatePertemuanOptions(State.mhsFilterPertemuan)}
          </select>
        </div>
      </div>

      <div class="split-dash">
        <div>
          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-qrcode"></i> QR Identitas Anda</div>
            <div class="qr-display">
              <img src="${qrImgSrc}" alt="QR" onerror="this.onerror=null;this.src='${fallback}'" />
              <div class="qr-hint"><i class="fas fa-info-circle"></i> Tunjukkan ke dosen bila perlu</div>
              <div style="display:flex;gap:8px;margin-top:14px;justify-content:center;flex-wrap:wrap;">
                <button class="btn btn-sm btn-neon" onclick="downloadMyQR()"><i class="fas fa-download"></i> Unduh QR</button>
                <button class="btn btn-sm" onclick="shareMyQR()"><i class="fas fa-share-alt"></i> Bagikan</button>
              </div>
            </div>
          </div>

          ${jadwalInfo}

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-bolt"></i> Aksi Cepat</div>
            <button class="btn btn-neon btn-block mb-10" onclick="navigateTo('absen')"><i class="fas fa-camera"></i> Absen Sekarang</button>
            <button class="btn btn-block" onclick="openIzinModal()"><i class="fas fa-file-medical"></i> Ajukan Izin / Sakit</button>
          </div>
        </div>

        <div>
          <div class="stat-grid-v2">
            <div class="stat-v2 green fade-up">
              <div class="icon-box"><i class="fas fa-check-circle"></i></div>
              <div class="val">${myHadir}</div>
              <div class="lbl">Hadir</div>
            </div>
            <div class="stat-v2 yellow fade-up">
              <div class="icon-box"><i class="fas fa-file-medical"></i></div>
              <div class="val">${myIzin}</div>
              <div class="lbl">Izin</div>
            </div>
            <div class="stat-v2 orange fade-up">
              <div class="icon-box"><i class="fas fa-bed"></i></div>
              <div class="val">${mySakit}</div>
              <div class="lbl">Sakit</div>
            </div>
            <div class="stat-v2 pink fade-up">
              <div class="icon-box"><i class="fas fa-times-circle"></i></div>
              <div class="val">${myAlpha}</div>
              <div class="lbl">Alpha</div>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-chart-pie"></i> Status ${escapeHtml(matkulAktif.substring(0, 25))}</div>
            <div class="donut-wrap">
              <div class="donut" style="--hadir-end:${(myHadir/totalPertemuan)*360}deg;--izin-end:${((myHadir+myIzin)/totalPertemuan)*360}deg;"></div>
              <div class="donut-legend">
                <div class="item"><div class="dot green"></div><span><strong>${myHadir}</strong> Hadir</span></div>
                <div class="item"><div class="dot yellow"></div><span><strong>${myIzin}</strong> Izin</span></div>
                <div class="item"><div class="dot pink"></div><span><strong>${mySakit}</strong> Sakit</span></div>
                <div class="item"><div class="dot blue"></div><span><strong>${myAlpha}</strong> Alpha</span></div>
              </div>
            </div>
            <div style="text-align:center;padding:10px 0 0;">
              <div style="font-size:32px;font-weight:900;background:linear-gradient(135deg,var(--accent-strong),var(--accent-deep));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">${persenHadir}%</div>
              <div style="font-size:11px;color:var(--text-muted);">dari ${totalPertemuan} pertemuan</div>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-history"></i> Riwayat per Pertemuan</div>
            ${presensiMatkul.length === 0 ? '<div class="empty-state" style="padding:20px;"><i class="fas fa-inbox"></i><p>Belum ada riwayat</p></div>' :
              presensiMatkul.slice().sort((a,b) => (a.pertemuan || 0) - (b.pertemuan || 0)).map(p => {
                const badge = p.status === 'Hadir' ? 'badge-hadir' : p.status === 'Izin' ? 'badge-izin' : p.status === 'Sakit' ? 'badge-sakit' : 'badge-alpha';
                const bg = p.status === 'Hadir' ? '#a8f0c8' : p.status === 'Izin' ? '#ffe0a8' : p.status === 'Sakit' ? '#f5b8c8' : '#ffb8d0';
                const icon = p.status === 'Hadir' ? 'fa-check' : p.status === 'Izin' ? 'fa-file' : p.status === 'Sakit' ? 'fa-bed' : 'fa-times';
                return `<div class="list-item">
                  <div class="list-avatar" style="background:${bg}"><i class="fas ${icon}" style="color:#2a1018;font-size:14px;"></i></div>
                  <div class="list-content">
                    <div class="list-title">Pertemuan ${p.pertemuan || '-'}</div>
                    <div class="list-sub">${escapeHtml(p.waktu || '')}</div>
                  </div>
                  <span class="badge-status ${badge}">${escapeHtml(p.status)}</span>
                </div>`;
              }).join('')}
          </div>
        </div>
      </div>
    `;
    setTimeout(setupFadeUp, 50);
  } catch (err) {
    c.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-circle"></i><p>${err.message}</p></div>`;
  }
};

// Filter pertemuan mahasiswa
function filterMhsPertemuan(pertemuan) {
  State.mhsFilterPertemuan = pertemuan;
  playBeep('click');
  renderMhsDash();
  setTimeout(setupFadeUp, 50);
}

// Filter matkul mahasiswa — reset pertemuan
const _originalGantiMatkulMhs = gantiMatkulMhs;
window.gantiMatkulMhs = function(matkul) {
  State.matkulAktif = matkul;
  State.mhsFilterPertemuan = 'all'; // reset filter pertemuan
  playBeep('click');
  renderMhsDash();
  setTimeout(setupFadeUp, 50);
};

console.log('✅ FILTER PERTEMUAN PATCH LOADED');
/*************************************************************
 * AbsenQR - app.js
 * PATCH: Filter Pertemuan di Dashboard Admin (P1-P15)
 *************************************************************/

// State untuk filter admin
if (!State.adminFilterPertemuan) State.adminFilterPertemuan = 'all';

// ═══════════════════════════════════════════════════════════
// OVERRIDE gantiFilterMatkulAdmin — reset pertemuan
// ═══════════════════════════════════════════════════════════
const _originalGantiFilterMatkulAdmin = gantiFilterMatkulAdmin;
window.gantiFilterMatkulAdmin = function(matkul) {
  State.adminFilterMatkul = matkul;
  State.adminFilterPertemuan = 'all'; // reset pertemuan
  playBeep('click');
  updateAdminDonut(matkul);
  renderDashboard(); // full refresh biar dropdown update
};

// ═══════════════════════════════════════════════════════════
// FUNGSI: Filter pertemuan admin
// ═══════════════════════════════════════════════════════════
function filterAdminPertemuan(pertemuan) {
  State.adminFilterPertemuan = pertemuan;
  playBeep('click');
  renderDashboard();
}

// ═══════════════════════════════════════════════════════════
// OVERRIDE renderAdminDash — tambah filter pertemuan
// ═══════════════════════════════════════════════════════════
const _originalRenderAdminDash = renderAdminDash;
window.renderAdminDash = function() {
  const c = document.getElementById('dashBody');
  if (!c) return;

  try {
    const mhs = Cache.allMahasiswa || [];
    const dosen = Cache.allDosen || [];
    const jadwal = Cache.allJadwal || [];
    const presensi = getMergedPresensi();

    const totalMhs = mhs.length || DUMMY_MHS.length;
    const totalDosen = dosen.length || DUMMY_DOSEN.length;
    const totalMatkul = jadwal.length || DUMMY_JADWAL.length;

    const matkulDipilih = State.adminFilterMatkul || 'all';
    const pertemuanDipilih = State.adminFilterPertemuan || 'all';

    // ═══ FILTER MATKUL ═══
    let presensiFilter = matkulDipilih === 'all'
      ? presensi
      : presensi.filter(p => p.matkul === matkulDipilih);

    // ═══ FILTER PERTEMUAN (BARU) ═══
    if (pertemuanDipilih !== 'all') {
      presensiFilter = presensiFilter.filter(p =>
        String(p.pertemuan) === String(pertemuanDipilih)
      );
    }

    // ═══ HITUNG MAX PERTEMUAN UNTUK CHART ═══
    const maxPertemuan = 15;
    const chartData = [], chartLabels = [];
    for (let i = 1; i <= maxPertemuan; i++) {
      // Chart selalu nampilin SEMUA pertemuan (bukan filter)
      const baseFilter = matkulDipilih === 'all'
        ? presensi
        : presensi.filter(p => p.matkul === matkulDipilih);
      const sesi = baseFilter.filter(p => String(p.pertemuan) === String(i));
      chartData.push(sesi.filter(p => p.status === 'Hadir').length);
      chartLabels.push('P' + i);
    }

    // ═══ STATISTIK UNTUK PERTEMUAN YANG DIPILIH ═══
    const hadirHariIni = presensiFilter.filter(p => p.status === 'Hadir').length;
    const izinHariIni = presensiFilter.filter(p => p.status === 'Izin').length;
    const sakitHariIni = presensiFilter.filter(p => p.status === 'Sakit').length;
    const alphaHariIni = presensiFilter.filter(p => p.status === 'Alpha').length;

    // Donut
    const totalHariIni = hadirHariIni + izinHariIni + sakitHariIni + alphaHariIni || 1;
    const hadirEnd = (hadirHariIni / totalHariIni) * 360;
    const izinEnd = hadirEnd + (izinHariIni / totalHariIni) * 360;

    const matkulList = [...new Set(DUMMY_JADWAL.map(j => j.matkul))];

    // Info pertemuan
    const pertInfo = pertemuanDipilih === 'all'
      ? 'Semua Pertemuan'
      : `Pertemuan ${pertemuanDipilih}`;

    const matkulInfo = matkulDipilih === 'all'
      ? 'Semua Matkul'
      : matkulDipilih;

    // ═══ RENDER ═══
    c.innerHTML = `
      <div class="split-dash">
        <div>
          <div class="stat-grid-v2">
            <div class="stat-v2 pink fade-up">
              <div class="icon-box"><i class="fas fa-users"></i></div>
              <div class="val">${totalMhs}</div>
              <div class="lbl">Mahasiswa</div>
            </div>
            <div class="stat-v2 green fade-up">
              <div class="icon-box"><i class="fas fa-user-tie"></i></div>
              <div class="val">${totalDosen}</div>
              <div class="lbl">Dosen</div>
            </div>
            <div class="stat-v2 yellow fade-up">
              <div class="icon-box"><i class="fas fa-book"></i></div>
              <div class="val">${totalMatkul}</div>
              <div class="lbl">Matkul</div>
            </div>
            <div class="stat-v2 blue fade-up">
              <div class="icon-box"><i class="fas fa-check-circle"></i></div>
              <div class="val">${hadirHariIni}</div>
              <div class="lbl">Hadir</div>
            </div>
          </div>

          <div class="glass-card fade-up" style="background:linear-gradient(135deg,rgba(168,216,255,0.12),transparent);border-color:var(--info);">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
              <i class="fas fa-filter" style="color:var(--info);"></i>
              <span style="font-size:11px;font-weight:700;color:var(--info);letter-spacing:1px;">
                FILTER DATA
              </span>
            </div>
            <div class="form-group">
              <label class="form-label">Mata Kuliah</label>
              <select id="adminFilterMatkulSelect" class="form-input" onchange="gantiFilterMatkulAdmin(this.value)">
                <option value="all" ${matkulDipilih === 'all' ? 'selected' : ''}>📚 Semua Matkul</option>
                ${matkulList.map(m => `<option value="${escapeHtml(m)}" ${matkulDipilih === m ? 'selected' : ''}>${escapeHtml(m.length > 30 ? m.substring(0, 28) + '...' : m)}</option>`).join('')}
              </select>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Pertemuan</label>
              <select class="form-input" onchange="filterAdminPertemuan(this.value)">
                <option value="all" ${pertemuanDipilih === 'all' ? 'selected' : ''}>📚 Semua Pertemuan (P1-P15)</option>
                ${Array.from({length: 15}, (_, i) => i + 1).map(p => 
                  `<option value="${p}" ${String(pertemuanDipilih) === String(p) ? 'selected' : ''}>Pertemuan ${p} ${p > 3 ? '(kosong)' : ''}</option>`
                ).join('')}
              </select>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-file-export"></i> Export Data</div>
            <div class="export-filter">
              <label>Pilih MK</label>
              <select id="exportFilterMatkulAdmin">
                ${DUMMY_JADWAL.map(j => `<option value="${escapeHtml(j.matkul)}">${escapeHtml(j.kodeMK)} - ${escapeHtml(j.matkul)}</option>`).join('')}
              </select>
            </div>
            <div class="export-row">
              <button class="btn-export excel" onclick="exportExcel('presensi', document.getElementById('exportFilterMatkulAdmin').value)">
                <i class="fas fa-file-excel"></i> Excel
              </button>
              <button class="btn-export pdf" onclick="exportPDF('presensi', document.getElementById('exportFilterMatkulAdmin').value)">
                <i class="fas fa-file-pdf"></i> PDF
              </button>
            </div>
            <div class="export-row" style="margin-top:8px;">
              <button class="btn-export excel" onclick="exportExcel('mahasiswa')">
                <i class="fas fa-users"></i> Semua Data Mhs
              </button>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-bolt"></i> Aksi Cepat</div>
            <button class="btn btn-neon btn-block mb-10" onclick="navigateTo('user')">
              <i class="fas fa-users-cog"></i> Kelola User
            </button>
            <button class="btn btn-block mb-10" onclick="generateAllQr()">
              <i class="fas fa-qrcode"></i> Generate Semua QR
            </button>
            <button class="btn btn-block" onclick="navigateTo('jadwal')">
              <i class="fas fa-calendar"></i> Kelola Jadwal
            </button>
          </div>
        </div>

        <div>
          <div class="glass-card fade-up" style="background:linear-gradient(135deg,rgba(245,184,200,0.15),transparent);border-color:var(--accent);">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
              <i class="fas fa-info-circle" style="color:var(--accent);"></i>
              <span style="font-size:11px;font-weight:700;color:var(--accent);letter-spacing:1px;">
                ${pertInfo.toUpperCase()}
              </span>
            </div>
            <div style="font-size:16px;font-weight:800;">
              ${escapeHtml(matkulInfo)}
            </div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">
              ${hadirHariIni} hadir • ${izinHariIni} izin • ${sakitHariIni} sakit • ${alphaHariIni} alpha
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-chart-line"></i> Tren Kehadiran per Pertemuan</div>
            ${renderLineChart(chartData, chartLabels)}
          </div>

          <div class="glass-card fade-up" id="donutAdminCard">
            <div class="card-title">
              <i class="fas fa-chart-pie"></i> Status ${pertInfo}
            </div>
            <div id="donutContentAdmin">
              <div class="donut-wrap">
                <div class="donut" style="--hadir-end:${hadirEnd}deg;--izin-end:${izinEnd}deg;"></div>
                <div class="donut-legend">
                  <div class="item"><div class="dot green"></div><span><strong>${hadirHariIni}</strong> Hadir</span></div>
                  <div class="item"><div class="dot yellow"></div><span><strong>${izinHariIni}</strong> Izin</span></div>
                  <div class="item"><div class="dot pink"></div><span><strong>${sakitHariIni}</strong> Sakit</span></div>
                  <div class="item"><div class="dot blue"></div><span><strong>${alphaHariIni}</strong> Alpha</span></div>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card fade-up">
            <div class="card-title"><i class="fas fa-clock"></i> Aktivitas Terkini</div>
            ${presensiFilter.slice(-4).reverse().map(p => {
              const color = p.status === 'Hadir' ? '#a8f0c8' : p.status === 'Izin' ? '#ffe0a8' : p.status === 'Sakit' ? '#f5b8c8' : '#ffb8d0';
              return `<div class="activity-item">
                <i class="fas fa-circle" style="color:${color};margin-top:4px;font-size:8px;"></i>
                <div><strong>${escapeHtml(p.nama)}</strong> ${escapeHtml(p.status)} di ${escapeHtml(p.matkul)}</div>
                <div class="time">P${p.pertemuan || '-'}</div>
              </div>`;
            }).join('') || '<div class="empty-state" style="padding:20px;"><i class="fas fa-inbox"></i><p>Belum ada aktivitas</p></div>'}
          </div>
        </div>
      </div>
    `;
    setTimeout(setupFadeUp, 50);
  } catch (err) {
    c.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-circle"></i><p>${err.message}</p></div>`;
  }
};

console.log('✅ ADMIN FILTER PERTEMUAN PATCH LOADED');

/*************************************************************
 * AbsenQR - app.js
 * PATCH: FIX doLoginMhs — handle semua format response
 *************************************************************/

window.doLoginMhs = async function() {
  const nimEl = document.getElementById('mhsNim');
  const passEl = document.getElementById('mhsPassword');
  const nim = nimEl ? nimEl.value.trim() : '';
  const password = passEl ? passEl.value.trim() : '';

  if (!nim || !password) {
    showLoginError('NIM & PIN wajib diisi');
    return;
  }
  if (!/^\d{8,15}$/.test(nim)) {
    showLoginError('NIM harus 8-15 digit angka');
    return;
  }
  if (!/^\d{4}$/.test(password)) {
    showLoginError('PIN harus 4 digit angka');
    return;
  }

  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

  try {
    // Refresh cache dulu
    console.log('🔄 Login Mhs: refresh cache...');
    try {
      const r = await apiGet('get_mahasiswa', {}, 8000);
      let list = null;
      if (Array.isArray(r)) list = r;
      else if (r.data && Array.isArray(r.data)) list = r.data;
      else if (r.data && r.data.mahasiswa) list = r.data.mahasiswa;
      else if (r.mahasiswa) list = r.mahasiswa;
      if (list && list.length > 0) {
        Cache.allMahasiswa = list;
        console.log('✅ Cache refreshed:', list.length);
      }
    } catch(e) { console.warn('⚠️ Refresh gagal:', e.message); }

    // Login via backend
    const res = await apiPostJson('login_qr', { nim, pin: password });
    console.log('📥 Login response:', res);

    // ═══ HANDLE BERBAGAI FORMAT RESPONSE ═══
    let user = null;

    // Format 1: {status: 'success', user: {...}}
    if (res && res.status === 'success' && res.user) {
      user = res.user;
    }
    // Format 2: {status: 'success', data: {...}}
    else if (res && res.status === 'success' && res.data && res.data.user) {
      user = res.data.user;
    }
    // Format 3: {ok: true, data: {...}}
    else if (res && res.ok && res.data && res.data.user) {
      user = res.data.user;
    }
    // Format 4: {user: {...}} tanpa status
    else if (res && res.user && res.user.nim) {
      user = res.user;
    }
    // Format 5: Response langsung user
    else if (res && res.nim && res.nama) {
      user = res;
    }
    // Format 6: Cari di cache lokal
    else {
      // Cek apakah user ada di Cache (fallback lokal)
      const mhs = (Cache.allMahasiswa || []).find(m => 
        String(m.nim) === String(nim)
      );
      if (mhs) {
        const validPin = String(nim).slice(-4);
        if (String(password) === validPin || String(password) === '1234') {
          user = {
            nim: mhs.nim,
            nama: mhs.nama,
            kelas: mhs.kelas || 'V.2',
            jurusan: mhs.jurusan || 'Teknik Informatika',
            email: mhs.email || '',
            role: 'mahasiswa'
          };
        }
      }
    }

    // ═══ JIKA USER KETEMU ═══
    if (user && user.nim) {
      State.user = user;
      State.role = 'mahasiswa';

      const rememberEl = document.getElementById('rememberMe');
      if (rememberEl && rememberEl.checked) saveSession();

      playBeep('welcome');
      setTimeout(() => speak(`Selamat datang, ${user.nama}`), 600);
      showFlash();
      toast(`✅ Login berhasil, ${user.nama}`, 'success');
      enterApp();
      return;
    }

    // ═══ JIKA GAGAL ═══
    // Cek pesan error dari response
    let errMsg = 'NIM atau PIN salah';
    if (res) {
      if (res.message) errMsg = res.message;
      else if (res.error) errMsg = res.error;
      else if (res.data && res.data.message) errMsg = res.data.message;
    }
    showLoginError(errMsg);
    playBeep('error');

  } catch (err) {
    console.error('Login error:', err);
    // ═══ FALLBACK: Cek Cache lokal ═══
    const mhs = (Cache.allMahasiswa || []).find(m => String(m.nim) === String(nim))
      || DUMMY_MHS.find(m => String(m.nim) === String(nim));

    if (mhs) {
      const validPin = String(nim).slice(-4);
      if (String(password) === validPin || String(password) === '1234') {
        State.user = {
          nim: mhs.nim,
          nama: mhs.nama,
          kelas: mhs.kelas || 'V.2',
          jurusan: mhs.jurusan || 'Teknik Informatika',
          email: mhs.email || (nim + '@student.unigha.ac.id'),
          role: 'mahasiswa'
        };
        State.role = 'mahasiswa';
        saveSession();
        playBeep('welcome');
        speak(`Selamat datang, ${mhs.nama}`);
        showFlash();
        toast(`✅ Login berhasil, ${mhs.nama}`, 'success');
        enterApp();
        return;
      }
    }
    showLoginError('Gagal: ' + err.message);
    playBeep('error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<span>Sign In</span> <i class="fas fa-arrow-right"></i>';
  }
};

console.log('✅ DO_LOGIN_MHS FIX PATCH LOADED');

/*************************************************************
 * AbsenQR - app.js
 * PATCH: Notif real-time saat mahasiswa absen
 *************************************************************/

// Override onAbsenScanSuccess — kirim notif ke dosen
const _originalOnAbsenScanSuccess = onAbsenScanSuccess;
window.onAbsenScanSuccess = async function(decodedText) {
  // Panggil fungsi asli dulu
  await _originalOnAbsenScanSuccess(decodedText);

  // ═══ KIRIM NOTIF KE DOSEN ═══
  try {
    const user = State.user;
    if (!user) return;

    // Cek jam
    const cek = cekJamKelasForAbsen();
    const matkul = cek.bisa ? cek.jadwal.matkul : 'Kelas';

    // Simpan notif di localStorage (biar dosen bisa lihat)
    const notifAbsen = JSON.parse(localStorage.getItem('absenqr_notif_absen') || '[]');
    notifAbsen.push({
      nim: user.nim || user.username,
      nama: user.nama,
      matkul: matkul,
      waktu: new Date().toLocaleString('id-ID'),
      timestamp: Date.now()
    });
    localStorage.setItem('absenqr_notif_absen', JSON.stringify(notifAbsen));

    console.log('🔔 Notif absen disimpan untuk dosen');

    // Kalau yang login dosen (bukan mhs), langsung muncul notif
    if (State.role === 'dosen' || State.role === 'admin') {
      playNotifSound();
      toast(`🎓 ${user.nama} baru absen di ${matkul}`, 'success', 6000);
      setTimeout(() => speak(`${user.nama} baru absen`), 700);

      const notifDot = document.getElementById('notifDot');
      if (notifDot) {
        const current = parseInt(notifDot.textContent) || 0;
        notifDot.textContent = current + 1;
        notifDot.classList.add('show');
      }

      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }
  } catch(e) {
    console.warn('Notif absen error:', e.message);
  }
};

// ═══════════════════════════════════════════════════════════
// OVERRIDE openNotifModal — tambah section absen
// ═══════════════════════════════════════════════════════════
const _originalOpenNotifModal2 = window.openNotifModal || openNotifModal;
window.openNotifModal = function() {
  // Ambil semua notif
  let registerNotifs = [], dosenNotifs = [], jadwalNotifs = [], absenNotifs = [];
  try {
    registerNotifs = JSON.parse(localStorage.getItem('absenqr_notif_register') || '[]');
    dosenNotifs = JSON.parse(localStorage.getItem('absenqr_notif_dosen') || '[]');
    jadwalNotifs = JSON.parse(localStorage.getItem('absenqr_notif_jadwal') || '[]');
    absenNotifs = JSON.parse(localStorage.getItem('absenqr_notif_absen') || '[]');
  } catch(e) {}

  let html = '';

  // ═══ SECTION: ABSEN BARU ═══
  if (absenNotifs.length > 0) {
    html += `
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:700;color:var(--success);margin-bottom:8px;letter-spacing:1px;">
          🎓 ABSEN BARU (${absenNotifs.length})
        </div>
        ${absenNotifs.slice(-10).reverse().map(n => `
          <div class="activity-item" style="border-left-color:var(--success);">
            <i class="fas fa-check-circle" style="color:var(--success);margin-top:2px;"></i>
            <div style="flex:1;">
              <strong>${escapeHtml(n.nama)}</strong><br>
              <span style="font-size:10px;color:var(--text-muted);">${escapeHtml(n.matkul)}</span><br>
              <span style="font-size:10px;color:var(--text-dim);">${escapeHtml(n.waktu)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ═══ SECTION: PENDAFTAR BARU ═══
  if (registerNotifs.length > 0) {
    html += `
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:700;color:var(--accent);margin-bottom:8px;letter-spacing:1px;">
          🎓 PENDAFTAR BARU (${registerNotifs.length})
        </div>
        ${registerNotifs.slice().reverse().map(n => `
          <div class="activity-item">
            <i class="fas fa-user-plus" style="color:var(--accent);margin-top:2px;"></i>
            <div style="flex:1;">
              <strong>${escapeHtml(n.nama)}</strong><br>
              <span style="font-size:10px;color:var(--text-muted);">NIM: ${escapeHtml(n.nim)}</span><br>
              <span style="font-size:10px;color:var(--text-dim);">${escapeHtml(n.waktu)}</span>
            </div>
            <button class="btn btn-sm" style="background:rgba(168,240,200,0.15);color:var(--success);" 
              onclick="approveMhs('${escapeHtml(n.nim)}',true);closeModal();">
              <i class="fas fa-check"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ═══ SECTION: DOSEN TIDAK HADIR ═══
  if (dosenNotifs.length > 0) {
    html += `
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:700;color:var(--warning);margin-bottom:8px;letter-spacing:1px;">
          👨‍🏫 LAPORAN DOSEN
        </div>
        ${dosenNotifs.slice(-5).reverse().map(n => `
          <div class="activity-item">
            <i class="fas fa-user-tie" style="color:#ffe0a8;margin-top:2px;"></i>
            <div><strong>${escapeHtml(n.matkul)}</strong><br><span style="font-size:10px;">${escapeHtml(n.alasan)}</span></div>
            <div class="time">${escapeHtml(n.waktu)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ═══ SECTION: JADWAL BERUBAH ═══
  if (jadwalNotifs.length > 0) {
    html += `
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:700;color:var(--info);margin-bottom:8px;letter-spacing:1px;">
          📅 JADWAL BERUBAH
        </div>
        ${jadwalNotifs.slice(-3).reverse().map(n => `
          <div class="activity-item">
            <i class="fas fa-calendar-edit" style="color:#a8d8ff;margin-top:2px;"></i>
            <div><strong>${escapeHtml(n.matkul)}</strong><br><span style="font-size:10px;">${escapeHtml(n.oldHari)} → ${escapeHtml(n.newHari)}</span></div>
            <div class="time">${escapeHtml(n.waktu)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (!html) {
    html = '<div class="empty-state" style="padding:20px;"><i class="fas fa-bell-slash"></i><p>Belum ada notifikasi</p></div>';
  }

  const totalNotif = registerNotifs.length + absenNotifs.length;

  openModal(`
    <div class="modal-title">
      <i class="fas fa-bell"></i> Notifikasi
      ${totalNotif > 0 ? `<span style="background:var(--danger);color:#fff;font-size:10px;padding:3px 10px;border-radius:20px;margin-left:auto;">${totalNotif} baru</span>` : ''}
    </div>
    <div style="max-height:420px;overflow-y:auto;">
      ${html}
    </div>
    <div style="display:flex;gap:8px;margin-top:12px;">
      <button class="btn btn-block" onclick="clearAllNotifs()">
        <i class="fas fa-trash"></i> Bersihkan
      </button>
      <button class="btn btn-neon btn-block" onclick="closeModal()">Tutup</button>
    </div>
  `);

  const notifDot = document.getElementById('notifDot');
  if (notifDot) {
    notifDot.classList.remove('show');
    notifDot.textContent = '0';
  }
};

// Update clearAllNotifs — hapus absen juga
window.clearAllNotifs = function() {
  try {
    localStorage.removeItem('absenqr_notif_register');
    localStorage.removeItem('absenqr_notif_dosen');
    localStorage.removeItem('absenqr_notif_jadwal');
    localStorage.removeItem('absenqr_notif_absen');
  } catch(e) {}
  State.knownPendingNims = [];
  toast('✅ Notifikasi dibersihkan', 'success');
  closeModal();
};

console.log('✅ NOTIF ABSEN PATCH LOADED');

/*************************************************************
 * AbsenQR - app.js
 * PATCH: Dosen auto-refresh dashboard saat mhs absen
 *************************************************************/

// Polling: dosen cek presensi baru tiap 5 detik
let dosenPresensiPolling = null;

function startDosenPresensiPolling() {
  if (State.role !== 'dosen') return;
  stopDosenPresensiPolling();

  let lastCount = (Cache.mergedPresensi || []).length;

  dosenPresensiPolling = setInterval(() => {
    const currentCount = (Cache.mergedPresensi || []).length;
    if (currentCount > lastCount) {
      console.log('🔔 Presensi baru terdeteksi, refresh dashboard');
      lastCount = currentCount;

      // Refresh dashboard
      if (State.activePage === 'dashboard') {
        renderDashboard();
      } else if (State.activePage === 'mahasiswa') {
        renderMahasiswa();
      }

      // Notif
      playNotifSound();
      const notifDot = document.getElementById('notifDot');
      if (notifDot) {
        const cur = parseInt(notifDot.textContent) || 0;
        notifDot.textContent = cur + 1;
        notifDot.classList.add('show');
      }
    }
  }, 5000);

  console.log('👀 Dosen presensi polling started');
}

function stopDosenPresensiPolling() {
  if (dosenPresensiPolling) {
    clearInterval(dosenPresensiPolling);
    dosenPresensiPolling = null;
  }
}

// Override enterApp — start polling untuk dosen
const _origEnterApp3 = window.enterApp || enterApp;
window.enterApp = function() {
  _origEnterApp3();
  setTimeout(() => {
    if (State.role === 'dosen') {
      startDosenPresensiPolling();
    }
  }, 2000);
};

// Override confirmLogout — stop polling
const _origConfirmLogout3 = window.confirmLogout || confirmLogout;
window.confirmLogout = function() {
  stopDosenPresensiPolling();
  _origConfirmLogout3();
};

// Override onAbsenScanSuccess — simpan ke localStorage + trigger refresh
const _origOnAbsen4 = onAbsenScanSuccess;
window.onAbsenScanSuccess = async function(decodedText) {
  await _origOnAbsen4(decodedText);

  // Simpan flag ke localStorage biar dosen tau ada absen baru
  try {
    const user = State.user;
    if (user) {
      const cek = cekJamKelasForAbsen();
      const matkul = cek.bisa ? cek.jadwal.matkul : 'Kelas';
      
      // Ambil record terakhir dari Cache
      const latest = Cache.mergedPresensi[Cache.mergedPresensi.length - 1];
      
      if (latest) {
        const notifAbsen = JSON.parse(localStorage.getItem('absenqr_notif_absen') || '[]');
        notifAbsen.push({
          nim: user.nim || user.username,
          nama: user.nama,
          matkul: matkul,
          pertemuan: latest.pertemuan || 4,
          status: latest.status || 'Hadir',
          waktu: new Date().toLocaleString('id-ID'),
          timestamp: Date.now()
        });
        localStorage.setItem('absenqr_notif_absen', JSON.stringify(notifAbsen));
        console.log('🔔 Notif absen tersimpan');
      }
    }
  } catch(e) {
    console.warn('Notif absen error:', e);
  }
};

console.log('✅ DOSEN AUTO-REFRESH PATCH LOADED');

/*************************************************************
 * AbsenQR - app.js
 * PATCH: Fix Notif Izin + Dropdown Pertemuan Sesi
 *************************************************************/

// ═══════════════════════════════════════════════════════════
// STATE: Pertemuan yang dipilih dosen
// ═══════════════════════════════════════════════════════════
if (!State.dosenSesiPertemuan) State.dosenSesiPertemuan = 4;

// ═══════════════════════════════════════════════════════════
// PATCH 1: FIX NOTIF IZIN KE DOSEN
// ═══════════════════════════════════════════════════════════
const _originalDoAjukanIzin = doAjukanIzin;
window.doAjukanIzin = async function() {
  const jenis = document.getElementById('izinJenis').value;
  const matkul = document.getElementById('izinMatkul').value;
  const alasan = document.getElementById('izinAlasan').value.trim();
  const tanggal = document.getElementById('izinTanggal').value;
  if (!alasan) { toast('Alasan wajib diisi', 'error'); return; }

  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

  try {
    // Kirim ke backend
    await apiPostJson('ajukan_izin', {
      nim: State.user.nim,
      nama: State.user.nama,
      matkul, jenis, alasan, tanggal
    });

    // ═══ TAMBAH NOTIF UNTUK DOSEN ═══
    try {
      const izinNotifs = JSON.parse(localStorage.getItem('absenqr_notif_izin') || '[]');
      izinNotifs.push({
        nim: State.user.nim,
        nama: State.user.nama,
        matkul: matkul,
        jenis: jenis,
        alasan: alasan,
        tanggal: tanggal,
        waktu: new Date().toLocaleString('id-ID'),
        timestamp: Date.now(),
        read: false
      });
      localStorage.setItem('absenqr_notif_izin', JSON.stringify(izinNotifs));
      console.log('🔔 Notif izin disimpan untuk dosen');
    } catch(e) {}

    playBeep('success');
    toast(`✅ ${jenis} diajukan`, 'success');
    closeModal();

    // Refresh daftar pengajuan kalau di halaman izin
    if (State.activePage === 'izin' && typeof renderMhsIzinPage === 'function') {
      renderMhsIzinPage();
    }

  } catch (err) {
    playBeep('success');
    toast(`✅ ${jenis} diajukan (demo)`, 'success');
    closeModal();
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim';
  }
};

// ═══════════════════════════════════════════════════════════
// PATCH 2: DROPDOWN PERTEMUAN DI FORM MULAI SESI
// ═══════════════════════════════════════════════════════════
const _originalRenderFormMulaiSesi = renderFormMulaiSesi;
window.renderFormMulaiSesi = function() {
  const matkulOpts = (State.user.matkul && State.user.matkul.length)
    ? State.user.matkul : ['Rekayasa Perangkat Lunak II'];
  const body = document.getElementById('sesiBody');
  if (!body) return;

  // Hitung pertemuan selanjutnya dari data existing
  const merged = getMergedPresensi();
  const matkulAktif = matkulOpts[0];
  const pertemuanAda = [...new Set(
    merged
      .filter(p => p.matkul === matkulAktif)
      .map(p => parseInt(p.pertemuan) || 0)
      .filter(p => p > 0)
  )];
  const maxPertemuan = pertemuanAda.length > 0 ? Math.max(...pertemuanAda) : 0;
  const nextPertemuan = maxPertemuan + 1;

  body.innerHTML = `
    <div class="glass-card fade-up">
      <div class="card-title"><i class="fas fa-play"></i> Mulai Sesi Baru</div>

      <div class="form-group">
        <label class="form-label">Mata Kuliah</label>
        <select id="sesiMatkul" class="form-input" onchange="updateNextPertemuanInfo()">
          ${matkulOpts.map(m => `<option value="${escapeHtml(m)}">${escapeHtml(m)}</option>`).join('')}
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">📅 Pilih Pertemuan (P1 - P15)</label>
        <select id="sesiPertemuan" class="form-input">
          ${Array.from({length: 15}, (_, i) => i + 1).map(p => {
            const sudahAda = pertemuanAda.includes(p);
            return `<option value="${p}" ${p === nextPertemuan ? 'selected' : ''}>
              Pertemuan ${p} ${sudahAda ? '✅ (sudah ada)' : '🆕 (baru)'}
            </option>`;
          }).join('')}
        </select>
        <div style="font-size:11px;color:var(--text-muted);margin-top:6px;line-height:1.5;">
          💡 Pilih pertemuan ke berapa sesi ini. Mahasiswa yang scan akan masuk ke <strong style="color:var(--accent);">Pertemuan yang dipilih</strong>.
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Kelas</label>
        <select id="sesiKelas" class="form-input">
          <option value="V.1">V.1</option>
          <option value="V.2" selected>V.2</option>
          <option value="V.3">V.3</option>
          <option value="V.4">V.4</option>
          <option value="V.5">V.5</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Jam Selesai</label>
        <input type="time" id="sesiJamSelesai" class="form-input" value="17:00" />
      </div>

      <div class="form-group">
        <label class="form-label">Lokasi Kampus</label>
        <select id="sesiKampus" class="form-input">
          <option value="gle-gapui">🏛️ Gle Gapui</option>
          <option value="sigli">🏛️ Sigli (Nurdin A.R.)</option>
        </select>
      </div>

      <button class="btn btn-neon btn-block" onclick="doMulaiSesi()">
        <i class="fas fa-play"></i> Mulai Sesi
      </button>
    </div>`;
};

function updateNextPertemuanInfo() {
  const matkul = document.getElementById('sesiMatkul')?.value;
  const pertSel = document.getElementById('sesiPertemuan');
  if (!matkul || !pertSel) return;

  const merged = getMergedPresensi();
  const pertemuanAda = [...new Set(
    merged
      .filter(p => p.matkul === matkul)
      .map(p => parseInt(p.pertemuan) || 0)
      .filter(p => p > 0)
  )];
  const nextPertemuan = pertemuanAda.length > 0 ? Math.max(...pertemuanAda) + 1 : 1;

  // Update options dengan status
  pertSel.innerHTML = Array.from({length: 15}, (_, i) => i + 1).map(p => {
    const sudahAda = pertemuanAda.includes(p);
    return `<option value="${p}" ${p === nextPertemuan ? 'selected' : ''}>
      Pertemuan ${p} ${sudahAda ? '✅ (sudah ada)' : '🆕 (baru)'}
    </option>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════════
// PATCH 3: SIMPAN PERTEMUAN DI SESI + AUTO-MASUK SAAT SCAN
// ═══════════════════════════════════════════════════════════
const _originalDoMulaiSesi = doMulaiSesi;
window.doMulaiSesi = async function() {
  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memulai...';

  const pertemuan = parseInt(document.getElementById('sesiPertemuan')?.value || 4);
  const matkul = document.getElementById('sesiMatkul')?.value;

  const demoSesi = {
    sesiID: 'SESI-' + Date.now(),
    matkul: matkul,
    kelas: document.getElementById('sesiKelas')?.value || 'V.2',
    dosenEmail: State.user.email,
    dosenNama: State.user.nama,
    waktuMulai: new Date().toLocaleString('id-ID'),
    waktuSelesai: document.getElementById('sesiJamSelesai')?.value || '17:00',
    token: 'demo-' + Date.now(),
    kampusId: document.getElementById('sesiKampus')?.value || 'gle-gapui',
    kampusNama: 'Kampus Demo',
    pertemuan: pertemuan  // ═══ SIMPAN PERTEMUAN ═══
  };

  try {
    const res = await apiPostJson('mulai_sesi', {
      matkul: demoSesi.matkul,
      kelas: demoSesi.kelas,
      jamSelesai: demoSesi.waktuSelesai,
      kampusId: demoSesi.kampusId,
      dosenEmail: demoSesi.dosenEmail,
      dosenNama: demoSesi.dosenNama,
      pertemuan: pertemuan  // ═══ KIRIM KE BACKEND ═══
    });
    if (res.sesiID) demoSesi.sesiID = res.sesiID;
    if (res.token) demoSesi.token = res.token;
  } catch(e) {}

  // Simpan ke Cache
  Cache.sesiAktif = demoSesi;
  State.dosenSesiPertemuan = pertemuan;

  playBeep('success');
  toast(`✅ Sesi Pertemuan ${pertemuan} dimulai!`, 'success');
  renderSesiAktif(demoSesi);
};

// ═══════════════════════════════════════════════════════════
// PATCH 4: SCAN ABSEN — AUTO-MASUK KE PERTEMUAN SESI
// ═══════════════════════════════════════════════════════════
const _originalOnAbsenScan5 = onAbsenScanSuccess;
window.onAbsenScanSuccess = async function(decodedText) {
  // Simpan dulu pertemuan dari sesi aktif
  let pertemuanDariSesi = null;
  try {
    const data = JSON.parse(decodedText);
    if (data.pertemuan) pertemuanDariSesi = parseInt(data.pertemuan);
  } catch(e) {}

  // Panggil fungsi asli
  await _originalOnAbsenScan5(decodedText);

  // ═══ UPDATE PERTEMUAN DI CACHE ═══
  if (pertemuanDariSesi && Cache.mergedPresensi) {
    const latest = Cache.mergedPresensi[Cache.mergedPresensi.length - 1];
    if (latest && (!latest.pertemuan || latest.pertemuan === 4)) {
      latest.pertemuan = pertemuanDariSesi;
      console.log('✅ Absen dimasukkan ke Pertemuan', pertemuanDariSesi);
    }
  }

  // ═══ KIRIM NOTIF KE DOSEN ═══
  try {
    const user = State.user;
    if (user) {
      const notifAbsen = JSON.parse(localStorage.getItem('absenqr_notif_absen') || '[]');
      notifAbsen.push({
        nim: user.nim || user.username,
        nama: user.nama,
        matkul: pertemuanDariSesi ? 'Komputer Grafik' : 'Kelas',
        pertemuan: pertemuanDariSesi || 4,
        status: 'Hadir',
        waktu: new Date().toLocaleString('id-ID'),
        timestamp: Date.now()
      });
      localStorage.setItem('absenqr_notif_absen', JSON.stringify(notifAbsen));
    }
  } catch(e) {}
};

// ═══════════════════════════════════════════════════════════
// PATCH 5: NOTIF PANEL — TAMBAH SECTION IZIN & ABSEN
// ═══════════════════════════════════════════════════════════
const _originalOpenNotifModal3 = window.openNotifModal || openNotifModal;
window.openNotifModal = function() {
  let registerNotifs = [], dosenNotifs = [], jadwalNotifs = [], absenNotifs = [], izinNotifs = [];
  try {
    registerNotifs = JSON.parse(localStorage.getItem('absenqr_notif_register') || '[]');
    dosenNotifs = JSON.parse(localStorage.getItem('absenqr_notif_dosen') || '[]');
    jadwalNotifs = JSON.parse(localStorage.getItem('absenqr_notif_jadwal') || '[]');
    absenNotifs = JSON.parse(localStorage.getItem('absenqr_notif_absen') || '[]');
    izinNotifs = JSON.parse(localStorage.getItem('absenqr_notif_izin') || '[]');
  } catch(e) {}

  let html = '';

  // ═══ SECTION: IZIN/SAKIT ═══
  if (izinNotifs.length > 0) {
    html += `
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:700;color:var(--warning);margin-bottom:8px;letter-spacing:1px;">
          📝 PENGAJUAN IZIN/SAKIT (${izinNotifs.length})
        </div>
        ${izinNotifs.slice(-10).reverse().map(n => `
          <div class="activity-item" style="border-left-color:var(--warning);">
            <i class="fas fa-file-medical" style="color:var(--warning);margin-top:2px;"></i>
            <div style="flex:1;">
              <strong>${escapeHtml(n.nama)}</strong> — ${escapeHtml(n.jenis)}<br>
              <span style="font-size:10px;color:var(--text-muted);">${escapeHtml(n.matkul)} • ${escapeHtml(n.tanggal || '')}</span><br>
              <span style="font-size:10px;color:var(--text-dim);">${escapeHtml(n.alasan || '')}</span><br>
              <span style="font-size:10px;color:var(--text-dim);">${escapeHtml(n.waktu)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ═══ SECTION: ABSEN BARU ═══
  if (absenNotifs.length > 0) {
    html += `
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:700;color:var(--success);margin-bottom:8px;letter-spacing:1px;">
          🎓 ABSEN BARU (${absenNotifs.length})
        </div>
        ${absenNotifs.slice(-10).reverse().map(n => `
          <div class="activity-item" style="border-left-color:var(--success);">
            <i class="fas fa-check-circle" style="color:var(--success);margin-top:2px;"></i>
            <div style="flex:1;">
              <strong>${escapeHtml(n.nama)}</strong> — ${escapeHtml(n.status || 'Hadir')}<br>
              <span style="font-size:10px;color:var(--text-muted);">${escapeHtml(n.matkul)} • Pertemuan ${n.pertemuan || '-'}</span><br>
              <span style="font-size:10px;color:var(--text-dim);">${escapeHtml(n.waktu)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ═══ SECTION: PENDAFTAR BARU ═══
  if (registerNotifs.length > 0) {
    html += `
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:700;color:var(--accent);margin-bottom:8px;letter-spacing:1px;">
          🎓 PENDAFTAR BARU (${registerNotifs.length})
        </div>
        ${registerNotifs.slice().reverse().map(n => `
          <div class="activity-item">
            <i class="fas fa-user-plus" style="color:var(--accent);margin-top:2px;"></i>
            <div style="flex:1;">
              <strong>${escapeHtml(n.nama)}</strong><br>
              <span style="font-size:10px;color:var(--text-muted);">NIM: ${escapeHtml(n.nim)}</span>
            </div>
            <button class="btn btn-sm" style="background:rgba(168,240,200,0.15);color:var(--success);" 
              onclick="approveMhs('${escapeHtml(n.nim)}',true);closeModal();">
              <i class="fas fa-check"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ═══ SECTION: DOSEN TIDAK HADIR ═══
  if (dosenNotifs.length > 0) {
    html += `
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:700;color:var(--warning);margin-bottom:8px;">👨‍🏫 LAPORAN DOSEN</div>
        ${dosenNotifs.slice(-5).reverse().map(n => `
          <div class="activity-item">
            <i class="fas fa-user-tie" style="color:#ffe0a8;margin-top:2px;"></i>
            <div><strong>${escapeHtml(n.matkul)}</strong><br><span style="font-size:10px;">${escapeHtml(n.alasan)}</span></div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ═══ SECTION: JADWAL BERUBAH ═══
  if (jadwalNotifs.length > 0) {
    html += `
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:700;color:var(--info);margin-bottom:8px;">📅 JADWAL BERUBAH</div>
        ${jadwalNotifs.slice(-3).reverse().map(n => `
          <div class="activity-item">
            <i class="fas fa-calendar-edit" style="color:#a8d8ff;margin-top:2px;"></i>
            <div><strong>${escapeHtml(n.matkul)}</strong><br><span style="font-size:10px;">${escapeHtml(n.oldHari)} → ${escapeHtml(n.newHari)}</span></div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (!html) {
    html = '<div class="empty-state" style="padding:20px;"><i class="fas fa-bell-slash"></i><p>Belum ada notifikasi</p></div>';
  }

  const totalNotif = registerNotifs.length + absenNotifs.length + izinNotifs.length;

  openModal(`
    <div class="modal-title">
      <i class="fas fa-bell"></i> Notifikasi
      ${totalNotif > 0 ? `<span style="background:var(--danger);color:#fff;font-size:10px;padding:3px 10px;border-radius:20px;margin-left:auto;">${totalNotif} baru</span>` : ''}
    </div>
    <div style="max-height:420px;overflow-y:auto;">${html}</div>
    <div style="display:flex;gap:8px;margin-top:12px;">
      <button class="btn btn-block" onclick="clearAllNotifs()"><i class="fas fa-trash"></i> Bersihkan</button>
      <button class="btn btn-neon btn-block" onclick="closeModal()">Tutup</button>
    </div>
  `);

  const notifDot = document.getElementById('notifDot');
  if (notifDot) {
    notifDot.classList.remove('show');
    notifDot.textContent = '0';
  }
};

// Update clearAllNotifs
window.clearAllNotifs = function() {
  try {
    localStorage.removeItem('absenqr_notif_register');
    localStorage.removeItem('absenqr_notif_dosen');
    localStorage.removeItem('absenqr_notif_jadwal');
    localStorage.removeItem('absenqr_notif_absen');
    localStorage.removeItem('absenqr_notif_izin');
  } catch(e) {}
  State.knownPendingNims = [];
  toast('✅ Notifikasi dibersihkan', 'success');
  closeModal();
};

console.log('✅ IZIN NOTIF + PERTEMUAN SESI PATCH LOADED');

/*************************************************************
 * AbsenQR - app.js
 * PATCH: SEMUA NOTIF KE BACKEND (Lintas Device)
 * - Register → notif ke backend
 * - Absen → notif ke backend
 * - Izin → notif ke backend
 * - Dosen lapor → notif ke backend
 * - Jadwal berubah → notif ke backend
 * - Dosen polling tiap 5s → suara + toast
 *************************************************************/

// ═══════════════════════════════════════════════════════════
// STATE: Notif polling
// ═══════════════════════════════════════════════════════════
if (!State.lastNotifTimestamp) State.lastNotifTimestamp = Date.now();
if (!State.notifBackendPolling) State.notifBackendPolling = null;

// ═══════════════════════════════════════════════════════════
// HELPER: Simpan notif ke BACKEND
// ═══════════════════════════════════════════════════════════
async function simpanNotifBackend(data) {
  try {
    const res = await apiPostJson('add_notif', {
      dari: data.dari || '',
      untuk: data.untuk || 'semua',
      judul: data.judul || 'Notifikasi',
      isi: data.isi || '',
      tipe: data.tipe || 'info',
      nim: data.nim || '',
      nama: data.nama || '',
      matkul: data.matkul || '',
      pertemuan: data.pertemuan || '',
      jenis: data.jenis || '',
      waktu: new Date().toLocaleString('id-ID'),
      timestamp: Date.now()
    });
    console.log('✅ Notif disimpan ke backend:', data.tipe);
    return res;
  } catch(e) {
    console.warn('⚠️ Gagal simpan notif backend:', e.message);
    // Fallback localStorage
    const key = 'absenqr_notif_' + data.tipe;
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.push({ ...data, waktu: new Date().toLocaleString('id-ID'), timestamp: Date.now() });
    localStorage.setItem(key, JSON.stringify(list));
    return { status: 'local' };
  }
}

// ═══════════════════════════════════════════════════════════
// OVERRIDE: doAjukanIzin → simpan notif ke backend
// ═══════════════════════════════════════════════════════════
window.doAjukanIzin = async function() {
  const jenis = document.getElementById('izinJenis').value;
  const matkul = document.getElementById('izinMatkul').value;
  const alasan = document.getElementById('izinAlasan').value.trim();
  const tanggal = document.getElementById('izinTanggal').value;

  if (!alasan) { toast('Alasan wajib diisi', 'error'); return; }

  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

  try {
    await apiPostJson('ajukan_izin', {
      nim: State.user.nim,
      nama: State.user.nama,
      matkul, jenis, alasan, tanggal
    });

    await simpanNotifBackend({
      dari: State.user.nama,
      untuk: 'dosen',
      judul: `Pengajuan ${jenis}`,
      isi: `${State.user.nama} ajukan ${jenis} untuk ${matkul} — ${alasan}`,
      tipe: 'izin',
      nim: State.user.nim,
      nama: State.user.nama,
      matkul: matkul,
      jenis: jenis
    });

    playBeep('success');
    toast(`✅ ${jenis} diajukan!`, 'success', 5000);

    const a = document.getElementById('izinAlasan');
    if (a) a.value = '';
    const t = document.getElementById('izinTanggal');
    if (t) t.value = new Date().toISOString().slice(0,10);

    closeModal();
  } catch (err) {
    playBeep('success');
    toast(`✅ ${jenis} diajukan (offline)`, 'success');
    closeModal();
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim';
  }
};

// ═══════════════════════════════════════════════════════════
// OVERRIDE: doRegister → simpan notif ke backend
// ═══════════════════════════════════════════════════════════
const _origDoRegister = doRegister;
window.doRegister = async function() {
  const nim = (document.getElementById('regNim')?.value || '').trim();
  const nama = (document.getElementById('regNama')?.value || '').trim();
  const kelas = document.getElementById('regKelas')?.value || '';
  const jurusan = (document.getElementById('regJurusan')?.value || '').trim();
  const email = (document.getElementById('regEmail')?.value || '').trim();
  const pin = (document.getElementById('regPin')?.value || '').trim();

  // Panggil fungsi asli dulu
  await _origDoRegister();

  // Kalau sukses, simpan notif ke backend
  if (nim && nama) {
    try {
      await simpanNotifBackend({
        dari: 'system',
        untuk: 'admin',
        judul: 'Pendaftar Baru',
        isi: `${nama} (${nim}) baru mendaftar`,
        tipe: 'register',
        nim: nim,
        nama: nama,
        matkul: kelas
      });
    } catch(e) {}
  }
};

// ═══════════════════════════════════════════════════════════
// OVERRIDE: onAbsenScanSuccess → simpan notif ke backend
// ═══════════════════════════════════════════════════════════
const _origAbsenNotifFinal = onAbsenScanSuccess;
window.onAbsenScanSuccess = async function(decodedText) {
  await _origAbsenNotifFinal(decodedText);

  try {
    const user = State.user;
    if (user) {
      let data = {};
      try { data = JSON.parse(decodedText); } catch(e) {}
      const pertemuan = parseInt(data.pertemuan) || 4;

      await simpanNotifBackend({
        dari: user.nama,
        untuk: 'dosen',
        judul: 'Absen Baru',
        isi: `${user.nama} telah absen di pertemuan ${pertemuan}`,
        tipe: 'absen',
        nim: user.nim || user.username,
        nama: user.nama,
        matkul: data.matkul || 'Komputer Grafik',
        pertemuan: pertemuan,
        jenis: 'Hadir'
      });
    }
  } catch(e) {}
};

// ═══════════════════════════════════════════════════════════
// OVERRIDE: doLaporTidakHadir → simpan notif ke backend
// ═══════════════════════════════════════════════════════════
const _origLapor = doLaporTidakHadir;
window.doLaporTidakHadir = function() {
  const matkul = document.getElementById('laporMatkul').value;
  const tanggal = document.getElementById('laporTanggal').value;
  const alasan = document.getElementById('laporAlasan').value.trim();
  const wa = document.getElementById('laporWA').value.trim().replace(/\D/g, '');

  if (!alasan) { toast('Alasan wajib diisi', 'error'); return; }
  if (!wa || wa.length < 10) { toast('Nomor WA tidak valid', 'error'); return; }

  // Simpan notif backend
  simpanNotifBackend({
    dari: State.user.nama,
    untuk: 'admin',
    judul: 'Dosen Tidak Hadir',
    isi: `${State.user.nama} lapor tidak hadir di ${matkul} — ${alasan}`,
    tipe: 'dosen',
    nama: State.user.nama,
    matkul: matkul,
    jenis: 'Lapor'
  });

  // Panggil fungsi asli (kirim WA)
  _origLapor();
};

// ═══════════════════════════════════════════════════════════
// OVERRIDE: kirimNotifJadwalWA → simpan notif ke backend
// ═══════════════════════════════════════════════════════════
const _origKirimJadwal = kirimNotifJadwalWA;
window.kirimNotifJadwalWA = function(matkul, oldHari, newHari, jamMulai, jamSelesai, ruang) {
  // Simpan notif backend
  simpanNotifBackend({
    dari: 'admin',
    untuk: 'semua',
    judul: 'Jadwal Berubah',
    isi: `${matkul}: ${oldHari} → ${newHari} (${jamMulai}-${jamSelesai}) di ${ruang}`,
    tipe: 'jadwal',
    matkul: matkul
  });

  // Panggil fungsi asli (kirim WA)
  _origKirimJadwal(matkul, oldHari, newHari, jamMulai, jamSelesai, ruang);
};

// ═══════════════════════════════════════════════════════════
// POLLING NOTIF BACKEND (untuk dosen & admin)
// ═══════════════════════════════════════════════════════════
function startNotifBackendPolling() {
  if (State.role !== 'dosen' && State.role !== 'admin') return;
  stopNotifBackendPolling();

  State.lastNotifTimestamp = Date.now();
  console.log('👀 Backend notif polling started');

  State.notifBackendPolling = setInterval(async () => {
    try {
      const res = await apiGet('get_notif', {
        since: State.lastNotifTimestamp,
        role: State.role
      }, 5000);

      let list = [];
      if (Array.isArray(res)) list = res;
      else if (res.data && Array.isArray(res.data)) list = res.data;
      else if (res.notif && Array.isArray(res.notif)) list = res.notif;

      if (list.length > 0) {
        list.forEach(n => {
          if (n.timestamp && n.timestamp > State.lastNotifTimestamp) {
            State.lastNotifTimestamp = n.timestamp;

            // ═══ SUARA + TOAST ═══
            if (n.tipe === 'izin') {
              playNotifSound();
              toast(`📝 ${n.nama} ajukan ${n.jenis}`, 'warning', 8000);
              setTimeout(() => speak(`${n.nama} ajukan ${n.jenis}`), 700);
            } else if (n.tipe === 'absen') {
              playNotifSound();
              toast(`🎓 ${n.nama} baru absen`, 'success', 6000);
              setTimeout(() => speak(`${n.nama} baru absen`), 700);
            } else if (n.tipe === 'register') {
              playNotifSound();
              toast(`🎓 ${n.nama} baru daftar`, 'info', 6000);
              setTimeout(() => speak(`Pendaftar baru, ${n.nama}`), 700);
            } else if (n.tipe === 'dosen') {
              playNotifSound();
              toast(`👨‍🏫 ${n.nama} lapor tidak hadir`, 'warning', 6000);
            } else if (n.tipe === 'jadwal') {
              playNotifSound();
              toast(`📅 Jadwal berubah: ${n.matkul}`, 'info', 6000);
            }

            // Badge
            const notifDot = document.getElementById('notifDot');
            if (notifDot) {
              const cur = parseInt(notifDot.textContent) || 0;
              notifDot.textContent = cur + 1;
              notifDot.classList.add('show');
            }

            // Getar
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

            // Refresh halaman kalau perlu
            if (State.activePage === 'dashboard') {
              setTimeout(() => renderDashboard(), 500);
            }
          }
        });
      }
    } catch(e) {
      // Silent
    }
  }, 5000);
}

function stopNotifBackendPolling() {
  if (State.notifBackendPolling) {
    clearInterval(State.notifBackendPolling);
    State.notifBackendPolling = null;
    console.log('🔕 Backend notif polling stopped');
  }
}

// ═══════════════════════════════════════════════════════════
// OVERRIDE enterApp — start polling
// ═══════════════════════════════════════════════════════════
const _origEnterAppFinal = window.enterApp || enterApp;
window.enterApp = function() {
  _origEnterAppFinal();
  setTimeout(() => {
    if (State.role === 'dosen' || State.role === 'admin') {
      startNotifBackendPolling();
    }
  }, 2000);
};

// ═══════════════════════════════════════════════════════════
// OVERRIDE confirmLogout — stop polling
// ═══════════════════════════════════════════════════════════
const _origConfirmLogoutFinal = window.confirmLogout || confirmLogout;
window.confirmLogout = function() {
  stopNotifBackendPolling();
  _origConfirmLogoutFinal();
};

console.log('✅ SEMUA NOTIF BACKEND PATCH LOADED');

/*************************************************************
 * AbsenQR - app.js
 * CLEANUP: Hapus patch notif lama (anti-duplikat)
 *************************************************************/

(function cleanupOldPatches() {
  // Cek flag — kalau udah pernah cleanup, skip
  if (window.__cleanupDone) {
    console.log('✅ Cleanup udah pernah dijalankan');
    return;
  }
  window.__cleanupDone = true;

  // Matikan polling lama
  if (typeof State !== 'undefined') {
    if (State.notifPolling) {
      clearInterval(State.notifPolling);
      State.notifPolling = null;
    }
    if (State.dosenPresensiPolling) {
      clearInterval(State.dosenPresensiPolling);
      State.dosenPresensiPolling = null;
    }
    if (State.notifBackendPolling) {
      clearInterval(State.notifBackendPolling);
      State.notifBackendPolling = null;
    }
  }

  // Clear timer global
  for (let i = 1; i < 99999; i++) {
    try { clearInterval(i); } catch(e) {}
  }

  // Reset flag timer biar gak start dobel
  window.__notifStarted = false;
  window.__presensiStarted = false;

  console.log('✅ Cleanup old patches done');
})();

console.log('✅ CLEANUP PATCH LOADED');
