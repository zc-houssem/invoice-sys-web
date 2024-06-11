import Link from 'next/link';
import logo from 'src/assets/logo.png';
import Image from 'next/image';
import { MenuItem } from './interfaces/MenuItem.interface';

interface SidebarProps {
  menuItems: MenuItem[];
}

export const Sidebar = ({ menuItems }: SidebarProps) => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold cursor-pointer">
            <Image src={logo} alt="logo" className="h-8 w-8" />
            <span className="">Invoicing System</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer">
                {item.icon}
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
