export default function SidebarButton({ onSelectTab, label, tabValue, ...props }) {
  return (
    <button className="hover:text-slate-300 cursor-pointer" onClick={() => onSelectTab(tabValue)} {...props}>
      {label}
    </button>
  );
}
