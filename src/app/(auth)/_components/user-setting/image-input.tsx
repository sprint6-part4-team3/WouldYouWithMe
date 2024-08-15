/* eslint-disable jsx-a11y/label-has-associated-control */

"use client";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, memo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { FieldWrapper } from "@/components/common";
import { IMAGE_SIZE_ERROR, IMAGE_TYPE_ERROR } from "@/constants/error-message";
import MAX_IMAGE_SIZE from "@/constants/image-size";
import imageUpload from "@/lib/api/image/image-upload";
import {
  IconEdit,
  IconProfileDesktop,
  LoadingSpinner,
} from "@/public/assets/icons";
import { UserSettingInput } from "@/types/auth";

const ImageInput = memo(() => {
  const { setValue, resetField, watch } = useFormContext<UserSettingInput>();

  const [imgUrl, setImgUrl] = useState<string | null>(watch("image") || null);
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (image: File) => imageUpload(image),
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMessage(IMAGE_TYPE_ERROR);
        resetField("image");
        setImgUrl(null);
        e.target.value = "";
        return;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        setErrorMessage(IMAGE_SIZE_ERROR);
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

        {isPending ? (
          <LoadingSpinner width={66} height={66} />
        ) : (
          <div className="w-70">
            {imgUrl ? (
              <div className="relative size-66">
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
        )}
      </FieldWrapper>
    </>
  );
});

ImageInput.displayName = "ImageInput";

export default ImageInput;
