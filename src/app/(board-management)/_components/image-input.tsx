"use client";

/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { FieldWrapper } from "@/components/common";
import { IconPlusBig, IconXBig } from "@/public/assets/icons";
import { BoardAddEditInput } from "@/types/article/add-edit";

const ImageInput = () => {
  const { setValue, resetField, watch } = useFormContext<BoardAddEditInput>();

  const [imgUrl, setImgUrl] = useState<string | null>(watch("image") || null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("이미지는 10MB 이하여야 합니다");
        resetField("image");
        setImgUrl(null);
        e.target.value = "";
        return;
      }

      // TODO: image URL 만들기 post 요청
      setErrorMessage("");
      setImgUrl(URL.createObjectURL(file));
      setValue("image", URL.createObjectURL(file));
    }
  };

  const handleClickCancel = () => {
    // FIXME: 사진 삭제 여부 모달이나 삭제되었다는 토스트 적용하면 좋을 듯
    resetField("image");
    setImgUrl(null);
    const imageInput = document.getElementById("image") as HTMLInputElement;
    if (imageInput) {
      imageInput.value = "";
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
    <FieldWrapper label="이미지" id="image" errorMessage={errorMessage}>
      <input
        id="image"
        name="image"
        className="hidden"
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleImage}
      />
      <div className="size-160">
        {imgUrl ? (
          <div className="relative size-160">
            <Image
              src={imgUrl}
              alt="게시물 등록한 이미지"
              fill
              className="rounded-12 object-cover opacity-50"
            />
            <IconXBig
              onClick={handleClickCancel}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer stroke-white hover:stroke-gray-200"
            />
          </div>
        ) : (
          <label htmlFor="image">
            <div className="flex size-160 cursor-pointer flex-col items-center justify-center gap-12 rounded-12 border border-border-primary bg-background-secondary hover:border-brand-primary">
              <IconPlusBig />
              <span className="text-16-400 text-gray-400">이미지 등록</span>
            </div>
          </label>
        )}
      </div>
    </FieldWrapper>
  );
};

export default ImageInput;
