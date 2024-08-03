import { useFormContext } from "react-hook-form";

import { FieldWrapper, Input } from "@/components/common";
import { TeamAddInput } from "@/types/team-management";

/**
 * 요구사항에 "팀 이름이 중복이 되면 다음 에러 메세지를 보여줍니다." 라고 써있는데
 * 같은 이름인데도 API 오류가 발생하지 않아서
 * jotai persistence 사용해서 로컬스토리지에 팀 정보 리스트를 저장해야 될 거 같음
 */
const NameInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TeamAddInput>();

  return (
    <FieldWrapper
      label="팀 이름"
      id="name"
      errorMessage={errors.name?.message || ""}
    >
      <Input
        {...register("name")}
        id="name"
        placeholder="팀 이름을 입력해주세요"
        isError={!!errors.name}
      />
    </FieldWrapper>
  );
};

export default NameInput;
