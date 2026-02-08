import { Button, ButtonProps } from "@/components/ui/button";

export const PrimaryButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button {...props}>
      {children}
    </Button>
  );
};
