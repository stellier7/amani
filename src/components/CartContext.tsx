"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "@/lib/products";

type CartItem = { product: Product; quantity: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (product: Product) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "amani-bolsa";
const MAX_QUANTITY = 99;

/** Only ids and quantities are stored, so prices always come from the catalog. */
type StoredItem = { id: string; quantity: number };

/**
 * The bag lives in localStorage so it survives reloads and shared links, and is
 * read through an external store: the first client render matches the empty
 * server render, then React re-reads once the subscription is in place.
 */
const EMPTY: StoredItem[] = [];
const listeners = new Set<() => void>();
let snapshot: StoredItem[] = EMPTY;
let loaded = false;

function parse(raw: string | null): StoredItem[] {
  if (!raw) return EMPTY;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;

    const entries = parsed.flatMap((entry): StoredItem[] => {
      const { id, quantity } = (entry ?? {}) as Partial<StoredItem>;
      if (typeof id !== "string" || !getProduct(id)) return [];
      if (typeof quantity !== "number" || !Number.isFinite(quantity)) return [];
      const clamped = Math.min(Math.round(quantity), MAX_QUANTITY);
      return clamped < 1 ? [] : [{ id, quantity: clamped }];
    });

    return entries.length ? entries : EMPTY;
  } catch {
    return EMPTY;
  }
}

function load() {
  snapshot = parse(window.localStorage.getItem(STORAGE_KEY));
  loaded = true;
}

function write(next: StoredItem[]) {
  snapshot = next.length ? next : EMPTY;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // A full or blocked storage should never break the bag itself.
  }
  for (const listener of listeners) listener();
}

function handleStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== STORAGE_KEY) return;
  load();
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  if (!loaded) load();
  listeners.add(listener);
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => EMPTY;

export function CartProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback((product: Product) => {
    const existing = snapshot.find((item) => item.id === product.id);
    write(
      existing
        ? snapshot.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
              : item,
          )
        : [...snapshot, { id: product.id, quantity: 1 }],
    );
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const next = Math.min(Math.round(quantity), MAX_QUANTITY);
    write(
      snapshot.flatMap((item) => {
        if (item.id !== productId) return [item];
        return next < 1 ? [] : [{ ...item, quantity: next }];
      }),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    write(snapshot.filter((item) => item.id !== productId));
  }, []);

  const clear = useCallback(() => write(EMPTY), []);

  const value = useMemo<CartContextValue>(() => {
    const items = stored.flatMap((item): CartItem[] => {
      const product = getProduct(item.id);
      return product ? [{ product, quantity: item.quantity }] : [];
    });

    return {
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0,
      ),
      addItem,
      setQuantity,
      removeItem,
      clear,
    };
  }, [stored, addItem, setQuantity, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
