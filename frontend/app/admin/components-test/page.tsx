import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ComponentsTestPage() {
  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-2xl font-bold">Components Test Page</h1>
      <div className="grid gap-2">
        <h2 className="text-lg font-semibold">Button</h2>
        <div className="flex gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
      <div className="grid gap-2">
        <h2 className="text-lg font-semibold">Card</h2>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card content</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-2">
        <h2 className="text-lg font-semibold">Input</h2>
        <Input type="text" placeholder="Text input" className="max-w-xs" />
      </div>
    </div>
  );
}
