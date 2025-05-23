import colors from "@/utils/colors";
import { Button } from "@chakra-ui/react";

interface Props {
  label: string;
  onClick: () => void;
}

export default function PrimaryButton({ label, onClick }: Props) {
  const handleClick = () => {
    onClick();
  };

  return (
    <Button size="lg" rounded="md" bg={colors.blue} onClick={handleClick}>
      {label}
    </Button>
  );
}
