import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { ResumeObject } from "@/types"

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, color: "#1a2b4a", flexDirection: "row" },
  sidebar: { width: "35%", backgroundColor: "#1a2b4a", padding: "40 20", color: "#fff" },
  main: { width: "65%", padding: "40 30" },
  name: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#fff", marginBottom: 4 },
  jobTitle: { fontSize: 10, color: "#9FE1CB", marginBottom: 16 },
  sideSection: { marginBottom: 16 },
  sideSectionTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", color: "#9FE1CB", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 },
  sideText: { fontSize: 9, color: "#ccc", lineHeight: 1.5, marginBottom: 3 },
  sideSkill: { fontSize: 9, color: "#fff", backgroundColor: "#2a4b7a", padding: "3 8", borderRadius: 4, marginBottom: 4 },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#1a4b8c", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, borderBottomWidth: 0.5, borderBottomColor: "#1a4b8c", paddingBottom: 3 },
  entryHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  entrySubtitle: { fontSize: 9, color: "#555", marginBottom: 3 },
  entryDate: { fontSize: 9, color: "#888" },
  description: { fontSize: 9, color: "#444", lineHeight: 1.5 },
})

export default function ModernTemplate({ resume }: { resume: ResumeObject }) {
  const { personal, experience, education, skills } = resume
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <Text style={styles.name}>{personal.fullName || "Your Name"}</Text>
          <Text style={styles.jobTitle}>{personal.jobTitle || "Job Title"}</Text>

          <View style={styles.sideSection}>
            <Text style={styles.sideSectionTitle}>Contact</Text>
            {personal.email && <Text style={styles.sideText}>{personal.email}</Text>}
            {personal.phone && <Text style={styles.sideText}>{personal.phone}</Text>}
            {personal.location && <Text style={styles.sideText}>{personal.location}</Text>}
            {personal.linkedin && <Text style={styles.sideText}>{personal.linkedin}</Text>}
          </View>

          {skills.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideSectionTitle}>Skills</Text>
              {skills.map((skill, i) => (
                <Text key={i} style={styles.sideSkill}>{skill}</Text>
              ))}
            </View>
          )}

          {education.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideSectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 6 }}>
                  <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#fff" }}>{edu.degree}</Text>
                  <Text style={styles.sideText}>{edu.institution}</Text>
                  <Text style={styles.sideText}>{edu.graduationYear}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.main}>
          {personal.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={{ fontSize: 9, color: "#444", lineHeight: 1.6 }}>{personal.summary}</Text>
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
        </View>
      </Page>
    </Document>
  )
}