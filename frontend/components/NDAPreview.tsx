"use client";

import { NDAFormData, generateNDADocument } from "@/lib/nda-template";

interface Props {
  data: NDAFormData;
}

export default function NDAPreview({ data }: Props) {
  const mndaTerm =
    data.mndaTermType === "years"
      ? `Expires ${data.mndaTermYears} year(s) from Effective Date.`
      : "Continues until terminated in accordance with the terms of the MNDA.";

  const confTerm =
    data.confidentialityTermType === "years"
      ? `${data.confidentialityTermYears} year(s) from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.`
      : "In perpetuity.";

  const handleDownload = () => {
    const content = generateNDADocument(data);
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mutual-nda.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Preview</h2>
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Download .md
        </button>
      </div>

      <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg bg-white p-6 text-sm font-serif leading-relaxed space-y-4">
        <h1 className="text-xl font-bold text-center">
          Mutual Non-Disclosure Agreement
        </h1>

        <p className="text-xs text-gray-500 text-center">
          Cover Page · Common Paper MNDA v1.0
        </p>

        <hr />

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Purpose
          </p>
          <p className="mt-1">{data.purpose || <em className="text-gray-400">Not specified</em>}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Effective Date
            </p>
            <p className="mt-1">{data.effectiveDate || <em className="text-gray-400">Not specified</em>}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              MNDA Term
            </p>
            <p className="mt-1">{mndaTerm}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Term of Confidentiality
            </p>
            <p className="mt-1">{confTerm}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Governing Law
            </p>
            <p className="mt-1">{data.governingLaw || <em className="text-gray-400">Not specified</em>}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Jurisdiction
          </p>
          <p className="mt-1">{data.jurisdiction || <em className="text-gray-400">Not specified</em>}</p>
        </div>

        <hr />

        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="text-left py-2 pr-4 w-1/4"></th>
              <th className="text-center py-2 px-2 border-l border-gray-200">
                PARTY 1
              </th>
              <th className="text-center py-2 px-2 border-l border-gray-200">
                PARTY 2
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Company", key: "company" },
              { label: "Print Name", key: "name" },
              { label: "Title", key: "title" },
              { label: "Notice Address", key: "address" },
              { label: "Signature", key: null },
              { label: "Date", key: null },
            ].map(({ label, key }) => (
              <tr key={label} className="border-t border-gray-100">
                <td className="py-2 pr-4 font-medium text-gray-600">{label}</td>
                <td className="py-2 px-2 border-l border-gray-200 text-center min-h-[32px]">
                  {key
                    ? data.party1[key as keyof NDAFormData["party1"]] || (
                        <span className="text-gray-300">—</span>
                      )
                    : ""}
                </td>
                <td className="py-2 px-2 border-l border-gray-200 text-center min-h-[32px]">
                  {key
                    ? data.party2[key as keyof NDAFormData["party2"]] || (
                        <span className="text-gray-300">—</span>
                      )
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        <h2 className="text-base font-bold">Standard Terms</h2>
        <p className="text-xs text-gray-500">
          Common Paper Mutual NDA Standard Terms Version 1.0 ·{" "}
          <a
            href="https://commonpaper.com/standards/mutual-nda/1.0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            commonpaper.com/standards/mutual-nda/1.0
          </a>
        </p>

        {[
          {
            n: 1,
            title: "Introduction",
            body: `This Mutual Non-Disclosure Agreement ("MNDA") allows each party ("Disclosing Party") to disclose or make available information in connection with the Purpose which the Disclosing Party identifies as "confidential" or "proprietary", or which should be reasonably understood as such ("Confidential Information").`,
          },
          {
            n: 2,
            title: "Use and Protection of Confidential Information",
            body: `The Receiving Party shall: (a) use Confidential Information solely for the Purpose; (b) not disclose Confidential Information to third parties without prior written approval; and (c) protect Confidential Information using at least the same protections it uses for its own similar information.`,
          },
          {
            n: 3,
            title: "Exceptions",
            body: `The Receiving Party's obligations do not apply to information that: (a) is publicly available through no fault of the Receiving Party; (b) it rightfully knew before receipt; (c) it rightfully obtained from a third party; or (d) it independently developed.`,
          },
          {
            n: 4,
            title: "Disclosures Required by Law",
            body: `The Receiving Party may disclose Confidential Information as required by law or court order, provided it gives reasonable advance notice to the Disclosing Party.`,
          },
          {
            n: 5,
            title: "Term and Termination",
            body: `This MNDA commences on the Effective Date (${data.effectiveDate || "—"}) and expires at the end of the MNDA Term. Confidentiality obligations survive for the Term of Confidentiality.`,
          },
          {
            n: 6,
            title: "Return or Destruction",
            body: `Upon termination, the Receiving Party will cease using and destroy or return all Confidential Information upon the Disclosing Party's request.`,
          },
          {
            n: 7,
            title: "Proprietary Rights",
            body: `The Disclosing Party retains all intellectual property rights in its Confidential Information.`,
          },
          {
            n: 8,
            title: "Disclaimer",
            body: `ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS", WITHOUT WARRANTIES OF ANY KIND.`,
          },
          {
            n: 9,
            title: "Governing Law and Jurisdiction",
            body: `This MNDA is governed by the laws of the State of ${data.governingLaw || "—"}. Any proceedings must be instituted in ${data.jurisdiction || "—"}.`,
          },
          {
            n: 10,
            title: "Equitable Relief",
            body: `A breach may cause irreparable harm. The Disclosing Party is entitled to seek appropriate equitable relief, including an injunction.`,
          },
          {
            n: 11,
            title: "General",
            body: `Neither party may assign this MNDA without prior written consent, except in connection with a merger or transfer of substantially all assets. This MNDA constitutes the entire agreement regarding its subject matter.`,
          },
        ].map(({ n, title, body }) => (
          <p key={n}>
            <strong>
              {n}. {title}.
            </strong>{" "}
            {body}
          </p>
        ))}

        <p className="text-xs text-gray-400 text-center pt-4">
          Common Paper Mutual Non-Disclosure Agreement Version 1.0 · CC BY 4.0
        </p>
      </div>
    </div>
  );
}
