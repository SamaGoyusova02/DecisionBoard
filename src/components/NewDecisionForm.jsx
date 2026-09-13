import { useState } from "react";

export default function NewDecisionForm({ onCreate, onCancel }) {
  const [topic, setTopic] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const filledOptions = options.filter((option) => option.trim()).length;
  const canSubmit = topic.trim() && filledOptions >= 2;

  function updateOption(index, value) {
    setOptions((prev) => prev.map((option, i) => (i === index ? value : option)));
  }

  function removeOption(index) {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  }

  function addOptionField() {
    setOptions((prev) => [...prev, ""]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;
    onCreate(topic, options);
  }

  return (
    <form className="new-decision-panel" onSubmit={handleSubmit}>
      <h2 className="new-decision-title">Yeni decision</h2>

      <label className="field-label" htmlFor="topic">
        Mövzu
      </label>
      <input
        id="topic"
        className="field-input"
        placeholder="Where should I study?"
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
        autoFocus
      />

      <label className="field-label">Seçimlər (ən azı 2)</label>
      {options.map((option, index) => (
        <div className="option-field-row" key={index}>
          <input
            className="field-input"
            placeholder={`Seçim ${index + 1}`}
            value={option}
            onChange={(event) => updateOption(index, event.target.value)}
          />
          {options.length > 2 && (
            <button
              type="button"
              className="remove-option-field"
              onClick={() => removeOption(index)}
              aria-label="Seçimi sil"
            >
              ×
            </button>
          )}
        </div>
      ))}

      <button type="button" className="add-option-field-button" onClick={addOptionField}>
        + Seçim sahəsi əlavə et
      </button>

      <div className="form-actions">
        <button type="button" className="form-cancel" onClick={onCancel}>
          Ləğv et
        </button>
        <button type="submit" className="form-submit" disabled={!canSubmit}>
          Decision yarat
        </button>
      </div>
    </form>
  );
}
