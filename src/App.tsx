import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Clock,
  Users,
  LayoutGrid,
  Settings,
  Database,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  UserPlus,
  Trash2,
  RefreshCw,
  Shuffle,
  Trophy,
  Plus,
  Coffee,
  AlertCircle,
  CheckCircle2,
  ArrowRightLeft,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
  UserMinus,
  Layers
} from 'lucide-react';

// ============================================================================
// KONSTANTER & FERDIGE BLIND-MALER
// ============================================================================

const BLIND_TEMPLATES = {
  turbo: {
    name: 'Turbo (12 min)',
    startStack: 10000,
    buyIn: 300,
    levels: [
      { id: 't1', isBreak: false, sb: 25, bb: 50, ante: 0, duration: 12 },
      { id: 't2', isBreak: false, sb: 50, bb: 100, ante: 0, duration: 12 },
      { id: 't3', isBreak: false, sb: 75, bb: 150, ante: 0, duration: 12 },
      { id: 't4', isBreak: false, sb: 100, bb: 200, ante: 25, duration: 12 },
      { id: 'tb1', isBreak: true, label: 'Pause / Chip-race 25', duration: 10 },
      { id: 't5', isBreak: false, sb: 150, bb: 300, ante: 50, duration: 12 },
      { id: 't6', isBreak: false, sb: 200, bb: 400, ante: 50, duration: 12 },
      { id: 't7', isBreak: false, sb: 300, bb: 600, ante: 75, duration: 12 },
      { id: 't8', isBreak: false, sb: 400, bb: 800, ante: 100, duration: 12 },
      { id: 't9', isBreak: false, sb: 600, bb: 1200, ante: 150, duration: 12 },
      { id: 't10', isBreak: false, sb: 1000, bb: 2000, ante: 250, duration: 12 },
      { id: 't11', isBreak: false, sb: 1500, bb: 3000, ante: 400, duration: 12 },
      { id: 't12', isBreak: false, sb: 2500, bb: 5000, ante: 500, duration: 12 }
    ]
  },
  standard: {
    name: 'Standard (20 min)',
    startStack: 15000,
    buyIn: 500,
    levels: [
      { id: 's1', isBreak: false, sb: 25, bb: 50, ante: 0, duration: 20 },
      { id: 's2', isBreak: false, sb: 50, bb: 100, ante: 0, duration: 20 },
      { id: 's3', isBreak: false, sb: 75, bb: 150, ante: 0, duration: 20 },
      { id: 's4', isBreak: false, sb: 100, bb: 200, ante: 25, duration: 20 },
      { id: 'sb1', isBreak: true, label: 'Pause (15 min)', duration: 15 },
      { id: 's5', isBreak: false, sb: 150, bb: 300, ante: 25, duration: 20 },
      { id: 's6', isBreak: false, sb: 200, bb: 400, ante: 50, duration: 20 },
      { id: 's7', isBreak: false, sb: 250, bb: 500, ante: 50, duration: 20 },
      { id: 's8', isBreak: false, sb: 300, bb: 600, ante: 75, duration: 20 },
      { id: 'sb2', isBreak: true, label: 'Pause / Chip-race 25', duration: 10 },
      { id: 's9', isBreak: false, sb: 400, bb: 800, ante: 100, duration: 20 },
      { id: 's10', isBreak: false, sb: 500, bb: 1000, ante: 100, duration: 20 },
      { id: 's11', isBreak: false, sb: 600, bb: 1200, ante: 200, duration: 20 },
      { id: 's12', isBreak: false, sb: 800, bb: 1600, ante: 200, duration: 20 },
      { id: 's13', isBreak: false, sb: 1000, bb: 2000, ante: 300, duration: 20 },
      { id: 's14', isBreak: false, sb: 1500, bb: 3000, ante: 400, duration: 20 },
      { id: 's15', isBreak: false, sb: 2000, bb: 4000, ante: 500, duration: 20 }
    ]
  },
  deepstack: {
    name: 'Deepstack (30 min)',
    startStack: 30000,
    buyIn: 1000,
    levels: [
      { id: 'd1', isBreak: false, sb: 50, bb: 100, ante: 0, duration: 30 },
      { id: 'd2', isBreak: false, sb: 75, bb: 150, ante: 0, duration: 30 },
      { id: 'd3', isBreak: false, sb: 100, bb: 200, ante: 25, duration: 30 },
      { id: 'd4', isBreak: false, sb: 150, bb: 300, ante: 50, duration: 30 },
      { id: 'db1', isBreak: true, label: 'Pause (15 min)', duration: 15 },
      { id: 'd5', isBreak: false, sb: 200, bb: 400, ante: 50, duration: 30 },
      { id: 'd6', isBreak: false, sb: 250, bb: 500, ante: 75, duration: 30 },
      { id: 'd7', isBreak: false, sb: 300, bb: 600, ante: 100, duration: 30 },
      { id: 'd8', isBreak: false, sb: 400, bb: 800, ante: 100, duration: 30 },
      { id: 'db2', isBreak: true, label: 'Middagspause (30 min)', duration: 30 },
      { id: 'd9', isBreak: false, sb: 500, bb: 1000, ante: 100, duration: 30 },
      { id: 'd10', isBreak: false, sb: 600, bb: 1200, ante: 200, duration: 30 },
      { id: 'd11', isBreak: false, sb: 800, bb: 1600, ante: 200, duration: 30 },
      { id: 'd12', isBreak: false, sb: 1000, bb: 2000, ante: 300, duration: 30 },
      { id: 'd13', isBreak: false, sb: 1500, bb: 3000, ante: 500, duration: 30 },
      { id: 'd14', isBreak: false, sb: 2000, bb: 4000, ante: 500, duration: 30 }
    ]
  }
};

const INITIAL_PLAYERS = [
  { id: 'p1', name: 'Magnus Carlsen', status: 'active', tableId: 't1', seat: 1, reEntries: 0, finishRank: null },
  { id: 'p2', name: 'Espen Uhlen Jørstad', status: 'active', tableId: 't1', seat: 2, reEntries: 0, finishRank: null },
  { id: 'p3', name: 'Annette Obrestad', status: 'active', tableId: 't1', seat: 3, reEntries: 0, finishRank: null },
  { id: 'p4', name: 'Johnny Lodden', status: 'active', tableId: 't1', seat: 4, reEntries: 0, finishRank: null },
  { id: 'p5', name: 'Thor Hansen', status: 'active', tableId: 't2', seat: 1, reEntries: 0, finishRank: null },
  { id: 'p6', name: 'Felix Stephensen', status: 'active', tableId: 't2', seat: 2, reEntries: 0, finishRank: null },
  { id: 'p7', name: 'Kayhan Mokri', status: 'active', tableId: 't2', seat: 3, reEntries: 0, finishRank: null },
  { id: 'p8', name: 'Ola Amundsgård', status: 'active', tableId: 't2', seat: 4, reEntries: 0, finishRank: null }
];

const INITIAL_TABLES = [
  { id: 't1', name: 'Bord 1 (TV-bord)' },
  { id: 't2', name: 'Bord 2' },
  { id: 't3', name: 'Bord 3' },
  { id: 't4', name: 'Finalebord' }
];

const DEFAULT_STATE = {
  tournamentName: 'Romjulspoker',
  startStack: 15000,
  buyIn: 500,
  currency: 'kr',
  seatsPerTable: 9,
  // Re-entry-innstillinger
  reEntryEnabled: true,
  maxReEntriesPerPlayer: 0, // 0 = ubegrenset
  reEntryMaxLevel: 6, // Siste spillende nivå hvor re-entry er tillatt (0 = ingen grense)
  reEntryCost: null, // null = følger ordinær buyIn
  reEntryStack: null, // null = følger ordinær startStack
  levels: BLIND_TEMPLATES.standard.levels,
  currentLevelIndex: 0,
  secondsRemaining: BLIND_TEMPLATES.standard.levels[0].duration * 60,
  players: INITIAL_PLAYERS,
  tables: INITIAL_TABLES,
  updatedAt: new Date().toISOString()
};

// ============================================================================
// SUPABASE & LOKAL LAGRING (DATA LAYER)
// ============================================================================

const STORAGE_KEY = 'poker_td_tournament_state_v1';
const SUPABASE_CONFIG_KEY = 'poker_td_supabase_config_v1';

/**
 * Henter Supabase-konfigurasjon fra miljøvariabler (StackBlitz/Vite) eller localStorage
 */
function getInitialSupabaseConfig() {
  let envUrl = '';
  let envKey = '';
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      envUrl = import.meta.env.VITE_SUPABASE_URL || '';
      envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    }
  } catch (e) {
    // Ignorer hvis import.meta ikke er tilgjengelig
  }

  try {
    const saved = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        url: parsed.url || envUrl,
        anonKey: parsed.anonKey || envKey,
        tournamentId: parsed.tournamentId || 'main-tournament',
        autoSync: parsed.autoSync ?? true
      };
    }
  } catch (e) {
    console.error('Feil ved lesing av Supabase-oppsett:', e);
  }

  return {
    url: envUrl,
    anonKey: envKey,
    tournamentId: 'main-tournament',
    autoSync: true
  };
}

/**
 * Lettvekts REST-klient for Supabase (krever ingen ekstra npm-avhengigheter for å fungere umiddelbart,
 * men følger nøyaktig PostgREST-spesifikasjonen til @supabase/supabase-js)
 */
const SupabaseService = {
  async saveState(config, statePayload) {
    if (!config.url || !config.anonKey) {
      return { ok: false, reason: 'Mangler URL eller Anon Key' };
    }
    const cleanUrl = config.url.replace(/\/$/, '');
    const endpoint = `${cleanUrl}/rest/v1/tournament_state?on_conflict=id`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        Prefer: 'resolution=merge-duplicates,return=representation'
      },
      body: JSON.stringify({
        id: config.tournamentId || 'main-tournament',
        data: statePayload,
        updated_at: new Date().toISOString()
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Supabase lagringsfeil (${response.status}): ${errText}`);
    }
    return { ok: true, data: await response.json() };
  },

  async loadState(config) {
    if (!config.url || !config.anonKey) {
      return { ok: false, reason: 'Mangler URL eller Anon Key' };
    }
    const cleanUrl = config.url.replace(/\/$/, '');
    const id = encodeURIComponent(config.tournamentId || 'main-tournament');
    const endpoint = `${cleanUrl}/rest/v1/tournament_state?id=eq.${id}&select=data,updated_at`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Supabase hentefeil (${response.status}): ${errText}`);
    }

    const rows = await response.json();
    if (!rows || rows.length === 0) {
      return { ok: true, empty: true };
    }
    return { ok: true, data: rows[0].data, updatedAt: rows[0].updated_at };
  }
};

// ============================================================================
// LYDEFFEKTER (WEB AUDIO API)
// ============================================================================

function playTournamentSound(type = 'levelUp') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const playTone = (freq, startTime, duration, oscType = 'sine', gainVal = 0.25) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = oscType;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(gainVal, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    };

    const now = ctx.currentTime;
    if (type === 'warning') {
      // Kort dobbeltpip ved 10 sekunder igjen
      playTone(880, now, 0.12, 'triangle', 0.15);
      playTone(880, now + 0.18, 0.12, 'triangle', 0.15);
    } else if (type === 'countdown') {
      // Nedtellingspip siste 3 sekunder
      playTone(660, now, 0.1, 'sine', 0.18);
    } else {
      // Tydelig kasino-klokke/gong ved nivåskifte
      playTone(523.25, now, 0.35, 'triangle', 0.3); // C5
      playTone(659.25, now + 0.15, 0.35, 'triangle', 0.3); // E5
      playTone(783.99, now + 0.3, 0.55, 'triangle', 0.35); // G5
      playTone(1046.5, now + 0.45, 0.85, 'sine', 0.3); // C6
    }
  } catch (e) {
    console.warn('Kunne ikke spille av lyd:', e);
  }
}

// ============================================================================
// HJELPEFUNKSJONER
// ============================================================================

function formatTime(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function formatNumber(num) {
  return new Intl.NumberFormat('nb-NO').format(Math.round(num || 0));
}

function generateId(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}`;
}

// ============================================================================
// HOVEDKOMPONENT: APP
// ============================================================================

export default function App() {
  // Last inn initialtilstand fra localStorage eller fallback
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STATE, ...parsed };
      }
    } catch (e) {
      console.error('Feil ved lasting fra localStorage:', e);
    }
    return DEFAULT_STATE;
  });

  // UI-tilstander
  const [activeTab, setActiveTab] = useState('clock'); // 'clock' | 'players' | 'seating' | 'structure' | 'supabase'
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toast, setToast] = useState(null);

  // Supabase-tilstander
  const [supaConfig, setSupaConfig] = useState(getInitialSupabaseConfig);
  const [syncStatus, setSyncStatus] = useState({ state: 'idle', message: 'Lokal lagring aktiv' });
  const syncTimeoutRef = useRef(null);

  // Midlertidig input-tilstand for spillere
  const [newPlayerName, setNewPlayerName] = useState('');
  const [bulkNames, setBulkNames] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [playerSearch, setPlayerSearch] = useState('');

  // Midlertidig tilstand for flytting av spiller mellom seter
  const [movingPlayerId, setMovingPlayerId] = useState(null);

  // Kopieringsstatus for SQL-snippet
  const [copiedSql, setCopiedSql] = useState(false);

  // Vis varselmelding (erstatter alert)
  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Lagre til localStorage ved endringer
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Kunne ikke lagre til localStorage:', e);
    }
  }, [state]);

  // Lagre Supabase-oppsett til localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify(supaConfig));
    } catch (e) {
      console.error('Kunne ikke lagre Supabase-oppsett:', e);
    }
  }, [supaConfig]);

  // Automatisk debounced synkronisering til Supabase når data endres (ikke hvert sekund på klokka)
  const stateSignature = useMemo(() => {
    return JSON.stringify({
      tournamentName: state.tournamentName,
      startStack: state.startStack,
      buyIn: state.buyIn,
      seatsPerTable: state.seatsPerTable,
      reEntryEnabled: state.reEntryEnabled,
      maxReEntriesPerPlayer: state.maxReEntriesPerPlayer,
      reEntryMaxLevel: state.reEntryMaxLevel,
      reEntryCost: state.reEntryCost,
      reEntryStack: state.reEntryStack,
      levels: state.levels,
      currentLevelIndex: state.currentLevelIndex,
      players: state.players,
      tables: state.tables
    });
  }, [
    state.tournamentName,
    state.startStack,
    state.buyIn,
    state.seatsPerTable,
    state.reEntryEnabled,
    state.maxReEntriesPerPlayer,
    state.reEntryMaxLevel,
    state.reEntryCost,
    state.reEntryStack,
    state.levels,
    state.currentLevelIndex,
    state.players,
    state.tables
  ]);

  useEffect(() => {
    if (!supaConfig.url || !supaConfig.anonKey || !supaConfig.autoSync) return;

    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    setSyncStatus({ state: 'syncing', message: 'Synkroniserer...' });

    syncTimeoutRef.current = setTimeout(async () => {
      try {
        await SupabaseService.saveState(supaConfig, state);
        setSyncStatus({
          state: 'synced',
          message: `Synkronisert ${new Date().toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`
        });
      } catch (err) {
        setSyncStatus({ state: 'error', message: err.message });
      }
    }, 1500);

    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [stateSignature, supaConfig]);

  // ==========================================================================
  // NEDTELLINGSKLOKKE & NIVÅLOGIKK
  // ==========================================================================

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setState((prev) => {
        const nextSec = prev.secondsRemaining - 1;

        // Lydvarsler
        if (soundEnabled) {
          if (nextSec === 10) {
            playTournamentSound('warning');
          } else if (nextSec > 0 && nextSec <= 3) {
            playTournamentSound('countdown');
          }
        }

        // Når tiden når 0 -> gå til neste nivå
        if (nextSec <= 0) {
          if (soundEnabled) {
            playTournamentSound('levelUp');
          }
          const nextIdx = prev.currentLevelIndex + 1;
          if (nextIdx < prev.levels.length) {
            const nextLevel = prev.levels[nextIdx];
            return {
              ...prev,
              currentLevelIndex: nextIdx,
              secondsRemaining: nextLevel.duration * 60,
              updatedAt: new Date().toISOString()
            };
          } else {
            // Siste nivå er ferdig
            setIsRunning(false);
            return {
              ...prev,
              secondsRemaining: 0,
              updatedAt: new Date().toISOString()
            };
          }
        }

        return {
          ...prev,
          secondsRemaining: nextSec
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, soundEnabled]);

  // ==========================================================================
  // BEREGNEDE VERDIER (STATS)
  // ==========================================================================

  const currentLevel = state.levels[state.currentLevelIndex] || state.levels[0];
  const nextLevel = state.levels[state.currentLevelIndex + 1] || null;

  // Beregn spillende nivånummer (ekskluder pauser fra nivåtelling)
  const currentPlayingLevelNumber = useMemo(() => {
    let count = 0;
    for (let i = 0; i <= state.currentLevelIndex; i++) {
      if (state.levels[i] && !state.levels[i].isBreak) count++;
    }
    return count;
  }, [state.levels, state.currentLevelIndex]);

  // Totalt antall spillende nivåer i strukturen
  const totalPlayingLevels = useMemo(
    () => state.levels.filter((l) => !l.isBreak).length,
    [state.levels]
  );

  // Effektiv re-entry kostnad og startstack
  const effectiveReEntryCost =
    state.reEntryCost !== null && state.reEntryCost !== ''
      ? Number(state.reEntryCost)
      : state.buyIn;
  const effectiveReEntryStack =
    state.reEntryStack !== null && state.reEntryStack !== ''
      ? Number(state.reEntryStack)
      : state.startStack;

  // Sjekk om re-entry-perioden er åpen basert på regler og gjeldende nivå
  const reEntryStatus = useMemo(() => {
    if (!state.reEntryEnabled) {
      return { isOpen: false, reason: 'Deaktivert i turneringen' };
    }
    if (state.reEntryMaxLevel > 0 && currentPlayingLevelNumber > state.reEntryMaxLevel) {
      return {
        isOpen: false,
        reason: `Stengt etter nivå ${state.reEntryMaxLevel}`
      };
    }
    return {
      isOpen: true,
      reason:
        state.reEntryMaxLevel > 0
          ? `Åpen t.o.m. nivå ${state.reEntryMaxLevel}`
          : 'Åpen hele turneringen'
    };
  }, [state.reEntryEnabled, state.reEntryMaxLevel, currentPlayingLevelNumber]);

  const activePlayers = useMemo(
    () => state.players.filter((p) => p.status === 'active'),
    [state.players]
  );

  const bustedPlayers = useMemo(
    () =>
      state.players
        .filter((p) => p.status === 'busted')
        .sort((a, b) => (a.finishRank || 999) - (b.finishRank || 999)),
    [state.players]
  );

  const totalReEntriesCount = useMemo(
    () => state.players.reduce((acc, p) => acc + (p.reEntries || 0), 0),
    [state.players]
  );

  const totalEntries = state.players.length + totalReEntriesCount;

  const totalChipsInPlay =
    state.players.length * state.startStack + totalReEntriesCount * effectiveReEntryStack;
  const averageStack = activePlayers.length > 0 ? totalChipsInPlay / activePlayers.length : 0;
  const totalPrizePool =
    state.players.length * state.buyIn + totalReEntriesCount * effectiveReEntryCost;

  // Sjekk om bordene er ubalanserte (forskjell >= 2 spillere mellom aktive bord)
  const tableBalanceInfo = useMemo(() => {
    const countsByTable = {};
    activePlayers.forEach((p) => {
      if (p.tableId) {
        countsByTable[p.tableId] = (countsByTable[p.tableId] || 0) + 1;
      }
    });
    const activeTableIds = Object.keys(countsByTable);
    if (activeTableIds.length <= 1) return { isUnbalanced: false, neededTables: 1 };

    const counts = Object.values(countsByTable);
    const maxCount = Math.max(...counts);
    const minCount = Math.min(...counts);
    const neededTables = Math.max(1, Math.ceil(activePlayers.length / state.seatsPerTable));

    return {
      isUnbalanced: maxCount - minCount >= 2 || activeTableIds.length > neededTables,
      neededTables,
      activeTablesCount: activeTableIds.length
    };
  }, [activePlayers, state.seatsPerTable]);

  // ==========================================================================
  // HANDLERE FOR KLOKKE
  // ==========================================================================

  const handleResetLevel = () => {
    setIsRunning(false);
    setState((prev) => ({
      ...prev,
      secondsRemaining: (prev.levels[prev.currentLevelIndex]?.duration || 15) * 60
    }));
    showToast('Nivåklokken ble tilbakestilt.', 'info');
  };

  const handleChangeLevel = (delta) => {
    setState((prev) => {
      const targetIdx = Math.max(0, Math.min(prev.levels.length - 1, prev.currentLevelIndex + delta));
      const targetLevel = prev.levels[targetIdx];
      return {
        ...prev,
        currentLevelIndex: targetIdx,
        secondsRemaining: targetLevel.duration * 60
      };
    });
  };

  const handleAdjustSeconds = (deltaSeconds) => {
    setState((prev) => ({
      ...prev,
      secondsRemaining: Math.max(0, prev.secondsRemaining + deltaSeconds)
    }));
  };

  // ==========================================================================
  // HANDLERE FOR SPILLERE
  // ==========================================================================

  const findNextAvailableSeat = (currentPlayers, currentTables, seatsPerTable) => {
    // Finn første ledige sete på et bord som allerede har spillere, eller første bord
    for (const table of currentTables) {
      const occupiedSeats = new Set(
        currentPlayers
          .filter((p) => p.status === 'active' && p.tableId === table.id && p.seat)
          .map((p) => p.seat)
      );
      if (occupiedSeats.size < seatsPerTable) {
        for (let s = 1; s <= seatsPerTable; s++) {
          if (!occupiedSeats.has(s)) {
            return { tableId: table.id, seat: s };
          }
        }
      }
    }
    return { tableId: null, seat: null };
  };

  const handleAddPlayer = (e) => {
    e.preventDefault();
    const trimmed = newPlayerName.trim();
    if (!trimmed) return;

    setState((prev) => {
      const seatAssignment = findNextAvailableSeat(prev.players, prev.tables, prev.seatsPerTable);
      const newPlayer = {
        id: generateId('p'),
        name: trimmed,
        status: 'active',
        tableId: seatAssignment.tableId,
        seat: seatAssignment.seat,
        reEntries: 0,
        finishRank: null
      };
      return {
        ...prev,
        players: [...prev.players, newPlayer]
      };
    });

    setNewPlayerName('');
    showToast(`${trimmed} ble lagt til i turneringen.`, 'success');
  };

  const handleBulkAddPlayers = () => {
    const lines = bulkNames
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) return;

    setState((prev) => {
      let updatedPlayers = [...prev.players];
      lines.forEach((name) => {
        const seatAssignment = findNextAvailableSeat(updatedPlayers, prev.tables, prev.seatsPerTable);
        updatedPlayers.push({
          id: generateId('p'),
          name,
          status: 'active',
          tableId: seatAssignment.tableId,
          seat: seatAssignment.seat,
          reEntries: 0,
          finishRank: null
        });
      });
      return {
        ...prev,
        players: updatedPlayers
      };
    });

    setBulkNames('');
    setShowBulkModal(false);
    showToast(`${lines.length} nye deltakere ble lagt til.`, 'success');
  };

  const handleBustPlayer = (playerId) => {
    setState((prev) => {
      const currentActiveCount = prev.players.filter((p) => p.status === 'active').length;
      const target = prev.players.find((p) => p.id === playerId);
      if (!target || target.status !== 'active') return prev;

      const updatedPlayers = prev.players.map((p) => {
        if (p.id === playerId) {
          return {
            ...p,
            status: 'busted',
            finishRank: currentActiveCount,
            tableId: null,
            seat: null
          };
        }
        return p;
      });

      showToast(`${target.name} slått ut på ${currentActiveCount}. plass.`, 'info');
      return {
        ...prev,
        players: updatedPlayers
      };
    });
  };

  /**
   * Registrerer Re-entry for både aktive spillere (direkte re-buy/re-entry ved bust)
   * og utslåtte spillere (plasseres automatisk på et ledig sete).
   */
  const handleReEntryPlayer = (playerId, forceOverride = false) => {
    setState((prev) => {
      const target = prev.players.find((p) => p.id === playerId);
      if (!target) return prev;

      const currentCount = target.reEntries || 0;
      const reachedMax =
        prev.maxReEntriesPerPlayer > 0 && currentCount >= prev.maxReEntriesPerPlayer;

      if (!forceOverride) {
        if (!prev.reEntryEnabled) {
          showToast('Re-entry er deaktivert for denne turneringen.', 'error');
          return prev;
        }
        if (!reEntryStatus.isOpen) {
          showToast(
            `Re-entry er stengt (${reEntryStatus.reason}). Bruk overstyring ved behov.`,
            'error'
          );
          return prev;
        }
        if (reachedMax) {
          showToast(
            `${target.name} har allerede nådd maks antall re-entries (${prev.maxReEntriesPerPlayer}).`,
            'error'
          );
          return prev;
        }
      }

      // Hvis spilleren er utslått eller mangler sete, finn første ledige sete
      const needsSeat = target.status === 'busted' || !target.tableId || !target.seat;
      const seatAssignment = needsSeat
        ? findNextAvailableSeat(prev.players, prev.tables, prev.seatsPerTable)
        : { tableId: target.tableId, seat: target.seat };

      const nextCount = currentCount + 1;
      const updatedPlayers = prev.players.map((p) => {
        if (p.id === playerId) {
          return {
            ...p,
            status: 'active',
            reEntries: nextCount,
            finishRank: null,
            tableId: seatAssignment.tableId,
            seat: seatAssignment.seat
          };
        }
        return p;
      });

      const assignedTable = prev.tables.find((t) => t.id === seatAssignment.tableId);
      const seatMsg =
        needsSeat && assignedTable
          ? ` — tildelt ${assignedTable.name}, sete ${seatAssignment.seat}`
          : '';

      showToast(`Re-entry #${nextCount} registrert for ${target.name}${seatMsg}!`, 'success');
      return {
        ...prev,
        players: updatedPlayers
      };
    });
  };

  /**
   * Justerer antall re-entries manuelt (f.eks. -1 dersom TD trykket feil)
   */
  const handleAdjustPlayerReEntries = (playerId, delta) => {
    setState((prev) => {
      const target = prev.players.find((p) => p.id === playerId);
      if (!target) return prev;
      const nextCount = Math.max(0, (target.reEntries || 0) + delta);
      if (nextCount === (target.reEntries || 0)) return prev;

      const updatedPlayers = prev.players.map((p) =>
        p.id === playerId ? { ...p, reEntries: nextCount } : p
      );
      showToast(`Oppdaterte re-entries for ${target.name} til ${nextCount}.`, 'info');
      return {
        ...prev,
        players: updatedPlayers
      };
    });
  };

  const handleDeletePlayer = (playerId) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.filter((p) => p.id !== playerId)
    }));
  };

  // ==========================================================================
  // HANDLERE FOR BORDTREKNING & BALANSERING
  // ==========================================================================

  const handleRandomSeatingDraw = () => {
    setState((prev) => {
      const actives = prev.players.filter((p) => p.status === 'active');
      if (actives.length === 0) {
        showToast('Ingen aktive spillere å trekke seter for.', 'error');
        return prev;
      }

      const neededTables = Math.max(1, Math.ceil(actives.length / prev.seatsPerTable));

      // Sørg for at vi har nok bord i listen
      let tablesList = [...prev.tables];
      while (tablesList.length < neededTables) {
        const nextNum = tablesList.length + 1;
        tablesList.push({
          id: generateId('t'),
          name: `Bord ${nextNum}`
        });
      }

      const activeTables = tablesList.slice(0, neededTables);

      // Fisher-Yates shuffle av aktive spillere
      const shuffledPlayers = [...actives];
      for (let i = shuffledPlayers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
      }

      // Generer tilfeldige setenummer per bord
      const tableAvailableSeats = {};
      activeTables.forEach((t) => {
        const seats = Array.from({ length: prev.seatsPerTable }, (_, idx) => idx + 1);
        for (let i = seats.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [seats[i], seats[j]] = [seats[j], seats[i]];
        }
        tableAvailableSeats[t.id] = seats;
      });

      // Fordel spillere round-robin på bordene slik at antall per bord er helt jevnt
      const assignmentMap = {};
      shuffledPlayers.forEach((player, idx) => {
        const table = activeTables[idx % neededTables];
        const seat = tableAvailableSeats[table.id].pop();
        assignmentMap[player.id] = { tableId: table.id, seat };
      });

      const updatedPlayers = prev.players.map((p) => {
        if (p.status === 'active' && assignmentMap[p.id]) {
          return {
            ...p,
            tableId: assignmentMap[p.id].tableId,
            seat: assignmentMap[p.id].seat
          };
        }
        return p;
      });

      showToast(
        `Bordtrekning fullført! ${actives.length} spillere fordelt på ${neededTables} bord.`,
        'success'
      );

      return {
        ...prev,
        tables: tablesList,
        players: updatedPlayers
      };
    });
  };

  const handleBalanceTables = () => {
    setState((prev) => {
      const actives = prev.players.filter((p) => p.status === 'active');
      if (actives.length <= 1) return prev;

      const neededTables = Math.max(1, Math.ceil(actives.length / prev.seatsPerTable));
      const targetTables = prev.tables.slice(0, neededTables);
      const targetTableIds = new Set(targetTables.map((t) => t.id));

      // Beregn ønsket antall per bord
      const baseCount = Math.floor(actives.length / neededTables);
      const remainder = actives.length % neededTables;
      const targetCounts = {};
      targetTables.forEach((t, idx) => {
        targetCounts[t.id] = baseCount + (idx < remainder ? 1 : 0);
      });

      // Finn hvilke spillere som allerede sitter på et gyldig målbord og ikke overstiger kvoten
      const currentPerTable = {};
      targetTables.forEach((t) => (currentPerTable[t.id] = []));
      const displacedPlayers = [];

      actives.forEach((p) => {
        if (p.tableId && targetTableIds.has(p.tableId) && p.seat && p.seat <= prev.seatsPerTable) {
          if (currentPerTable[p.tableId].length < targetCounts[p.tableId]) {
            currentPerTable[p.tableId].push(p);
          } else {
            displacedPlayers.push(p);
          }
        } else {
          displacedPlayers.push(p);
        }
      });

      // Plasser overflødige spillere på bord som mangler folk
      const newAssignments = {};
      displacedPlayers.forEach((player) => {
        for (const t of targetTables) {
          if (currentPerTable[t.id].length < targetCounts[t.id]) {
            const occupied = new Set(currentPerTable[t.id].map((x) => x.seat));
            let freeSeat = 1;
            while (occupied.has(freeSeat)) freeSeat++;
            const movedPlayer = { ...player, tableId: t.id, seat: freeSeat };
            currentPerTable[t.id].push(movedPlayer);
            newAssignments[player.id] = { tableId: t.id, seat: freeSeat };
            break;
          }
        }
      });

      const updatedPlayers = prev.players.map((p) =>
        newAssignments[p.id] ? { ...p, ...newAssignments[p.id] } : p
      );

      const movedCount = Object.keys(newAssignments).length;
      showToast(
        movedCount > 0
          ? `Bordene er balansert! ${movedCount} spiller(e) ble flyttet.`
          : 'Bordene er allerede balansert.',
        'success'
      );

      return {
        ...prev,
        players: updatedPlayers
      };
    });
  };

  const handleMovePlayerToSeat = (tableId, seatNumber) => {
    if (!movingPlayerId) return;
    setState((prev) => {
      // Sjekk om setet er opptatt; hvis ja, bytt plass på de to spillerne
      const movingPlayer = prev.players.find((p) => p.id === movingPlayerId);
      const occupant = prev.players.find(
        (p) => p.status === 'active' && p.tableId === tableId && p.seat === seatNumber
      );

      if (!movingPlayer) return prev;

      const updatedPlayers = prev.players.map((p) => {
        if (p.id === movingPlayer.id) {
          return { ...p, tableId, seat: seatNumber };
        }
        if (occupant && p.id === occupant.id) {
          return { ...p, tableId: movingPlayer.tableId, seat: movingPlayer.seat };
        }
        return p;
      });

      return {
        ...prev,
        players: updatedPlayers
      };
    });
    setMovingPlayerId(null);
    showToast('Spiller ble flyttet.', 'success');
  };

  const handleUpdateTableName = (tableId, newName) => {
    setState((prev) => ({
      ...prev,
      tables: prev.tables.map((t) => (t.id === tableId ? { ...t, name: newName } : t))
    }));
  };

  const handleAddTable = () => {
    setState((prev) => ({
      ...prev,
      tables: [
        ...prev.tables,
        { id: generateId('t'), name: `Bord ${prev.tables.length + 1}` }
      ]
    }));
  };

  const handleRemoveTable = (tableId) => {
    setState((prev) => {
      if (prev.tables.length <= 1) return prev;
      return {
        ...prev,
        tables: prev.tables.filter((t) => t.id !== tableId),
        players: prev.players.map((p) =>
          p.tableId === tableId ? { ...p, tableId: null, seat: null } : p
        )
      };
    });
  };

  // ==========================================================================
  // HANDLERE FOR BLINDSTRUKTUR
  // ==========================================================================

  const handleApplyTemplate = (templateKey) => {
    const tpl = BLIND_TEMPLATES[templateKey];
    if (!tpl) return;
    setIsRunning(false);
    setState((prev) => ({
      ...prev,
      startStack: tpl.startStack,
      buyIn: tpl.buyIn,
      levels: tpl.levels.map((l) => ({ ...l, id: generateId('lvl') })),
      currentLevelIndex: 0,
      secondsRemaining: tpl.levels[0].duration * 60
    }));
    showToast(`Malen "${tpl.name}" ble lastet inn.`, 'success');
  };

  const handleUpdateLevel = (levelId, field, value) => {
    setState((prev) => {
      const updatedLevels = prev.levels.map((lvl) =>
        lvl.id === levelId ? { ...lvl, [field]: value } : lvl
      );
      // Oppdater gjenværende tid hvis vi redigerer varigheten på aktivt nivå og klokka står stille
      let newSec = prev.secondsRemaining;
      if (
        !isRunning &&
        field === 'duration' &&
        prev.levels[prev.currentLevelIndex]?.id === levelId
      ) {
        newSec = (Number(value) || 1) * 60;
      }
      return {
        ...prev,
        levels: updatedLevels,
        secondsRemaining: newSec
      };
    });
  };

  const handleAddLevel = (isBreak = false) => {
    setState((prev) => {
      const lastPlaying = [...prev.levels].reverse().find((l) => !l.isBreak);
      const newLevel = isBreak
        ? {
            id: generateId('brk'),
            isBreak: true,
            label: 'Pause (15 min)',
            duration: 15
          }
        : {
            id: generateId('lvl'),
            isBreak: false,
            sb: lastPlaying ? lastPlaying.sb * 2 : 100,
            bb: lastPlaying ? lastPlaying.bb * 2 : 200,
            ante: lastPlaying ? lastPlaying.ante * 2 : 0,
            duration: lastPlaying ? lastPlaying.duration : 20
          };
      return {
        ...prev,
        levels: [...prev.levels, newLevel]
      };
    });
  };

  const handleDeleteLevel = (levelId) => {
    setState((prev) => {
      if (prev.levels.length <= 1) return prev;
      const filtered = prev.levels.filter((l) => l.id !== levelId);
      const safeIdx = Math.min(prev.currentLevelIndex, filtered.length - 1);
      return {
        ...prev,
        levels: filtered,
        currentLevelIndex: safeIdx,
        secondsRemaining: filtered[safeIdx].duration * 60
      };
    });
  };

  // ==========================================================================
  // HANDLERE FOR SUPABASE MANUELL SYNC / RESET
  // ==========================================================================

  const handleManualPushSupabase = async () => {
    try {
      setSyncStatus({ state: 'syncing', message: 'Laster opp til Supabase...' });
      await SupabaseService.saveState(supaConfig, state);
      setSyncStatus({ state: 'synced', message: 'Lastet opp til Supabase!' });
      showToast('Turneringsdata ble lagret i Supabase.', 'success');
    } catch (err) {
      setSyncStatus({ state: 'error', message: err.message });
      showToast(err.message, 'error');
    }
  };

  const handleManualPullSupabase = async () => {
    try {
      setSyncStatus({ state: 'syncing', message: 'Henter fra Supabase...' });
      const res = await SupabaseService.loadState(supaConfig);
      if (res.empty) {
        setSyncStatus({ state: 'idle', message: 'Ingen lagret rad funnet i Supabase ennå.' });
        showToast('Fant ingen data for denne turnerings-ID-en i Supabase.', 'info');
        return;
      }
      if (res.data) {
        setIsRunning(false);
        setState({ ...DEFAULT_STATE, ...res.data });
        setSyncStatus({ state: 'synced', message: 'Hentet fra Supabase!' });
        showToast('Turneringsdata ble lastet ned fra Supabase.', 'success');
      }
    } catch (err) {
      setSyncStatus({ state: 'error', message: err.message });
      showToast(err.message, 'error');
    }
  };

  const handleResetAllTournament = () => {
    setIsRunning(false);
    setState(DEFAULT_STATE);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Hele turneringen er tilbakestilt til standardoppsett.', 'info');
  };

  // ==========================================================================
  // RENDER: NAVIGASJON & HEADER
  // ==========================================================================

  const isLowTime = !currentLevel?.isBreak && state.secondsRemaining <= 60 && state.secondsRemaining > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* TOAST MELDING */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-fade-in">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md ${
              toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/50 text-rose-100'
                : toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100'
                : 'bg-slate-900/95 border-slate-700 text-slate-100'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* TOPPBAR / HEADER */}

      <header className="bg-slate-900/90 border-b border-slate-800/90 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Turneringsnavn */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-400/30">
              <span className="text-xl font-black text-slate-950">♠</span>
            </div>
            <div>
              <input
                type="text"
                value={state.tournamentName}
                onChange={(e) => setState((prev) => ({ ...prev, tournamentName: e.target.value }))}
                aria-label="Turneringsnavn"
                className="bg-transparent font-bold text-lg sm:text-xl text-white tracking-tight focus:outline-none focus:bg-slate-800/80 px-1.5 py-0.5 rounded-lg border border-transparent focus:border-emerald-500/50 transition"
              />
              <div className="flex items-center gap-2 px-1.5 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                  <Users className="w-3.5 h-3.5" />
                  {activePlayers.length}/{totalEntries} entries
                </span>
                {totalReEntriesCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-300 font-semibold">
                    +{totalReEntriesCount} RE
                  </span>
                )}
                <span>•</span>
                <span>Avg: {formatNumber(averageStack)}</span>
                {supaConfig.url && (
                  <>
                    <span>•</span>
                    <span
                      className={`inline-flex items-center gap-1 ${
                        syncStatus.state === 'error'
                          ? 'text-rose-400'
                          : syncStatus.state === 'synced'
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }`}
                    >
                      <Database className="w-3 h-3" />
                      {syncStatus.state === 'synced' ? 'Supabase OK' : 'Supabase'}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Navigasjonsfaner */}
          <nav className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
            {[
              { id: 'clock', label: 'Klokke', icon: Clock },
              { id: 'players', label: `Deltakere (${activePlayers.length})`, icon: Users },
              { id: 'seating', label: 'Bordtrekning', icon: LayoutGrid },
              { id: 'structure', label: 'Blinder & Oppsett', icon: Settings },
              { id: 'supabase', label: 'Supabase / Data', icon: Database }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Lydknapp & Mini-klokke når man er i andre faner */}
          <div className="flex items-center gap-2">
            {activeTab !== 'clock' && (
              <button
                onClick={() => setIsRunning((r) => !r)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-mono font-bold transition ${
                  isRunning
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                    : 'bg-amber-950/50 border-amber-500/40 text-amber-300'
                }`}
                title="Start / Pause klokke"
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{formatTime(state.secondsRemaining)}</span>
              </button>
            )}

            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playTournamentSound('countdown');
              }}
              className={`p-2.5 rounded-xl border transition ${
                soundEnabled
                  ? 'bg-slate-800/80 border-slate-700 text-emerald-400 hover:bg-slate-800'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
              title={soundEnabled ? 'Lydvarsel PÅ' : 'Lydvarsel AV'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* HOVEDINNHOLD */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* ================================================================== */}
        {/* FANE 1: DASHBOARD / KLOKKE-VISNING                                 */}
        {/* ================================================================== */}
        {activeTab === 'clock' && (
          <div className="space-y-6">
            {/* Varsel hvis bord er ubalanserte */}
            {tableBalanceInfo.isUnbalanced && (
              <div className="bg-amber-950/50 border border-amber-500/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-200">Bordene bør balanseres</p>
                    <p className="text-sm text-amber-300/80">
                      Det er ujevn fordeling av spillere eller for mange aktive bord ({tableBalanceInfo.activeTablesCount} aktive, anbefalt {tableBalanceInfo.neededTables}).
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleBalanceTables}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition flex items-center gap-2"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  Balanser bord nå
                </button>
              </div>
            )}

            {/* Hovedgrid for Klokke + Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* VENSTRE / HOVEDKOLONNE: STOR KLOKKE & BLINDS */}
              <div className="lg:col-span-8 bg-gradient-to-b from-slate-900 to-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                {/* Dekorativ kasino-glød */}
                <div
                  className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-colors duration-700 ${
                    currentLevel?.isBreak
                      ? 'bg-sky-500/10'
                      : isLowTime
                      ? 'bg-rose-500/15'
                      : 'bg-emerald-500/10'
                  }`}
                />

                {/* Topplinje i klokkekortet */}
                <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {currentLevel?.isBreak ? (
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 font-bold text-sm uppercase tracking-wider">
                        <Coffee className="w-4 h-4" />
                        Pause
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-sm uppercase tracking-wider">
                        Nivå {currentPlayingLevelNumber}
                      </span>
                    )}
                    <span className="text-sm text-slate-400">
                      ({state.currentLevelIndex + 1} av {state.levels.length})
                    </span>

                    {/* Statusbadge for Re-entry */}
                    {state.reEntryEnabled && (
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                          reEntryStatus.isOpen
                            ? 'bg-amber-500/15 border-amber-500/35 text-amber-300'
                            : 'bg-slate-800/90 border-slate-700 text-slate-400'
                        }`}
                      >
                        <RefreshCw className="w-3 h-3" />
                        {reEntryStatus.isOpen
                          ? `Re-entry: ${reEntryStatus.reason}`
                          : `Re-entry: ${reEntryStatus.reason}`}
                      </span>
                    )}
                  </div>

                  {/* Hurtigjustering av sekunder */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleAdjustSeconds(-60)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
                      title="Trekk fra 1 minutt"
                    >
                      -1m
                    </button>
                    <button
                      onClick={() => handleAdjustSeconds(60)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
                      title="Legg til 1 minutt"
                    >
                      +1m
                    </button>
                  </div>
                </div>

                {/* SELVE NEDTELLINGSKLOKKEN */}
                <div className="my-6 sm:my-10 text-center relative z-10">
                  <div
                    className={`font-mono font-black tracking-tight leading-none select-none transition-colors duration-300 text-7xl sm:text-8xl md:text-9xl ${
                      currentLevel?.isBreak
                        ? 'text-sky-400'
                        : isLowTime
                        ? 'text-rose-500 animate-pulse'
                        : isRunning
                        ? 'text-white'
                        : 'text-amber-300'
                    }`}
                  >
                    {formatTime(state.secondsRemaining)}
                  </div>
                  {!isRunning && (
                    <div className="mt-3 inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
                      Klokken er pauset
                    </div>
                  )}
                </div>

                {/* NÅVÆRENDE BLINDS */}
                <div className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-5 sm:p-6 relative z-10">
                  {currentLevel?.isBreak ? (
                    <div className="text-center py-2">
                      <p className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-1">
                        Pågående pause
                      </p>
                      <p className="text-2xl sm:text-4xl font-extrabold text-white">
                        {currentLevel.label || 'Pause'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                      <div className="col-span-2 sm:col-span-2">
                        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
                          Blinds (SB / BB)
                        </p>
                        <p className="text-3xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                          {formatNumber(currentLevel?.sb)} / {formatNumber(currentLevel?.bb)}
                        </p>
                      </div>
                      <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4 flex flex-col justify-center">
                        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
                          BB Ante
                        </p>
                        <p className="text-2xl sm:text-4xl font-extrabold text-amber-400">
                          {currentLevel?.ante > 0 ? formatNumber(currentLevel.ante) : '—'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* NESTE NIVÅ PREVIEW */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="text-slate-400 font-medium flex items-center gap-1.5">
                      <ChevronRight className="w-4 h-4 text-emerald-500" />
                      Neste nivå:
                    </span>
                    {nextLevel ? (
                      nextLevel.isBreak ? (
                        <span className="font-bold text-sky-300">
                          {nextLevel.label || 'Pause'} ({nextLevel.duration} min)
                        </span>
                      ) : (
                        <span className="font-bold text-slate-200">
                          {formatNumber(nextLevel.sb)} / {formatNumber(nextLevel.bb)}
                          {nextLevel.ante > 0 ? ` (Ante ${formatNumber(nextLevel.ante)})` : ''} •{' '}
                          <span className="text-slate-400">{nextLevel.duration} min</span>
                        </span>
                      )
                    ) : (
                      <span className="text-slate-500 italic">Siste nivå i strukturen</span>
                    )}
                  </div>
                </div>

                {/* KONTROLLKNAPPER FOR KLOKKE */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 relative z-10">
                  <button
                    onClick={() => handleChangeLevel(-1)}
                    disabled={state.currentLevelIndex === 0}
                    className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 border border-slate-700 transition"
                    title="Forrige nivå"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setIsRunning((prev) => !prev)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-extrabold text-lg shadow-xl transition transform active:scale-95 ${
                      isRunning
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-950/50'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/50'
                    }`}
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-6 h-6 fill-current" />
                        <span>Pause klokke</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-6 h-6 fill-current" />
                        <span>Start klokke</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleChangeLevel(1)}
                    disabled={state.currentLevelIndex >= state.levels.length - 1}
                    className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 border border-slate-700 transition"
                    title="Neste nivå"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleResetLevel}
                    className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition"
                    title="Tilbakestill gjeldende nivå"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* HØYRE KOLONNE: TURNERINGSSTATISTIKK & HURTIG-UTSLÅING */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Nøkkeltall */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    Turneringsoversikt
                  </h2>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
                      <p className="text-xs text-slate-400 font-medium">Spillere / Entries</p>
                      <p className="text-2xl sm:text-3xl font-black text-white mt-1">
                        {activePlayers.length}{' '}
                        <span className="text-base font-semibold text-slate-500">
                          / {totalEntries}
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {state.players.length} unike + {totalReEntriesCount} re-entries
                      </p>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
                      <p className="text-xs text-slate-400 font-medium">Premiepott</p>
                      <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
                        {formatNumber(totalPrizePool)}{' '}
                        <span className="text-sm font-bold">{state.currency}</span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Buy-in {formatNumber(state.buyIn)}
                        {effectiveReEntryCost !== state.buyIn
                          ? ` • RE ${formatNumber(effectiveReEntryCost)}`
                          : ''}
                      </p>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 col-span-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-400 font-medium">
                            Gjennomsnittlig stack (Average)
                          </p>
                          <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                            {formatNumber(averageStack)}
                          </p>
                        </div>
                        {!currentLevel?.isBreak && currentLevel?.bb > 0 && (
                          <div className="text-right">
                            <p className="text-xs text-slate-400">I Big Blinds</p>
                            <p className="text-lg font-extrabold text-slate-200 mt-1">
                              {Math.round(averageStack / currentLevel.bb)} BB
                            </p>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Totalt chips i spill: {formatNumber(totalChipsInPlay)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hurtigliste for å slå ut spillere ("Bust player") */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex-1 flex flex-col shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-400" />
                      Aktive spillere ({activePlayers.length})
                    </h2>
                    <button
                      onClick={() => setActiveTab('players')}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                    >
                      + Legg til
                    </button>
                  </div>

                  {activePlayers.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-8 text-slate-500">
                      <p className="text-sm">Ingen aktive spillere registrert.</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {activePlayers.map((player) => {
                        const table = state.tables.find((t) => t.id === player.tableId);
                        const canReEnter =
                          reEntryStatus.isOpen &&
                          (state.maxReEntriesPerPlayer === 0 ||
                            (player.reEntries || 0) < state.maxReEntriesPerPlayer);

                        return (
                          <div
                            key={player.id}
                            className="flex items-center justify-between gap-2 bg-slate-950/70 hover:bg-slate-950 border border-slate-800/80 px-3.5 py-2.5 rounded-xl transition"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="font-semibold text-sm text-slate-100 truncate">
                                  {player.name}
                                </p>
                                {(player.reEntries || 0) > 0 && (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold shrink-0">
                                    RE x{player.reEntries}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400">
                                {table
                                  ? `${table.name} • Sete ${player.seat || '?'}`
                                  : 'Ikke tildelt sete'}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {state.reEntryEnabled && (
                                <button
                                  onClick={() => handleReEntryPlayer(player.id)}
                                  disabled={!canReEnter}
                                  className="px-2 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500 disabled:opacity-35 disabled:pointer-events-none text-amber-300 hover:text-slate-950 border border-amber-500/30 text-xs font-bold transition flex items-center gap-1"
                                  title="Registrer direkte Re-entry (+1 entry, beholder sete)"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                  RE
                                </button>
                              )}
                              <button
                                onClick={() => handleBustPlayer(player.id)}
                                className="px-2.5 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition flex items-center gap-1"
                                title="Slå ut spiller"
                              >
                                <UserMinus className="w-3.5 h-3.5" />
                                Slå ut
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* FANE 2: DELTAKERE (PLAYERS)                                        */}
        {/* ================================================================== */}
        {activeTab === 'players' && (
          <div className="space-y-6">
            {/* Toppkort for å legge inn deltakere */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Registrer deltakere</h2>
                  <p className="text-sm text-slate-400">
                    Legg inn spillere enkeltvis med Enter-tasten, eller lim inn en hel deltakerliste.
                  </p>
                </div>
                <button
                  onClick={() => setShowBulkModal((v) => !v)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-semibold text-slate-200 transition flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-emerald-400" />
                  {showBulkModal ? 'Skjul liste-import' : 'Lim inn liste med navn'}
                </button>
              </div>

              <form onSubmit={handleAddPlayer} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  placeholder="Skriv inn navn på deltaker og trykk Enter..."
                  className="flex-1 bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
                >
                  <UserPlus className="w-5 h-5" />
                  Legg til deltaker
                </button>
              </form>

              {/* Bulk-innliming */}
              {showBulkModal && (
                <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                  <label className="block text-sm font-semibold text-slate-300">
                    Lim inn ett navn per linje:
                  </label>
                  <textarea
                    rows={5}
                    value={bulkNames}
                    onChange={(e) => setBulkNames(e.target.value)}
                    placeholder={'Ola Nordmann\nKari Nordmann\nPer Hansen'}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl p-3 text-sm text-white placeholder-slate-600 focus:outline-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowBulkModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold"
                    >
                      Avbryt
                    </button>
                    <button
                      type="button"
                      onClick={handleBulkAddPlayers}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold"
                    >
                      Importer alle navn
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Søk og oversikt over påmeldte */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-bold text-white">
                    Deltakerliste ({state.players.length} unike / {totalEntries} entries)
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold">
                    {activePlayers.length} aktive
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 text-xs font-bold">
                    {bustedPlayers.length} utslått
                  </span>
                  {state.reEntryEnabled && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        reEntryStatus.isOpen
                          ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Re-entry: {reEntryStatus.reason}
                    </span>
                  )}
                </div>

                <input
                  type="text"
                  value={playerSearch}
                  onChange={(e) => setPlayerSearch(e.target.value)}
                  placeholder="Søk etter spiller..."
                  className="bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none w-full sm:w-64"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                      <th className="py-3 px-4">Spiller</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Bord & Sete</th>
                      <th className="py-3 px-4">Re-entries</th>
                      <th className="py-3 px-4 text-right">Handlinger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-sm">
                    {state.players
                      .filter((p) =>
                        p.name.toLowerCase().includes(playerSearch.trim().toLowerCase())
                      )
                      .sort((a, b) => {
                        if (a.status === b.status) {
                          if (a.status === 'busted') {
                            return (a.finishRank || 999) - (b.finishRank || 999);
                          }
                          return a.name.localeCompare(b.name, 'nb');
                        }
                        return a.status === 'active' ? -1 : 1;
                      })
                      .map((player) => {
                        const table = state.tables.find((t) => t.id === player.tableId);
                        const reCount = player.reEntries || 0;
                        const reachedMax =
                          state.maxReEntriesPerPlayer > 0 &&
                          reCount >= state.maxReEntriesPerPlayer;
                        const canStandardReEnter =
                          state.reEntryEnabled && reEntryStatus.isOpen && !reachedMax;

                        return (
                          <tr
                            key={player.id}
                            className={`hover:bg-slate-800/30 transition ${
                              player.status === 'busted' ? 'opacity-80' : ''
                            }`}
                          >
                            <td className="py-3.5 px-4 font-bold text-white">{player.name}</td>
                            <td className="py-3.5 px-4">
                              {player.status === 'active' ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  Aktiv
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold">
                                  Utslått ({player.finishRank}. plass)
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              {player.status === 'active'
                                ? table
                                  ? `${table.name} — Sete ${player.seat || '?'}`
                                  : 'Ikke trukket'
                                : '—'}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              <div className="inline-flex items-center gap-1.5">
                                {reCount > 0 ? (
                                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/35 text-amber-300 font-bold text-xs">
                                    RE x{reCount}
                                    {state.maxReEntriesPerPlayer > 0
                                      ? ` / ${state.maxReEntriesPerPlayer}`
                                      : ''}
                                  </span>
                                ) : (
                                  <span className="text-slate-500 text-xs">0</span>
                                )}
                                {reCount > 0 && (
                                  <button
                                    onClick={() => handleAdjustPlayerReEntries(player.id, -1)}
                                    className="w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center transition"
                                    title="Trekk fra 1 re-entry (angre feiltrykk)"
                                  >
                                    -1
                                  </button>
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center gap-2">
                                {player.status === 'active' ? (
                                  <>
                                    {state.reEntryEnabled && (
                                      <button
                                        onClick={() => handleReEntryPlayer(player.id)}
                                        disabled={!canStandardReEnter}
                                        className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500 disabled:opacity-35 disabled:pointer-events-none text-amber-300 hover:text-slate-950 border border-amber-500/30 text-xs font-bold transition flex items-center gap-1"
                                        title="Direkte Re-entry (+1 entry og ny startstack)"
                                      >
                                        <RefreshCw className="w-3.5 h-3.5" />
                                        Re-entry
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleBustPlayer(player.id)}
                                      className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition"
                                    >
                                      Slå ut
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleReEntryPlayer(player.id, false)}
                                      disabled={!canStandardReEnter}
                                      className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 disabled:opacity-40 disabled:pointer-events-none text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1"
                                      title={
                                        canStandardReEnter
                                          ? 'Kjøp inn igjen og tildel nytt sete'
                                          : 'Re-entry er stengt eller maks antall er nådd'
                                      }
                                    >
                                      <RefreshCw className="w-3.5 h-3.5" />
                                      Re-entry
                                    </button>
                                    {!canStandardReEnter && (
                                      <button
                                        onClick={() => handleReEntryPlayer(player.id, true)}
                                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500/30 text-slate-300 hover:text-amber-200 border border-slate-700 text-xs font-semibold transition"
                                        title="Overstyr re-entry-regler som turneringsleder"
                                      >
                                        Overstyr
                                      </button>
                                    )}
                                  </>
                                )}
                                <button
                                  onClick={() => handleDeletePlayer(player.id)}
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                                  title="Slett deltaker"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* FANE 3: BORDTREKNING & BORDOVERSIKT (SEATING)                      */}
        {/* ================================================================== */}
        {activeTab === 'seating' && (
          <div className="space-y-6">
            {/* Kontrollpanel for bordtrekning */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Maks seter per bord
                  </label>
                  <select
                    value={state.seatsPerTable}
                    onChange={(e) =>
                      setState((prev) => ({ ...prev, seatsPerTable: Number(e.target.value) }))
                    }
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                  >
                    {[6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}-max ({num} seter)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="h-10 w-px bg-slate-800 hidden sm:block" />

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Behov for bord
                  </p>
                  <p className="text-sm font-semibold text-slate-200">
                    {activePlayers.length} aktive spillere →{' '}
                    <span className="text-emerald-400 font-bold">
                      {Math.max(1, Math.ceil(activePlayers.length / state.seatsPerTable))} bord
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleAddTable}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-semibold text-slate-200 transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  Nytt bord
                </button>

                <button
                  onClick={handleBalanceTables}
                  className="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-sm font-bold transition flex items-center gap-2"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  Balanser bord
                </button>

                <button
                  onClick={handleRandomSeatingDraw}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-extrabold shadow-lg shadow-emerald-950/60 transition flex items-center gap-2"
                >
                  <Shuffle className="w-4 h-4" />
                  Trekk seter tilfeldig
                </button>
              </div>
            </div>

            {/* Banner når en spiller er valgt for manuell flytting */}
            {movingPlayerId && (
              <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <ArrowRightLeft className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <p className="text-sm font-semibold text-emerald-100">
                    Flytter{' '}
                    <span className="font-bold underline">
                      {state.players.find((p) => p.id === movingPlayerId)?.name}
                    </span>
                    . Klikk på et ledig sete (eller et opptatt sete for å bytte plass).
                  </p>
                </div>
                <button
                  onClick={() => setMovingPlayerId(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 text-xs font-bold"
                >
                  Avbryt
                </button>
              </div>
            )}

            {/* Visuell rutenett-oversikt over alle bord */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {state.tables.map((table) => {
                const tablePlayers = activePlayers.filter((p) => p.tableId === table.id);

                return (
                  <div
                    key={table.id}
                    className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col"
                  >
                    {/* Bordheader med redigerbart bordnavn */}
                    <div className="bg-gradient-to-r from-emerald-950/80 to-slate-900 border-b border-slate-800 px-5 py-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                        <input
                          type="text"
                          value={table.name}
                          onChange={(e) => handleUpdateTableName(table.id, e.target.value)}
                          className="bg-transparent font-extrabold text-base text-white focus:outline-none focus:bg-slate-800 px-2 py-0.5 rounded-lg w-full truncate"
                          aria-label="Bordnavn"
                        />
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-bold text-emerald-400">
                          {tablePlayers.length} / {state.seatsPerTable}
                        </span>
                        {state.tables.length > 1 && (
                          <button
                            onClick={() => handleRemoveTable(table.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                            title="Fjern bord"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Liste over seter (1 til seatsPerTable) */}
                    <div className="p-4 space-y-2 flex-1 bg-slate-950/40">
                      {Array.from({ length: state.seatsPerTable }, (_, idx) => idx + 1).map(
                        (seatNum) => {
                          const occupant = tablePlayers.find((p) => p.seat === seatNum);
                          const isBeingMoved = occupant && occupant.id === movingPlayerId;

                          return (
                            <div
                              key={seatNum}
                              onClick={() => {
                                if (movingPlayerId) {
                                  handleMovePlayerToSeat(table.id, seatNum);
                                }
                              }}
                              className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border transition ${
                                movingPlayerId
                                  ? 'cursor-pointer hover:border-emerald-400 hover:bg-emerald-950/30'
                                  : ''
                              } ${
                                isBeingMoved
                                  ? 'bg-emerald-950/60 border-emerald-400'
                                  : occupant
                                  ? 'bg-slate-900 border-slate-800'
                                  : 'bg-slate-950/50 border-slate-800/40 border-dashed'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <span
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                                    occupant
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                      : 'bg-slate-900 text-slate-600'
                                  }`}
                                >
                                  {seatNum}
                                </span>

                                {occupant ? (
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="font-bold text-sm text-white truncate">
                                      {occupant.name}
                                    </span>
                                    {(occupant.reEntries || 0) > 0 && (
                                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold shrink-0">
                                        RE x{occupant.reEntries}
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-xs italic text-slate-600">Ledig sete</span>
                                )}
                              </div>

                              {occupant && !movingPlayerId && (
                                <div className="flex items-center gap-1 shrink-0">
                                  {state.reEntryEnabled && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleReEntryPlayer(occupant.id);
                                      }}
                                      disabled={
                                        !reEntryStatus.isOpen ||
                                        (state.maxReEntriesPerPlayer > 0 &&
                                          (occupant.reEntries || 0) >= state.maxReEntriesPerPlayer)
                                      }
                                      className="p-1.5 rounded-lg text-amber-400/80 hover:text-amber-300 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition"
                                      title="Registrer Re-entry for spiller"
                                    >
                                      <RefreshCw className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setMovingPlayerId(occupant.id);
                                    }}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition"
                                    title="Flytt spiller til annet sete/bord"
                                  >
                                    <ArrowRightLeft className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleBustPlayer(occupant.id);
                                    }}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                                    title="Slå ut spiller"
                                  >
                                    <UserMinus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* FANE 4: BLINDSTRUKTUR & OPPSETT (STRUCTURE)                        */}
        {/* ================================================================== */}
        {activeTab === 'structure' && (
          <div className="space-y-6">
            {/* Turneringsinnstillinger & Malvelger */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-emerald-400" />
                  Grunnoppsett
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                      Startstack (Chips)
                    </label>
                    <input
                      type="number"
                      min="100"
                      step="500"
                      value={state.startStack}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          startStack: Math.max(0, Number(e.target.value))
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                      Buy-in
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={state.buyIn}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          buyIn: Math.max(0, Number(e.target.value))
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                      Valuta
                    </label>
                    <input
                      type="text"
                      value={state.currency}
                      onChange={(e) =>
                        setState((prev) => ({ ...prev, currency: e.target.value }))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Last inn ferdig blindmal
                </h2>
                <p className="text-xs text-slate-400">
                  Velg en mal for å raskt sette opp blinder, startstack og nivåtid.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.entries(BLIND_TEMPLATES).map(([key, tpl]) => (
                    <button
                      key={key}
                      onClick={() => handleApplyTemplate(key)}
                      className="p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-left transition group"
                    >
                      <p className="font-bold text-sm text-white group-hover:text-emerald-400 transition">
                        {tpl.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Stack: {formatNumber(tpl.startStack)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Re-entry-regler kort */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Re-entry-innstillinger</h2>
                    <p className="text-xs text-slate-400">
                      Styr om spillere kan kjøpe seg inn på nytt, maks antall og siste nivå for
                      re-entry.
                    </p>
                  </div>
                </div>

                {/* Bryter + Statusbadge */}
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      reEntryStatus.isOpen
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                    }`}
                  >
                    {reEntryStatus.isOpen
                      ? `ÅPEN (${reEntryStatus.reason})`
                      : `STENGT (${reEntryStatus.reason})`}
                  </span>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={state.reEntryEnabled}
                    onClick={() =>
                      setState((prev) => ({ ...prev, reEntryEnabled: !prev.reEntryEnabled }))
                    }
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                      state.reEntryEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ${
                        state.reEntryEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {state.reEntryEnabled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-800/80">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                      Maks re-entries per spiller
                    </label>
                    <select
                      value={state.maxReEntriesPerPlayer}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          maxReEntriesPerPlayer: Number(e.target.value)
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value={0}>Ubegrenset</option>
                      <option value={1}>Maks 1 re-entry</option>
                      <option value={2}>Maks 2 re-entries</option>
                      <option value={3}>Maks 3 re-entries</option>
                      <option value={5}>Maks 5 re-entries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                      Re-entry stenger etter nivå
                    </label>
                    <select
                      value={state.reEntryMaxLevel}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          reEntryMaxLevel: Number(e.target.value)
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value={0}>Ingen nivågrense</option>
                      {Array.from({ length: Math.max(totalPlayingLevels, 10) }, (_, i) => i + 1).map(
                        (lvlNum) => (
                          <option key={lvlNum} value={lvlNum}>
                            T.o.m. Nivå {lvlNum}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                      Re-entry pris ({state.currency})
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={state.reEntryCost ?? ''}
                      placeholder={`${state.buyIn} (lik buy-in)`}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          reEntryCost: e.target.value === '' ? null : Math.max(0, Number(e.target.value))
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-bold text-amber-300 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                      Re-entry startstack (Chips)
                    </label>
                    <input
                      type="number"
                      min="100"
                      step="500"
                      value={state.reEntryStack ?? ''}
                      placeholder={`${state.startStack} (lik startstack)`}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          reEntryStack:
                            e.target.value === '' ? null : Math.max(0, Number(e.target.value))
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-bold text-emerald-300 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Redigerbar blindtabell */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-lg font-bold text-white">Blindstruktur & Pauser</h3>
                  <p className="text-sm text-slate-400">
                    Klikk direkte i feltene for å endre blinder, ante eller varighet i minutter.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => handleAddLevel(true)}
                    className="px-4 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-sm font-bold transition flex items-center gap-2"
                  >
                    <Coffee className="w-4 h-4" />
                    + Legg til pause
                  </button>
                  <button
                    onClick={() => handleAddLevel(false)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    + Nytt blindnivå
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                      <th className="py-3 px-3">Nivå</th>
                      <th className="py-3 px-3">Small Blind</th>
                      <th className="py-3 px-3">Big Blind</th>
                      <th className="py-3 px-3">BB Ante</th>
                      <th className="py-3 px-3">Tid (min)</th>
                      <th className="py-3 px-3 text-right">Handlinger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-sm">
                    {(() => {
                      let playingCounter = 0;
                      return state.levels.map((lvl, idx) => {
                        if (!lvl.isBreak) playingCounter++;
                        const isCurrent = idx === state.currentLevelIndex;

                        return (
                          <tr
                            key={lvl.id}
                            className={`transition ${
                              isCurrent
                                ? 'bg-emerald-950/40'
                                : lvl.isBreak
                                ? 'bg-sky-950/20'
                                : 'hover:bg-slate-800/30'
                            }`}
                          >
                            <td className="py-3 px-3 font-bold whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                {isCurrent && (
                                  <span
                                    className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"
                                    title="Aktivt nivå"
                                  />
                                )}
                                {lvl.isBreak ? (
                                  <span className="text-sky-400 flex items-center gap-1.5">
                                    <Coffee className="w-4 h-4" />
                                    Pause
                                  </span>
                                ) : (
                                  <span className="text-slate-200">Nivå {playingCounter}</span>
                                )}
                              </div>
                            </td>

                            {lvl.isBreak ? (
                              <td colSpan={3} className="py-2.5 px-3">
                                <input
                                  type="text"
                                  value={lvl.label || ''}
                                  onChange={(e) =>
                                    handleUpdateLevel(lvl.id, 'label', e.target.value)
                                  }
                                  placeholder="Beskrivelse av pause..."
                                  className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-sky-200 font-semibold focus:outline-none"
                                />
                              </td>
                            ) : (
                              <>
                                <td className="py-2.5 px-3">
                                  <input
                                    type="number"
                                    min="1"
                                    value={lvl.sb}
                                    onChange={(e) =>
                                      handleUpdateLevel(lvl.id, 'sb', Number(e.target.value))
                                    }
                                    className="w-24 sm:w-28 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-1.5 text-white font-bold focus:outline-none"
                                  />
                                </td>
                                <td className="py-2.5 px-3">
                                  <input
                                    type="number"
                                    min="1"
                                    value={lvl.bb}
                                    onChange={(e) =>
                                      handleUpdateLevel(lvl.id, 'bb', Number(e.target.value))
                                    }
                                    className="w-24 sm:w-28 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-1.5 text-emerald-400 font-bold focus:outline-none"
                                  />
                                </td>
                                <td className="py-2.5 px-3">
                                  <input
                                    type="number"
                                    min="0"
                                    value={lvl.ante}
                                    onChange={(e) =>
                                      handleUpdateLevel(lvl.id, 'ante', Number(e.target.value))
                                    }
                                    className="w-20 sm:w-24 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-1.5 text-amber-300 font-bold focus:outline-none"
                                  />
                                </td>
                              </>
                            )}

                            <td className="py-2.5 px-3">
                              <input
                                type="number"
                                min="1"
                                max="180"
                                value={lvl.duration}
                                onChange={(e) =>
                                  handleUpdateLevel(
                                    lvl.id,
                                    'duration',
                                    Math.max(1, Number(e.target.value))
                                  )
                                }
                                className="w-20 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-1.5 text-white font-bold focus:outline-none"
                              />
                            </td>

                            <td className="py-2.5 px-3 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-2">
                                {!isCurrent && (
                                  <button
                                    onClick={() => {
                                      setState((prev) => ({
                                        ...prev,
                                        currentLevelIndex: idx,
                                        secondsRemaining: lvl.duration * 60
                                      }));
                                      showToast(`Hoppet til nivå ${idx + 1}.`, 'info');
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white text-xs font-semibold transition"
                                  >
                                    Start her
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteLevel(lvl.id)}
                                  disabled={state.levels.length <= 1}
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 disabled:opacity-30 transition"
                                  title="Slett nivå"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* FANE 5: SUPABASE & DATA-LAGRING                                    */}
        {/* ================================================================== */}
        {activeTab === 'supabase' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Venstre: Tilkoblingsinnstillinger */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" />
                  Supabase-integrasjon
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Appen lagrer alltid automatisk lokalt i nettleseren (localStorage). Legg inn din
                  Supabase URL og Anon Key under (eller bruk <code className="text-emerald-300">VITE_SUPABASE_URL</code> i StackBlitz) for sky-lagring.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    value={supaConfig.url}
                    onChange={(e) => setSupaConfig((c) => ({ ...c, url: e.target.value.trim() }))}
                    placeholder="https://ditt-prosjekt.supabase.co"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                    Supabase Anon / Public Key
                  </label>
                  <input
                    type="password"
                    value={supaConfig.anonKey}
                    onChange={(e) =>
                      setSupaConfig((c) => ({ ...c, anonKey: e.target.value.trim() }))
                    }
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                      Turnerings-ID i database
                    </label>
                    <input
                      type="text"
                      value={supaConfig.tournamentId}
                      onChange={(e) =>
                        setSupaConfig((c) => ({ ...c, tournamentId: e.target.value }))
                      }
                      placeholder="main-tournament"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={supaConfig.autoSync}
                        onChange={(e) =>
                          setSupaConfig((c) => ({ ...c, autoSync: e.target.checked }))
                        }
                        className="w-5 h-5 rounded accent-emerald-500"
                      />
                      <span className="text-sm font-semibold text-slate-200">
                        Automatisk synkronisering ved endring
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Statusboks */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm">
                  <span className="text-slate-400">Status: </span>
                  <span
                    className={`font-bold ${
                      syncStatus.state === 'error'
                        ? 'text-rose-400'
                        : syncStatus.state === 'synced'
                        ? 'text-emerald-400'
                        : 'text-slate-200'
                    }`}
                  >
                    {syncStatus.message}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleManualPullSupabase}
                    disabled={!supaConfig.url || !supaConfig.anonKey}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-sm font-bold text-slate-200 transition"
                  >
                    Hent fra Supabase
                  </button>
                  <button
                    onClick={handleManualPushSupabase}
                    disabled={!supaConfig.url || !supaConfig.anonKey}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-sm font-bold text-white transition"
                  >
                    Lagre til Supabase nå
                  </button>
                </div>
              </div>

              {/* Tilbakestill alt */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Vil du starte helt på nytt med tomme data?
                </span>
                <button
                  onClick={handleResetAllTournament}
                  className="px-3.5 py-2 rounded-xl bg-rose-950/50 hover:bg-rose-900/70 border border-rose-500/30 text-rose-300 text-xs font-bold transition"
                >
                  Tilbakestill hele turneringen
                </button>
              </div>
            </div>

            {/* Høyre: SQL-oppsett for Supabase */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">SQL-oppsett i Supabase</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Kjør denne SQL-snutten i <strong>SQL Editor</strong> i Supabase-prosjektet ditt
                  for å opprette tabellen <code className="text-emerald-300">tournament_state</code>{' '}
                  uten krav om innlogging:
                </p>

                <div className="relative">
                  <pre className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-emerald-300 overflow-x-auto font-mono leading-relaxed">
{`create table if not exists tournament_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- Tillat lesing og skriving uten innlogging
alter table tournament_state enable row level security;

create policy "Public access"
  on tournament_state
  for all
  using (true)
  with check (true);`}
                  </pre>

                  <button
                    onClick={() => {
                      const sql = `create table if not exists tournament_state (\n  id text primary key,\n  data jsonb not null,\n  updated_at timestamptz default now()\n);\n\nalter table tournament_state enable row level security;\n\ncreate policy "Public access"\n  on tournament_state\n  for all\n  using (true)\n  with check (true);`;
                      navigator.clipboard?.writeText(sql);
                      setCopiedSql(true);
                      setTimeout(() => setCopiedSql(false), 2000);
                    }}
                    className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Kopiert
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Kopier SQL
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 text-xs text-slate-400 space-y-1.5">
                <p className="font-bold text-slate-200">Tips for StackBlitz:</p>
                <p>
                  Opprett en <code className="text-amber-300">.env</code>-fil i roten av
                  StackBlitz-prosjektet med:
                </p>
                <pre className="text-slate-300 font-mono mt-1">
                  VITE_SUPABASE_URL=...{'\n'}VITE_SUPABASE_ANON_KEY=...
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}