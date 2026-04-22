"use client";

import { useState } from "react";
import NDAForm from "@/components/NDAForm";
import NDAPreview from "@/components/NDAPreview";
import { NDAFormData } from "@/lib/nda-template";

const today = new Date().toISOString().split("T")[0];

const defaultData: NDAFormData = {
  purpose:
    "Evaluating whether to enter into a business relationship with the other party.",
  effectiveDate: today,
  mndaTermType: "years",
  mndaTermYears: 1,
  confidentialityTermType: "years",
  confidentialityTermYears: 1,
  governingLaw: "",
  jurisdiction: "",
  party1: { company: "", name: "", title: "", address: "" },
  party2: { company: "", name: "", title: "", address: "" },
};

export default function Home() {
  const [data, setData] = useState<NDAFormData>(defaultData);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="no-print bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Mutual NDA Creator
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Fill in the details to generate your Mutual Non-Disclosure Agreement
        </p>
      </header>

      <main className="flex h-[calc(100vh-73px)]">
        <aside className="no-print w-96 bg-white border-r border-gray-200 overflow-y-auto p-6">
          <NDAForm data={data} onChange={setData} />
        </aside>

        <div className="print-full flex-1 p-6 overflow-hidden">
          <NDAPreview data={data} />
        </div>
      </main>
    </div>
  );
}
