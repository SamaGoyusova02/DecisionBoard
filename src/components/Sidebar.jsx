export default function Sidebar({
  decisions,
  activeId,
  isCreating,
  onSelect,
  onStartCreate,
}) {
  return (
    <>
      <div className="brand">
        <span className="brand-mark" />
        <span className="brand-title">Decision Board</span>
      </div>

      <p className="sidebar-heading">My Decisions</p>

      <ul className="decision-list">
        {decisions.map((decision) => {
          const active = !isCreating && decision.id === activeId;
          const selected = decision.options.find(
            (option) => option.id === decision.selectedOptionId
          );

          return (
            <li
              key={decision.id}
              className={`decision-list-item${active ? " active" : ""}`}
            >
              <button
                type="button"
                className="decision-list-button"
                onClick={() => onSelect(decision.id)}
              >
                <span className="decision-list-topic">{decision.topic}</span>
                <span className="decision-list-status">
                  {selected ? `Qərar: ${selected.label}` : "Qərarsız"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <button type="button" className="new-decision-button" onClick={onStartCreate}>
        + Yeni decision
      </button>
    </>
  );
}
