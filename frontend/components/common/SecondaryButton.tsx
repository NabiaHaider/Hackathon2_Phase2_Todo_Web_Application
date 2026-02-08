import { Button, ButtonProps } from "@/components/ui/button";

export const SecondaryButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant="secondary" {...props}>
      {children}
    </Button>
  );
};
