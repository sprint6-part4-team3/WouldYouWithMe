import { useFormContext } from "react-hook-form";

import { FieldWrapper, Input } from "@/components/common";
import { UserSettingInput } from "@/types/auth";

const NameInput = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<UserSettingInput>();

  return (
    <FieldWrapper
      label="이름"
      id="name"
      errorMessage={errors.name?.message || ""}
    >
      <Input
        {...register("name")}
        id="name"
        placeholder="이름을 입력해주세요"
        isError={!!errors.name}
        value={watch("name")}
      />
    </FieldWrapper>
  );
};

export default NameInput;
