import colors from "@/utils/colors";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
  label: string;
  to: string;
};

export default function PrimaryButton({ label, to }: Props) {
  const navigate = useNavigate();

  return (
    <Button rounded="md" bg={colors.blue} onClick={() => navigate(to)}>
      {label}
    </Button>
  );
}
