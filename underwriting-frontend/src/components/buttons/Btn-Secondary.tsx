// src/components/SecondaryButton.tsx
import colors from "@/utils/colors";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
  label: string;
  to: string;
};

export default function SecondaryButton({ label, to }: Props) {
  const navigate = useNavigate();

  return (
    <Button
      size="md"
      rounded="md"
      variant="outline"
      borderColor={colors.blue}
      color={colors.blue}
      onClick={() => navigate(to)}
    >
      {label}
    </Button>
  );
}
