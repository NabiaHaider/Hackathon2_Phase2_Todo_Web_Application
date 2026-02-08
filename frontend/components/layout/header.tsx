import { LogoutButton } from "./logout-button";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-transparent shadow-md backdrop-blur-sm">
      <div>
        <h1 className="text-xl font-bold text-primary ">Todo App</h1>
      </div>
      <div>
        <LogoutButton />
      </div>
    </header>
  );
};