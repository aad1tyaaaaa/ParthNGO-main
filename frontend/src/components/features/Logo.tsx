const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <img src="/logo.png" alt="Parth Logo" className="h-10 w-auto" />
      <div className="flex flex-col leading-none">
        <span className="text-lg font-black tracking-tight text-foreground">PARTH</span>
      </div>
    </div>
  );
};

export default Logo;
