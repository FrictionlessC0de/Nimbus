import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { ResumeObject } from "@/types"

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, color: "#1a2b4a", padding: "40 50" },
  header: { marginBottom: 20, borderBottomWidth: 2, borderBottomColor: "#1a4b8c", paddingBottom: 12 },
  name: { fontSize: 22, fontFamily: "Helvetica-Bold", color: "#1a2b4a", marginBottom: 4 },
  jobTitle: { fontSize: 11, color: "#1a4b8c", marginBottom: 6 },
  contactRow: { flexDirection: "row", gap: 12, fontSize: 9, color: "#555" },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#1a4b8c", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, borderBottomWidth: 0.5, borderBottomColor: "#1a4b8c", paddingBottom: 3 },
  entryHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  entrySubtitle: { fontSize: 9, color: "#555", marginBottom: 3 },
  entryDate: { fontSize: 9, color: "#888" },
  description: { fontSize: 9, color: "#444", lineHeight: 1.5 },
  summary: { fontSize: 9, color: "#444", lineHeight: 1.6 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  skill: { fontSize: 9, backgroundColor: "#f0f4f8", color: "#1a4b8c", padding: "3 8", borderRadius: 4 },
})

export default function ClassicTemplate({ resume }: { resume: ResumeObject }) {
  const { personal, experience, education, skills } = resume
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personal.fullName || "Your Name"}</Text>
          <Text style={styles.jobTitle}>{personal.jobTitle || "Job Title"}</Text>
          <View style={styles.contactRow}>
            {personal.email && <Text>{personal.email}</Text>}
            {personal.phone && <Text>· {personal.phone}</Text>}
            {personal.location && <Text>· {personal.location}</Text>}
            {personal.linkedin && <Text>· {personal.linkedin}</Text>}
          </View>
        </View>

        {personal.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summary}>{personal.summary}</Text>
          </View>
        )}

        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 8 }}>
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