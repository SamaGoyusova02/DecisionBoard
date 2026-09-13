import { useState } from "react";
import { useDecisions } from "./hooks/useDecisions";
import Sidebar from "./components/Sidebar.jsx";
import EmptyState from "./components/EmptyState.jsx";
import DecisionTicket from "./components/DecisionTicket.jsx";
import NewDecisionForm from "./components/NewDecisionForm.jsx";

export default function App() {
  const {
    decisions,
    activeId,
    setActiveId,
    createDecision,
    deleteDecision,
    addOption,
    selectOption,
    clearSelection,
  } = useDecisions();

  const [isCreating, setIsCreating] = useState(decisions.length === 0);

  const activeDecision = decisions.find((d) => d.id === activeId) ?? null;

  function handleSelect(id) {
    setActiveId(id);
    setIsCreating(false);
  }

  function handleStartCreate() {
    setIsCreating(true);
  }

  function handleCreate(topic, options) {
    const id = createDecision(topic, options);
    if (id) setIsCreating(false);
  }

  function handleDelete(id) {
    deleteDecision(id);
    setIsCreating(false);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Sidebar
          decisions={decisions}
          activeId={activeId}
          isCreating={isCreating}
          onSelect={handleSelect}
          onStartCreate={handleStartCreate}
        />
      </aside>

      <div className="app-main-column">
        <main className="main">
          <div className="board">
            {isCreating && (
              <NewDecisionForm
                onCreate={handleCreate}
                onCancel={() => setIsCreating(decisions.length === 0)}
              />
            )}

            {!isCreating && activeDecision && (
              <DecisionTicket
                decision={activeDecision}
                onSelectOption={selectOption}
                onAddOption={addOption}
                onDelete={handleDelete}
                onClearSelection={clearSelection}
              />
            )}

            {!isCreating && !activeDecision && (
              <EmptyState onStartCreate={handleStartCreate} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
