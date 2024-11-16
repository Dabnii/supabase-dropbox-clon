"use client";

import { Button } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "actions/storageActions";
import { queryClient } from "config/ReactQueryClientProvider";
import { useRef } from "react";

export default function FileDragDropZone() {
  // 선행 되어야하는 것 👇
  // supabase Policies 설정 > 권한 설정 및 파일 설정 ⚙️
  const fileRef = useRef(null);
  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const file = fileRef.current.files?.[0];
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const result = await uploadImageMutation.mutate(formData);
          console.log(result);
        }
      }}
      className="w-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center justify-center"
    >
      {/* input ref 설정 */}
      <input type="file" className="" ref={fileRef} />
      <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
      <Button type="submit"> 📂 파일 업로드</Button>
    </form>
  );
}
