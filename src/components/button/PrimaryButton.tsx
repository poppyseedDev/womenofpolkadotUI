const PrimaryButton = (onClick: () => void, text: string) => (
  <li>
    <button className="p-4 m-3 bg-fuchsia-200 hover:bg-fuchsia-300 border border-cyan-500 rounded-2xl" onClick={onClick}>{text}</button>
  </li>
);

export default PrimaryButton
