const Page = ({ children }) => {
  return (
    <div className="pt-header-height h-dvh w-dvh overflow-y-auto">
      {children}
    </div>
  );
};

export default Page;
