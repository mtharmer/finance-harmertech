export default function SidebarButton({ onSelectTab, label, tabValue, ...props }) {
  return (
    <button className="hover:text-stone-400 cursor-pointer" onClick={() => onSelectTab(tabValue)} {...props}>
      {label}
    </button>
  );
}
