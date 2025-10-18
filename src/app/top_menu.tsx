import Image from 'next/image';
import Link from 'next/link';

export default function TopMenu() {
  return (
    <header className="sticky top-0 left-0 w-full h-20 bg-gray-900 text-white z-50 shadow">
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between h-full px-4 ">
        {/* Left: Logo as link */}
        <Link href="/" className="flex items-center">
          <Image src="placeholders/64x64.svg" alt="Logo" width={48} height={48} />
        </Link>

        {/* Right: Menu buttons */}
        <div className="flex space-x-4">
          <Link
            href="/schedule"
            className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700 cursor-pointer transition-transform duration-100 ease-in-out hover:scale-95"
          >
            Programmation
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            className="px-4 rounded-full border-none bg-blue-600 cursor-pointer transition-transform duration-100 ease-in-out hover:scale-95"
          >
            <Image
              src="images/shopping_cart.svg"
              width={32}
              height={32}
              alt="Menu icon"
            />
          </button>   
          <button
            type="button"
            aria-label="Open menu"
            className="px-2 border-none bg-transparent cursor-pointer transition-transform duration-100 ease-in-out hover:scale-95"
          >
            <Image
              src="images/triple_line_white.svg"
              width={32}
              height={32}
              alt="Menu icon"
            />
          </button>
        </div>
      </nav>
    </header>
  );
}
