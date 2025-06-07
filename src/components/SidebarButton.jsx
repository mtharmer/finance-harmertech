export default function SidebarButton({ onSelectTab, label, tabValue }) {
  return (
    <button className="hover:text-stone-400 cursor-pointer" onClick={() => onSelectTab(tabValue)}>
      {label}
    </button>
  );
}
