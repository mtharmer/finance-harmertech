import SidebarButton from "./SidebarButton";

export default function CalculatorSidebar({onSelectTab}) {
  return (
    <aside className="w-52 fixed top-16 left-0 h-full bg-gray-800 text-white p-4">
      <ul className="space-y-2">
        <li>
          <SidebarButton onSelectTab={onSelectTab} label="Mortgage Calculator" tabValue="mortgage" />
        </li>
        <li>
          <SidebarButton onSelectTab={onSelectTab} label="Loan Calculator" tabValue="loan" />
        </li>
      </ul>
    </aside>
  );
}
