export default function Navbar() {
  const navItems = [
    { title: 'Home', ref: '/' }
  ];

  return (
    <nav className="bg-stone-800 sticky top-0 z-50">
      <div className="mx-auto h-16 justify-center flex items-center">
        <ul className="flex space-x-4">
          {navItems.map((item, index) => (
            <li key={item.title}>
              <a href={item.ref} className="text-white hover:text-stone-300">
                {item.title}
              </a>
              {index < navItems.length - 1 && <span className="text-stone-400 pl-4">|</span>}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
