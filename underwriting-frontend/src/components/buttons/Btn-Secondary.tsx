// src/components/SecondaryButton.tsx
import colors from "@/utils/colors";
import { Button } from "@chakra-ui/react";

interface Props {
  label: string;
  onClick: () => void;
}

export default function SecondaryButton({ label, onClick }: Props) {
  const handleClick = () => {
    onClick();
  };

  return (
    <Button
      size="lg"
      rounded="md"
      variant="outline"
      borderColor={colors.blue}
      color={colors.blue}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
}
