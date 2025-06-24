import signOut from "../utility/signOut";
import doesSessionExist from "../utility/hasSession";

export default function Navbar() {
  const navItems = [
    { title: 'Home', ref: '/' },
    { title: 'Calculators', ref: '/calculators' },
  ];

  if (doesSessionExist()) {
    navItems.push(
      { title: 'Debts', ref: '/debts' },
      { title: 'Monthly Expenses', ref: '/monthlyexpenses'}
    )
  }

  const authItems = [
    { title: 'Change Password', ref: '/changepassword'}
  ]

  const nonAuthItems = [
    { title: 'Signup', ref: '/signup' },
    { title: 'Login', ref: '/login' },
  ];

  return (
    <nav className="bg-slate-800 sticky top-0 z-50">
      <div className="mx-auto h-16 flex justify-between items-center pl-4">
        <ul className="flex space-x-4">
          {navItems.map((item, index) => (
            <li key={item.title}>
              <a href={item.ref} className="text-white hover:text-slate-300">
                {item.title}
              </a>
              {index < navItems.length - 1 && <span className="text-slate-400 pl-4">|</span>}
            </li>
          ))}
        </ul>
        <ul className="flex space-x-4 pr-4">
          {(doesSessionExist()) ? (
            <>
              {authItems.map((item, index) => (
                <li key={item.title}>
                  <a href={item.ref} className="text-white hover:text-slate-300">
                    {item.title}
                  </a>
                  {index < authItems.length - 1 && <span className="text-slate-400 pl-4">|</span>}
                </li>
              ))}
              <li>
                <span className="text-slate-400 pr-4">|</span>
                <button href="/logout" className="text-white hover:text-slate-300 cursor-pointer" onClick={signOut}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {nonAuthItems.map((item, index) => (
                <li key={item.title}>
                  <a href={item.ref} className="text-white hover:text-slate-300">
                    {item.title}
                  </a>
                  {index < nonAuthItems.length - 1 && <span className="text-slate-400 pl-4">|</span>}
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
