"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";

import { cn } from "@/shared/utils/cn";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tabs bileşenleri Tabs root içinde kullanılmalıdır.");
  }

  return context;
}

export type TabsProps = {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
};

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const selectedValue = value ?? internalValue;

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      value: selectedValue,
      setValue: (nextValue: string) => {
        setInternalValue(nextValue);
        onValueChange?.(nextValue);
      }
    }),
    [selectedValue, onValueChange]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export type TabsListProps = {
  children: ReactNode;
  className?: string;
};

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex rounded-full border bg-white/75 p-1 shadow-soft backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  );
}

export type TabsTriggerProps = {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

export function TabsTrigger({
  value,
  children,
  className,
  disabled = false
}: TabsTriggerProps) {
  const { value: selectedValue, setValue } = useTabsContext();
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      disabled={disabled}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-black text-muted-foreground transition disabled:pointer-events-none disabled:opacity-50",
        isSelected && "bg-primary text-primary-foreground shadow-soft",
        !isSelected && "hover:bg-muted hover:text-foreground",
        className
      )}
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  );
}

export type TabsContentProps = {
  value: string;
  children: ReactNode;
  className?: string;
  forceMount?: boolean;
};

export function TabsContent({
  value,
  children,
  className,
  forceMount = false
}: TabsContentProps) {
  const { value: selectedValue } = useTabsContext();
  const isSelected = selectedValue === value;

  if (!isSelected && !forceMount) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      hidden={!isSelected}
      className={cn("mt-6 animate-fade-up", className)}
    >
      {children}
    </div>
  );
}