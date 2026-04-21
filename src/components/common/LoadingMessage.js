
export default function LoadingMessage({ text = "Betöltés..." }) {
  return (
    <div className="container mt-4">
      <p>{text}</p>
    </div>
  );
}
