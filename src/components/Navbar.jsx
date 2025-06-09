import signOut from "../utility/signOut";

export default function Navbar() {
  const navItems = [
    { title: 'Home', ref: '/' },
    { title: 'Calculators', ref: '/calculators' },
  ];

  const authItems = [
    { title: 'Profile', ref: '/profile' },
  ]

  const nonAuthItems = [
    { title: 'Signup', ref: '/signup' },
    { title: 'Login', ref: '/login' },
  ];

  const isLoggedIn = localStorage.getItem("userId")

  if (isLoggedIn) {
    navItems.push(...authItems);
  } else {
    navItems.push(...nonAuthItems);
  }

  return (
    <nav className="bg-stone-800 sticky top-0 z-50">
      <div className="mx-auto h-16 flex justify-between items-center pl-4">
        <ul className="flex space-x-4">
          {navItems.map((item, index) => (
            <li key={item.title}>
              <a href={item.ref} className="text-white hover:text-stone-300">
                {item.title}
              </a>
              {index < navItems.length - 1 && <span className="text-stone-400 pl-4">|</span>}
            </li>
          ))}
          {isLoggedIn && (
            <li>
              <span className="text-stone-400 pr-4">|</span>
              <button href="/logout" className="text-white hover:text-stone-300 cursor-pointer" onClick={signOut}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
