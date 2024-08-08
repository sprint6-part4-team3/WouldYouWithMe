"use client";

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, memo, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { FieldWrapper } from "@/components/common";
import imageUpload from "@/lib/api/image/image-upload";
import {
  IconEdit,
  IconImageButton,
  IconImageButtonError,
  LoadingSpinner,
} from "@/public/assets/icons";
import { TeamAddEditInput } from "@/types/team-management";

const ImageInput = memo(() => {
  const { setValue, resetField, watch } = useFormContext<TeamAddEditInput>();

  const [imgUrl, setImgUrl] = useState<string | null>(watch("image") || null);
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (image: File) => imageUpload(image),
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMessage("이미지 파일만 업로드할 수 있습니다");
        resetField("image");
        setImgUrl(null);
        e.target.value = "";
        return;
      }

      if (file.size > 6 * 1024 * 1024) {
        setErrorMessage("이미지는 6MB 이하여야 합니다");
        resetField("image");
        setImgUrl(null);
        e.target.value = "";
        return;
      }

      mutate(file, {
        onSuccess: (res) => {
          setImgUrl(res.url);
          setValue("image", res.url);
          setErrorMessage("");
        },
        onError: (error) => {
          setErrorMessage(error.message);
          resetField("image");
          setImgUrl(null);
          e.target.value = "";
        },
      });
    }
  };

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
          <div className="relative size-66">
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
          <div>
            {isPending ? (
              <LoadingSpinner width={66} height={66} />
            ) : (
              <label htmlFor="image" className="cursor-pointer">
                {errorMessage ? <IconImageButtonError /> : <IconImageButton />}
              </label>
            )}
          </div>
        )}
      </div>
    </FieldWrapper>
  );
});

ImageInput.displayName = "ImageInput";

export default ImageInput;
