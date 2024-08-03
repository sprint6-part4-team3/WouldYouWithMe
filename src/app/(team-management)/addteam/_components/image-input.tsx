/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from "next/image";
import { ChangeEvent, memo, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { FieldWrapper } from "@/components/common";
import {
  IconEdit,
  IconImageButton,
  IconImageButtonError,
} from "@/public/assets/icons";
import { TeamAddInput } from "@/types/team-management";

const ImageInput = memo(() => {
  const { setValue, resetField } = useFormContext<TeamAddInput>();

  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 1024 * 1024) {
        setErrorMessage("이미지는 1MB 이하여야 합니다");
        resetField("image");
        setImgUrl(null);
        return;
      }

      setErrorMessage("");
      setValue("image", file);
      setImgUrl(URL.createObjectURL(file));
    }
  };

  useEffect(
    () => () => {
      if (imgUrl) {
        URL.revokeObjectURL(imgUrl);
      }
    },
    [imgUrl],
  );

  return (
    <FieldWrapper label="팀 프로필" id="image" errorMessage={errorMessage}>
      <input
        id="image"
        name="image"
        className="hidden"
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleImage}
      />
      <div className="w-70">
        {imgUrl ? (
          <div className="relative size-64">
            <Image
              src={imgUrl}
              alt="팀 프로필 사진"
              fill
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
            <label htmlFor="image">
              <IconEdit className="absolute -bottom-px -right-px cursor-pointer" />
            </label>
          </div>
        ) : (
          <label htmlFor="image" className="cursor-pointer">
            {errorMessage ? <IconImageButtonError /> : <IconImageButton />}
          </label>
        )}
      </div>
    </FieldWrapper>
  );
});

ImageInput.displayName = "ImageInput";

export default ImageInput;
