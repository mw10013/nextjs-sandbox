import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  // With secondary navigation: https://tailwindui.com/components/application-ui/navigation/sidebar-navigation
  return (
    <div className="flex min-h-[640px] bg-gray-100">
      <nav className="flex w-64 flex-col border-r border-gray-200 bg-white pt-5 px-2">
        {[
          { text: "fee", href: "/access/fee" },
          { text: "fi", href: "/access/fi" },
        ].map(({ text, href }) => {
          return (
            <Link
              key={href}
              href={href}
              className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-2 py-2 text-sm font-medium rounded-md"
            >
              {text}
            </Link>
          );
        })}
      </nav>
      <div>{children}</div>;
    </div>
  );
}
