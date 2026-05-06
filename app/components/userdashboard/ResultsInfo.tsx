"use client";

import type { ResultsInfoProps } from "./ResultsInfo.types";

const ResultsInfo: React.FC<ResultsInfoProps> = ({ text }) => {
  return (
    <div className="text-sm text-surface-500 font-body">
      {text}
    </div>
  );
};

export default ResultsInfo;