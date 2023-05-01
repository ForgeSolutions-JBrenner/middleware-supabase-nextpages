export default function Alert({ className, children }) {
  return (
    <div className={`alert ${className} shadow-lg rounded-none`}>
      <div>
        <span>{children}</span>
      </div>
    </div>
  );
}
