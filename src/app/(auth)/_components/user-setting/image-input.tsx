/* eslint-disable jsx-a11y/label-has-associated-control */

"use client";

import Image from "next/image";
import { ChangeEvent, memo, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { FieldWrapper } from "@/components/common";
import { IconEdit, IconProfileDesktop } from "@/public/assets/icons";
import { UserSettingInput } from "@/types/auth";

const ImageInput = memo(() => {
  const { setValue, resetField, watch } = useFormContext<UserSettingInput>();

  const [imgUrl, setImgUrl] = useState<string | null>(watch("image") || null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        e.target.value = "";
        setErrorMessage("이미지는 10MB 이하여야 합니다");
        resetField("image");
        setImgUrl(null);
        return;
      }

      // TODO: image URL 만들기 post 요청
      setErrorMessage("");
      setImgUrl(URL.createObjectURL(file));
      setValue("image", URL.createObjectURL(file));
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
    <>
      <p className="text-18-700 text-text-primary md:text-20-700">계정 설정</p>
      <FieldWrapper label="" id="image" errorMessage={errorMessage}>
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
                alt="유저 프로필 사진"
                fill
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
              <label htmlFor="image">
                <IconEdit className="absolute -bottom-px -right-px cursor-pointer" />
              </label>
            </div>
          ) : (
            <label htmlFor="image" className="cursor-pointer">
              <IconProfileDesktop />
            </label>
          )}
        </div>
      </FieldWrapper>
    </>
  );
});

ImageInput.displayName = "ImageInput";

export default ImageInput;
