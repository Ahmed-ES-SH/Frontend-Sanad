import { useState, useCallback } from "react";

export interface ServiceFormData {
  title: string;
  shortDescription: string;
  longDescription: string;
  iconUrl: string;
  coverImageUrl: string;
  categoryId: string;
}

export interface UseAddServiceFormReturn {
  formData: ServiceFormData;
  setFormData: React.Dispatch<React.SetStateAction<ServiceFormData>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  resetForm: () => void;
}

export function useAddServiceForm(): UseAddServiceFormReturn {
  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    shortDescription: "",
    longDescription: "",
    iconUrl: "",
    coverImageUrl: "",
    categoryId: "",
  });

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      shortDescription: "",
      longDescription: "",
      iconUrl: "",
      coverImageUrl: "",
      categoryId: "",
    });
  }, []);

  return {
    formData,
    setFormData,
    handleInputChange,
    resetForm,
  };
}