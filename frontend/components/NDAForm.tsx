"use client";

import { NDAFormData } from "@/lib/nda-template";

interface Props {
  data: NDAFormData;
  onChange: (data: NDAFormData) => void;
}

export default function NDAForm({ data, onChange }: Props) {
  const update = (field: keyof NDAFormData, value: unknown) =>
    onChange({ ...data, [field]: value });

  const updateParty = (
    party: "party1" | "party2",
    field: keyof NDAFormData["party1"],
    value: string
  ) => onChange({ ...data, [party]: { ...data[party], [field]: value } });

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Agreement Details
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purpose
            </label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.purpose}
              onChange={(e) => update("purpose", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Effective Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.effectiveDate}
              onChange={(e) => update("effectiveDate", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              MNDA Term
            </label>
            <div className="flex gap-3 items-center">
              <select
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.mndaTermType}
                onChange={(e) =>
                  update(
                    "mndaTermType",
                    e.target.value as NDAFormData["mndaTermType"]
                  )
                }
              >
                <option value="years">Expires after</option>
                <option value="until_terminated">Until terminated</option>
              </select>
              {data.mndaTermType === "years" && (
                <input
                  type="number"
                  min={1}
                  className="w-20 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={data.mndaTermYears}
                  onChange={(e) =>
                    update("mndaTermYears", Number(e.target.value))
                  }
                />
              )}
              {data.mndaTermType === "years" && (
                <span className="text-sm text-gray-600">year(s)</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Term of Confidentiality
            </label>
            <div className="flex gap-3 items-center">
              <select
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.confidentialityTermType}
                onChange={(e) =>
                  update(
                    "confidentialityTermType",
                    e.target.value as NDAFormData["confidentialityTermType"]
                  )
                }
              >
                <option value="years">Expires after</option>
                <option value="perpetuity">In perpetuity</option>
              </select>
              {data.confidentialityTermType === "years" && (
                <input
                  type="number"
                  min={1}
                  className="w-20 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={data.confidentialityTermYears}
                  onChange={(e) =>
                    update("confidentialityTermYears", Number(e.target.value))
                  }
                />
              )}
              {data.confidentialityTermType === "years" && (
                <span className="text-sm text-gray-600">year(s)</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Governing Law (State)
            </label>
            <input
              type="text"
              placeholder="e.g. Delaware"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.governingLaw}
              onChange={(e) => update("governingLaw", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jurisdiction
            </label>
            <input
              type="text"
              placeholder="e.g. courts located in New Castle, DE"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.jurisdiction}
              onChange={(e) => update("jurisdiction", e.target.value)}
            />
          </div>
        </div>
      </section>

      {(["party1", "party2"] as const).map((party, i) => (
        <section key={party}>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Party {i + 1}
          </h2>
          <div className="space-y-3">
            {(
              ["company", "name", "title", "address"] as Array<
                keyof NDAFormData["party1"]
              >
            ).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field === "address" ? "Notice Address" : field}
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={data[party][field]}
                  onChange={(e) => updateParty(party, field, e.target.value)}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </form>
  );
}
