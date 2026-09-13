export default function EmptyState({ onStartCreate }) {
  return (
    <div className="empty-state">
      <h1 className="empty-state-title">Hələ heç bir decision yoxdur</h1>
      <p className="empty-state-body">
        Qərar verə bilmədiyin bir mövzu yaz, seçimlərini əlavə et və birini
        seç. Nəticə burada, sadə şəkildə görünəcək.
      </p>
      <button type="button" className="new-decision-button" onClick={onStartCreate}>
        + İlk decision-u yarat
      </button>
    </div>
  );
}
