export default function Boton({ children, onClick, type = "button", className = "" }) {
  return (
    <button type={type} onClick={onClick} className={`boton ${className}`}>
      {children}
    </button>
  );
}