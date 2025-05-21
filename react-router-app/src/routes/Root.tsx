import { Button } from "@/components/ui/button";

export const Root = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button onClick={() => alert("Hello")}>Click me</Button>
    </div>
  );
};
