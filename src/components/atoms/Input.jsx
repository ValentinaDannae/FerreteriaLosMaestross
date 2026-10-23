export default function Input({ label, name, type = "text", value, onChange, error }) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}
    </div>
  );
}