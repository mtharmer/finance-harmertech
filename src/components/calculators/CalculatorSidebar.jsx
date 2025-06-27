import SidebarButton from "./SidebarButton";

export default function CalculatorSidebar({onSelectTab}) {
  return (
    <aside className="w-52 fixed top-16 left-0 h-full text-slate-800 p-4 shadow-lg shadow-slate-400" data-testid='calculator-sidebar'>
      <ul className="space-y-2">
        <li>
          <SidebarButton onSelectTab={onSelectTab} label="Mortgage Calculator" tabValue="mortgage" data-testid='sidebar-mortgage-link' />
        </li>
        <li>
          <SidebarButton onSelectTab={onSelectTab} label="Loan Calculator" tabValue="loan" data-testid='sidebar-loan-link' />
        </li>
      </ul>
    </aside>
  );
}
