export default function Layout({ children }: { children: React.ReactNode }) {
  // With secondary navigation: https://tailwindui.com/components/application-ui/navigation/sidebar-navigation
  return (
    <div className="flex min-h-[640px] bg-gray-100">
      <div className="flex w-64 flex-col border-r border-gray-200 bg-white pt-5">
        
      </div>
      <div>{children}</div>;
    </div>
  );
}
