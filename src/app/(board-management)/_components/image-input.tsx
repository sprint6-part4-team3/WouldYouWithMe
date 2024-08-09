"use client";

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";

import { FieldWrapper } from "@/components/common";
import { IMAGE_SIZE_ERROR, IMAGE_TYPE_ERROR } from "@/constants/error-message";
import MAX_IMAGE_SIZE from "@/constants/image-size";
import { useToast } from "@/hooks";
import imageUpload from "@/lib/api/image/image-upload";
import { IconPlusBig, IconXBig, LoadingSpinner } from "@/public/assets/icons";
import { BoardAddEditInput } from "@/types/board/add-edit";

const ImageInput = () => {
  const toast = useToast();
  const { setValue, resetField, watch } = useFormContext<BoardAddEditInput>();

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

  const handleClickCancel = () => {
    resetField("image");
    setImgUrl(null);
    toast.success("이미지가 삭제되었습니다.");
    const imageInput = document.getElementById("image") as HTMLInputElement;
    if (imageInput) {
      imageInput.value = "";
    }
  };

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
      {isPending ? (
        <LoadingSpinner width={160} height={160} />
      ) : (
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
              <div
                className={`${errorMessage ? "border-status-danger" : "border-border-primary"} flex size-160 cursor-pointer flex-col items-center justify-center gap-12 rounded-12 border bg-background-secondary hover:border-brand-primary`}
              >
                <IconPlusBig />
                <span className="text-16-400 text-gray-400">이미지 등록</span>
              </div>
            </label>
          )}
        </div>
      )}
    </FieldWrapper>
  );
};

export default ImageInput;
