import colors from "@/utils/colors";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
  label: string;
  to: string;
  onClick?: () => void;
};

export default function PrimaryButton({ label, to, onClick }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(to);
    }
  };

  return (
    <Button rounded="md" bg={colors.blue} onClick={handleClick}>
      {label}
    </Button>
  );
}
