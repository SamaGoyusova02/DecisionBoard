import { useEffect, useState } from "react";

const STORAGE_KEY = "decision-board:v1";

function loadDecisions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function makeId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function useDecisions() {
  const [decisions, setDecisions] = useState(loadDecisions);
  const [activeId, setActiveId] = useState(
    () => loadDecisions()[0]?.id ?? null
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
  }, [decisions]);

  function createDecision(topic, optionLabels) {
    const cleanTopic = topic.trim();
    const cleanOptions = optionLabels
      .map((label) => label.trim())
      .filter(Boolean)
      .map((label) => ({ id: makeId(), label }));

    if (!cleanTopic || cleanOptions.length < 2) return null;

    const decision = {
      id: makeId(),
      topic: cleanTopic,
      options: cleanOptions,
      selectedOptionId: null,
      createdAt: Date.now(),
    };

    setDecisions((prev) => [decision, ...prev]);
    setActiveId(decision.id);
    return decision.id;
  }

  function deleteDecision(decisionId) {
    setDecisions((prev) => {
      const next = prev.filter((d) => d.id !== decisionId);
      if (activeId === decisionId) {
        setActiveId(next[0]?.id ?? null);
      }
      return next;
    });
  }

  function addOption(decisionId, label) {
    const cleanLabel = label.trim();
    if (!cleanLabel) return;

    setDecisions((prev) =>
      prev.map((d) =>
        d.id === decisionId
          ? { ...d, options: [...d.options, { id: makeId(), label: cleanLabel }] }
          : d
      )
    );
  }

  function selectOption(decisionId, optionId) {
    setDecisions((prev) =>
      prev.map((d) => {
        if (d.id !== decisionId) return d;
        if (d.selectedOptionId === optionId) return d;
        return { ...d, selectedOptionId: optionId };
      })
    );
  }

  function clearSelection(decisionId) {
    setDecisions((prev) =>
      prev.map((d) =>
        d.id === decisionId ? { ...d, selectedOptionId: null } : d
      )
    );
  }

  return {
    decisions,
    activeId,
    setActiveId,
    createDecision,
    deleteDecision,
    addOption,
    selectOption,
    clearSelection,
  };
}
