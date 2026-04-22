"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { NDAFormData } from "@/lib/nda-template";

const s = StyleSheet.create({
  page: {
    paddingHorizontal: 50,
    paddingVertical: 45,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.55,
    color: "#1a1a1a",
  },
  title: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 8,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    marginVertical: 14,
  },
  label: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  value: { fontSize: 10 },
  grid: { flexDirection: "row", gap: 20, marginBottom: 10 },
  gridItem: { flex: 1 },
  field: { marginBottom: 10 },
  h2: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
    marginTop: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 5,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingBottom: 5,
    marginBottom: 2,
  },
  colLabel: { width: 110, fontFamily: "Helvetica-Bold", fontSize: 9 },
  colParty: { flex: 1, textAlign: "center" },
  colPartyHeader: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },
  para: { marginBottom: 8 },
  bold: { fontFamily: "Helvetica-Bold" },
  footer: { fontSize: 7, color: "#9ca3af", textAlign: "center", marginTop: 16 },
});

const Field = ({ label, value }: { label: string; value: string }) => (
  <View style={s.field}>
    <Text style={s.label}>{label}</Text>
    <Text style={s.value}>{value || "—"}</Text>
  </View>
);

interface Props {
  data: NDAFormData;
}

export default function NDAPdfDocument({ data }: Props) {
  const mndaTerm =
    data.mndaTermType === "years"
      ? `Expires ${data.mndaTermYears} year(s) from Effective Date.`
      : "Continues until terminated in accordance with the terms of the MNDA.";

  const confTerm =
    data.confidentialityTermType === "years"
      ? `${data.confidentialityTermYears} year(s) from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.`
      : "In perpetuity.";

  return (
    <Document
      title="Mutual Non-Disclosure Agreement"
      author={data.party1.company || "Party 1"}
    >
      <Page size="A4" style={s.page}>
        {/* Header */}
        <Text style={s.title}>Mutual Non-Disclosure Agreement</Text>
        <Text style={s.subtitle}>
          Cover Page · Common Paper MNDA Standard Terms Version 1.0
        </Text>
        <View style={s.divider} />

        {/* Purpose */}
        <Field label="Purpose" value={data.purpose} />

        {/* Dates & Terms */}
        <View style={s.grid}>
          <View style={s.gridItem}>
            <Field label="Effective Date" value={data.effectiveDate} />
          </View>
          <View style={s.gridItem}>
            <Field label="MNDA Term" value={mndaTerm} />
          </View>
        </View>

        <View style={s.grid}>
          <View style={s.gridItem}>
            <Field label="Term of Confidentiality" value={confTerm} />
          </View>
          <View style={s.gridItem}>
            <Field label="Governing Law (State)" value={data.governingLaw} />
          </View>
        </View>

        <Field label="Jurisdiction" value={data.jurisdiction} />

        <View style={s.divider} />

        {/* Signature table */}
        <View style={s.tableHeader}>
          <Text style={s.colLabel}></Text>
          <Text style={s.colPartyHeader}>PARTY 1</Text>
          <Text style={s.colPartyHeader}>PARTY 2</Text>
        </View>

        {(
          [
            { label: "Company", key: "company" },
            { label: "Print Name", key: "name" },
            { label: "Title", key: "title" },
            { label: "Notice Address", key: "address" },
            { label: "Signature", key: null },
            { label: "Date", key: null },
          ] as { label: string; key: keyof NDAFormData["party1"] | null }[]
        ).map(({ label, key }) => (
          <View key={label} style={s.tableRow}>
            <Text style={[s.colLabel, s.bold]}>{label}</Text>
            <Text style={s.colParty}>
              {key ? data.party1[key] || "" : ""}
            </Text>
            <Text style={s.colParty}>
              {key ? data.party2[key] || "" : ""}
            </Text>
          </View>
        ))}

        <View style={s.divider} />

        {/* Standard Terms */}
        <Text style={s.h2}>Standard Terms</Text>

        {[
          {
            n: 1,
            title: "Introduction",
            body: `This Mutual Non-Disclosure Agreement ("MNDA") allows each party ("Disclosing Party") to disclose or make available information in connection with the Purpose which the Disclosing Party identifies as "confidential" or "proprietary", or which should be reasonably understood as such ("Confidential Information"). Each party's Confidential Information also includes the existence and status of the parties' discussions. Confidential Information includes technical or business information, product designs or roadmaps, requirements, pricing, security and compliance documentation, technology, inventions and know-how.`,
          },
          {
            n: 2,
            title: "Use and Protection of Confidential Information",
            body: `The Receiving Party shall: (a) use Confidential Information solely for the Purpose; (b) not disclose Confidential Information to third parties without the Disclosing Party's prior written approval, except to employees, agents, advisors, and contractors with a reasonable need to know, who are bound by equivalent confidentiality obligations; and (c) protect Confidential Information using at least the same protections it uses for its own similar information, but no less than a reasonable standard of care.`,
          },
          {
            n: 3,
            title: "Exceptions",
            body: `The Receiving Party's obligations do not apply to information that it can demonstrate: (a) is or becomes publicly available through no fault of the Receiving Party; (b) it rightfully knew or possessed before receipt without confidentiality restrictions; (c) it rightfully obtained from a third party without confidentiality restrictions; or (d) it independently developed without using or referencing the Confidential Information.`,
          },
          {
            n: 4,
            title: "Disclosures Required by Law",
            body: `The Receiving Party may disclose Confidential Information to the extent required by law, regulation, subpoena, or court order, provided (to the extent legally permitted) it gives the Disclosing Party reasonable advance notice and reasonably cooperates with efforts to obtain confidential treatment for the Confidential Information.`,
          },
          {
            n: 5,
            title: "Term and Termination",
            body: `This MNDA commences on the Effective Date (${data.effectiveDate || "—"}) and expires at the end of the MNDA Term. Either party may terminate this MNDA for any or no reason upon written notice. The Receiving Party's obligations relating to Confidential Information will survive for the Term of Confidentiality, despite any expiration or termination.`,
          },
          {
            n: 6,
            title: "Return or Destruction of Confidential Information",
            body: `Upon expiration, termination, or the Disclosing Party's earlier request, the Receiving Party will: (a) cease using Confidential Information; (b) destroy or return it promptly upon written request; and (c) if requested, confirm compliance in writing. The Receiving Party may retain Confidential Information per its standard backup or record retention policies or as required by law, but this MNDA's terms continue to apply.`,
          },
          {
            n: 7,
            title: "Proprietary Rights",
            body: `The Disclosing Party retains all intellectual property and other rights in its Confidential Information. Its disclosure to the Receiving Party grants no license under such rights.`,
          },
          {
            n: 8,
            title: "Disclaimer",
            body: `ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS", WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.`,
          },
          {
            n: 9,
            title: "Governing Law and Jurisdiction",
            body: `This MNDA is governed by the laws of the State of ${data.governingLaw || "—"}, without regard to its conflict of laws provisions. Any legal proceedings relating to this MNDA must be instituted in the federal or state courts located in ${data.jurisdiction || "—"}. Each party irrevocably submits to the exclusive jurisdiction of such courts.`,
          },
          {
            n: 10,
            title: "Equitable Relief",
            body: `A breach of this MNDA may cause irreparable harm for which monetary damages are an insufficient remedy. Upon a breach, the Disclosing Party is entitled to seek appropriate equitable relief, including an injunction, in addition to its other remedies.`,
          },
          {
            n: 11,
            title: "General",
            body: `Neither party has an obligation to disclose Confidential Information or proceed with any proposed transaction. Neither party may assign this MNDA without prior written consent, except in connection with a merger, reorganization, acquisition, or transfer of substantially all assets or voting securities. This MNDA constitutes the entire agreement regarding its subject matter and may only be amended by a written agreement signed by both parties. Notices must be sent to the addresses on the Cover Page.`,
          },
        ].map(({ n, title, body }) => (
          <View key={n} style={s.para}>
            <Text>
              <Text style={s.bold}>{n}. {title}. </Text>
              {body}
            </Text>
          </View>
        ))}

        <View style={s.footer}>
          <Text>
            Common Paper Mutual Non-Disclosure Agreement Version 1.0 · Free to
            use under CC BY 4.0 · commonpaper.com/standards/mutual-nda/1.0
          </Text>
        </View>
      </Page>
    </Document>
  );
}
