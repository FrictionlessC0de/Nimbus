import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { ResumeObject } from "@/types"

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, color: "#222", padding: "50 60" },
  header: { marginBottom: 24, textAlign: "center" },
  name: { fontSize: 24, fontFamily: "Helvetica-Bold", color: "#111", marginBottom: 4, textAlign: "center" },
  jobTitle: { fontSize: 11, color: "#555", marginBottom: 8, textAlign: "center" },
  contactRow: { flexDirection: "row", justifyContent: "center", gap: 10, fontSize: 9, color: "#888" },
  divider: { borderBottomWidth: 0.5, borderBottomColor: "#ddd", marginVertical: 16 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#888", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 },
  entryHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 10, color: "#111" },
  entrySubtitle: { fontSize: 9, color: "#777", marginBottom: 3 },
  entryDate: { fontSize: 9, color: "#aaa" },
  description: { fontSize: 9, color: "#555", lineHeight: 1.6 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  skill: { fontSize: 9, color: "#555", borderWidth: 0.5, borderColor: "#ddd", padding: "3 8", borderRadius: 3 },
})

export default function MinimalTemplate({ resume }: { resume: ResumeObject }) {
  const { personal, experience, education, skills } = resume
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personal.fullName || "Your Name"}</Text>
          <Text style={styles.jobTitle}>{personal.jobTitle || "Job Title"}</Text>
          <View style={styles.contactRow}>
            {personal.email && <Text>{personal.email}</Text>}
            {personal.phone && <Text>·  {personal.phone}</Text>}
            {personal.location && <Text>·  {personal.location}</Text>}
          </View>
        </View>

        <View style={styles.divider} />

        {personal.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={{ fontSize: 9, color: "#555", lineHeight: 1.7 }}>{personal.summary}</Text>
          </View>
        )}

        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 10 }}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.entryDate}>{exp.startDate} — {exp.current ? "Present" : exp.endDate}</Text>
                </View>
                <Text style={styles.entrySubtitle}>{exp.company}</Text>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 6 }}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{edu.degree}</Text>
                  <Text style={styles.entryDate}>{edu.graduationYear}</Text>
                </View>
                <Text style={styles.entrySubtitle}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsRow}>
              {skills.map((skill, i) => (
                <Text key={i} style={styles.skill}>{skill}</Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  )
}