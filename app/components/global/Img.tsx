"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { useState } from "react";

interface props {
  src: string;
  className: string;
  alt?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager" | undefined;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  fallback?: React.ReactNode;
  ref?: any;
  sizes?: string;
}

export default function Img({
  src,
  className,
  width = 1024,
  height = 1280,
  alt = "image",
  loading = "lazy",
  priority = false,
  onLoad,
  onError,
  fallback,
  ref,
  sizes,
}: props) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      priority={priority}
      onLoad={onLoad}
      onError={handleError}
      ref={ref}
      sizes={sizes}
    />
  );
}
