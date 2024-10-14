import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="flex justify-center flex-col max-w-lg m-auto h-screen gap-4">
        <h1 className="text-2xl font-bold">MoneyWise</h1>
        <p className="lead">
          This is a base repository for the MoneyWise project. It includes the
          basic setup for the project.
        </p>
        <Button>
          Let's Start Work <span>🚀</span>
        </Button>
      </div>
    </>
  );
}

export default App;
