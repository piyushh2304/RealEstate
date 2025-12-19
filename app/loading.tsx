import { Component as AiLoader } from "@/components/ai-loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background/80 backdrop-blur-sm">
      <AiLoader />
    </div>
  );
}
