"use client";

import { useCallback, useState } from "react";

export type ConfirmState = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  variant: "danger" | "primary";
};

export type OpenConfirmOptions = Partial<Omit<ConfirmState, "isOpen">> & {
  onConfirm?: () => void | Promise<void>;
};

const defaultConfirmState: ConfirmState = {
  isOpen: false,
  title: "Emin misin?",
  description: "Bu işlem geri alınamayabilir.",
  confirmText: "Onayla",
  cancelText: "Vazgeç",
  variant: "danger"
};

export function useConfirm() {
  const [confirmState, setConfirmState] =
    useState<ConfirmState>(defaultConfirmState);

  const [isLoading, setIsLoading] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState<
    (() => void | Promise<void>) | null
  >(null);

  const openConfirm = useCallback((options: OpenConfirmOptions = {}) => {
    const { onConfirm, ...stateOptions } = options;

    setConfirmState({
      ...defaultConfirmState,
      ...stateOptions,
      isOpen: true
    });

    setConfirmCallback(() => onConfirm ?? null);
  }, []);

  const closeConfirm = useCallback(() => {
    if (isLoading) {
      return;
    }

    setConfirmState((currentState) => ({
      ...currentState,
      isOpen: false
    }));

    setConfirmCallback(null);
  }, [isLoading]);

  const handleConfirm = useCallback(async () => {
    if (!confirmCallback) {
      closeConfirm();
      return;
    }

    try {
      setIsLoading(true);
      await confirmCallback();
      setConfirmState((currentState) => ({
        ...currentState,
        isOpen: false
      }));
      setConfirmCallback(null);
    } finally {
      setIsLoading(false);
    }
  }, [confirmCallback, closeConfirm]);

  return {
    confirmState,
    isLoading,
    openConfirm,
    closeConfirm,
    handleConfirm
  };
}