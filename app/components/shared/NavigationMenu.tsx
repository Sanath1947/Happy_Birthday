export default function NavigationMenu() {
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 w-full z-50"
    >
      <ul className="flex justify-center space-x-6 p-4">
        <li>
          <a
            href="#timeline"
            className="nav-link"
            aria-current="page"
          >
            Timeline
          </a>
        </li>
        <li>
          <a
            href="#gallery"
            className="nav-link"
            aria-label="View photo gallery"
          >
            Gallery
          </a>
        </li>
        {/* More navigation items */}
      </ul>
    </nav>
  )
} 