import { useState } from "react";

export default function DecisionTicket({
  decision,
  onSelectOption,
  onAddOption,
  onDelete,
  onClearSelection,
}) {
  const [newOption, setNewOption] = useState("");

  const selected = decision.options.find(
    (option) => option.id === decision.selectedOptionId
  );

  function handleAddOption(event) {
    event.preventDefault();
    if (!newOption.trim()) return;
    onAddOption(decision.id, newOption);
    setNewOption("");
  }

  return (
    <div className="ticket">
      <div className="ticket-header">
        <h2 className="ticket-topic">{decision.topic}</h2>
        <button
          type="button"
          className="ticket-delete"
          onClick={() => onDelete(decision.id)}
        >
          Sil
        </button>
      </div>

      <ul className="option-list">
        {decision.options.map((option) => {
          const isSelected = option.id === decision.selectedOptionId;
          return (
            <li key={option.id}>
              <button
                type="button"
                className={`option-row${isSelected ? " selected" : ""}`}
                onClick={() => onSelectOption(decision.id, option.id)}
                aria-pressed={isSelected}
              >
                <span className="option-marker" />
                <span className="option-label">{option.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <form className="add-option-row" onSubmit={handleAddOption}>
        <input
          className="add-option-input"
          placeholder="Yeni seçim əlavə et"
          value={newOption}
          onChange={(event) => setNewOption(event.target.value)}
        />
        <button type="submit" className="add-option-submit">
          Əlavə et
        </button>
      </form>

      <div className="result-panel">
        <p className="result-text">
          {selected ? (
            <>
              Nəticə: <strong>{selected.label}</strong>
            </>
          ) : (
            "Nəticəni görmək üçün bir seçim et."
          )}
        </p>
        {selected && (
          <button
            type="button"
            className="result-clear"
            onClick={() => onClearSelection(decision.id)}
          >
            Seçimi sıfırla
          </button>
        )}
      </div>
    </div>
  );
}
